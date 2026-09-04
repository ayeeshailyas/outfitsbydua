# Futsbydua — E-commerce Storefront

A clean, minimal, light-themed React e-commerce site for the Futsbydua clothing brand, covering Women / Men / Kids collections, wishlist, cart, filtering, and a WhatsApp-first checkout.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The production build is written to `dist/` — upload that folder to any static host (Vercel, Netlify, Cloudflare Pages, S3, etc.).

## Before you launch

1. **WhatsApp number** — open `src/config.js` and replace `WHATSAPP_NUMBER` with your real WhatsApp Business number in international format, digits only (e.g. `"14155552671"`).
2. **Free shipping threshold** — also in `src/config.js`, adjust `FREE_SHIPPING_THRESHOLD`.
3. **Products** — all catalogue data lives in `src/data/products.js`. Each product has category (`women` / `men` / `kids`), subcategory, age group, price, sizes, colors, images and a description. Swap in your real product photography by replacing the `images` arrays — the placeholders currently point to Unsplash editorial photography.
4. **Payment gateway** — the checkout page currently has a "Pay by Card" option that shows a "coming soon" message. When you're ready to add a real payment processor (Stripe, Razorpay, PayFast, etc.), wire it into the `handleCardCheckout` function in `src/pages/Checkout.jsx`.
5. **Brand copy** — footer, About, Contact, Shipping and Returns pages (`src/pages/InfoPages.jsx` and `Footer.jsx`) contain placeholder copy — update with your real policies and contact details.

## What's included

- **Pages**: Home, Women / Men / Kids collections, New Arrivals, Sale, Product Detail, Cart (drawer), Wishlist (drawer + page), Checkout, Search, About, Contact, Shipping, Returns.
- **Filtering**: by subcategory, age group (0–2, 3–7, 8–14, Adults) and price range, plus sort by newest/price.
- **Cart & Wishlist**: persisted to the browser's `localStorage`, so items survive a page refresh.
- **WhatsApp checkout**: a floating WhatsApp button site-wide, an "Order via WhatsApp" button on every product page, and a WhatsApp-first payment option at checkout that sends a formatted order summary as a pre-filled chat message.
- **Custom logo**: `FUTS` set in Bodoni Moda (a high-contrast fashion serif) paired with an italic `bydua` in Manrope — see `src/components/Logo.jsx`.
- **Design system**: colors, type scale, spacing and shape tokens all mirror the original Futsbydua design brief, configured in `tailwind.config.js`.
- **Motion**: Framer Motion powers the header/drawers, page transitions, hero reveal, and scroll-in reveals on the homepage, all respecting `prefers-reduced-motion`.

## Project structure

```
src/
  components/     Header, Footer, ProductCard, CartDrawer, WishlistDrawer, Filters, Logo, WhatsAppFloat...
  context/        CartContext, WishlistContext (localStorage-backed)
  data/           products.js — the full mock catalogue
  pages/          Home, CategoryPage, ProductDetail, Checkout, WishlistPage, SearchResults, InfoPages...
  config.js       WhatsApp number & shipping threshold
  App.jsx         Routing + providers
  index.css       Fonts, base styles, utility classes
```

## Tech stack

React 18 · Vite · React Router · Tailwind CSS · Framer Motion
