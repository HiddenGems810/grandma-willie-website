import "server-only";

const PRINTFUL_API_BASE = "https://api.printful.com";
const DEFAULT_PRODUCT_REVALIDATE_SECONDS = 300;

type PrintfulListResponse<T> = {
  code: number;
  result: T[];
};

type PrintfulObjectResponse<T> = {
  code: number;
  result: T;
};

type PrintfulSyncProductSummary = {
  id: number;
  external_id?: string;
  name: string;
  thumbnail_url?: string;
  synced?: number;
  is_ignored?: boolean;
};

type PrintfulSyncVariant = {
  id: number;
  external_id?: string;
  sync_product_id: number;
  name: string;
  variant_id: number;
  retail_price?: string;
  currency?: string;
  is_ignored?: boolean;
  product?: {
    image?: string;
  };
  files?: Array<{
    id?: number;
    preview_url?: string;
    thumbnail_url?: string;
    type?: string;
  }>;
};

type PrintfulSyncProductDetail = {
  sync_product: PrintfulSyncProductSummary;
  sync_variants: PrintfulSyncVariant[];
};

export type StoreProductVariant = {
  id: number;
  syncProductId?: number;
  externalId: string | null;
  printfulVariantId?: number;
  name: string;
  price: number | null;
  currency: string;
  image: string | null;
};

export type StoreProduct = {
  id: string;
  externalId: string | null;
  name: string;
  image: string | null;
  synced: boolean;
  variants: StoreProductVariant[];
  priceLabel: string;
};

export type CheckoutItem = {
  syncProductId: number;
  syncVariantId: number;
  quantity: number;
};

type CreatePrintfulOrderParams = {
  externalId: string;
  recipient: {
    name: string;
    address1: string;
    address2?: string | null;
    city: string;
    stateCode?: string | null;
    countryCode: string;
    zip: string;
    email?: string | null;
  };
  items: Array<{
    syncVariantId?: number;
    quantity: number;
  }>;
  confirm: boolean;
};

export class PrintfulConfigError extends Error {
  constructor(message = "PRINTFUL_API_KEY is not configured.") {
    super(message);
    this.name = "PrintfulConfigError";
  }
}

export class PrintfulApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "PrintfulApiError";
  }
}

function getPrintfulApiKey() {
  const key = process.env.PRINTFUL_API_KEY?.trim();
  if (!key) throw new PrintfulConfigError();
  return key;
}

function getPrintfulStoreId() {
  return process.env.PRINTFUL_STORE_ID?.trim();
}

async function printfulFetch<T>(
  path: string,
  init: RequestInit & { next?: { revalidate?: number } } = {}
) {
  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getPrintfulApiKey()}`,
      "Content-Type": "application/json",
      ...(getPrintfulStoreId() ? { "X-PF-Store-Id": getPrintfulStoreId() } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new PrintfulApiError(body || res.statusText, res.status);
  }

  return (await res.json()) as T;
}

function formatPrice(price: number | null, currency: string) {
  if (price === null) return "Price unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

function parsePrice(value: string | undefined) {
  if (!value) return null;

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function variantImage(variant: PrintfulSyncVariant) {
  return (
    variant.product?.image ??
    variant.files?.find((file) => file.preview_url)?.preview_url ??
    variant.files?.find((file) => file.thumbnail_url)?.thumbnail_url ??
    null
  );
}

function normalizeProduct(detail: PrintfulSyncProductDetail): StoreProduct {
  const variants = detail.sync_variants
    .filter((variant) => !variant.is_ignored)
    .map<StoreProductVariant>((variant) => {
      const currency = variant.currency || "USD";

      return {
        id: variant.id,
        syncProductId: variant.sync_product_id,
        externalId: variant.external_id ?? null,
        printfulVariantId: variant.variant_id,
        name: variant.name,
        price: parsePrice(variant.retail_price),
        currency,
        image: variantImage(variant),
      };
    });

  const firstPricedVariant = variants.find((variant) => variant.price !== null);
  const image =
    detail.sync_product.thumbnail_url ??
    variants.find((variant) => variant.image)?.image ??
    null;

  return {
    id: String(detail.sync_product.id),
    externalId: detail.sync_product.external_id ?? null,
    name: detail.sync_product.name,
    image,
    synced: Boolean(detail.sync_product.synced),
    variants,
    priceLabel: firstPricedVariant
      ? formatPrice(firstPricedVariant.price, firstPricedVariant.currency)
      : "Price unavailable",
  };
}

export async function getPrintfulProducts() {
  const revalidate = productRevalidateSeconds();
  const list = await printfulFetch<PrintfulListResponse<PrintfulSyncProductSummary>>(
    "/store/products",
    { next: { revalidate } }
  );

  const visibleProducts = list.result.filter((product) => !product.is_ignored);

  return Promise.all(
    visibleProducts.map(async (product) => {
      const detail = await printfulFetch<PrintfulObjectResponse<PrintfulSyncProductDetail>>(
        `/store/products/${product.id}`,
        { next: { revalidate } }
      );

      return normalizeProduct(detail.result);
    })
  );
}

export async function getPrintfulProduct(productId: string) {
  const detail = await printfulFetch<PrintfulObjectResponse<PrintfulSyncProductDetail>>(
    `/store/products/${productId}`,
    { next: { revalidate: productRevalidateSeconds() } }
  );

  return normalizeProduct(detail.result);
}

export async function createPrintfulOrder(params: CreatePrintfulOrderParams) {
  return printfulFetch<PrintfulObjectResponse<{ id: number; external_id: string }>>(
    "/orders",
    {
      method: "POST",
      body: JSON.stringify({
        external_id: params.externalId,
        recipient: {
          name: params.recipient.name,
          address1: params.recipient.address1,
          address2: params.recipient.address2 ?? undefined,
          city: params.recipient.city,
          state_code: params.recipient.stateCode ?? undefined,
          country_code: params.recipient.countryCode,
          zip: params.recipient.zip,
          email: params.recipient.email ?? undefined,
        },
        items: params.items.map((item) => ({
          sync_variant_id: item.syncVariantId,
          quantity: item.quantity,
        })),
        confirm: params.confirm,
      }),
    }
  );
}

export function productRevalidateSeconds() {
  const configured = Number(process.env.PRINTFUL_PRODUCT_REVALIDATE_SECONDS);

  if (Number.isInteger(configured) && configured >= 60) {
    return configured;
  }

  return DEFAULT_PRODUCT_REVALIDATE_SECONDS;
}
