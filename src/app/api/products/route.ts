import { NextResponse } from "next/server";
import {
  getPrintfulProducts,
  PrintfulApiError,
  PrintfulConfigError,
  productRevalidateSeconds,
} from "@/lib/printful";

export const revalidate = 3600;

export async function GET() {
  try {
    const products = await getPrintfulProducts();

    return NextResponse.json(
      {
        products,
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
