'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Product } from '@/types';
import { defaultStoreSettings } from '@/config/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export default function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Lock body scroll and handle keyboard events
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();
  const results = cleanQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery) ||
          p.categoryName.toLowerCase().includes(cleanQuery) ||
          p.variants?.some((v) => v.name.toLowerCase().includes(cleanQuery))
      )
    : [];

  const popularSearches = ['Claw Clips', 'Mulberry Silk', 'Baroque Pearl', 'Kids Snap Clips', 'Padded Headband', 'Tortoise Shell'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gold-border overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gold-border bg-cream-50">
          <Search className="w-5 h-5 text-gold-dark shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hair clips, scrunchies, headbands, pearl pins..."
            className="w-full bg-transparent text-sm sm:text-base text-charcoal placeholder:text-charcoal-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-charcoal-muted hover:text-charcoal mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-charcoal-muted hover:text-burgundy bg-cream-200 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 flex-1">
          {cleanQuery ? (
            results.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-charcoal-muted font-medium mb-2">
                  Found {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-cream-100 border border-transparent hover:border-gold-border transition group"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-cream-50 shrink-0 border border-gold-border/60">
                      <Image
                        src={product.images[0] || '/images/products/tortoise-claw-1.svg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider">
                        {product.categoryName}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-charcoal group-hover:text-burgundy truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-burgundy mt-0.5">
                        {defaultStoreSettings.currencySymbol}{product.price}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition mr-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <p className="font-serif text-lg text-charcoal">No products matching &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  Try checking the spelling or browse our popular accessory categories below.
                </p>
              </div>
            )
          ) : (
            <div className="space-y-4 py-2">
              <div>
                <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Popular Searches</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-cream-100 hover:bg-cream-200 border border-gold-border text-charcoal text-xs rounded-full transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gold-border/60">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-cream-50 hover:bg-cream-100 border border-gold-border text-xs font-medium text-burgundy transition"
                >
                  <span>Browse Entire Rumana Creations Catalogue</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
