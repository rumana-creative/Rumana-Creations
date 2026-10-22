import React from 'react';
import { Phone, MessageCircle, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

export default function WhatsAppAssistanceSection() {
  const msg = "Hello Rumana! 🌸 I would like personalized styling advice for my hair accessories.";

  return (
    <section className="py-16 bg-cream-50 border-b border-gold-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-12 shadow-boutique flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="max-w-2xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Personalized WhatsApp Concierge</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
              Need Styling Advice or a Custom Order?
            </h2>

            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              Hair accessories look their best when paired with your hair texture, face shape, and outfit neckline. Send us a picture of your outfit or describe what you’re looking for, and our founder Rumana will personally guide your selection.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs text-charcoal-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-dark" />
                <span>Quick reply within 30 minutes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-burgundy" />
                <span>Custom bridal & festive curation</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                <span>All-India delivery tracking support</span>
              </span>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="shrink-0 w-full lg:w-auto text-center">
            <a
              href={getWhatsAppUrl(msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-semibold tracking-wide shadow-boutique-hover transition duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 text-gold-light" />
              <span>Chat with Rumana on WhatsApp</span>
            </a>
            <p className="text-xs text-charcoal-muted mt-2">
              WhatsApp Business: <span className="font-semibold text-charcoal">{defaultStoreSettings.whatsappDisplay}</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
