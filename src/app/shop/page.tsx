import type { Metadata } from "next";
import { AlertCircle, ShoppingBag } from "lucide-react";
import { PayPalSdkLoader } from "@/components/paypal-sdk-loader";
import { ShopProductGrid } from "@/components/shop-product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPrintfulProducts, PrintfulApiError, PrintfulConfigError } from "@/lib/printful";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Grandma Willie merchandise made for cooking, gifting, and bringing kitchen warmth home.",
  alternates: {
    canonical: "/shop",
  },
};

async function loadProducts() {
  try {
    return {
      products: await getPrintfulProducts(),
      error: "",
    };
  } catch (error) {
    if (error instanceof PrintfulConfigError) {
      return {
        products: [],
        error: "The shop is being connected and will be ready soon.",
      };
    }

    if (error instanceof PrintfulApiError) {
      return {
        products: [],
        error: "The shop could not load products right now. Please check back soon.",
      };
    }

    return {
      products: [],
      error: "Products could not be loaded right now. Please check back soon.",
    };
  }
}

export default async function ShopPage() {
  const { products, error } = await loadProducts();
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  return (
    <>
      <PayPalSdkLoader clientId={paypalClientId} />
      <SiteHeader />
      <main>
        <section
          className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
          style={{ background: "var(--color-cream)" }}
          aria-labelledby="shop-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-border-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-dark) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[var(--container)]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-dark)] bg-white/55 px-4 py-1.5 text-[0.72rem] font-black uppercase tracking-[0.2em] text-[var(--color-tomato)]">
              <ShoppingBag size={14} aria-hidden="true" />
              Grandma Willie Store
            </p>
            <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
              <h1
                id="shop-heading"
                className="max-w-[13ch] text-[var(--color-cast-iron)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 7vw, 5.8rem)",
                  fontWeight: 900,
                  lineHeight: 0.88,
                }}
              >
                Shop the kitchen.
              </h1>
              <p className="max-w-[46ch] text-[1.05rem] leading-[1.8] text-[var(--color-warm-brown)] lg:text-right">
                Bring a little of Grandma Willie&apos;s kitchen home with cozy
                favorites made for cooking, gifting, and showing love around the table.
              </p>
            </div>

            {error && (
              <div className="mt-10 flex items-start gap-3 rounded-2xl border border-[var(--color-tomato)]/30 bg-white p-5 text-[var(--color-tomato)] shadow-[var(--shadow-soft)]">
                <AlertCircle className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
                <p className="text-sm font-bold leading-relaxed">{error}</p>
              </div>
            )}

            {!error && products.length === 0 && (
              <div className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
                <h2
                  className="text-2xl font-black text-[var(--color-cast-iron)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Products are almost ready.
                </h2>
                <p className="mt-3 max-w-[60ch] text-[0.98rem] leading-[1.75] text-[var(--color-warm-brown)]">
                  The first kitchen favorites are being prepared. Once they are
                  ready, this page will update automatically.
                </p>
              </div>
            )}

            {products.length > 0 && (
              <ShopProductGrid
                products={products.map((product) => ({
                  id: product.id,
                  name: product.name,
                  imageVersion: product.imageVersion,
                  priceLabel: product.priceLabel,
                  variants: product.variants.map((variant) => ({
                    id: variant.id,
                    name: variant.name,
                    price: variant.price,
                  })),
                }))}
                paypalClientId={paypalClientId}
              />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
