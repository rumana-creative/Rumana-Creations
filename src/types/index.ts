export interface ProductVariant {
  id: string;
  name: string; // e.g. "Tortoise Shell", "Champagne Gold", "Blush Pink", "Midnight Burgundy", "Pearl White"
  colorCode?: string; // hex color for swatch preview
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // slug e.g. "claw-clips"
  categoryName: string; // display name e.g. "Claw Clips"
  price: number;
  originalPrice?: number;
  description: string;
  details?: string[];
  materials?: string;
  careInstructions?: string;
  images: string[];
  variants: ProductVariant[];
  stock: number; // total stock across variants
  sku: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount?: number;
  displayOrder: number;
  isVisible: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  categoryName: string;
  image: string;
  price: number;
  originalPrice?: number;
  variantId?: string;
  variantName?: string;
  quantity: number;
  maxStock: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  whatsappNumber: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  deliveryInstructions?: string;
}

export type PaymentMethod = 'cod' | 'online' | 'whatsapp';
export type PaymentStatus = 'pending' | 'paid' | 'cod_pending' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface Order {
  id: string; // e.g. "RC-2026-8491"
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  logoUrl: string;
  whatsappNumber: string; // E.g. "919876543210" (digits only)
  whatsappDisplay: string; // E.g. "+91 98765 43210"
  instagramHandle: string; // E.g. "rumana_creations"
  instagramUrl: string; // E.g. "https://instagram.com/rumana_creations"
  email: string;
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  announcementText: string;
  isAnnouncementActive: boolean;
  codEnabled: boolean;
  onlinePaymentEnabled: boolean;
  whatsappCheckoutEnabled: boolean;
  addressCity: string;
  addressState: string;
  country: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  productName?: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  isActive: boolean;
}
