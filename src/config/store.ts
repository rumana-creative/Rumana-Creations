import { StoreSettings } from '@/types';

/**
 * Rumana Creations - Central Store Configuration
 * 
 * Confirmed Official Details:
 * WhatsApp: +91 91521 36209 (https://wa.me/919152136209)
 * Instagram: https://www.instagram.com/rumana.creations/
 * Currency: INR (₹)
 * Market: India-wide
 */
export const defaultStoreSettings: StoreSettings = {
  storeName: "Rumana Creations",
  tagline: "Everyday Beauty, Beautifully Accessorised",
  logoUrl: "/rumana-logo.png",
  // Official confirmed WhatsApp business line
  whatsappNumber: "919152136209",
  whatsappDisplay: "+91 91521 36209",
  // Official confirmed Instagram profile
  instagramHandle: "rumana.creations",
  instagramUrl: "https://www.instagram.com/rumana.creations/",
  email: "care@rumanacreations.com",
  currency: "INR",
  currencySymbol: "₹",
  freeShippingThreshold: 799,
  standardShippingFee: 60,
  announcementText: "✨ Handcrafted Elegance — Free All-India Delivery on Orders Above ₹799! ✨",
  isAnnouncementActive: true,
  codEnabled: true,
  onlinePaymentEnabled: true, // Razorpay checkout ready
  whatsappCheckoutEnabled: true,
  deliveryEstimateMetro: "2 to 4 business days",
  deliveryEstimateStandard: "4 to 7 business days",
  addressCity: "Bengaluru",
  addressState: "Karnataka",
  country: "India",
};

/**
 * Generate official, verified WhatsApp wa.me links with clean URL encoding.
 */
export function getWhatsAppUrl(message?: string, customPhone?: string): string {
  const phone = (customPhone || defaultStoreSettings.whatsappNumber).replace(/[^0-9]/g, '');
  if (!message) {
    return `https://wa.me/${phone}`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Message generator for Product Inquiry
 */
export function getProductWhatsAppMessage(
  productName: string, 
  variantName?: string, 
  price?: number, 
  productUrl?: string
): string {
  let msg = `Hello Rumana Creations! 🌸\n\nI am interested in: *${productName}*`;
  if (variantName) {
    msg += `\n- *Selected Shade/Variant:* ${variantName}`;
  }
  if (price !== undefined) {
    msg += `\n- *Price:* ${defaultStoreSettings.currencySymbol}${price}`;
  }
  if (productUrl) {
    msg += `\n- *Link:* ${productUrl}`;
  }
  msg += `\n\nIs this available to dispatch? Please let me know how to proceed!`;
  return msg;
}

/**
 * Message generator for Cart Inquiry
 */
export function getCartWhatsAppMessage(
  items: Array<{ name: string; variantName?: string; quantity: number; price: number }>, 
  total: number
): string {
  let msg = `Hello Rumana Creations! 🌸\n\nI would like to inquire about ordering the following items from my bag:\n`;
  items.forEach((item, idx) => {
    msg += `\n${idx + 1}. *${item.name}*`;
    if (item.variantName) {
      msg += ` (${item.variantName})`;
    }
    msg += ` × ${item.quantity} = ${defaultStoreSettings.currencySymbol}${item.price * item.quantity}`;
  });
  msg += `\n\n*Estimated Total:* ${defaultStoreSettings.currencySymbol}${total}`;
  msg += `\n\nPlease let me know availability and delivery to my PIN code!`;
  return msg;
}

/**
 * Message generator for Order Follow-up / Confirmation
 */
export function getOrderWhatsAppMessage(orderId: string, customerName: string, total: number): string {
  return `Hello Rumana Creations! 🌸\n\nI have placed an order on your website:\n*Order ID:* ${orderId}\n*Name:* ${customerName}\n*Total:* ${defaultStoreSettings.currencySymbol}${total}\n\nCould you please confirm my order and share shipping updates? Thank you!`;
}
