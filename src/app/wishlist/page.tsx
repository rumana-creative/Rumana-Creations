'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';

export default function WishlistPage() {
  const { wishlist } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setAllProducts(data.products);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 bg-ivory-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-1.5">
            <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            My Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1">
            Keep track of the pieces you adore. Move them into your bag when you’re ready!
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-burgundy border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gold-border p-12 text-center max-w-md mx-auto shadow-subtle space-y-4">
            <div className="w-16 h-16 rounded-full bg-cream-200 text-burgundy flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-burgundy opacity-50" />
            </div>
            <h2 className="font-serif text-xl font-bold text-burgundy">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-charcoal-light">
              Tap the heart icon on any accessory to save it here for later.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-800 text-white rounded-full text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
              >
                <span>Browse Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
