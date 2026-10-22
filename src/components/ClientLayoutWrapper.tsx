'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import SearchModal from '@/components/SearchModal';
import Toast from '@/components/Toast';
import { CartProvider } from '@/context/CartContext';
import { Product } from '@/types';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  initialProducts?: Product[];
}

export default function ClientLayoutWrapper({ children, initialProducts = [] }: ClientLayoutWrapperProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // If initialProducts wasn't provided, fetch products for search
    if (products.length === 0) {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.products) {
            setProducts(data.products);
          }
        })
        .catch((err) => console.error('Error fetching search products:', err));
    }
  }, [products.length]);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-ivory-50 text-charcoal">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppFloatingButton />
        <Toast />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
        />
      </div>
    </CartProvider>
  );
}
