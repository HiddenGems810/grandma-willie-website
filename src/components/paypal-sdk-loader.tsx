"use client";

import Script from "next/script";

type PayPalSdkLoaderProps = {
  clientId: string;
  currency?: string;
};

export const PAYPAL_SDK_READY_EVENT = "grandma-willie:paypal-sdk-ready";

export function PayPalSdkLoader({
  clientId,
  currency = "USD",
}: PayPalSdkLoaderProps) {
  if (!clientId) return null;

  return (
    <Script
      src={`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
        clientId
      )}&currency=${encodeURIComponent(currency)}&intent=capture`}
      strategy="afterInteractive"
      onReady={() => {
        window.dispatchEvent(new Event(PAYPAL_SDK_READY_EVENT));
      }}
    />
  );
}
