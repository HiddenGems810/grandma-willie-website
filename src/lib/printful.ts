import "server-only";

const PRINTFUL_API_BASE = "https://api.printful.com";
const DEFAULT_PRODUCT_REVALIDATE_SECONDS = 300;
const TEE_PRODUCT_ID = 438;
const TEE_RETAIL_PRICE = 28;

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

type PrintfulProductTemplate = {
  id: number;
  product_id: number;
  title: string;
  available_variant_ids: number[];
  mockup_file_url?: string;
  updated_at: number;
};

type PrintfulCatalogVariant = {
  id: number;
  name: string;
  size?: string;
  color?: string;
  price?: string;
};

type PrintfulCatalogProduct = {
  variants: PrintfulCatalogVariant[];
};

export type StoreProductVariant = {
  id: number;
  syncProductId?: number;
  productTemplateId?: number;
  externalId: string | null;
  printfulVariantId?: number;
  catalogVariantId?: number;
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
    catalogVariantId?: number;
    productTemplateId?: number;
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

function templateProductId(templateId: number) {
  return `template-${templateId}`;
}

function normalizeTemplateProduct(
  template: PrintfulProductTemplate,
  catalog: PrintfulCatalogProduct
): StoreProduct {
  const available = new Set(template.available_variant_ids);
  const variants = catalog.variants
    .filter((variant) => available.has(variant.id))
    .map<StoreProductVariant>((variant) => ({
      id: variant.id,
      productTemplateId: template.id,
      catalogVariantId: variant.id,
      externalId: null,
      name: [variant.color, variant.size].filter(Boolean).join(" / ") || variant.name,
      price: TEE_RETAIL_PRICE,
      currency: "USD",
      image: template.mockup_file_url ?? null,
    }));

  return {
    id: templateProductId(template.id),
    externalId: null,
    name: "Grandma Willie Signature Tee",
    image: template.mockup_file_url ?? null,
    synced: true,
    variants,
    priceLabel: formatPrice(TEE_RETAIL_PRICE, "USD"),
  };
}

export async function getPrintfulProducts() {
  const revalidate = productRevalidateSeconds();
  const list = await printfulFetch<PrintfulListResponse<PrintfulSyncProductSummary>>(
    "/store/products",
    { next: { revalidate } }
  );

  const visibleProducts = list.result.filter((product) => !product.is_ignored);

  const syncProducts = await Promise.all(
    visibleProducts.map(async (product) => {
      const detail = await printfulFetch<PrintfulObjectResponse<PrintfulSyncProductDetail>>(
        `/store/products/${product.id}`,
        { next: { revalidate } }
      );

      return normalizeProduct(detail.result);
    })
  );

  return [...syncProducts, ...(await getTemplateProducts())];
}

export async function getPrintfulProduct(productId: string) {
  if (productId.startsWith("template-")) {
    const templateId = Number(productId.replace("template-", ""));
    const template = await getProductTemplate(templateId);
    const catalog = await getCatalogProduct(template.product_id);
    return normalizeTemplateProduct(template, catalog);
  }

  const detail = await printfulFetch<PrintfulObjectResponse<PrintfulSyncProductDetail>>(
    `/store/products/${productId}`,
    { next: { revalidate: productRevalidateSeconds() } }
  );

  return normalizeProduct(detail.result);
}

export async function getProductTemplate(templateId: number) {
  const detail = await printfulFetch<PrintfulObjectResponse<PrintfulProductTemplate>>(
    `/product-templates/${templateId}`,
    { next: { revalidate: productRevalidateSeconds() } }
  );

  return detail.result;
}

async function getCatalogProduct(productId: number) {
  const detail = await printfulFetch<PrintfulObjectResponse<PrintfulCatalogProduct>>(
    `/products/${productId}`,
    { next: { revalidate: productRevalidateSeconds() } }
  );

  return detail.result;
}

async function getTemplateProducts() {
  const templates = await printfulFetch<
    PrintfulObjectResponse<{ items: PrintfulProductTemplate[] }>
  >("/product-templates?limit=50", { next: { revalidate: productRevalidateSeconds() } });
  const latestTee = templates.result.items
    .filter((template) => template.product_id === TEE_PRODUCT_ID)
    .sort((a, b) => b.updated_at - a.updated_at)[0];

  if (!latestTee) return [];

  return [normalizeTemplateProduct(latestTee, await getCatalogProduct(latestTee.product_id))];
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
          variant_id: item.catalogVariantId,
          product_template_id: item.productTemplateId,
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
