'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant, Coupon } from '@/types';
import { defaultStoreSettings } from '@/config/store';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => boolean;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  total: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toastMessage: string | null;
  clearToast: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rumana_creations_cart_v1';
const WISHLIST_STORAGE_KEY = 'rumana_creations_wishlist_v1';
const COUPON_STORAGE_KEY = 'rumana_creations_coupon_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Failed to parse cart storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [items, isLoaded]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to storage:', e);
    }
  }, [wishlist, isLoaded]);

  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Recalculate coupon discount whenever subtotal or coupon changes
  useEffect(() => {
    if (!appliedCoupon) {
      setDiscount(0);
      return;
    }
    if (appliedCoupon.minOrderValue && subtotal < appliedCoupon.minOrderValue) {
      setDiscount(0);
      return;
    }
    if (appliedCoupon.discountType === 'percentage') {
      const disc = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      setDiscount(disc);
    } else {
      setDiscount(Math.min(appliedCoupon.discountValue, subtotal));
    }
  }, [subtotal, appliedCoupon]);

  const freeShippingThreshold = defaultStoreSettings.freeShippingThreshold;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : defaultStoreSettings.standardShippingFee;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const total = Math.max(0, subtotal - discount + shippingFee);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const clearToast = () => setToastMessage(null);

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1): boolean => {
    const variantId = variant?.id;
    const variantName = variant?.name;
    const maxStock = variant ? variant.stock : product.stock;

    if (maxStock <= 0) {
      showToast(`Sorry, ${product.name} is currently out of stock.`);
      return false;
    }

    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === product.id && i.variantId === variantId
      );

      if (existingIdx >= 0) {
        const existing = prev[existingIdx];
        const newQty = existing.quantity + quantity;
        if (newQty > maxStock) {
          showToast(`Only ${maxStock} items available in stock.`);
          return prev;
        }
        const updated = [...prev];
        updated[existingIdx] = { ...existing, quantity: newQty };
        return updated;
      } else {
        if (quantity > maxStock) {
          showToast(`Only ${maxStock} items available in stock.`);
          return prev;
        }
        const newItem: CartItem = {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          categoryName: product.categoryName,
          image: product.images[0] || '/images/products/tortoise-claw-1.svg',
          price: product.price,
          originalPrice: product.originalPrice,
          variantId,
          variantName,
          quantity,
          maxStock,
        };
        return [...prev, newItem];
      }
    });

    const displayVariant = variantName ? ` (${variantName})` : '';
    showToast(`Added ${quantity}× ${product.name}${displayVariant} to your cart.`);
    return true;
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && i.variantId === variantId) {
          const clampedQty = Math.min(quantity, i.maxStock);
          if (quantity > i.maxStock) {
            showToast(`Limited to available stock of ${i.maxStock}.`);
          }
          return { ...i, quantity: clampedQty };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscount(0);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(COUPON_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.isValid && data.coupon) {
        setAppliedCoupon(data.coupon);
        setDiscount(data.discount);
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(data.coupon));
        showToast(`Coupon ${code.toUpperCase()} applied! You saved ₹${data.discount}.`);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Invalid coupon code.' };
      }
    } catch (err) {
      // Fallback local check
      const upper = code.trim().toUpperCase();
      if (upper === 'WELCOME50' && subtotal >= 399) {
        const c: Coupon = { code: 'WELCOME50', discountType: 'fixed', discountValue: 50, minOrderValue: 399, isActive: true };
        setAppliedCoupon(c);
        setDiscount(50);
        return { success: true, message: 'WELCOME50 applied successfully! Saved ₹50.' };
      } else if (upper === 'RUMANA10') {
        const disc = Math.round(subtotal * 0.1);
        const c: Coupon = { code: 'RUMANA10', discountType: 'percentage', discountValue: 10, isActive: true };
        setAppliedCoupon(c);
        setDiscount(disc);
        return { success: true, message: `RUMANA10 applied! Saved ₹${disc}.` };
      }
      return { success: false, message: 'Invalid or inapplicable coupon code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    localStorage.removeItem(COUPON_STORAGE_KEY);
    showToast('Coupon removed.');
  };

  // Wishlist functions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from your Wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added item to your Wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        freeShippingRemaining,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        toastMessage,
        clearToast,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
