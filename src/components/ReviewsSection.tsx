import React from 'react';
import { Star, CheckCircle2, Sparkles, Quote } from 'lucide-react';
import { Review } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-16 bg-cream-50 border-b border-gold-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Love</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Loved By Women Across India
          </h2>
          <p className="text-sm text-charcoal-light mt-2">
            Read heartfelt experiences from customers who wear Rumana Creations every day and on their most special days.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-gold-border p-6 shadow-subtle flex flex-col justify-between hover:shadow-boutique transition"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold/30" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Verified Badge */}
              <div className="pt-4 mt-4 border-t border-cream-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-burgundy">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-charcoal-muted">
                      {rev.location}
                    </p>
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>
                {rev.productName && (
                  <p className="text-[10px] text-gold-dark font-medium mt-1 truncate">
                    Purchased: {rev.productName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
