import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { defaultStoreSettings } from '@/config/store';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-ivory-50 to-cream-50 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-gold-border">
      {/* Decorative Floral & Sparkle Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-24 left-10 text-gold opacity-20 hidden md:block">
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute bottom-16 right-12 text-burgundy opacity-15 hidden md:block">
        <Sparkles className="w-10 h-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Boutique Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200/80 border border-gold-border shadow-xs">
              <span className="w-2 h-2 rounded-full bg-burgundy animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-widest text-burgundy">
                Handcrafted Hair Luxury & Fashion Jewellery • 2026 Collection
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-burgundy leading-[1.15] tracking-tight">
              Everyday Beauty, <br className="hidden sm:inline" />
              <span className="text-charcoal italic font-normal">Beautifully Accessorised</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-charcoal-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to <strong className="text-burgundy font-semibold">Rumana Creations</strong>. Discover our complete boutique collection: French cellulose claw clips, patterned barrettes, mulberry silk scrunchies, bridal velvet headbands, ethnic jhumkas, dainty chains, and festive artificial jewellery suites crafted for effortless Indian elegance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/category/new-arrivals"
                className="w-full sm:w-auto px-7 py-3.5 bg-burgundy hover:bg-burgundy-800 text-white rounded-full text-sm font-semibold tracking-wide shadow-boutique-hover flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </Link>

              <Link
                href="/shop"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-cream-100 text-burgundy border border-gold-border rounded-full text-sm font-semibold tracking-wide shadow-xs flex items-center justify-center gap-2 transition"
              >
                <span>Explore All Collections</span>
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-gold-border/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-dark" />
                <span>Zero-Breakage Hold</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-burgundy" />
                <span>Loved by 1,000+ Indian Women</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>Boutique Gift Packaging</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Showcase Frame */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-border bg-white p-3">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-cream-100 flex items-center justify-center">
                <Image
                  src="/images/products/gold-blossom-1.svg"
                  alt="Rumana Creations Gilded Blossom Metal Hair Claw"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Floating Tag Overlay */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-border shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-dark tracking-widest block">
                      FEATURED SHOWPIECE
                    </span>
                    <h3 className="font-serif text-base font-bold text-burgundy">
                      Gilded Blossom Metal Hair Claw
                    </h3>
                    <p className="text-xs text-charcoal-muted">
                      Electroplated Champagne Gold • Non-Tarnish
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-burgundy block">₹499</span>
                    <Link
                      href="/product/gilded-gold-blossom-metal-claw"
                      className="text-[11px] font-semibold text-gold-dark hover:underline flex items-center justify-end gap-0.5"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Floating Accent Card */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl border border-gold-border shadow-boutique-hover hidden sm:flex items-center gap-3 max-w-[200px]">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-50 shrink-0">
                <Image
                  src="/images/products/silk-scrunchie-1.svg"
                  alt="Mulberry Silk"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-burgundy block">100% PURE SILK</span>
                <span className="text-[11px] text-charcoal-light leading-tight block">Zero hair dents</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
