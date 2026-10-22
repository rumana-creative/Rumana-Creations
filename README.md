# 🌸 Rumana Creations — Handcrafted Boutique E-Commerce Platform

A production-grade, human-designed Indian boutique e-commerce web application built for **Rumana Creations**, featuring fashionable hair accessories, French cellulose claw clips, 100% mulberry silk scrunchies, royal padded velvet headbands, kids' snag-free clips, and bridal pearl pins.

---

## 💎 Brand Identity & Visual Palette

Designed in accordance with Rumana Creations' official branding guidelines:
- **Primary Background:** Warm Ivory (`#FFFDF8`)
- **Secondary Background:** Champagne Cream (`#F7F0E5`)
- **Primary Brand Colour:** Deep Royal Burgundy (`#70152C`)
- **Metallic Gold Accents:** Warm Antique Gold (`#C49A45` / `#D4AF37`)
- **Blush Accents:** Delicate Petal Pink (`#F3DDE1`)
- **Body Typography:** Warm Charcoal (`#393333`) on White cards
- **Editorial Headings:** Cormorant Garamond / Playfair Display
- **Official Brand Logo:** Exactly preserved from official source (`/public/rumana-logo.png`)

---

## 🚀 Key Features Implemented

### 1. Storefront Experience
- **Announcement Bar:** Dynamic banner with free shipping threshold reminders and direct phone support.
- **Brand Header:** Official logo, desktop navigation, live search trigger with `⌘K` keyboard shortcut, wishlist counter badge, interactive shopping bag drawer, and mobile slide-over navigation.
- **Hero Section:** Editorial lifestyle composition with the headline *"Everyday Beauty, Beautifully Accessorised"*, direct action buttons, and trust metrics.
- **Featured Categories Grid:** Direct visual pathways to Claw Clips, Scrunchies & Ties, Headbands, Kids' Clips, Pearl Pins, New Arrivals, and Best Sellers.
- **New Arrivals & Best Sellers Showcases:** Interactive cards with hover angle transitions, discount badges, review ratings, wishlist toggling, and quick view.
- **Promotional Welcome Banner:** High-contrast royal burgundy and gold banner featuring welcome coupons (`WELCOME50`, `RUMANA10`).
- **"Find Your Everyday Style" Editorial Guide:** 3 curated lifestyle hair aesthetics (Minimalist Updo, Festive Velvet & Pearls, Playful Kids).
- **Instagram-Inspired Visual Gallery:** `@rumana_creations` 6-post responsive boutique lookbook with hover overlays and profile links.
- **WhatsApp Concierge Shopping Section:** Dedicated founder styling assistance card.
- **Customer Reviews:** Verified buyer reviews with location and item references.
- **Newsletter Subscription:** Instant coupon code feedback.
- **Boutique Footer:** Full store navigation, customer care policies, contact details, and trust guarantees.

### 2. Comprehensive Shop & Category Filtering
- **Dynamic Catalogue (`/shop`):**
  - Instant Category switching.
  - Price Range filters (Under ₹300, ₹300–₹499, ₹500–₹799, ₹800+).
  - In-Stock only availability toggle.
  - Sorting: Featured, Newest, Price (Low to High), Price (High to Low), Popularity / Ratings.
  - Live search filter by keyword, material, or shade.
  - Active filter tags with "Clear all" control.
  - Empty search state with one-click reset.
  - Load-more pagination.
- **Dedicated Category URLs:**
  - `/category/claw-clips`
  - `/category/scrunchies-hair-ties`
  - `/category/headbands`
  - `/category/kids-clips`
  - `/category/pearl-pins-beads`
  - `/category/new-arrivals`
  - `/category/best-sellers`

### 3. Product Detail Page (`/product/[slug]`)
- Multi-image gallery with thumbnail switcher.
- Dynamic price, crossed-out original price, and savings badge.
- Interactive shade/colour variant selector with visual swatches.
- Real-time stock status badge with available unit limits.
- Quantity selector clamped to available inventory.
- **Add to Bag** (with animated notification toast) and **Buy Now** (instant redirect to checkout).
- **Share on WhatsApp** button with pre-filled product link.
- **Chat About This Accessory** button with pre-formatted WhatsApp message.
- Specifications, Materials, Care Guide, and Shipping accordions.
- Breadcrumb navigation (`Home > Category > Product Name`).
- "You May Also Love" related products showcase.

### 4. Interactive Shopping Bag (`/cart` & Slide-over Drawer)
- Client-side persistence in `localStorage`.
- Real-time subtotal calculation.
- **Free Delivery Progress Bar:** Shows exact amount remaining to unlock free delivery across India.
- Dynamic coupon code validation (`WELCOME50`, `RUMANA10`, `FESTIVE15`).
- Out-of-stock validation.
- **WhatsApp Order Enquiry Button:** Generates a pre-filled, itemized order breakdown ready to send to Rumana Creations on WhatsApp.

### 5. Mobile-Optimized Checkout (`/checkout`)
- Collects customer name, mobile phone, WhatsApp number (with "Same as mobile" toggle), optional email, full shipping address, city, state, and 6-digit Indian PIN code.
- Supported Payment Methods:
  1. **Cash on Delivery (COD):** Fully functional, records order as `cod_pending`.
  2. **WhatsApp Concierge Checkout & UPI:** Records order and launches WhatsApp with order reference and UPI payment request.
  3. **Direct Online Gateway:** Structured and ready for Razorpay/Stripe API credentials.
- Server-side inventory deduction and unique Order ID generation (`RC-2026-XXXX`).

### 6. Order Confirmation Page (`/order-confirmation?orderId=...`)
- Dedicated confirmation receipt with unique Order Reference ID.
- Purchased items breakdown, itemized subtotals, discounts, and delivery fees.
- Customer shipping address and payment status.
- One-click **Print Invoice Receipt** button.
- Direct **Contact Store on WhatsApp** button with pre-filled Order ID.

### 7. Administrative Dashboard (`/admin`)
- Secure password authentication gate (`rumana2026`).
- **Dashboard Overview:** Real metrics for Total Revenue, Total Orders, Active Catalog Count, and Low Stock Alerts.
- **Product Management:** Add new accessories, edit existing products, update prices, manage inventory quantities, toggle Featured/New Arrival/Bestseller flags, and delete items.
- **Category Management:** Create, edit, reorder display index, and toggle visibility on the storefront.
- **Order Management:** View all incoming orders, filter by status (Pending, Confirmed, Shipped, Delivered, Cancelled) and payment status, update courier tracking numbers (e.g. BlueDart, Delhivery), and **Export Orders to CSV**.
- **Store Settings:** Live editor for WhatsApp phone number, Instagram handle, Announcement banner text, Free delivery threshold, and Shipping fees.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom boutique design tokens
- **Icons:** Lucide React
- **Data Layer:** File-backed persistent database (`data/store-data.json`) with atomic write safety and API route controllers.
- **Production SQL Migration:** `supabase/migrations/01_initial_schema.sql` (PostgreSQL / Supabase compatible).
- **SEO & Metadata:** OpenGraph tags, dynamic sitemap (`/sitemap.xml`), robots (`/robots.txt`), and JSON-LD Structured Data (`Store` and `Product` schemas).

---

## 📂 Project Structure

```
c:\Rumana Creations\
├── data\
│   └── store-data.json          # Persistent database (products, orders, categories, settings)
├── public\
│   ├── rumana-logo.png          # Official brand logo
│   └── images\
│       ├── categories\          # Boutique category artwork
│       ├── products\            # Handcrafted product photography & illustrations
│       └── instagram\           # Instagram lookbook visuals
├── scripts\
│   ├── generate-assets.js       # Vector artwork generator
│   ├── test-platform.js         # Automated end-to-end HTTP test suite
│   └── test-responsive-html.js  # Viewport & HTML integrity tester
├── src\
│   ├── app\
│   │   ├── api\                 # REST API endpoints (products, categories, orders, settings, coupons, admin)
│   │   ├── category\[slug]\     # Dynamic category pages
│   │   ├── product\[slug]\      # Dynamic product detail pages
│   │   ├── policies\            # Shipping, Returns, Terms, Privacy pages
│   │   ├── about\               # About the brand
│   │   ├── admin\               # Secure Admin Portal
│   │   ├── cart\                # Full shopping bag page
│   │   ├── checkout\            # Express checkout flow
│   │   ├── contact\             # Contact & customer concierge
│   │   ├── order-confirmation\  # Order confirmation receipt
│   │   ├── shop\                # Complete catalogue with filters
│   │   ├── wishlist\            # Saved favorites
│   │   ├── globals.css          # Styling & typography
│   │   ├── layout.tsx           # Root layout with CartProvider & SEO
│   │   ├── page.tsx             # Homepage
│   │   ├── robots.ts            # Robots.txt generator
│   │   └── sitemap.ts           # Dynamic XML Sitemap generator
│   ├── components\              # Reusable boutique UI components
│   ├── config\
│   │   └── store.ts             # Central store settings & WhatsApp message helpers
│   ├── context\
│   │   └── CartContext.tsx      # Cart, Wishlist, Coupon, and Toast state
│   └── types\
│       └── index.ts             # TypeScript definitions
├── supabase\
│   └── migrations\
│       └── 01_initial_schema.sql # Production PostgreSQL migration
├── .env.example
├── .env.local
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💻 Local Development Instructions

### Prerequisites
- Node.js v18+ or v20+ (Tested with v24.13.0)
- npm v9+

### Setup Steps
1. Navigate to the project root:
   ```bash
   cd "c:\Rumana Creations"
   ```
2. Install dependencies:
   ```bash
   npm.cmd install
   ```
3. Start the development server:
   ```bash
   npm.cmd run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. To access the Admin Dashboard, visit [http://localhost:3000/admin](http://localhost:3000/admin) (Default password: `rumana2026`).

### Running the Production Build
```bash
npm.cmd run build
npm.cmd run start
```

### Running the Automated Test Suite
```bash
node scripts/test-platform.js
```
All 36 core test assertions will run and report status in your terminal.

---

## 🔑 External Credentials & Configuration Checklist

| Integration | Current Working State | Next Steps for Store Owner |
|---|---|---|
| **Official Logo** | ✅ Fully integrated (`/rumana-logo.png`) | Ready for production. |
| **Catalog & Products** | ✅ 12 seed products with variants, prices, inventory | Update or add actual inventory photos via Admin Dashboard. |
| **WhatsApp Business** | ✅ Centralized config in `src/config/store.ts` | Update phone number in Admin Settings or `.env.local` to official business number. |
| **Instagram Integration** | ✅ Grid lookbook and profile links | Confirm final Instagram handle (`rumana_creations`). |
| **Admin Authentication** | ✅ Secure session cookie (`rumana2026`) | Change `ADMIN_PASSWORD` in `.env.local` before public launch. |
| **Cash on Delivery (COD)** | ✅ Fully working with stock deduction | Ready out-of-the-box. |
| **WhatsApp-Assisted Checkout** | ✅ Generates order ID and launches WhatsApp | Ready out-of-the-box. |
| **Online Payment Gateway** | ⏳ Setup-ready architecture | Provide Razorpay Key ID and Key Secret to activate automated UPI/Card capture. |
| **Database** | ✅ Portable JSON database with atomic writes | Optional: Connect Supabase PostgreSQL using `supabase/migrations/01_initial_schema.sql`. |

---

## 🚢 Deployment Instructions (Vercel / Cloud)

1. Push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial production release of Rumana Creations"
   git remote add origin https://github.com/your-username/rumana-creations.git
   git push -u origin main
   ```
2. Import the project into **Vercel** (or any Node.js hosting platform).
3. Set Environment Variables in Vercel Project Settings:
   - `ADMIN_PASSWORD` = `[your-strong-password]`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `[your-whatsapp-number]`
   - `NEXT_PUBLIC_WHATSAPP_DISPLAY` = `[your-display-format]`
   - `NEXT_PUBLIC_INSTAGRAM_HANDLE` = `rumana_creations`
4. Click **Deploy**. Vercel will automatically run `npm run build` and launch the boutique platform on your custom domain!
