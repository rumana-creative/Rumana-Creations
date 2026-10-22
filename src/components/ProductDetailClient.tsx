'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  Phone, 
  Share2, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getProductWhatsAppMessage, getWhatsAppUrl } from '@/config/store';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care' | 'shipping'>('details');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const isWishlisted = isInWishlist(product.id);
  const currentVariant = selectedVariant || product.variants?.[0];
  const availableStock = currentVariant ? currentVariant.stock : product.stock;

  const images = product.images && product.images.length > 0 ? product.images : ['/images/products/tortoise-claw-1.svg'];

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity);
  };

  const handleBuyNow = () => {
    const success = addToCart(product, currentVariant, quantity);
    if (success) {
      router.push('/checkout');
    }
  };

  // WhatsApp Share & Chat message
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://rumanacreations.com/product/${product.slug}`;
  const whatsappChatMessage = getProductWhatsAppMessage(
    product.name,
    currentVariant?.name,
    product.price,
    currentUrl
  );

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this gorgeous accessory from Rumana Creations: ${product.name} — ${currentUrl}`
  )}`;

  return (
    <div className="py-8 bg-ivory-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-burgundy">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${product.category}`} className="hover:text-burgundy">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-burgundy font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2. Main Product Section */}
        <div className="bg-white rounded-3xl border border-gold-border p-6 sm:p-10 shadow-subtle mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Primary Large Image View */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-50 border border-gold-border shadow-xs">
                <Image
                  src={images[activeImageIdx] || images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-all duration-300"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 bg-burgundy text-white text-xs font-bold rounded-full shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="px-3 py-1 bg-gold text-white text-xs font-bold rounded-full shadow-sm">
                      NEW ARRIVAL
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition ${
                    isWishlisted ? 'bg-burgundy text-white' : 'bg-white/90 text-charcoal hover:bg-burgundy hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        activeImageIdx === idx
                          ? 'border-burgundy ring-2 ring-burgundy/20'
                          : 'border-gold-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Features Bar */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-cream-200 text-center text-xs text-charcoal-muted">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-burgundy" />
                  <span>Inspected Quality</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-gold-dark" />
                  <span>Free Over ₹799</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-burgundy" />
                  <span>7-Day Replacement</span>
                </div>
              </div>
            </div>

            {/* Product Purchase Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <Link
                    href={`/category/${product.category}`}
                    className="text-xs font-bold uppercase tracking-wider text-gold-dark hover:underline"
                  >
                    {product.categoryName}
                  </Link>
                  {product.rating && (
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-muted bg-cream-100 px-3 py-1 rounded-full border border-gold-border">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="font-bold text-charcoal">{product.rating.toFixed(1)}</span>
                      {product.reviewCount && (
                        <span>({product.reviewCount} customer reviews)</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy leading-tight mb-2">
                  {product.name}
                </h1>

                <p className="text-xs text-charcoal-muted">
                  SKU: <span className="font-mono">{currentVariant?.sku || product.sku}</span>
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 my-4">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
                    {defaultStoreSettings.currencySymbol}{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-charcoal-muted line-through">
                      {defaultStoreSettings.currencySymbol}{product.originalPrice}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Save ₹{product.originalPrice! - product.price} ({discountPercent}% OFF)
                    </span>
                  )}
                </div>

                {/* Stock Status Badge */}
                <div className="mb-4">
                  {availableStock > 0 ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>In Stock ({availableStock} available to dispatch)</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
                      <span>Currently Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Description Excerpt */}
                <p className="text-sm text-charcoal-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Variant Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-3 mb-6 p-4 rounded-2xl bg-cream-50 border border-gold-border">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-charcoal">Available Shades & Finishes:</span>
                      <span className="text-burgundy font-semibold">{currentVariant?.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => {
                        const isSelected = currentVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition ${
                              isSelected
                                ? 'bg-burgundy text-white border-burgundy shadow-sm'
                                : 'bg-white border-gold-border text-charcoal hover:bg-cream-100'
                            }`}
                          >
                            {v.colorCode && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: v.colorCode }}
                              />
                            )}
                            <span>{v.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-charcoal">Quantity:</span>
                    <div className="flex items-center border border-gold-border rounded-xl bg-cream-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-1.5 text-charcoal hover:bg-cream-200 transition font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-sm font-bold text-charcoal">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
                        className="px-3.5 py-1.5 text-charcoal hover:bg-cream-200 transition font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={availableStock <= 0}
                      className="flex-1 py-3.5 px-6 bg-burgundy hover:bg-burgundy-800 disabled:bg-cream-200 disabled:text-charcoal-muted text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-boutique-hover transition active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{availableStock <= 0 ? 'Sold Out' : 'Add to Bag'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={availableStock <= 0}
                      className="flex-1 py-3.5 px-6 bg-gold hover:bg-gold-light disabled:bg-cream-200 disabled:text-charcoal-muted text-burgundy font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  {/* Secondary WhatsApp & Share Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <a
                      href={getWhatsAppUrl(whatsappChatMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>Chat About This Accessory</span>
                    </a>

                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-cream-100 hover:bg-cream-200 border border-gold-border text-charcoal rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      title="Share with a friend on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5 text-gold-dark" />
                      <span>Share</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* 3. Detailed Specifications Tabs */}
          <div className="mt-12 pt-8 border-t border-gold-border">
            <div className="flex border-b border-gold-border space-x-6 text-sm font-medium overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`pb-3 transition relative shrink-0 ${
                  activeTab === 'details'
                    ? 'text-burgundy font-bold'
                    : 'text-charcoal-muted hover:text-burgundy'
                }`}
              >
                Specifications & Features
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-burgundy rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('materials')}
                className={`pb-3 transition relative shrink-0 ${
                  activeTab === 'materials'
                    ? 'text-burgundy font-bold'
                    : 'text-charcoal-muted hover:text-burgundy'
                }`}
              >
                Materials & Craft
                {activeTab === 'materials' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-burgundy rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`pb-3 transition relative shrink-0 ${
                  activeTab === 'care'
                    ? 'text-burgundy font-bold'
                    : 'text-charcoal-muted hover:text-burgundy'
                }`}
              >
                Care Instructions
                {activeTab === 'care' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-burgundy rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 transition relative shrink-0 ${
                  activeTab === 'shipping'
                    ? 'text-burgundy font-bold'
                    : 'text-charcoal-muted hover:text-burgundy'
                }`}
              >
                Shipping & Delivery
                {activeTab === 'shipping' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-burgundy rounded-full" />
                )}
              </button>
            </div>

            <div className="py-6 text-xs sm:text-sm text-charcoal-light leading-relaxed max-w-3xl">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  {product.details && product.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1.5 pt-2 text-charcoal">
                      {product.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-burgundy">Handpicked Artisanal Materials</h4>
                  <p>{product.materials || 'Crafted with premium materials selected for durability and luxurious sheen.'}</p>
                  <p className="text-charcoal-muted">Every Rumana Creations accessory undergoes rigorous tensile and spring testing to ensure comfort without tension headaches.</p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-burgundy">Keep Your Accessories Radiant</h4>
                  <p>{product.careInstructions || 'Store in your complimentary organza pouch. Avoid direct exposure to perfume, hairsprays, or water.'}</p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <h4 className="font-bold text-burgundy">All-India Delivery Policy</h4>
                  <p>• <strong>Free Insured Shipping:</strong> On all orders above ₹{defaultStoreSettings.freeShippingThreshold}.</p>
                  <p>• <strong>Standard Shipping Fee:</strong> ₹{defaultStoreSettings.standardShippingFee} for orders below ₹{defaultStoreSettings.freeShippingThreshold}.</p>
                  <p>• <strong>Dispatch Timeline:</strong> Dispatched within 24–48 hours from Bengaluru. Reaches major metros in 3–5 business days.</p>
                  <p>• <strong>Hassle-Free Replacement:</strong> 7 days replacement guarantee for any transit damages.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 4. Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                  Complete Your Look
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  You May Also Love
                </h3>
              </div>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-semibold text-burgundy hover:underline flex items-center gap-1"
              >
                <span>View More in {product.categoryName}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </section>
        )}

      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
