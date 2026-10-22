import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Customer Trust</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-12 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">1. Personal Information We Collect</h2>
            <p>
              When you visit or make a purchase from Rumana Creations, we collect certain personal information necessary to deliver your package, including your name, shipping address, mobile phone number, WhatsApp contact, and optional email address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">2. How We Use Your Information</h2>
            <p>
              We use your contact and delivery information solely to fulfill orders placed through the website, communicate shipment and delivery status on WhatsApp/SMS, and respond to your customer support requests. We do not sell, rent, or trade your personal data with third-party marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">3. Security</h2>
            <p>
              We implement industry-standard administrative and technical security measures to safeguard your personal details and transaction confidentiality.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
