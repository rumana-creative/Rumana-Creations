'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  Tag, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getCartWhatsAppMessage, getWhatsAppUrl } from '@/config/store';

export default function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    total,
    itemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Lock body scroll and listen for Escape key when cart drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeCartDrawer();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError(null);
    const res = await applyCoupon(couponInput);
    setIsApplyingCoupon(false);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const whatsappMessage = getCartWhatsAppMessage(
    items.map((i) => ({
      name: i.name,
      variantName: i.variantName,
      quantity: i.quantity,
      price: i.price,
    })),
    total
  );

  return (
    <div 
      id="shopping-cart-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-ivory-50 border-l border-gold-border shadow-2xl flex flex-col h-full h-[100dvh]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gold-border bg-cream-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-burgundy" />
              <h2 className="font-serif text-xl font-bold text-burgundy">Your Shopping Bag</h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-burgundy/10 text-burgundy rounded-full">
                {itemCount}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCartDrawer}
              className="p-1.5 text-charcoal hover:text-burgundy rounded-lg hover:bg-cream-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-cream-50 border-b border-gold-border text-xs">
            {freeShippingRemaining > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-charcoal-light">
                  <span>Add <strong className="text-burgundy font-semibold">₹{freeShippingRemaining}</strong> more for <strong>FREE Delivery</strong></span>
                  <span className="font-semibold text-gold-dark">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong></span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center text-burgundy">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">Your bag is empty</h3>
                  <p className="text-xs text-charcoal-muted mt-1 max-w-xs">
                    Discover our handcrafted hair accessories, velvet crowns, and bestselling claw clips.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCartDrawer}
                  className="px-5 py-2.5 bg-burgundy text-white rounded-xl text-xs font-semibold hover:bg-burgundy-800 transition shadow-sm"
                >
                  <Link href="/shop">Start Shopping</Link>
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'std'}`}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-gold-border shadow-subtle relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-cream-50 shrink-0 border border-gold-border/60">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-charcoal truncate">
                        <Link href={`/product/${item.slug}`} onClick={closeCartDrawer}>
                          {item.name}
                        </Link>
                      </h4>
                      {item.variantName && (
                        <p className="text-[11px] text-charcoal-muted">
                          Shade: <span className="text-burgundy font-medium">{item.variantName}</span>
                        </p>
                      )}
                      <p className="text-xs font-bold text-burgundy mt-1">
                        {defaultStoreSettings.currencySymbol}{item.price}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gold-border rounded-lg bg-cream-50 overflow-hidden text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-charcoal hover:bg-cream-200 transition"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-charcoal">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-charcoal hover:bg-cream-200 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="text-charcoal-muted hover:text-rose-700 p-1 transition"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gold-border bg-cream-100 space-y-3.5 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedCoupon.code} applied (-₹{discount})</span>
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-rose-700 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon Code (e.g. RUMANA10)"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-gold-border rounded-lg uppercase placeholder:normal-case focus:outline-none focus:border-burgundy"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon || !couponInput.trim()}
                      className="px-3.5 py-2 bg-cream-200 hover:bg-cream-300 text-burgundy text-xs font-semibold rounded-lg border border-gold-border transition disabled:opacity-50"
                    >
                      {isApplyingCoupon ? '...' : 'Apply'}
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-700 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-light pt-1 border-t border-gold-border/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">
                    {defaultStoreSettings.currencySymbol}{subtotal}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-{defaultStoreSettings.currencySymbol}{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase">FREE</span>
                    ) : (
                      `${defaultStoreSettings.currencySymbol}${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-burgundy pt-2 border-t border-gold-border">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg">
                    {defaultStoreSettings.currencySymbol}{total}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full py-3 px-4 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* WhatsApp Direct Order Enquiry */}
                <a
                  href={getWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Enquire / Order via WhatsApp</span>
                </a>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={closeCartDrawer}
                  className="text-xs text-charcoal-muted hover:text-burgundy underline"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
