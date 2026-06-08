import { NextResponse } from "next/server";
import {
  type StoreProduct,
  getPrintfulProducts,
  PrintfulApiError,
  PrintfulConfigError,
  productRevalidateSeconds,
} from "@/lib/printful";

export const revalidate = 3600;

function publicProduct(product: StoreProduct) {
  return {
    id: product.id,
    name: product.name,
    image: `/api/product-images/${product.id}`,
    priceLabel: product.priceLabel,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      price: variant.price,
      currency: variant.currency,
    })),
  };
}

export async function GET() {
  try {
    const products = await getPrintfulProducts();

    return NextResponse.json(
      {
        products: products.map(publicProduct),
        revalidate: productRevalidateSeconds(),
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    if (error instanceof PrintfulConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (error instanceof PrintfulApiError) {
      return NextResponse.json(
        { error: "Printful request failed.", status: error.status },
        { status: error.status }
      );
    }

    return NextResponse.json({ error: "Unable to load products." }, { status: 500 });
  }
}
