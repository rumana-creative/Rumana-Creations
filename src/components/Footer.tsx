import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

export default function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-gold-border text-charcoal">
      {/* 1. Value Proposition Highlights */}
      <div className="border-b border-gold-border bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy shrink-0">
                <Truck className="w-5 h-5 text-burgundy" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-burgundy">Free Delivery Above ₹799</h4>
                <p className="text-xs text-charcoal-muted mt-0.5">Reliable insured dispatch across India</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                <Sparkles className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-burgundy">Handcrafted Boutique Luxury</h4>
                <p className="text-xs text-charcoal-muted mt-0.5">Carefully inspected individual pieces</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy shrink-0">
                <Phone className="w-5 h-5 text-burgundy" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-burgundy">WhatsApp Concierge</h4>
                <p className="text-xs text-charcoal-muted mt-0.5">Instant styling advice & order support</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                <ShieldCheck className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-burgundy">Secure Payment & COD</h4>
                <p className="text-xs text-charcoal-muted mt-0.5">Cash on delivery & verified digital UPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src={defaultStoreSettings.logoUrl}
                  alt="Rumana Creations"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-burgundy tracking-wide block">
                  RUMANA
                </span>
                <span className="text-[10px] font-semibold text-gold tracking-[0.25em] uppercase block -mt-1">
                  CREATIONS
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-light leading-relaxed max-w-sm">
              Rumana Creations celebrates timeless Indian craftsmanship and everyday hair luxury. From premium cellulose claw clips and pure mulberry silk scrunchies to delicate bridal hair vines and playful kids’ accessories.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={defaultStoreSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-gold-border flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition shadow-sm"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl("Hello Rumana Creations! I would like to learn more about your brand.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-gold-border flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition shadow-sm"
                aria-label="WhatsApp Chat"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${defaultStoreSettings.email}`}
                className="w-9 h-9 rounded-full bg-white border border-gold-border flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition shadow-sm"
                aria-label="Email Customer Care"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-burgundy mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-light">
              <li>
                <Link href="/category/claw-clips" className="hover:text-burgundy transition">Claw Clips</Link>
              </li>
              <li>
                <Link href="/category/scrunchies-hair-ties" className="hover:text-burgundy transition">Scrunchies & Silk Ties</Link>
              </li>
              <li>
                <Link href="/category/headbands" className="hover:text-burgundy transition">Padded Velvet Headbands</Link>
              </li>
              <li>
                <Link href="/category/kids-clips" className="hover:text-burgundy transition">Kids’ Snag-Free Clips</Link>
              </li>
              <li>
                <Link href="/category/pearl-pins-beads" className="hover:text-burgundy transition">Pearl Pins & Bridal Vines</Link>
              </li>
              <li>
                <Link href="/category/new-arrivals" className="hover:text-burgundy transition">New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-burgundy mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-charcoal-light">
              <li>
                <Link href="/policies/shipping" className="hover:text-burgundy transition">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-burgundy transition">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-burgundy transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-burgundy transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-burgundy transition">About Our Brand</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-burgundy transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp Support Box */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-burgundy mb-4">WhatsApp Direct</h4>
            <div className="bg-white p-4 rounded-xl border border-gold-border shadow-subtle space-y-3">
              <p className="text-xs text-charcoal-light leading-relaxed">
                Need styling recommendations, customized gifting, or bulk inquiries? Message us directly.
              </p>
              <div className="text-xs font-semibold text-burgundy flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>{defaultStoreSettings.whatsappDisplay}</span>
              </div>
              <a
                href={getWhatsAppUrl("Hello Rumana! I have a question regarding an order or product styling.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-burgundy hover:bg-burgundy-800 text-white rounded-lg text-xs font-medium transition"
              >
                <span>Message on WhatsApp</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-gold-border bg-cream-200/60 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-muted">
          <p>© {new Date().getFullYear()} Rumana Creations. All rights reserved. Handcrafted with love.</p>
          <div className="flex items-center space-x-6">
            <Link href="/policies/shipping" className="hover:text-burgundy">Shipping</Link>
            <Link href="/policies/returns" className="hover:text-burgundy">Returns</Link>
            <Link href="/policies/privacy" className="hover:text-burgundy">Privacy</Link>
            <Link href="/admin" className="text-gold hover:text-burgundy font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
