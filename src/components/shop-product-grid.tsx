"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductBuyForm } from "@/components/product-buy-form";

type Category = "all" | "aprons" | "t-shirts" | "mugs";

const filters: Array<{ id: Category; label: string }> = [
  { id: "all", label: "All" },
  { id: "aprons", label: "Aprons" },
  { id: "t-shirts", label: "T-Shirts" },
  { id: "mugs", label: "Mugs" },
];

type ShopProduct = {
  id: string;
  name: string;
  imageVersion: string;
  priceLabel: string;
  variants: Array<{ id: number; name: string; price: number | null }>;
};

function productCategory(name: string): Exclude<Category, "all"> | "other" {
  const normalized = name.toLowerCase();
  if (normalized.includes("apron")) return "aprons";
  if (normalized.includes("tee") || normalized.includes("t-shirt")) return "t-shirts";
  if (normalized.includes("mug")) return "mugs";
  return "other";
}

export function ShopProductGrid({
  products,
  paypalClientId,
}: {
  products: ShopProduct[];
  paypalClientId: string;
}) {
  const [category, setCategory] = useState<Category>("all");
  const visibleProducts =
    category === "all"
      ? products
      : products.filter((product) => productCategory(product.name) === category);

  return (
    <>
      <div
        className="mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-lg border border-[var(--color-border-dark)] bg-white/65 p-1"
        aria-label="Filter products"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={category === filter.id}
            aria-controls="shop-products"
            onClick={() => setCategory(filter.id)}
            className={`min-h-11 shrink-0 rounded-md px-4 text-sm font-black transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] ${
              category === filter.id
                ? "bg-[var(--color-cast-iron)] text-[var(--color-cream)]"
                : "text-[var(--color-warm-brown)] hover:bg-[var(--color-butter)]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visibleProducts.length} {category === "all" ? "products" : category}.
      </p>

      {visibleProducts.length === 0 ? (
        <div className="mt-8 border-t border-[var(--color-border-dark)] py-12">
          <p className="text-lg font-bold text-[var(--color-warm-brown)]">
            No products are available in this category yet.
          </p>
        </div>
      ) : (
        <div id="shop-products" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[4/3] bg-[var(--color-butter)]">
                <Image
                  src={`/api/product-images/${product.id}?v=${product.imageVersion}`}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--color-tomato)]">
                  Kitchen favorite
                </p>
                <h2
                  className="mt-2 text-2xl font-black leading-tight text-[var(--color-cast-iron)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {product.name}
                </h2>
                <p className="mt-3 text-lg font-black text-[var(--color-leaf)]">
                  {product.priceLabel}
                </p>
                <div className="mt-auto">
                  <ProductBuyForm
                    product={{
                      id: product.id,
                      name: product.name,
                      variants: product.variants.map((variant) => ({
                        id: variant.id,
                        name: variant.name,
                        price: variant.price,
                      })),
                    }}
                    paypalClientId={paypalClientId}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
