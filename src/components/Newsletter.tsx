'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-14 bg-cream-100 border-t border-gold-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Join The Rumana Sisterhood</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Get 10% Off Your First Boutique Order
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-lg mx-auto">
            Subscribe for early access to limited seasonal hair jewel drops, private flash sales, and personal styling tips.
          </p>
        </div>

        {submitted ? (
          <div className="inline-flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you for subscribing! Use coupon <strong>RUMANA10</strong> at checkout for 10% off.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gold-border rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:border-burgundy"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow-sm transition active:scale-95 shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-charcoal-muted">
          We respect your privacy. No spam, ever. Unsubscribe with one click anytime.
        </p>

      </div>
    </section>
  );
}
