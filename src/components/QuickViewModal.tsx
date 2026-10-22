'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Phone, Star, Check, Sparkles } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getProductWhatsAppMessage, getWhatsAppUrl } from '@/config/store';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const currentVariant = selectedVariant || (product.variants?.[0]);
  const availableStock = currentVariant ? currentVariant.stock : product.stock;

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity);
    onClose();
  };

  const images = product.images && product.images.length > 0 ? product.images : ['/images/products/tortoise-claw-1.svg'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gold-border z-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-charcoal-muted hover:text-burgundy transition rounded-full hover:bg-cream-100"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-50 border border-gold-border">
              <Image
                src={images[selectedImage] || images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-burgundy' : 'border-gold-border opacity-70'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-gold-dark uppercase block mb-1">
                {product.categoryName}
              </span>
              <h2 className="font-serif text-2xl font-bold text-burgundy">
                {product.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-bold text-burgundy">
                {defaultStoreSettings.currencySymbol}{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-charcoal-muted line-through">
                  {defaultStoreSettings.currencySymbol}{product.originalPrice}
                </span>
              )}
              {product.rating && (
                <div className="flex items-center gap-1 text-xs text-charcoal-muted ml-auto bg-cream-100 px-2.5 py-1 rounded-full border border-gold-border">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span className="font-medium text-charcoal">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-charcoal block">
                  Select Shade / Variant:
                  <span className="text-burgundy font-medium ml-1">
                    {currentVariant?.name}
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = currentVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          isSelected
                            ? 'bg-cream-100 border-burgundy text-burgundy font-semibold shadow-xs'
                            : 'bg-white border-gold-border text-charcoal hover:bg-cream-50'
                        }`}
                      >
                        {v.colorCode && (
                          <span
                            className="w-3 h-3 rounded-full border border-charcoal/20"
                            style={{ backgroundColor: v.colorCode }}
                          />
                        )}
                        <span>{v.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-burgundy" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock indicator */}
            <div className="text-xs">
              {availableStock > 0 ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  In Stock ({availableStock} units left)
                </span>
              ) : (
                <span className="text-rose-700 font-medium">Currently Sold Out</span>
              )}
            </div>

            {/* Quantity Selector */}
            {availableStock > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-charcoal">Quantity:</span>
                <div className="flex items-center border border-gold-border rounded-lg bg-cream-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-charcoal hover:bg-cream-200 transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-charcoal">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
                    className="px-3 py-1 text-charcoal hover:bg-cream-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={availableStock <= 0}
                className="flex-1 py-3 px-4 bg-burgundy hover:bg-burgundy-800 disabled:bg-cream-200 disabled:text-charcoal-muted text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{availableStock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border border-gold-border transition flex items-center justify-center ${
                  isWishlisted ? 'bg-burgundy text-white' : 'bg-white hover:bg-cream-100 text-charcoal'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <a
                href={getWhatsAppUrl(
                  getProductWhatsAppMessage(product.name, currentVariant?.name, product.price)
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl transition flex items-center justify-center"
                title="Chat on WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2 text-center">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-burgundy hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Product Specifications & Care Guide</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
