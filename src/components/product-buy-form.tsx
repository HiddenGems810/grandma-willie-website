"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { PAYPAL_SDK_READY_EVENT } from "@/components/paypal-sdk-loader";
type ProductBuyFormProps = {
  product: {
    id: string;
    name: string;
    variants: Array<{
      id: number;
      name: string;
      price: number | null;
    }>;
  };
  paypalClientId: string;
};

type PayPalButtonsActions = {
  disable: () => void;
  enable: () => void;
};

type PayPalButtonsInstance = {
  render: (selector: string) => Promise<void>;
};

type PayPalNamespace = {
  Buttons: (config: {
    style: {
      layout: "vertical";
      color: "gold" | "blue" | "silver" | "white" | "black";
      shape: "rect" | "pill";
      label: "paypal" | "checkout" | "buynow" | "pay";
    };
    onInit: (_data: unknown, actions: PayPalButtonsActions) => void;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError: () => void;
  }) => PayPalButtonsInstance;
};

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

export function ProductBuyForm({ product, paypalClientId }: ProductBuyFormProps) {
  const purchasableVariants = product.variants.filter((variant) => variant.price !== null);
  const [variantId, setVariantId] = useState(purchasableVariants[0]?.id ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const containerId = `paypal-buttons-${product.id}`;
  const checkoutStateRef = useRef({
    variantId,
    quantity,
  });

  useEffect(() => {
    checkoutStateRef.current = { variantId, quantity };
  }, [variantId, quantity]);

  const renderPayPalButtons = useCallback(() => {
    if (!window.paypal || !paypalClientId || purchasableVariants.length === 0) return;

    const container = document.getElementById(containerId);
    if (!container || container.childElementCount > 0) return;

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "paypal",
        },
        onInit: (_data, actions) => {
          if (!checkoutStateRef.current.variantId) actions.disable();
        },
        createOrder: async () => {
          const selected = checkoutStateRef.current;
          setError("");
          setLoading(true);

          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              syncProductId: product.id,
              syncVariantId: selected.variantId,
              quantity: selected.quantity,
            }),
          });

          const payload = (await res.json()) as { id?: string; error?: string };

          if (!res.ok || !payload.id) {
            setLoading(false);
            throw new Error(payload.error ?? "Unable to create PayPal order.");
          }

          return payload.id;
        },
        onApprove: async (data) => {
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
            }),
          });

          const payload = (await res.json()) as { success?: boolean; error?: string };

          setLoading(false);

          if (!res.ok || !payload.success) {
            setError(payload.error ?? "Payment captured, but fulfillment did not start.");
            return;
          }

          setPaid(true);
        },
        onError: () => {
          setLoading(false);
          setError("PayPal checkout could not be completed.");
        },
      })
      .render(`#${containerId}`)
      .catch(() => {
        setError("PayPal buttons could not be rendered.");
      });
  }, [containerId, paypalClientId, product.id, purchasableVariants]);

  useEffect(() => {
    renderPayPalButtons();

    window.addEventListener(PAYPAL_SDK_READY_EVENT, renderPayPalButtons);
    return () => {
      window.removeEventListener(PAYPAL_SDK_READY_EVENT, renderPayPalButtons);
    };
  }, [renderPayPalButtons]);

  function handleSelectionChange(nextVariantId: number) {
    setError("");
    setVariantId(nextVariantId);
  }

  if (purchasableVariants.length === 0) {
    return (
      <p className="mt-5 rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-cream)] px-4 py-3 text-sm font-bold text-[var(--color-warm-brown)]">
        This item is not available for checkout yet.
      </p>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      <label className="block">
        <span className="text-[0.7rem] font-black uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Option
        </span>
        <select
          value={variantId}
          onChange={(event) => handleSelectionChange(Number(event.target.value))}
          className="mt-1.5 block w-full rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-paper)] px-4 py-3 text-sm font-bold text-[var(--color-cast-iron)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          {purchasableVariants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-[0.7rem] font-black uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Quantity
        </span>
        <input
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="mt-1.5 block w-full rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-paper)] px-4 py-3 text-sm font-bold text-[var(--color-cast-iron)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        />
      </label>

      {error && (
        <p className="rounded-xl border border-[var(--color-tomato)]/30 bg-[color-mix(in_srgb,var(--color-tomato)_7%,white)] px-4 py-3 text-sm font-bold text-[var(--color-tomato)]">
          {error}
        </p>
      )}

      {!paypalClientId ? (
        <p className="rounded-xl border border-[var(--color-border-dark)] bg-[var(--color-cream)] px-4 py-3 text-sm font-bold text-[var(--color-warm-brown)]">
          Online ordering opens soon. Message Grandma Willie to order today.
        </p>
      ) : paid ? (
        <div className="rounded-xl border border-[var(--color-leaf)] bg-[color-mix(in_srgb,var(--color-leaf)_8%,white)] px-4 py-3 text-sm font-black text-[var(--color-leaf)]">
          Payment received. Your order has been placed.
        </div>
      ) : (
        <>
          <div
            id={containerId}
            className={loading ? "pointer-events-none opacity-70" : ""}
            aria-label={`PayPal checkout for ${product.name}`}
          />
          <p className="flex items-center gap-1.5 text-[0.7rem] font-bold text-[var(--color-muted)]">
            <ShoppingBag size={12} aria-hidden="true" />
            Secure checkout. Orders are prepared after payment is received.
          </p>
        </>
      )}
    </div>
  );
}
