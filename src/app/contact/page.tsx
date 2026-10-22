'use client';

import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            We’d Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light">
            Whether inquiring about order status, customized gifting, or styling suggestions, our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="bg-white rounded-3xl border border-gold-border p-8 shadow-subtle space-y-6">
            <h2 className="font-serif text-2xl font-bold text-burgundy">
              Direct Channels
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* WhatsApp */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-cream-50 border border-gold-border">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal">Official WhatsApp Business</h4>
                  <p className="text-charcoal-muted text-xs mt-0.5">Quick responses between 9:00 AM – 8:00 PM IST</p>
                  <a
                    href={getWhatsAppUrl("Hello Rumana Creations! I would like to get in touch.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-semibold text-emerald-700 hover:underline"
                  >
                    {defaultStoreSettings.whatsappDisplay} →
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-cream-50 border border-gold-border">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy shrink-0">
                  <Instagram className="w-5 h-5 text-burgundy" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal">Instagram DM & Community</h4>
                  <p className="text-charcoal-muted text-xs mt-0.5">Follow @{defaultStoreSettings.instagramHandle} for daily inspiration</p>
                  <a
                    href={defaultStoreSettings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-semibold text-burgundy hover:underline"
                  >
                    Visit Profile →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-cream-50 border border-gold-border">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal">Email Inquiries</h4>
                  <p className="text-charcoal-muted text-xs mt-0.5">For formal business partnerships and orders</p>
                  <a
                    href={`mailto:${defaultStoreSettings.email}`}
                    className="inline-block mt-2 font-semibold text-charcoal hover:text-burgundy"
                  >
                    {defaultStoreSettings.email}
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Message Form */}
          <div className="bg-white rounded-3xl border border-gold-border p-8 shadow-subtle">
            <h2 className="font-serif text-2xl font-bold text-burgundy mb-4">
              Send a Note
            </h2>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-emerald-900">Message Received!</h3>
                <p className="text-xs text-emerald-800">
                  Thank you, {formData.name}. Rumana or our care team will reply to you on WhatsApp / phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">WhatsApp / Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98450 12345"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">How Can We Help?</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the accessories you are looking for..."
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-burgundy hover:bg-burgundy-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
