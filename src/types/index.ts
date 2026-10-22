export interface ProductVariant {
  id: string;
  name: string; // e.g. "Tortoise Shell", "Champagne Gold", "Blush Pink", "Midnight Burgundy", "Pearl White"
  colorCode?: string; // hex color for swatch preview
  stock: number;
  sku: string;
}

export type ProductStatus = 'published' | 'draft' | 'archived';

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
  status: ProductStatus;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviewCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt?: string;
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
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  trackingCourier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  logoUrl: string;
  whatsappNumber: string; // "919152136209"
  whatsappDisplay: string; // "+91 91521 36209"
  instagramHandle: string; // "rumana.creations"
  instagramUrl: string; // "https://www.instagram.com/rumana.creations/"
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
  deliveryEstimateMetro: string; // e.g. "2 to 4 business days"
  deliveryEstimateStandard: string; // e.g. "4 to 7 business days"
  serviceablePinCodes?: string[]; // optional list, empty = all valid Indian PINs
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
