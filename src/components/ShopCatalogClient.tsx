'use client';

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';

interface ShopCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
  categoryTitle?: string;
  categoryDescription?: string;
}

export default function ShopCatalogClient({
  initialProducts,
  categories,
  initialCategory = 'all',
  categoryTitle,
  categoryDescription,
}: ShopCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(8);

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-300', label: 'Under ₹300', min: 0, max: 299 },
    { id: '300-499', label: '₹300 - ₹499', min: 300, max: 499 },
    { id: '500-799', label: '₹500 - ₹799', min: 500, max: 799 },
    { id: 'above-800', label: '₹800 & Above', min: 800, max: 99999 },
  ];

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setDisplayCount(8);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' ||
    inStockOnly ||
    searchQuery.trim() !== '' ||
    sortBy !== 'featured';

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new-arrivals') {
          if (!product.isNewArrival) return false;
        } else if (selectedCategory === 'best-sellers') {
          if (!product.isBestSeller) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Price range filter
      if (selectedPriceRange !== 'all') {
        const range = priceRanges.find((r) => r.id === selectedPriceRange);
        if (range && (product.price < range.min! || product.price > range.max!)) {
          return false;
        }
      }

      // In stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesVariant = product.variants?.some((v) => v.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesVariant) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'popularity') return (b.rating || 5) * (b.reviewCount || 1) - (a.rating || 5) * (a.reviewCount || 1);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [initialProducts, selectedCategory, selectedPriceRange, inStockOnly, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, displayCount);
  const canLoadMore = displayCount < filteredProducts.length;

  return (
    <div className="py-10 bg-ivory-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Breadcrumb */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rumana Creations Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            {categoryTitle || 'All Handcrafted Accessories'}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-2">
            {categoryDescription || 'Browse our complete collection of French cellulose clips, pure silk scrunchies, pearl hair vines, and kids hairpins.'}
          </p>
        </div>

        {/* Toolbar: Search, Filter Toggle, Sort */}
        <div className="bg-white rounded-2xl border border-gold-border p-4 shadow-subtle mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, colour, or material..."
              className="w-full pl-10 pr-4 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:border-burgundy"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-burgundy"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter button (mobile) & Sort dropdown */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 border border-gold-border text-xs font-semibold text-burgundy"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-burgundy" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-muted hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-cream-50 border border-gold-border text-charcoal text-xs font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-burgundy"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Customer Rating</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Active Filters Tag Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-charcoal-muted font-medium">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 rounded-full bg-cream-200 text-burgundy border border-gold-border flex items-center gap-1.5 font-medium">
                Category: {selectedCategory}
                <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-charcoal">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedPriceRange !== 'all' && (
              <span className="px-3 py-1 rounded-full bg-cream-200 text-burgundy border border-gold-border flex items-center gap-1.5 font-medium">
                Price: {priceRanges.find((r) => r.id === selectedPriceRange)?.label}
                <button type="button" onClick={() => setSelectedPriceRange('all')} className="hover:text-charcoal">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="px-3 py-1 rounded-full bg-cream-200 text-burgundy border border-gold-border flex items-center gap-1.5 font-medium">
                In-Stock Only
                <button type="button" onClick={() => setInStockOnly(false)} className="hover:text-charcoal">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="px-3 py-1 rounded-full bg-cream-200 text-burgundy border border-gold-border flex items-center gap-1.5 font-medium">
                Keyword: &ldquo;{searchQuery}&rdquo;
                <button type="button" onClick={() => setSearchQuery('')} className="hover:text-charcoal">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-3 py-1 rounded-full text-charcoal-muted hover:text-rose-700 underline text-xs font-semibold flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear all filters</span>
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            
            {/* Category Filter */}
            <div className="bg-white rounded-2xl border border-gold-border p-5 shadow-subtle space-y-3">
              <h3 className="font-serif text-base font-bold text-burgundy flex items-center justify-between">
                <span>Collections</span>
              </h3>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === 'all'
                      ? 'bg-burgundy text-white font-semibold'
                      : 'text-charcoal hover:bg-cream-100'
                  }`}
                >
                  All Products ({initialProducts.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat.slug
                        ? 'bg-burgundy text-white font-semibold'
                        : 'text-charcoal hover:bg-cream-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-2xl border border-gold-border p-5 shadow-subtle space-y-3">
              <h3 className="font-serif text-base font-bold text-burgundy">
                Price Range
              </h3>
              <div className="space-y-2 text-xs">
                {priceRanges.map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2.5 cursor-pointer text-charcoal hover:text-burgundy"
                  >
                    <input
                      type="radio"
                      name="price-range"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(range.id)}
                      className="text-burgundy focus:ring-burgundy"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="bg-white rounded-2xl border border-gold-border p-5 shadow-subtle space-y-3">
              <h3 className="font-serif text-base font-bold text-burgundy">
                Availability
              </h3>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-charcoal hover:text-burgundy">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-burgundy focus:ring-burgundy"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>

          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gold-border p-12 text-center space-y-4 shadow-subtle">
                <div className="w-16 h-16 rounded-full bg-cream-200 text-burgundy flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-burgundy">
                  No matching hair accessories found
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-light max-w-md mx-auto">
                  We couldn&rsquo;t find any items matching your selected filters. Try broadening your criteria or resetting your search.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-800 text-white rounded-full text-xs font-semibold shadow-sm transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {canLoadMore && (
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setDisplayCount((prev) => prev + 6)}
                      className="px-8 py-3 bg-white hover:bg-cream-100 text-burgundy border-2 border-gold-border rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition"
                    >
                      Load More Accessories ({filteredProducts.length - visibleProducts.length} remaining)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gold-border">
              <h3 className="font-serif text-lg font-bold text-burgundy">Filter Catalog</h3>
              <button type="button" onClick={() => setIsFilterDrawerOpen(false)}>
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-bold text-burgundy uppercase tracking-wider mb-2">Category</h4>
                <div className="space-y-1 text-xs">
                  <button
                    type="button"
                    onClick={() => { setSelectedCategory('all'); setIsFilterDrawerOpen(false); }}
                    className={`w-full text-left p-2 rounded-lg ${selectedCategory === 'all' ? 'bg-burgundy text-white' : 'hover:bg-cream-100'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => { setSelectedCategory(c.slug); setIsFilterDrawerOpen(false); }}
                      className={`w-full text-left p-2 rounded-lg ${selectedCategory === c.slug ? 'bg-burgundy text-white' : 'hover:bg-cream-100'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-burgundy uppercase tracking-wider mb-2">Price</h4>
                <div className="space-y-2 text-xs">
                  {priceRanges.map((r) => (
                    <label key={r.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={selectedPriceRange === r.id}
                        onChange={() => { setSelectedPriceRange(r.id); setIsFilterDrawerOpen(false); }}
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In-Stock Items Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gold-border">
              <button
                type="button"
                onClick={() => { clearAllFilters(); setIsFilterDrawerOpen(false); }}
                className="w-full py-2.5 bg-cream-200 text-burgundy rounded-xl text-xs font-semibold mb-2"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-2.5 bg-burgundy text-white rounded-xl text-xs font-semibold"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
