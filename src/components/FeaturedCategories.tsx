import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '@/types';

interface FeaturedCategoriesProps {
  categories: Category[];
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Shop By Category
          </h2>
          <p className="text-sm text-charcoal-light mt-2">
            Explore handcrafted hair accessories, artificial fashion jewellery, and boutique craft essentials designed for every style and occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative bg-white rounded-2xl border border-gold-border p-4 flex flex-col transition-all duration-300 hover:shadow-boutique-hover hover:-translate-y-1 overflow-hidden"
            >
              {/* Category Visual */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-cream-50 mb-3.5 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Arrow */}
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-burgundy transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-cream-100 group-hover:bg-burgundy group-hover:text-white flex items-center justify-center text-charcoal transition shrink-0 ml-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
