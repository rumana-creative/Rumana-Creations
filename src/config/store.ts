import { StoreSettings } from '@/types';

/**
 * Rumana Creations - Central Store Configuration
 * 
 * Update your WhatsApp number, Instagram handle, and store settings here.
 * Changes here take effect across the entire website.
 */
export const defaultStoreSettings: StoreSettings = {
  storeName: "Rumana Creations",
  tagline: "Everyday Beauty, Beautifully Accessorised",
  logoUrl: "/rumana-logo.png",
  // Format: digits only with country code, e.g. "919876543210" for India
  // Note: Can be customized by store administrator in the Admin Settings panel
  whatsappNumber: "919876543210",
  whatsappDisplay: "+91 98765 43210",
  instagramHandle: "rumana_creations",
  instagramUrl: "https://www.instagram.com/rumana_creations",
  email: "care@rumanacreations.com",
  currency: "INR",
  currencySymbol: "₹",
  freeShippingThreshold: 799,
  standardShippingFee: 60,
  announcementText: "✨ Handcrafted Elegance — Free Delivery Across India on Orders Above ₹799! ✨",
  isAnnouncementActive: true,
  codEnabled: true,
  onlinePaymentEnabled: false, // Set to true once Razorpay / Stripe credentials are configured
  whatsappCheckoutEnabled: true,
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
 * Message generator for Product Chat
 */
export function getProductWhatsAppMessage(productName: string, variantName?: string, price?: number, productUrl?: string): string {
  let msg = `Hello Rumana Creations! 🌸\n\nI am interested in buying: *${productName}*`;
  if (variantName) {
    msg += `\n- *Selected Shade/Variant:* ${variantName}`;
  }
  if (price !== undefined) {
    msg += `\n- *Price:* ${defaultStoreSettings.currencySymbol}${price}`;
  }
  if (productUrl) {
    msg += `\n- *Link:* ${productUrl}`;
  }
  msg += `\n\nIs this available in stock? Could you please share more details?`;
  return msg;
}

/**
 * Message generator for Cart Inquiry
 */
export function getCartWhatsAppMessage(items: Array<{ name: string; variantName?: string; quantity: number; price: number }>, total: number): string {
  let msg = `Hello Rumana Creations! 🌸\n\nI would like to place an order for the following items:\n`;
  items.forEach((item, idx) => {
    msg += `\n${idx + 1}. *${item.name}*`;
    if (item.variantName) {
      msg += ` (${item.variantName})`;
    }
    msg += ` × ${item.quantity} = ${defaultStoreSettings.currencySymbol}${item.price * item.quantity}`;
  });
  msg += `\n\n*Estimated Total:* ${defaultStoreSettings.currencySymbol}${total}`;
  msg += `\n\nPlease let me know how to proceed with payment and shipping address!`;
  return msg;
}

/**
 * Message generator for Order Follow-up / Confirmation
 */
export function getOrderWhatsAppMessage(orderId: string, customerName: string, total: number): string {
  return `Hello Rumana Creations! 🌸\n\nI have placed an order on your website:\n*Order ID:* ${orderId}\n*Name:* ${customerName}\n*Total:* ${defaultStoreSettings.currencySymbol}${total}\n\nCould you please confirm my order and share shipping updates? Thank you!`;
}
