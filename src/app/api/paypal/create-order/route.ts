import { NextResponse } from "next/server";
import { createPayPalOrder, PayPalApiError, PayPalConfigError } from "@/lib/paypal";
import { getPrintfulProduct, PrintfulApiError, PrintfulConfigError } from "@/lib/printful";

type CreateOrderPayload = {
  syncProductId: string;
  syncVariantId: number;
  quantity?: number;
};

function parsePayload(body: unknown): CreateOrderPayload | null {
  if (!body || typeof body !== "object") return null;

  const candidate = body as Record<string, unknown>;
  const syncProductId =
    typeof candidate.syncProductId === "string" || typeof candidate.syncProductId === "number"
      ? String(candidate.syncProductId)
      : "";
  const syncVariantId = Number(candidate.syncVariantId);
  const quantity = candidate.quantity === undefined ? 1 : Number(candidate.quantity);

  if (
    !/^\d+$/.test(syncProductId) ||
    !Number.isInteger(syncVariantId) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 10
  ) {
    return null;
  }

  return { syncProductId, syncVariantId, quantity };
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
    return NextResponse.json({ error: "Invalid checkout item." }, { status: 422 });
  }

  try {
    const product = await getPrintfulProduct(payload.syncProductId);
    const variant = product.variants.find((item) => item.id === payload.syncVariantId);

    if (!variant || variant.price === null) {
      return NextResponse.json(
        { error: "This product variant is not available for checkout." },
        { status: 422 }
      );
    }

    const order = await createPayPalOrder({
      productName: product.name,
      variantName: variant.name,
      quantity: payload.quantity ?? 1,
      currency: variant.currency,
      unitAmount: variant.price,
      metadata: {
        syncProductId: product.id,
        syncVariantId: variant.id,
        quantity: payload.quantity ?? 1,
      },
    });

    return NextResponse.json({ id: order.id });
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

    return NextResponse.json({ error: "Unable to create PayPal order." }, { status: 500 });
  }
}
