import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';

export default function PromotionalBanner() {
  return (
    <section className="py-12 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-burgundy-900 via-burgundy to-burgundy-800 text-white p-8 sm:p-12 border-2 border-gold/40 shadow-2xl">
          
          {/* Subtle Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-xs font-semibold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              <span>Special Boutique Welcome Offer</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-ivory-50">
              Grace in Every Strand. <br />
              <span className="italic font-normal text-gold-light">Crafted for Festive & Everyday Charm.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-100/90 leading-relaxed max-w-xl">
              Enjoy flat 10% off your entire first order with code <strong className="text-gold-light font-bold">RUMANA10</strong> or save ₹50 on orders above ₹399 with code <strong className="text-gold-light font-bold">WELCOME50</strong>. Complimentary insured shipping across India on orders above ₹799!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 bg-gold hover:bg-gold-light text-burgundy font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition flex items-center gap-2"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <span className="text-xs text-cream-200">
                ✨ Free luxury organza gift pouch with every order
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
