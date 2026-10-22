import React from 'react';
import { RotateCcw, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

export default function ReturnsPolicyPage() {
  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Our Guarantee</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Returns & Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-12 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal-light leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">1. 7-Day Replacement Guarantee</h2>
            <p>
              At Rumana Creations, our highest priority is your happiness. We want you to adore your hair jewels. If any item arrives damaged in transit, defective, or incorrect, we provide a <strong>hassle-free replacement or store credit within 7 calendar days</strong> of package delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">2. Hygiene & Safety Notice</h2>
            <p>
              Due to strict cosmetic and personal hygiene guidelines for hair accessories and scalp contact items (claw clips, silk scrunchies, headbands, hairpins), we cannot accept returns on items that have been worn, used, washed, or altered, unless received damaged upon opening.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">3. How to Request an Exchange</h2>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Take a clear photo or short video of the damaged or defective item and its packaging.</li>
              <li>Send the photos along with your Order ID (e.g. RC-2026-XXXX) to our WhatsApp Concierge at <strong>{defaultStoreSettings.whatsappDisplay}</strong> or email <strong>{defaultStoreSettings.email}</strong>.</li>
              <li>Our team will inspect and verify your request within 24 hours and arrange a replacement dispatch or refund.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">4. Refunds Timeline</h2>
            <p>
              In cases where a replacement cannot be provided (e.g. piece is sold out), a full refund will be processed back to your original payment mode or UPI account within 3–5 banking business days.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
