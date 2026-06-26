# Shop Category Filters

## Scope

Add instant client-side filters for All, Aprons, T-Shirts, and Mugs. All remains selected after initial load and page refresh.

## Design

- Place a compact segmented filter row between the shop introduction and product grid.
- Derive categories from published product names: `apron`, `tee` or `t-shirt`, and `mug`.
- Keep product fetching, cards, variants, PayPal checkout, and Printful fulfillment unchanged.
- Show only matching cards without navigation or URL changes.
- Use buttons with `aria-pressed` and visible selected, hover, and keyboard-focus states.
- If a category has no matching products, show a short empty state instead of a blank grid.

## Verification

- Confirm each filter shows only its category and All restores every product.
- Confirm checkout controls remain functional after filtering.
- Check desktop and mobile layouts, keyboard operation, console errors, lint, and production build.
