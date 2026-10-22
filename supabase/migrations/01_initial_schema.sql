-- Rumana Creations: Production Database Schema for PostgreSQL / Supabase
-- Run this in your Supabase SQL Editor if connecting a remote database.

-- 1. Store Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  store_name TEXT NOT NULL DEFAULT 'Rumana Creations',
  tagline TEXT DEFAULT 'Everyday Beauty, Beautifully Accessorised',
  logo_url TEXT DEFAULT '/rumana-logo.png',
  whatsapp_number TEXT NOT NULL DEFAULT '919152136209',
  whatsapp_display TEXT DEFAULT '+91 91521 36209',
  instagram_handle TEXT DEFAULT 'rumana.creations',
  instagram_url TEXT DEFAULT 'https://www.instagram.com/rumana.creations/',
  email TEXT DEFAULT 'care@rumanacreations.com',
  currency TEXT DEFAULT 'INR',
  currency_symbol TEXT DEFAULT '₹',
  free_shipping_threshold NUMERIC(10, 2) DEFAULT 799.00,
  standard_shipping_fee NUMERIC(10, 2) DEFAULT 60.00,
  announcement_text TEXT DEFAULT '✨ Handcrafted Elegance — Free All-India Delivery on Orders Above ₹799! ✨',
  is_announcement_active BOOLEAN DEFAULT true,
  cod_enabled BOOLEAN DEFAULT true,
  online_payment_enabled BOOLEAN DEFAULT true,
  whatsapp_checkout_enabled BOOLEAN DEFAULT true,
  delivery_estimate_metro TEXT DEFAULT '2 to 4 business days',
  delivery_estimate_standard TEXT DEFAULT '4 to 7 business days',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category_slug TEXT REFERENCES categories(slug) ON UPDATE CASCADE,
  category_name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  description TEXT,
  details JSONB DEFAULT '[]'::jsonb,
  materials TEXT,
  care_instructions TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  stock INT DEFAULT 0,
  sku TEXT UNIQUE NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published', -- 'published', 'draft', 'archived'
  seo_title TEXT,
  seo_description TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Product Variants Table
CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color_code TEXT,
  stock INT DEFAULT 0,
  sku TEXT NOT NULL
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- e.g. 'RC-2026-8491'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  customer_email TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  delivery_instructions TEXT,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  coupon_code TEXT,
  shipping_fee NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL, -- 'cod', 'online', 'whatsapp'
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'cod_pending', 'failed', 'refunded'
  order_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  tracking_courier TEXT DEFAULT 'BlueDart',
  tracking_number TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  notes TEXT
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  variant_name TEXT,
  price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  image TEXT
);

-- 7. Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  code TEXT PRIMARY KEY,
  discount_type TEXT NOT NULL, -- 'percentage', 'fixed'
  discount_value NUMERIC(10, 2) NOT NULL,
  min_order_value NUMERIC(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_is_best ON products(is_best_seller);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
