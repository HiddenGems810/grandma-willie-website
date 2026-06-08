import "server-only";

const PAYPAL_API_BASE = {
  sandbox: "https://api-m.sandbox.paypal.com",
  live: "https://api-m.paypal.com",
} as const;

type PayPalEnvironment = keyof typeof PAYPAL_API_BASE;

type PayPalAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type PayPalOrderResponse = {
  id: string;
  status: string;
};

export type CapturedPayPalOrder = {
  id: string;
  status: string;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  purchase_units?: Array<{
    custom_id?: string;
    shipping?: {
      name?: {
        full_name?: string;
      };
      address?: {
        address_line_1?: string;
        address_line_2?: string;
        admin_area_2?: string;
        admin_area_1?: string;
        postal_code?: string;
        country_code?: string;
      };
    };
  }>;
};

type CreatePayPalOrderParams = {
  productName: string;
  variantName: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  metadata: {
    syncProductId: number;
    syncVariantId: number;
    quantity: number;
  };
};

export class PayPalConfigError extends Error {
  constructor(message = "PayPal checkout is not configured.") {
    super(message);
    this.name = "PayPalConfigError";
  }
}

export class PayPalApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "PayPalApiError";
  }
}

function paypalEnvironment(): PayPalEnvironment {
  return process.env.PAYPAL_ENVIRONMENT === "live" ? "live" : "sandbox";
}

function paypalBaseUrl() {
  return PAYPAL_API_BASE[paypalEnvironment()];
}

function paypalCredentials() {
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new PayPalConfigError("PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are required.");
  }

  return { clientId, clientSecret };
}

function formatAmount(value: number) {
  return value.toFixed(2);
}

async function getPayPalAccessToken() {
  const { clientId, clientSecret } = paypalCredentials();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new PayPalApiError(await res.text(), res.status);
  }

  return ((await res.json()) as PayPalAccessTokenResponse).access_token;
}

async function paypalFetch<T>(path: string, init: RequestInit) {
  const accessToken = await getPayPalAccessToken();
  const res = await fetch(`${paypalBaseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new PayPalApiError(await res.text(), res.status);
  }

  return (await res.json()) as T;
}

export async function createPayPalOrder(params: CreatePayPalOrderParams) {
  const itemTotal = params.unitAmount * params.quantity;

  return paypalFetch<PayPalOrderResponse>("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: JSON.stringify(params.metadata),
          description: "Grandma Willie Printful synced merchandise",
          amount: {
            currency_code: params.currency.toUpperCase(),
            value: formatAmount(itemTotal),
            breakdown: {
              item_total: {
                currency_code: params.currency.toUpperCase(),
                value: formatAmount(itemTotal),
              },
            },
          },
          items: [
            {
              name: `${params.productName} - ${params.variantName}`.slice(0, 127),
              quantity: String(params.quantity),
              unit_amount: {
                currency_code: params.currency.toUpperCase(),
                value: formatAmount(params.unitAmount),
              },
              category: "PHYSICAL_GOODS",
            },
          ],
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            shipping_preference: "GET_FROM_FILE",
            user_action: "PAY_NOW",
          },
        },
      },
    }),
  });
}

export async function capturePayPalOrder(orderId: string) {
  return paypalFetch<CapturedPayPalOrder>(`/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    body: "{}",
  });
}

export function isPayPalClientConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim());
}
