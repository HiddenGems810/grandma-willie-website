import { NextResponse } from "next/server";
import {
  capturePayPalOrder,
  type CapturedPayPalOrder,
  PayPalApiError,
  PayPalConfigError,
} from "@/lib/paypal";
import { createPrintfulOrder, PrintfulApiError, PrintfulConfigError } from "@/lib/printful";

type CapturePayload = {
  orderId: string;
};

function parsePayload(body: unknown): CapturePayload | null {
  if (!body || typeof body !== "object") return null;

  const candidate = body as Record<string, unknown>;
  const orderId = typeof candidate.orderId === "string" ? candidate.orderId : "";

  if (!orderId) {
    return null;
  }

  return { orderId };
}

function paidItemFromCapture(capture: CapturedPayPalOrder) {
  const customId = capture.purchase_units?.[0]?.custom_id;
  if (!customId) return null;

  try {
    const metadata = JSON.parse(customId) as {
      syncVariantId?: unknown;
      quantity?: unknown;
    };
    const syncVariantId = Number(metadata.syncVariantId);
    const quantity = Number(metadata.quantity);

    if (
      !Number.isInteger(syncVariantId) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return null;
    }

    return { syncVariantId, quantity };
  } catch {
    return null;
  }
}

function recipientFromCapture(capture: CapturedPayPalOrder) {
  const unit = capture.purchase_units?.[0];
  const shipping = unit?.shipping;
  const address = shipping?.address;
  const payerName = [capture.payer?.name?.given_name, capture.payer?.name?.surname]
    .filter(Boolean)
    .join(" ");

  if (
    !address?.address_line_1 ||
    !address.admin_area_2 ||
    !address.country_code ||
    !address.postal_code
  ) {
    return null;
  }

  return {
    name: shipping?.name?.full_name || payerName || "PayPal Customer",
    address1: address.address_line_1,
    address2: address.address_line_2,
    city: address.admin_area_2,
    stateCode: address.admin_area_1,
    countryCode: address.country_code,
    zip: address.postal_code,
    email: capture.payer?.email_address,
  };
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid PayPal capture payload." }, { status: 422 });
  }

  try {
    const capture = await capturePayPalOrder(payload.orderId);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "PayPal payment was not completed.", status: capture.status },
        { status: 422 }
      );
    }

    const paidItem = paidItemFromCapture(capture);
    if (!paidItem) {
      return NextResponse.json(
        { error: "Paid order details could not be verified." },
        { status: 422 }
      );
    }

    const recipient = recipientFromCapture(capture);
    if (!recipient) {
      return NextResponse.json(
        { error: "PayPal did not return a complete shipping address." },
        { status: 422 }
      );
    }

    const printfulOrder = await createPrintfulOrder({
      externalId: capture.id,
      confirm: process.env.PRINTFUL_CONFIRM_ORDERS === "true",
      recipient,
      items: [
        {
          syncVariantId: paidItem.syncVariantId,
          quantity: paidItem.quantity,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      paypalOrderId: capture.id,
      printfulOrderId: printfulOrder.result.id,
      printfulConfirmed: process.env.PRINTFUL_CONFIRM_ORDERS === "true",
    });
  } catch (error) {
    if (error instanceof PayPalConfigError || error instanceof PrintfulConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (error instanceof PayPalApiError) {
      return NextResponse.json(
        { error: "PayPal request failed.", status: error.status },
        { status: error.status }
      );
    }

    if (error instanceof PrintfulApiError) {
      return NextResponse.json(
        { error: "Printful request failed.", status: error.status },
        { status: error.status }
      );
    }

    return NextResponse.json({ error: "Unable to capture PayPal order." }, { status: 500 });
  }
}
