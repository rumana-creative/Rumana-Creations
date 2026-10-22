import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { defaultStoreSettings } from '@/config/store';

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Boutique Transparency</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-12 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal-light leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">1. Shipping Coverage & Charges</h2>
            <p>
              Rumana Creations delivers to over 19,000 PIN codes across India via trusted express logistics partners (BlueDart, Delhivery, DTDC, and Speed Post).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Orders Above ₹{defaultStoreSettings.freeShippingThreshold}:</strong> FREE Insured All-India Standard Shipping.</li>
              <li><strong>Orders Below ₹{defaultStoreSettings.freeShippingThreshold}:</strong> A flat shipping and handling charge of ₹{defaultStoreSettings.standardShippingFee} is applied.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">2. Dispatch & Transit Timelines</h2>
            <p>
              • <strong>Order Processing:</strong> All orders are carefully inspected, hand-packed in our signature gift pouches, and dispatched within <strong>24 to 48 hours</strong> of order confirmation (excluding Sundays and national holidays).
            </p>
            <p>
              • <strong>Metro Cities:</strong> Typically delivered within <strong>3 to 4 business days</strong> post-dispatch.
            </p>
            <p>
              • <strong>Rest of India:</strong> Typically delivered within <strong>4 to 7 business days</strong> depending on regional connectivity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">3. Order Tracking</h2>
            <p>
              Once your parcel is handed over to the courier partner, an automated shipment notification containing your tracking AWB number will be shared with you via SMS/WhatsApp. You can also message our WhatsApp concierge anytime with your Order ID for real-time live location updates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">4. Cash on Delivery (COD) Guidelines</h2>
            <p>
              For Cash on Delivery orders, our team may make a quick WhatsApp confirmation to ensure the delivery address and PIN code are accurate before dispatching. Please ensure someone is available at the delivery location with cash or UPI QR scan ready.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
