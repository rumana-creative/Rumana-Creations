import fs from 'fs';
import path from 'path';
import { Product, Category, Order, StoreSettings, Coupon, Review, ProductStatus } from '@/types';
import { defaultStoreSettings } from '@/config/store';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store-data.json');

interface DatabaseSchema {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
}

let cachedDb: DatabaseSchema | null = null;

function ensureDataFile(): DatabaseSchema {
  if (cachedDb) return cachedDb;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      cachedDb = JSON.parse(content) as DatabaseSchema;
      // Ensure products have status
      cachedDb.products = cachedDb.products.map((p) => ({
        ...p,
        status: p.status || 'published',
      }));
      // Ensure confirmed official settings
      cachedDb.settings = {
        ...defaultStoreSettings,
        ...cachedDb.settings,
        whatsappNumber: cachedDb.settings.whatsappNumber || defaultStoreSettings.whatsappNumber,
        whatsappDisplay: cachedDb.settings.whatsappDisplay || defaultStoreSettings.whatsappDisplay,
        instagramHandle: cachedDb.settings.instagramHandle || defaultStoreSettings.instagramHandle,
        instagramUrl: cachedDb.settings.instagramUrl || defaultStoreSettings.instagramUrl,
      };
      return cachedDb;
    }
  } catch (err) {
    console.error('Error reading store data file, initializing defaults:', err);
  }

  // Fallback if data file missing
  cachedDb = {
    settings: defaultStoreSettings,
    categories: [],
    products: [],
    orders: [],
    coupons: [],
    reviews: [],
  };

  saveDataFile(cachedDb);
  return cachedDb;
}

function saveDataFile(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    cachedDb = data;
  } catch (err) {
    console.error('Error writing store data file:', err);
  }
}

// ====================== PRODUCTS API ======================
export function getAllProducts(includeDrafts: boolean = false): Product[] {
  const db = ensureDataFile();
  if (includeDrafts) {
    return db.products;
  }
  return db.products.filter((p) => p.status === 'published' || !p.status);
}

export function getProductBySlug(slug: string, includeDrafts: boolean = false): Product | undefined {
  const db = ensureDataFile();
  const prod = db.products.find((p) => p.slug === slug);
  if (!prod) return undefined;
  if (!includeDrafts && prod.status !== 'published' && prod.status) return undefined;
  return prod;
}

export function getProductById(id: string): Product | undefined {
  const db = ensureDataFile();
  return db.products.find((p) => p.id === id);
}

export function saveProduct(product: Partial<Product> & { name: string; price: number; category: string }): Product {
  const db = ensureDataFile();
  const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const existingIdx = db.products.findIndex((p) => p.id === product.id);

  // find category name
  const cat = db.categories.find((c) => c.slug === product.category);
  const categoryName = cat ? cat.name : product.category;

  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    const updated: Product = {
      ...db.products[existingIdx],
      ...product,
      slug,
      categoryName,
      status: product.status || db.products[existingIdx].status || 'published',
      updatedAt: now,
    };
    db.products[existingIdx] = updated;
    saveDataFile(db);
    return updated;
  } else {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug,
      name: product.name,
      category: product.category,
      categoryName,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description || '',
      details: product.details || [],
      materials: product.materials || '',
      careInstructions: product.careInstructions || '',
      images: product.images && product.images.length > 0 ? product.images : ['/images/products/tortoise-claw-1.svg'],
      variants: product.variants || [
        { id: `v-${Date.now()}-1`, name: 'Standard', stock: product.stock || 10, sku: `RC-${Date.now().toString().slice(-4)}` }
      ],
      stock: product.stock !== undefined ? product.stock : 10,
      sku: product.sku || `RC-${Date.now().toString().slice(-4)}`,
      status: product.status || 'published',
      isFeatured: !!product.isFeatured,
      isNewArrival: !!product.isNewArrival,
      isBestSeller: !!product.isBestSeller,
      rating: product.rating || 5.0,
      reviewCount: product.reviewCount || 1,
      seoTitle: product.seoTitle || `${product.name} | Rumana Creations`,
      seoDescription: product.seoDescription || product.description?.slice(0, 160) || '',
      createdAt: now,
      updatedAt: now,
    };
    db.products.unshift(newProduct);
    saveDataFile(db);
    return newProduct;
  }
}

export function deleteProduct(id: string): boolean {
  const db = ensureDataFile();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initialLength) {
    saveDataFile(db);
    return true;
  }
  return false;
}

// ====================== CATEGORIES API ======================
export function getAllCategories(): Category[] {
  const db = ensureDataFile();
  return db.categories.filter((c) => c.isVisible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getAllCategoriesAdmin(): Category[] {
  const db = ensureDataFile();
  return db.categories.sort((a, b) => a.displayOrder - b.displayOrder);
}

export function saveCategory(category: Partial<Category> & { name: string }): Category {
  const db = ensureDataFile();
  const slug = category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const existingIdx = db.categories.findIndex((c) => c.id === category.id || c.slug === slug);

  if (existingIdx >= 0) {
    const updated: Category = {
      ...db.categories[existingIdx],
      ...category,
      slug,
    };
    db.categories[existingIdx] = updated;
    saveDataFile(db);
    return updated;
  } else {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      slug,
      name: category.name,
      description: category.description || '',
      image: category.image || '/images/categories/claw-clips.svg',
      displayOrder: category.displayOrder || db.categories.length + 1,
      isVisible: category.isVisible !== undefined ? category.isVisible : true,
    };
    db.categories.push(newCat);
    saveDataFile(db);
    return newCat;
  }
}

export function deleteCategory(id: string): boolean {
  const db = ensureDataFile();
  const initialLength = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);
  if (db.categories.length !== initialLength) {
    saveDataFile(db);
    return true;
  }
  return false;
}

// ====================== ORDERS API ======================
export function getAllOrders(): Order[] {
  const db = ensureDataFile();
  return db.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | undefined {
  const db = ensureDataFile();
  return db.orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
}

export function getOrderByRazorpayOrderId(razorpayOrderId: string): Order | undefined {
  const db = ensureDataFile();
  return db.orders.find((o) => o.razorpayOrderId === razorpayOrderId);
}

export function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
  const db = ensureDataFile();
  const orderId = `RC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // Deduct inventory
  for (const item of orderData.items) {
    const prod = db.products.find((p) => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      if (item.variantName && prod.variants) {
        const variant = prod.variants.find((v) => v.name === item.variantName);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
      }
    }
  }

  const newOrder: Order = {
    ...orderData,
    id: orderId,
    createdAt: new Date().toISOString(),
  };

  db.orders.unshift(newOrder);
  saveDataFile(db);
  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  updates: {
    orderStatus?: Order['orderStatus'];
    paymentStatus?: Order['paymentStatus'];
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    trackingCourier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    notes?: string;
  }
): Order | null {
  const db = ensureDataFile();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) return null;

  if (updates.orderStatus) order.orderStatus = updates.orderStatus;
  if (updates.paymentStatus) order.paymentStatus = updates.paymentStatus;
  if (updates.razorpayOrderId !== undefined) order.razorpayOrderId = updates.razorpayOrderId;
  if (updates.razorpayPaymentId !== undefined) order.razorpayPaymentId = updates.razorpayPaymentId;
  if (updates.trackingCourier !== undefined) order.trackingCourier = updates.trackingCourier;
  if (updates.trackingNumber !== undefined) order.trackingNumber = updates.trackingNumber;
  if (updates.trackingUrl !== undefined) order.trackingUrl = updates.trackingUrl;
  if (updates.notes !== undefined) order.notes = updates.notes;

  saveDataFile(db);
  return order;
}

// ====================== SETTINGS API ======================
export function getStoreSettings(): StoreSettings {
  const db = ensureDataFile();
  return { ...defaultStoreSettings, ...db.settings };
}

export function updateStoreSettings(settings: Partial<StoreSettings>): StoreSettings {
  const db = ensureDataFile();
  db.settings = {
    ...db.settings,
    ...settings,
  };
  saveDataFile(db);
  return db.settings;
}

// ====================== COUPONS API ======================
export function validateCoupon(code: string, cartSubtotal: number): { isValid: boolean; discount: number; message: string; coupon?: Coupon } {
  const db = ensureDataFile();
  const cleanCode = code.trim().toUpperCase();
  const coupon = db.coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

  if (!coupon) {
    return { isValid: false, discount: 0, message: 'Invalid or expired coupon code' };
  }

  if (coupon.minOrderValue && cartSubtotal < coupon.minOrderValue) {
    return {
      isValid: false,
      discount: 0,
      message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}`,
    };
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = Math.round((cartSubtotal * coupon.discountValue) / 100);
  } else {
    discount = Math.min(coupon.discountValue, cartSubtotal);
  }

  return {
    isValid: true,
    discount,
    message: `Coupon ${coupon.code} applied successfully!`,
    coupon,
  };
}

// ====================== REVIEWS API ======================
export function getAllReviews(): Review[] {
  const db = ensureDataFile();
  return db.reviews;
}
