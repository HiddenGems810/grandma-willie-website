import { NextResponse } from "next/server";
import { getPrintfulProduct } from "@/lib/printful";

export const revalidate = 3600;

type ProductImageRouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(_req: Request, context: ProductImageRouteContext) {
  const { productId } = await context.params;

  if (!/^\d+$/.test(productId)) {
    return NextResponse.json({ error: "Invalid product image." }, { status: 400 });
  }

  const product = await getPrintfulProduct(productId);

  if (!product.image) {
    return NextResponse.json({ error: "Product image unavailable." }, { status: 404 });
  }

  const imageRes = await fetch(product.image, {
    next: { revalidate: 3600 },
  });

  if (!imageRes.ok || !imageRes.body) {
    return NextResponse.json({ error: "Product image unavailable." }, { status: 502 });
  }

  return new Response(imageRes.body, {
    headers: {
      "Content-Type": imageRes.headers.get("content-type") ?? "image/png",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
