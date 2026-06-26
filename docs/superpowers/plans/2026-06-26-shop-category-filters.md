# Shop Category Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add instant All, Aprons, T-Shirts, and Mugs filtering to the published product grid.

**Architecture:** Keep product fetching in the shop server component. Move the existing product grid into one client component that owns only the selected category and derives each product category from its published name.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS

---

### Task 1: Filterable product grid

**Files:**
- Create: `src/components/shop-product-grid.tsx`
- Modify: `src/app/shop/page.tsx`

- [ ] **Step 1: Add the client grid**

Create a typed client component with `useState`, four filter buttons using `aria-pressed`, name-based category matching, the existing card markup, and a category empty state.

- [ ] **Step 2: Connect the shop page**

Replace the inline product grid with `ShopProductGrid`, passing the existing products and PayPal client ID without changing server-side loading.

- [ ] **Step 3: Verify static checks**

Run `npm run lint` and `npm run build`. Expected: both exit successfully.

- [ ] **Step 4: Verify rendered behavior**

On desktop and mobile, confirm All shows every product; Aprons, T-Shirts, and Mugs show only matching cards; keyboard focus and selected states are visible; checkout controls remain rendered; and no console errors appear.

- [ ] **Step 5: Publish**

Commit the component, page integration, spec, and plan, push `main`, and verify the production shop.
