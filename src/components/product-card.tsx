"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductBuyForm } from "@/components/product-buy-form";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    image: string;
    priceLabel: string;
    variants: Array<{
      id: number;
      name: string;
      image: string;
      price: number | null;
    }>;
  };
  paypalClientId: string;
};

export function ProductCard({ product, paypalClientId }: ProductCardProps) {
  const [image, setImage] = useState(product.variants[0]?.image ?? product.image);

  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
      <div className="relative aspect-[4/3] bg-[var(--color-butter)]">
        <Image
          src={image}
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
        <p className="mt-3 text-lg font-black text-[var(--color-leaf)]">{product.priceLabel}</p>
        <div className="mt-auto">
          <ProductBuyForm
            product={product}
            paypalClientId={paypalClientId}
            onVariantChange={setImage}
          />
        </div>
      </div>
    </article>
  );
}
