import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Package, 
  AlertCircle 
} from 'lucide-react';
import { getOrderById } from '@/lib/db';
import { defaultStoreSettings, getOrderWhatsAppMessage, getWhatsAppUrl } from '@/config/store';
import PrintButton from '@/components/PrintButton';

export const revalidate = 0;

interface OrderConfirmationPageProps {
  searchParams: {
    orderId?: string;
  };
}

export default function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const orderId = searchParams.orderId;
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="py-20 bg-ivory-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center bg-white p-10 rounded-3xl border border-gold-border shadow-subtle space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-burgundy">Order Not Found</h2>
          <p className="text-xs text-charcoal-light leading-relaxed">
            We could not find active records for reference ID {orderId ? `"${orderId}"` : 'provided'}. Please verify the order link or contact our WhatsApp care team.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="px-6 py-2.5 bg-burgundy text-white rounded-full text-xs font-semibold"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const whatsappMsg = getOrderWhatsAppMessage(order.id, order.customer.fullName, order.total);

  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl border border-gold-border p-6 sm:p-10 shadow-boutique text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block">
            Thank You, {order.customer.fullName}!
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Order Confirmed & Recorded
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream-100 rounded-full border border-gold-border text-xs">
            <span className="text-charcoal-muted">Order Reference:</span>
            <span className="font-mono font-bold text-burgundy text-sm">{order.id}</span>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-light max-w-lg mx-auto leading-relaxed">
            We have securely recorded your order. Our team will begin handcrafting, inspecting, and packaging your accessories in our signature gift pouch.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={getWhatsAppUrl(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Store on WhatsApp</span>
            </a>

            <PrintButton />
          </div>
        </div>

        {/* Invoice Breakdown Sheet */}
        <div className="bg-white rounded-3xl border border-gold-border p-6 sm:p-8 shadow-subtle space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-gold-border">
            <div>
              <span className="font-serif text-lg font-bold text-burgundy block">Rumana Creations</span>
              <span className="text-[11px] text-charcoal-muted">
                Order Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cream-200 text-burgundy uppercase">
                Status: {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h3 className="font-serif text-base font-bold text-burgundy mb-3">Purchased Items</h3>
            <div className="divide-y divide-cream-200 border rounded-2xl border-gold-border overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-50 shrink-0 border border-gold-border/60">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">{item.name}</h4>
                      {item.variantName && (
                        <p className="text-[11px] text-charcoal-muted">Shade: {item.variantName}</p>
                      )}
                      <p className="text-[11px] text-charcoal-muted">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-burgundy">
                    ₹{item.subtotal}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-gold-border space-y-2 text-xs text-charcoal-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Voucher Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-burgundy pt-2 border-t border-gold-border">
              <span>Final Total Paid / Due</span>
              <span className="font-serif text-xl">₹{order.total}</span>
            </div>
          </div>

          {/* Shipping & Payment Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-2xl bg-cream-50 border border-gold-border space-y-2">
              <h4 className="text-xs font-bold text-burgundy uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                <span>Shipping Address</span>
              </h4>
              <p className="text-xs font-semibold text-charcoal">{order.customer.fullName}</p>
              <p className="text-xs text-charcoal-light leading-relaxed">
                {order.customer.addressLine1}
                {order.customer.addressLine2 && `, ${order.customer.addressLine2}`}
                <br />
                {order.customer.city}, {order.customer.state} — {order.customer.pinCode}
              </p>
              <p className="text-[11px] text-charcoal-muted pt-1">
                Phone: {order.customer.phone}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 border border-gold-border space-y-2">
              <h4 className="text-xs font-bold text-burgundy uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-gold-dark" />
                <span>Payment & Delivery</span>
              </h4>
              <p className="text-xs text-charcoal">
                <strong>Method:</strong> {order.paymentMethod.toUpperCase()}
              </p>
              <p className="text-xs text-charcoal">
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              {order.trackingNumber && (
                <p className="text-xs text-charcoal">
                  <strong>Tracking Courier:</strong> <code className="bg-white px-1 py-0.5 rounded border text-burgundy">{order.trackingNumber}</code>
                </p>
              )}
              <p className="text-[11px] text-charcoal-muted pt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-dark" />
                <span>Est. Delivery: 3 to 5 business days</span>
              </p>
            </div>

          </div>

          <div className="pt-4 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-burgundy hover:underline"
            >
              <span>Continue Shopping New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
