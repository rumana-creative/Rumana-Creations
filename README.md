# 🌸 Rumana Creations — Handcrafted Boutique E-Commerce Platform

A production-ready, human-designed Indian boutique e-commerce web application built for **Rumana Creations**, featuring fashionable hair accessories, French cellulose claw clips, 100% mulberry silk scrunchies, royal padded velvet headbands, kids' snag-free clips, bridal pearl pins, and an expanded collection of **necklaces, earrings, rings, bangles, bracelets, jewellery sets, fashion jewellery, and jewellery-making craft materials**.

---

## 💎 Brand Identity & Visual Palette

Designed in strict accordance with Rumana Creations' official branding guidelines:
- **Primary Background:** Warm Ivory (`#FFFDF8`)
- **Secondary Background:** Champagne Cream (`#F7F0E5`)
- **Primary Brand Colour:** Deep Royal Burgundy (`#70152C`)
- **Metallic Gold Accents:** Warm Antique Gold (`#C49A45` / `#D4AF37`)
- **Blush Accents:** Delicate Petal Pink (`#F3DDE1`)
- **Body Typography:** Warm Charcoal (`#393333`) on White cards
- **Editorial Headings:** Cormorant Garamond / Playfair Display
- **Official Brand Logo:** Exactly preserved from official source (`/public/rumana-logo.png`)
- **Official WhatsApp:** `+91 91521 36209` (`https://wa.me/919152136209`)
- **Official Instagram:** `https://www.instagram.com/rumana.creations/`
- **Product Categorization Note:** All jewellery lines are strictly designated as **Artificial, Costume, and Fashion Jewellery** or **Jewellery-Making Materials**, handcrafted with non-precious metal alloys, brass, synthetic kundan, faux glass pearls, and crystal embellishments.

---

## 🚀 Key Features Implemented

### 1. Storefront Experience
- **Announcement Bar:** Dynamic banner with free shipping threshold reminders (`₹799+`) and direct WhatsApp concierge support.
- **Brand Header:** Official logo, focused 5-button boutique desktop navigation (`Home`, `Product`, `Best Seller`, `About`, `Contact`), live search trigger with `⌘K` keyboard shortcut, wishlist counter badge, interactive shopping bag drawer, and mobile slide-over navigation.
- **Hero Section:** Editorial lifestyle composition with the headline *"Everyday Beauty, Beautifully Accessorised"*, direct action buttons, and trust metrics.
- **Featured Categories Grid:** Direct visual pathways across all 16 curated categories: Hair Accessories (Claw Clips, Patterned Hair Clips, Scrunchies, Headbands, Kids' Clips, Pearl Pins) and Fashion Jewellery (Necklaces, Earrings, Rings, Bangles, Bracelets, Jewellery Sets, Craft Materials).
- **New Arrivals & Best Sellers Showcases:** Interactive cards with hover angle transitions, discount badges, review ratings, wishlist toggling, and quick view.
- **Promotional Welcome Banner:** High-contrast royal burgundy and gold banner featuring welcome coupons (`WELCOME50`, `RUMANA10`).
- **"Find Your Everyday Style" Editorial Guide:** 3 curated lifestyle aesthetics (Minimalist Updo, Festive Velvet & Pearls, Playful Kids & Chic Jewellery).
- **Instagram-Inspired Visual Gallery:** `@rumana.creations` 6-post responsive boutique lookbook linking directly to the official profile (`https://www.instagram.com/rumana.creations/`).
- **WhatsApp Concierge Shopping Section:** Dedicated founder styling assistance card linking directly to `+91 91521 36209`.
- **Customer Reviews:** Verified buyer reviews with location and item references.
- **Newsletter Subscription:** Instant coupon code feedback.
- **Boutique Footer:** Full store navigation, customer care policies, contact details, and trust guarantees.

### 2. Comprehensive Shop & Category Filtering
- **Dynamic Catalogue (`/shop`):**
  - Instant Category switching across all 16 active categories.
  - Price Range filters (Under ₹300, ₹300–₹499, ₹500–₹799, ₹800+).
  - In-Stock only availability toggle.
  - Sorting: Featured, Newest, Price (Low to High), Price (High to Low), Popularity / Ratings.
  - Live search filter by keyword, material, or shade.
  - Active filter tags with "Clear all" control.
  - Empty search state with one-click reset.
  - Load-more pagination.
- **Dedicated Category URLs (16 Active Categories):**
  - Hair Accessories:
    - `/category/claw-clips`
    - `/category/patterned-hair-clips` (Safari leopard, cheetah, and marble snap barrettes)
    - `/category/scrunchies-hair-ties`
    - `/category/headbands`
    - `/category/kids-clips`
    - `/category/pearl-pins-beads`
  - Fashion Jewellery & Craft Supplies:
    - `/category/necklaces`
    - `/category/earrings`
    - `/category/rings`
    - `/category/bangles`
    - `/category/bracelets`
    - `/category/jewellery-sets`
    - `/category/fashion-jewellery`
    - `/category/jewellery-making-materials`
  - Curated Collections:
    - `/category/new-arrivals`
    - `/category/best-sellers`

### 3. Product Detail Page (`/product/[slug]`)
- Multi-image gallery with thumbnail switcher.
- Dynamic price, crossed-out original price, and savings badge in INR (₹).
- Interactive shade/colour variant selector with visual swatches.
- Clear disclosure of artificial / costume jewellery materials (brass, copper alloy, glass beads, synthetic pearls, zari cords).
- Real-time stock status badge with available unit limits.
- Quantity selector clamped to available inventory.
- **Add to Bag** (with animated notification toast) and **Buy Now** (instant redirect to checkout).
- **Share on WhatsApp** button with pre-filled product link.
- **Chat About This Accessory** button with pre-formatted WhatsApp message to `+91 91521 36209`.
- Specifications, Materials, Care Guide, and Shipping accordions.
- Breadcrumb navigation (`Home > Category > Product Name`).
- "You May Also Love" related products showcase.

### 4. Interactive Shopping Bag (`/cart` & Slide-over Drawer)
- Client-side persistence in `localStorage`.
- Real-time subtotal calculation in INR.
- **Free Delivery Progress Bar:** Shows exact amount remaining to unlock free delivery across India (threshold: ₹799).
- Dynamic coupon code validation (`WELCOME50`, `RUMANA10`, `FESTIVE15`).
- Out-of-stock validation.
- **WhatsApp Order Enquiry Button:** Generates a pre-filled, itemized order breakdown ready to send to Rumana Creations on WhatsApp.

### 5. Mobile-Optimized Checkout (`/checkout`)
- Collects customer name, mobile phone, WhatsApp number (with "Same as mobile" toggle), optional email, full shipping address, city, state, and 6-digit Indian PIN code.
- **India-Wide Postal PIN Validation:** Live verification against Indian postal zones (Metro 2–4 days, Rest of India 4–7 days).
- **Supported Payment Methods:**
  1. **Cash on Delivery (COD):** Fully functional for serviceable PIN codes, records order as `cod_pending`.
  2. **Razorpay Standard Checkout:** Server-side order creation in integer paise, client checkout modal, HMAC-SHA256 signature verification, and secure webhook handler (`/api/payments/razorpay/webhook`). Gracefully indicates "Awaiting Merchant Setup" when keys are pending, preventing fake transactions.
  3. **WhatsApp Concierge Checkout & UPI:** Records order and launches WhatsApp with order reference and UPI payment request to `+91 91521 36209`.
- Server-side inventory deduction and unique Order ID generation (`RC-2026-XXXX`).

### 6. Order Confirmation Page (`/order-confirmation?orderId=...`)
- Dedicated confirmation receipt with unique Order Reference ID.
- Purchased items breakdown, itemized subtotals, discounts, and delivery fees.
- Customer shipping address and payment status.
- One-click **Print Invoice Receipt** button.
- Direct **Contact Store on WhatsApp** button with pre-filled Order ID.

### 7. Administrative Dashboard (`/admin`)
- Secure dual-field authentication gate: Admin Email (`nawabrumana6@gmail.com`) and Password (`Rumana@nawab2026`).
- Interactive eye toggle button (`Eye` / `EyeOff`) to inspect or conceal entered password. Zero plain-text identity leaks on the login page.
- **Dashboard Overview:** Real metrics for Total Revenue, Total Orders, Active Catalog Count (38 products across 16 categories), and Low Stock Alerts.
- **Media Upload Manager (`/api/upload`):** Upload product images directly via the dashboard; supports local storage (`/public/uploads/`) and Supabase Storage bucket (`product-images`). Features image reordering and deletion.
- **Product Management:** Add new accessories or jewellery items, edit existing products, update prices, manage inventory quantities, toggle Featured/New Arrival/Bestseller flags, set Published/Draft/Archived status, and customize SEO Titles & Descriptions.
- **Category Management:** Create, edit, reorder display index, and toggle visibility on the storefront for all 16 categories.
- **Order Fulfillment & Logistics:** View incoming orders, filter by fulfillment status (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled) and payment status, assign logistics couriers (BlueDart, Delhivery, DTDC, India Post, Shadowfax) and tracking AWB numbers, and **Export Orders to CSV**.
- **Store Settings:** Live editor for WhatsApp phone number, Instagram handle, Announcement banner text, Free delivery threshold, and Shipping fees.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14.2.18 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom boutique design tokens
- **Icons:** Lucide React
- **Payments:** Razorpay SDK (`razorpay`) with server-side HMAC verification and webhooks
- **Cloud Storage:** Supabase SDK (`@supabase/supabase-js`) with automatic local fallback
- **Data Layer:** File-backed persistent database (`data/store-data.json`) with atomic write safety
- **Production SQL Migrations:**
  - `supabase/migrations/01_initial_schema.sql` (Tables, indexes, and initial hair accessories)
  - `supabase/migrations/02_update_admin_credentials.sql` (Hardened admin authentication)
  - `supabase/migrations/03_jewellery_categories_and_products.sql` (Jewellery categories, fashion items & craft supplies)
  - `supabase/migrations/04_poster_products_and_patterned_clips.sql` (Patterned hair clips & store poster catalogue)
- **SEO & Metadata:** OpenGraph tags, dynamic sitemap (`/sitemap.xml`), robots (`/robots.txt`), and JSON-LD Structured Data

---

## 📂 Project Structure

```
c:\Rumana Creations\
├── data\
│   └── store-data.json          # Persistent database (products, orders, categories, settings)
├── public\
│   ├── rumana-logo.png          # Official brand logo
│   ├── uploads\                 # Local media upload storage
│   └── images\
│       ├── categories\          # Boutique category artwork
│       ├── products\            # Product photography
│       └── instagram\           # Instagram lookbook visuals
├── scripts\
│   ├── generate-assets.js       # Vector artwork generator
│   ├── test-platform.js         # Automated end-to-end HTTP test suite
│   └── test-responsive-html.js  # Viewport & HTML integrity tester
├── src\
│   ├── app\
│   │   ├── api\
│   │   │   ├── admin\           # Admin auth & session check
│   │   │   ├── categories\      # Category CRUD
│   │   │   ├── coupons\         # Discount code verification
│   │   │   ├── orders\          # Order creation, details, fulfillment updates
│   │   │   ├── payments\razorpay\ # Razorpay order creation, verification, webhook, status
│   │   │   ├── products\        # Product catalog & admin CRUD
│   │   │   ├── settings\        # Storewide config
│   │   │   ├── shipping\        # Indian postal PIN code validator
│   │   │   └── upload\          # Secure multipart media uploader
│   │   ├── category\[slug]\     # Dynamic category pages
│   │   ├── product\[slug]\      # Dynamic product detail pages
│   │   ├── policies\            # Shipping, Returns, Terms, Privacy pages
│   │   ├── about\               # About the brand
│   │   ├── admin\               # Secure Admin Portal
│   │   ├── cart\                # Full shopping bag page
│   │   ├── checkout\            # Express checkout flow with PIN check & Razorpay
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
5. To access the Admin Dashboard, visit [http://localhost:3000/admin](http://localhost:3000/admin) (Requires confirmed Administrator ID and Password).

### Running the Production Build
```bash
npm.cmd run build
npm.cmd run start
```

### Running the Automated Test Suite
```bash
node scripts/test-platform.js
```

---

## 🔑 External Credentials & Configuration Checklist

| Integration | Current Working State | Next Steps for Store Owner |
|---|---|---|
| **Official Logo** | ✅ Fully integrated (`/rumana-logo.png`) | Ready for production. |
| **Official WhatsApp** | ✅ Centralized config (`+91 91521 36209`) | Pre-configured across PDP, Bag, Checkout, Order Confirmation, Footer, and Floating Concierge. |
| **Official Instagram** | ✅ Centralized config (`https://www.instagram.com/rumana.creations/`) | Integrated in header, footer, lookbook, and concierge links. |
| **Catalog & Products** | ✅ Live admin upload & inventory control | Upload actual inventory photos and set quantities via `/admin`. |
| **Admin Authentication** | ✅ Dual ID & Password (`nawabrumana6@gmail.com` / `Rumana@nawab2026`) | Eye toggle button implemented. All credential hints and default text completely hidden. |
| **Cash on Delivery (COD)** | ✅ Fully working with stock deduction & PIN validation | Ready out-of-the-box. |
| **WhatsApp-Assisted Checkout** | ✅ Generates order ID and launches WhatsApp concierge | Ready out-of-the-box. |
| **Razorpay Payment Gateway** | ⚡ Gateway architecture ready with HMAC verification | Add `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` to `.env.local` to activate card/UPI checkout. |
| **Media Uploads** | ✅ Local storage active (`/public/uploads/`) | Optional: Configure Supabase Storage (`product-images` bucket) for cloud image hosting on Vercel. |
| **Database** | ✅ Portable JSON database with atomic writes | Optional: Connect Supabase PostgreSQL using `supabase/migrations/01_initial_schema.sql`. |

---

## 🚢 Deployment to Vercel

1. Push the repository to GitHub:
   ```bash
   git add .
   git commit -m "Rumana Creations - Production Ready Release"
   git remote add origin https://github.com/your-username/rumana-creations.git
   git push -u origin main
   ```
2. Import the project into **Vercel** (`https://vercel.com`).
3. Set the following Environment Variables in Vercel Project Settings:
   - `ADMIN_PASSWORD` = `[your-strong-password]`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `919152136209`
   - `NEXT_PUBLIC_WHATSAPP_DISPLAY` = `+91 91521 36209`
   - `NEXT_PUBLIC_INSTAGRAM_HANDLE` = `rumana.creations`
   - `NEXT_PUBLIC_INSTAGRAM_URL` = `https://www.instagram.com/rumana.creations/`
   - `RAZORPAY_KEY_ID` = `[rzp_live_... or test key]`
   - `RAZORPAY_KEY_SECRET` = `[your-razorpay-secret]`
   - `RAZORPAY_WEBHOOK_SECRET` = `[your-webhook-secret]`
   - `NEXT_PUBLIC_SUPABASE_URL` = `[your-supabase-url]`
   - `SUPABASE_SERVICE_ROLE_KEY` = `[your-supabase-service-role-key]`
   - `SUPABASE_STORAGE_BUCKET` = `product-images`
4. Click **Deploy**. Vercel will build and launch Rumana Creations live across the world!
