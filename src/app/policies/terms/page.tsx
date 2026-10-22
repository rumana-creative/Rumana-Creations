import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Legal & Usage</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-12 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">1. Overview</h2>
            <p>
              This website is operated by Rumana Creations. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Rumana Creations. By visiting our site and/or purchasing handcrafted hair accessories from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">2. Pricing & Product Accuracy</h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue accessories without notice. We have made every effort to display as accurately as possible the colors and images of our hair clips, silk scrunchies, and headbands.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-burgundy">3. Orders & Cancellation</h2>
            <p>
              We reserve the right to refuse or cancel any order if fraudulent activity is suspected or if inventory errors occur. If your order is cancelled after payment, you will receive a full refund promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
