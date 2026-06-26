# Store Checkout Integration

This project uses Printful for synced products and fulfillment, and PayPal Checkout for customer payment.

## Payment / Fulfillment Flow

1. `/shop` loads synced products from Printful on the server.
2. The shopper approves and pays through PayPal Checkout.
3. The backend captures the PayPal order through `/api/paypal/capture-order`.
4. Only after PayPal capture succeeds, the backend creates the Printful order.
5. Printful charges the merchant's Printful billing method or Wallet for fulfillment.

Printful does not collect shopper payments directly for this custom website. PayPal is the customer payment processor; Printful is the fulfillment provider.

## Required Environment Variables

Local `.env.local` and Vercel project settings need:

```txt
PRINTFUL_API_KEY=
NEXT_PUBLIC_SITE_URL=
PRINTFUL_PRODUCT_REVALIDATE_SECONDS=300
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_ENVIRONMENT=sandbox
PRINTFUL_CONFIRM_ORDERS=false
```

Use `PAYPAL_ENVIRONMENT=live` only with live PayPal credentials.

Keep `PRINTFUL_CONFIRM_ORDERS=false` while testing. Set it to `true` only when paid orders should be submitted to Printful for fulfillment automatically.

## Current Product Cache

Printful product data is cached/revalidated every 300 seconds by default to keep new products visible quickly without overloading the API. Override with `PRINTFUL_PRODUCT_REVALIDATE_SECONDS` when needed.
