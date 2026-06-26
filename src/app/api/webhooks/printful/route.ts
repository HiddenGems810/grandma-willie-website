import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { PRINTFUL_PRODUCTS_CACHE_TAG } from "@/lib/printful";

const PRODUCT_EVENTS = new Set(["product_synced", "product_updated", "product_deleted"]);

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!secret || secret !== process.env.PRINTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || String(body.store) !== process.env.PRINTFUL_STORE_ID) {
    return NextResponse.json({ error: "Invalid webhook." }, { status: 400 });
  }

  if (PRODUCT_EVENTS.has(body.type)) {
    revalidateTag(PRINTFUL_PRODUCTS_CACHE_TAG, { expire: 0 });
    revalidatePath("/shop");
    revalidatePath("/api/products");
  }

  return NextResponse.json({ received: true });
}
