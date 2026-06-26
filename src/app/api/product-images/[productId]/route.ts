import { NextResponse } from "next/server";
import { getPrintfulProduct } from "@/lib/printful";

export const revalidate = 3600;

type ProductImageRouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(req: Request, context: ProductImageRouteContext) {
  const { productId } = await context.params;

  if (!/^(template-\d+|\d+)$/.test(productId)) {
    return NextResponse.json({ error: "Invalid product image." }, { status: 400 });
  }

  const product = await getPrintfulProduct(productId);
  const variantId = Number(new URL(req.url).searchParams.get("variantId"));
  const variantImage = Number.isInteger(variantId)
    ? product.variants.find((variant) => variant.id === variantId)?.image
    : null;
  const image = variantImage ?? product.image;

  if (!image) {
    return NextResponse.json({ error: "Product image unavailable." }, { status: 404 });
  }

  const imageRes = await fetch(image, {
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
