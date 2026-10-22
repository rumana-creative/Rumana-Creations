'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  Phone, 
  CreditCard, 
  Banknote, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getOrderWhatsAppMessage, getWhatsAppUrl } from '@/config/store';
import { CustomerDetails, PaymentMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, discount, appliedCoupon, total, clearCart } = useCart();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Karnataka',
    pinCode: '',
    deliveryInstructions: '',
  });

  const [sameAsMobile, setSameAsMobile] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi NCR', 'Chandigarh', 'Jammu and Kashmir'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'phone' && sameAsMobile ? { whatsappNumber: value } : {}),
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAsMobile(e.target.checked);
    if (e.target.checked) {
      setFormData((prev) => ({ ...prev, whatsappNumber: prev.phone }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Your shopping bag is empty.');
      return;
    }

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.addressLine1.trim() || !formData.city.trim() || !formData.pinCode.trim()) {
      setErrorMsg('Please fill in all mandatory delivery fields.');
      return;
    }

    // Phone format check (at least 10 digits)
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Pin code format check (6 digits)
    const cleanPin = formData.pinCode.replace(/[^0-9]/g, '');
    if (cleanPin.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          ...formData,
          whatsappNumber: sameAsMobile ? formData.phone : (formData.whatsappNumber || formData.phone),
        },
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          variantName: i.variantName,
          price: i.price,
          quantity: i.quantity,
          subtotal: i.price * i.quantity,
          image: i.image,
        })),
        paymentMethod,
        couponCode: appliedCoupon?.code,
        notes: formData.deliveryInstructions,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order.');
      }

      const confirmedOrderId = data.orderId;
      clearCart();

      // If user chose WhatsApp Assisted Checkout, open WhatsApp with prefilled message
      if (paymentMethod === 'whatsapp') {
        const waMsg = getOrderWhatsAppMessage(confirmedOrderId, formData.fullName, total);
        window.open(getWhatsAppUrl(waMsg), '_blank');
      }

      // Redirect to Confirmation Page
      router.push(`/order-confirmation?orderId=${confirmedOrderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'An error occurred while recording your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-ivory-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center bg-white p-10 rounded-3xl border border-gold-border shadow-subtle space-y-4">
          <h2 className="font-serif text-2xl font-bold text-burgundy">Your Bag Is Empty</h2>
          <p className="text-xs text-charcoal-light">You have no items in your cart to checkout.</p>
          <Link
            href="/shop"
            className="inline-flex px-6 py-2.5 bg-burgundy text-white rounded-full text-xs font-semibold"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-ivory-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/cart" className="hover:text-burgundy">Bag</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-burgundy font-semibold">Secure Checkout</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Express Checkout
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1">
            Complete your delivery details and choose your preferred payment option.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer & Delivery Info */}
            <div className="bg-white rounded-3xl border border-gold-border p-6 sm:p-8 shadow-subtle space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gold-border">
                <h2 className="font-serif text-xl font-bold text-burgundy flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-burgundy text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                  <span>Delivery Address</span>
                </h2>
                <span className="text-xs text-charcoal-muted">* Mandatory</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Ayesha Sharma"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 98450 12345"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                  <p className="text-[10px] text-charcoal-muted mt-1">For delivery OTP and status updates</p>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. ayesha@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                  <p className="text-[10px] text-charcoal-muted mt-1">To receive electronic invoice receipt</p>
                </div>

                {/* WhatsApp Checkbox & input */}
                <div className="sm:col-span-2 space-y-2 pt-1">
                  <label className="flex items-center gap-2 text-xs text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsMobile}
                      onChange={handleCheckboxChange}
                      className="rounded text-burgundy focus:ring-burgundy"
                    />
                    <span>WhatsApp number is the same as my mobile number</span>
                  </label>
                  {!sameAsMobile && (
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="WhatsApp Phone Number"
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy mt-2"
                    />
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Flat, House No., Building, Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="e.g. Flat 302, Lavender Orchards"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Street, Area, Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="e.g. Near Indiranagar Metro Station"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    6-Digit PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 560038"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                {/* Special Delivery Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="e.g. Leave with building security"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

              </div>
            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="bg-white rounded-3xl border border-gold-border p-6 sm:p-8 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold-border">
                <h2 className="font-serif text-xl font-bold text-burgundy flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-burgundy text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                  <span>Payment Method</span>
                </h2>
                <span className="text-xs text-charcoal-muted">Choose your preference</span>
              </div>

              <div className="space-y-3">
                
                {/* 1. Cash on Delivery (COD) */}
                <label className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'cod'
                    ? 'border-burgundy bg-cream-100/70 shadow-xs'
                    : 'border-gold-border bg-white hover:bg-cream-50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-burgundy focus:ring-burgundy"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-burgundy" />
                      <span className="font-bold text-sm text-charcoal">Cash on Delivery (COD)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">POPULAR</span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      Pay in cash or UPI QR scan directly to the delivery courier when your package arrives at your doorstep.
                    </p>
                  </div>
                </label>

                {/* 2. WhatsApp Assisted Checkout */}
                <label className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'whatsapp'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-gold-border bg-white hover:bg-cream-50'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="whatsapp"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="mt-1 text-emerald-600 focus:ring-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-sm text-charcoal">WhatsApp Concierge Checkout & UPI</span>
                      <span className="text-[10px] bg-gold/20 text-gold-dark font-bold px-2 py-0.5 rounded-full">RECOMMENDED</span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      Place your verified order and instantly receive direct Google Pay, PhonePe, or Paytm UPI QR code on WhatsApp with our store concierge.
                    </p>
                  </div>
                </label>

                {/* 3. Online Gateway / Cards */}
                <div className="p-4 rounded-2xl border border-gold-border bg-cream-50 space-y-2">
                  <div className="flex items-center gap-2 text-charcoal-light">
                    <CreditCard className="w-4 h-4 text-charcoal-muted" />
                    <span className="font-semibold text-xs">Direct Card & Netbanking Gateway</span>
                    <span className="text-[10px] bg-cream-200 text-charcoal-muted font-bold px-2 py-0.5 rounded">READY FOR CREDENTIALS</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted leading-relaxed">
                    Razorpay/Stripe automated payment gateway can be activated in Store Admin by inserting merchant API keys. For immediate digital transfer, choose <strong>WhatsApp Concierge Checkout & UPI</strong> above.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-3xl border border-gold-border p-6 shadow-subtle space-y-4">
              <h3 className="font-serif text-xl font-bold text-burgundy">
                Items in Order ({items.length})
              </h3>

              <div className="divide-y divide-cream-200 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId || 'std'}`} className="py-3 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-cream-50 shrink-0 border border-gold-border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-charcoal truncate">{item.name}</h4>
                      {item.variantName && (
                        <p className="text-[11px] text-charcoal-muted">Shade: {item.variantName}</p>
                      )}
                      <p className="text-xs text-charcoal-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-burgundy shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-charcoal-light pt-3 border-t border-gold-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Voucher ({appliedCoupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>All-India Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-burgundy pt-3 border-t border-gold-border">
                  <span>Total Amount Due</span>
                  <span className="font-serif text-2xl font-bold">₹{total}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-burgundy hover:bg-burgundy-800 disabled:bg-cream-300 text-white rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-boutique-hover transition duration-200 active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Verifying & Placing Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order (₹{total})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-charcoal-muted flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Your information is encrypted and strictly confidential.</span>
                </span>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
