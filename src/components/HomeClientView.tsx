'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import PromotionalBanner from '@/components/PromotionalBanner';
import EditorialSection from '@/components/EditorialSection';
import WhatsAppAssistanceSection from '@/components/WhatsAppAssistanceSection';
import InstagramGallery from '@/components/InstagramGallery';
import ReviewsSection from '@/components/ReviewsSection';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { Product, Category, Review } from '@/types';

interface HomeClientViewProps {
  categories: Category[];
  newArrivals: Product[];
  bestSellers: Product[];
  reviews: Review[];
}

export default function HomeClientView({
  categories,
  newArrivals,
  bestSellers,
  reviews,
}: HomeClientViewProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories */}
      <FeaturedCategories categories={categories} />

      {/* 3. New Arrivals Showcase */}
      <section className="py-16 bg-cream-50/70 border-y border-gold-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fresh Off The Workbench</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
                New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light mt-1">
                Our latest handcrafted accessories designed to elevate your daily style.
              </p>
            </div>

            <Link
              href="/category/new-arrivals"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-border bg-white hover:bg-cream-100 text-burgundy text-xs font-semibold tracking-wider uppercase transition shadow-xs"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Promotional Banner */}
      <PromotionalBanner />

      {/* 5. Best Sellers Section */}
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Loved By You</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
                Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light mt-1">
                Timeless staples that customers reorder and gift again and again.
              </p>
            </div>

            <Link
              href="/category/best-sellers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-border bg-white hover:bg-cream-100 text-burgundy text-xs font-semibold tracking-wider uppercase transition shadow-xs"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Editorial Style Guide */}
      <EditorialSection />

      {/* 7. WhatsApp Personal Concierge Section */}
      <WhatsAppAssistanceSection />

      {/* 8. Customer Reviews */}
      <ReviewsSection reviews={reviews} />

      {/* 9. Instagram Gallery */}
      <InstagramGallery />

      {/* 10. Newsletter */}
      <Newsletter />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
