'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getCartWhatsAppMessage, getWhatsAppUrl } from '@/config/store';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
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
    <div className="py-10 bg-ivory-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-burgundy font-semibold">Shopping Bag</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1">
            Review your handcrafted accessories, apply coupons, and proceed to checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gold-border p-12 text-center max-w-xl mx-auto shadow-subtle space-y-4">
            <div className="w-20 h-20 rounded-full bg-cream-200 text-burgundy flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10 opacity-60" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-burgundy">
              Your bag is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light">
              Add your favorite claw clips, silk scrunchies, and headbands to get started.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-8 py-3 bg-burgundy hover:bg-burgundy-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Delivery Bar */}
              <div className="bg-white rounded-2xl border border-gold-border p-4 shadow-subtle">
                {freeShippingRemaining > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-charcoal-light">
                      <span>Add <strong className="text-burgundy">₹{freeShippingRemaining}</strong> more to unlock <strong>FREE All-India Delivery</strong></span>
                      <span className="font-bold text-gold-dark">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold transition-all duration-300 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>🎉 Congratulations! Your order qualifies for <strong>FREE Insured Delivery</strong>.</span>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="bg-white rounded-3xl border border-gold-border overflow-hidden shadow-subtle">
                <div className="p-4 sm:p-6 divide-y divide-cream-200">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId || 'std'}`}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Image & Title */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-50 shrink-0 border border-gold-border">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark block">
                            {item.categoryName}
                          </span>
                          <h3 className="font-serif text-base font-bold text-charcoal hover:text-burgundy transition truncate">
                            <Link href={`/product/${item.slug}`}>{item.name}</Link>
                          </h3>
                          {item.variantName && (
                            <p className="text-xs text-charcoal-muted">
                              Shade: <span className="text-burgundy font-medium">{item.variantName}</span>
                            </p>
                          )}
                          <p className="text-sm font-bold text-burgundy sm:hidden mt-1">
                            {defaultStoreSettings.currencySymbol}{item.price}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="hidden sm:block text-right">
                          <p className="text-sm font-bold text-burgundy">
                            {defaultStoreSettings.currencySymbol}{item.price * item.quantity}
                          </p>
                          <p className="text-[11px] text-charcoal-muted">
                            ₹{item.price} each
                          </p>
                        </div>

                        {/* Counter */}
                        <div className="flex items-center border border-gold-border rounded-xl bg-cream-50 overflow-hidden text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            className="px-3 py-1 text-charcoal hover:bg-cream-200 transition font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-bold text-charcoal">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="px-3 py-1 text-charcoal hover:bg-cream-200 transition font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          className="text-charcoal-muted hover:text-rose-700 p-2 transition rounded-lg hover:bg-rose-50"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="p-4 bg-cream-50 border-t border-gold-border flex justify-between items-center text-xs">
                  <Link href="/shop" className="text-burgundy font-semibold hover:underline flex items-center gap-1">
                    <span>← Continue Shopping</span>
                  </Link>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-charcoal-muted hover:text-rose-700 underline"
                  >
                    Clear entire bag
                  </button>
                </div>
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Summary Card */}
              <div className="bg-white rounded-3xl border border-gold-border p-6 shadow-subtle space-y-4">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  Order Summary
                </h3>

                {/* Coupon Code Input */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                      <span className="flex items-center gap-2 font-medium">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied (-₹{discount})</span>
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-rose-700 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Coupon Code"
                          className="flex-1 px-3 py-2 text-xs bg-cream-50 border border-gold-border rounded-xl uppercase focus:outline-none focus:border-burgundy"
                        />
                        <button
                          type="submit"
                          disabled={isApplyingCoupon || !couponInput.trim()}
                          className="px-4 py-2 bg-cream-200 hover:bg-cream-300 text-burgundy font-semibold text-xs rounded-xl border border-gold-border transition disabled:opacity-50"
                        >
                          {isApplyingCoupon ? '...' : 'Apply'}
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{couponError}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-charcoal-muted">
                        Try: <code className="bg-cream-100 px-1 py-0.5 rounded font-mono text-burgundy">WELCOME50</code> or <code className="bg-cream-100 px-1 py-0.5 rounded font-mono text-burgundy">RUMANA10</code>
                      </p>
                    </form>
                  )}
                </div>

                {/* Subtotal & Totals */}
                <div className="space-y-2 text-xs text-charcoal-light pt-2 border-t border-gold-border">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-charcoal">
                      {defaultStoreSettings.currencySymbol}{subtotal}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount Voucher</span>
                      <span>-{defaultStoreSettings.currencySymbol}{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase">FREE</span>
                      ) : (
                        `${defaultStoreSettings.currencySymbol}${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-burgundy pt-3 border-t border-gold-border">
                    <span>Estimated Total</span>
                    <span className="font-serif text-xl">
                      {defaultStoreSettings.currencySymbol}{total}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-4 bg-burgundy hover:bg-burgundy-800 text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-boutique-hover transition active:scale-98"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={getWhatsAppUrl(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Inquire / Order via WhatsApp</span>
                  </a>
                </div>

              </div>

              {/* Safe Checkout Badges */}
              <div className="bg-cream-100 rounded-2xl border border-gold-border p-4 text-xs text-charcoal-muted space-y-2">
                <div className="flex items-center gap-2 text-burgundy font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Genuine Handcrafted Pieces</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Cash on Delivery and instant UPI payment available at checkout. Your orders are packaged with care in our signature gift pouches.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
