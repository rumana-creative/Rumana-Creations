'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Star, Phone } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getProductWhatsAppMessage, getWhatsAppUrl } from '@/config/store';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : undefined;
    addToCart(product, defaultVariant, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const currentImage = product.images[0] || '/images/products/tortoise-claw-1.svg';
  const hoverImage = product.images[1] || currentImage;

  return (
    <div className="group relative bg-white rounded-2xl border border-gold-border p-3 sm:p-4 flex flex-col transition-all duration-300 hover:shadow-boutique-hover hover:-translate-y-1">
      
      {/* 1. Image Container & Floating Badges */}
      <div className="relative w-full aspect-square bg-cream-50 rounded-xl overflow-hidden mb-3.5 flex items-center justify-center">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-burgundy text-white rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gold text-white rounded-full shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-cream-300 text-burgundy font-semibold rounded-full shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 shadow-sm ${
            isWishlisted
              ? 'bg-burgundy text-white'
              : 'bg-white/90 text-charcoal hover:bg-burgundy hover:text-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View & WhatsApp hover action bar */}
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickView}
              className="flex-1 py-1.5 px-2 bg-white/95 hover:bg-white text-burgundy text-xs font-medium rounded-lg shadow-sm border border-gold-border flex items-center justify-center gap-1 transition"
            >
              <Eye className="w-3.5 h-3.5 text-gold-dark" />
              <span className="hidden sm:inline">Quick View</span>
            </button>
          )}

          <a
            href={getWhatsAppUrl(
              getProductWhatsAppMessage(product.name, product.variants?.[0]?.name, product.price)
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 bg-white/95 hover:bg-white text-emerald-700 rounded-lg shadow-sm border border-gold-border transition"
            title="Chat about this accessory on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. Category & Rating */}
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-[11px] font-semibold tracking-wider text-gold-dark uppercase">
          {product.categoryName}
        </span>
        {product.rating && (
          <div className="flex items-center gap-1 text-charcoal-muted">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="font-medium text-xs text-charcoal">{product.rating.toFixed(1)}</span>
            {product.reviewCount && (
              <span className="text-[10px] text-charcoal-muted">({product.reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {/* 3. Product Title */}
      <h3 className="font-serif text-base sm:text-lg font-semibold text-charcoal group-hover:text-burgundy transition line-clamp-1 mb-1">
        <Link href={`/product/${product.slug}`}>
          {product.name}
        </Link>
      </h3>

      {/* 4. Color Swatches preview if variants exist */}
      {product.variants && product.variants.length > 1 && (
        <div className="flex items-center gap-1.5 mb-2.5">
          {product.variants.slice(0, 4).map((variant) => (
            <span
              key={variant.id}
              title={variant.name}
              className="w-3 h-3 rounded-full border border-gold-border/80 shadow-xs"
              style={{ backgroundColor: variant.colorCode || '#E8D9BD' }}
            />
          ))}
          {product.variants.length > 4 && (
            <span className="text-[10px] text-charcoal-muted font-medium">
              +{product.variants.length - 4}
            </span>
          )}
        </div>
      )}

      {/* 5. Pricing & Stock status */}
      <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-1.5 border-t border-cream-200">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-base sm:text-xl font-bold text-burgundy">
            {defaultStoreSettings.currencySymbol}{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] sm:text-xs text-charcoal-muted line-through">
              {defaultStoreSettings.currencySymbol}{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`py-1.5 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-all shadow-xs shrink-0 ${
            product.stock <= 0
              ? 'bg-cream-200 text-charcoal-muted cursor-not-allowed'
              : 'bg-burgundy hover:bg-burgundy-800 text-white active:scale-95'
          }`}
          aria-label={product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{product.stock <= 0 ? 'Sold Out' : 'Add'}</span>
        </button>
      </div>

    </div>
  );
}
