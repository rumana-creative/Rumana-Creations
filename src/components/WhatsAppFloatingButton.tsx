'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = "Hello Rumana Creations! 🌸 I am browsing your website and would love some help choosing the perfect hair accessories.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Greeting Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gold-border overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {/* Card Header */}
          <div className="bg-burgundy text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-gold-border/60 shrink-0">
                <Image
                  src={defaultStoreSettings.logoUrl}
                  alt="Rumana Creations"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-ivory-50 leading-tight">Rumana Creations</h4>
                <p className="text-[11px] text-gold-light flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Boutique Concierge
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white rounded-full"
              aria-label="Close WhatsApp chat card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Message Body */}
          <div className="p-4 bg-cream-50 text-xs text-charcoal space-y-3">
            <div className="bg-white p-3 rounded-xl border border-gold-border shadow-xs">
              <p className="leading-relaxed">
                Hello lovely! 🌸 Looking for a specific claw clip, pure silk scrunchies, or hair jewelry for a wedding or event?
              </p>
              <p className="mt-1 text-charcoal-muted text-[11px]">
                Chat directly with our styling team on WhatsApp for quick answers and custom orders!
              </p>
            </div>

            <a
              href={getWhatsAppUrl(defaultMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </a>
          </div>

          <div className="bg-cream-100 py-2 px-4 text-center border-t border-gold-border/60">
            <span className="text-[10px] text-charcoal-muted">
              Official WhatsApp Business: {defaultStoreSettings.whatsappDisplay}
            </span>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-boutique-hover flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Open WhatsApp Support"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border-2 border-emerald-600" />
          </div>
        )}
      </button>
    </div>
  );
}
