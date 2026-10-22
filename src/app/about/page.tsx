import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

export default function AboutPage() {
  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto mb-2">
            <Image
              src={defaultStoreSettings.logoUrl}
              alt="Rumana Creations"
              fill
              className="object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage & Vision</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-burgundy">
            The Story Behind Rumana Creations
          </h1>
          <p className="text-sm sm:text-base text-charcoal-light max-w-2xl mx-auto leading-relaxed">
            Born from a passion for handcrafted hair luxury, Rumana Creations brings together everyday functionality with timeless Indian elegance.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-12 shadow-subtle space-y-6 text-charcoal-light leading-relaxed text-sm sm:text-base">
          <h2 className="font-serif text-2xl font-bold text-burgundy">
            Everyday Beauty, Beautifully Accessorised
          </h2>
          <p>
            For too long, hair accessories were treated as cheap, disposable afterthoughts—flimsy plastic claws that snap after three uses, hair ties that rip out strands, and pins that rust.
          </p>
          <p>
            At <strong>Rumana Creations</strong>, we believe every woman deserves accessories that treat her hair with love and dignity. Whether you are throwing your hair into a quick French twist for a morning meeting, styling your locks for a festival or wedding, or dressing up your daughter in gentle, snag-free clips, our accessories are designed to stay put without headaches.
          </p>
          <p>
            We curate and hand-finish our collections using high-grade cellulose acetate, 100% grade 6A mulberry silk, flexible padded velveteen, and hand-strung baroque pearls.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gold-border">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-serif text-2xl font-bold text-burgundy block">100%</span>
              <span className="text-xs text-charcoal-muted">Snag-Free & Hair-Kind Materials</span>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-serif text-2xl font-bold text-burgundy block">Handpicked</span>
              <span className="text-xs text-charcoal-muted">Strict Quality & Tensile Testing</span>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-serif text-2xl font-bold text-burgundy block">Boutique</span>
              <span className="text-xs text-charcoal-muted">Delivered in Signature Gift Pouches</span>
            </div>
          </div>
        </div>

        {/* Founder WhatsApp Callout */}
        <div className="bg-cream-100 rounded-3xl border border-gold-border p-8 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-burgundy">
            Connect Directly With Our Founder
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-md mx-auto">
            Have questions about finding the right shade to match your outfit or looking for bulk wedding favors? We’re just a WhatsApp message away.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hello Rumana! I just read your brand story on the website and would love to connect.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-burgundy hover:bg-burgundy-800 text-white rounded-full text-xs font-semibold shadow-sm transition"
            >
              <Phone className="w-4 h-4 text-gold-light" />
              <span>Message Rumana on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
