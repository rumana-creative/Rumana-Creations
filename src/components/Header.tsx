'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { defaultStoreSettings, getWhatsAppUrl } from '@/config/store';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCartDrawer, wishlistCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Exactly the 5 requested navigation buttons
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Product', href: '/shop' },
    { name: 'Best Seller', href: '/category/best-sellers' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/shop') return pathname.startsWith('/shop') || pathname.startsWith('/product');
    if (href === '/category/best-sellers') return pathname === '/category/best-sellers';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-ivory-50/95 backdrop-blur-md border-b border-gold-border shadow-xs transition-all">
        {/* 1. Top Announcement Bar */}
        {defaultStoreSettings.isAnnouncementActive && (
          <div className="bg-burgundy text-ivory-50 px-4 py-2 text-xs md:text-sm font-medium tracking-wide">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex-1 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" />
                <span>{defaultStoreSettings.announcementText}</span>
              </div>
              <div className="hidden lg:flex items-center gap-4 text-xs text-gold-light border-l border-burgundy-600 pl-4">
                <a
                  href={getWhatsAppUrl("Hello Rumana Creations! I have a question about an accessory.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp: {defaultStoreSettings.whatsappDisplay}</span>
                </a>
                <Link href="/admin" className="hover:text-white text-xs opacity-75 hover:opacity-100 transition flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Mobile Menu & Search Buttons */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-charcoal hover:text-burgundy focus:outline-none"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 ml-1 text-charcoal hover:text-burgundy"
                aria-label="Search accessories"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Official Brand Logo */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link href="/" className="flex items-center gap-3 group shrink-0 mr-4 lg:mr-8 xl:mr-12">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={defaultStoreSettings.logoUrl}
                    alt="Rumana Creations Official Logo"
                    fill
                    sizes="56px"
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-burgundy">
                    RUMANA
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold uppercase -mt-1">
                    CREATIONS
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links — Clean 5 Items */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-10 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1.5 whitespace-nowrap transition-colors tracking-wide ${
                    isActive(link.href)
                      ? 'text-burgundy font-semibold'
                      : 'text-charcoal-light hover:text-burgundy'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 text-xs text-charcoal-muted bg-cream-100 hover:bg-cream-200 border border-gold-border rounded-full transition shadow-2xs group"
                aria-label="Search catalogue"
              >
                <Search className="w-3.5 h-3.5 text-charcoal group-hover:text-burgundy transition-colors" />
                <span className="hidden xl:inline text-charcoal-muted group-hover:text-charcoal transition-colors">
                  Search accessories...
                </span>
                <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-gold-border text-charcoal-muted font-mono font-bold">
                  ⌘K
                </kbd>
              </button>

              {/* WhatsApp Concierge (Large screens) */}
              <a
                href={getWhatsAppUrl("Hello Rumana Creations! 🌸 I would like styling assistance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-burgundy bg-gold/10 hover:bg-gold/20 border border-gold-border rounded-full transition shadow-2xs"
                title="Chat on WhatsApp"
              >
                <Phone className="w-3.5 h-3.5 text-gold-dark" />
                <span>WhatsApp</span>
              </a>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2 text-charcoal hover:text-burgundy transition"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-burgundy text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="relative p-2 text-charcoal hover:text-burgundy transition"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer — Mounted to document.body via Portal to escape Header's backdrop-filter containing block */}
      {mounted && mobileMenuOpen && createPortal(
        <div 
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-ivory-50 shadow-2xl flex flex-col z-10 border-r border-gold-border h-full h-[100dvh] overflow-hidden transition-transform duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold-border bg-cream-100 shrink-0">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="relative w-10 h-10">
                  <Image
                    src={defaultStoreSettings.logoUrl}
                    alt="Rumana Creations"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-burgundy block leading-tight">RUMANA</span>
                  <span className="text-[9px] font-semibold text-gold tracking-widest uppercase block">CREATIONS</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-charcoal hover:text-burgundy rounded-lg hover:bg-cream-200 transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links — Clean 5 Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive(link.href)
                      ? 'bg-cream-200 text-burgundy font-semibold shadow-2xs'
                      : 'text-charcoal hover:bg-cream-100 hover:text-burgundy'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gold-border/70 space-y-1">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-charcoal hover:bg-cream-100 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-burgundy" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-charcoal-muted hover:bg-cream-100 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Store Admin Portal</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </nav>

            {/* Mobile Footer WhatsApp Link */}
            <div className="p-4 border-t border-gold-border bg-cream-100 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <a
                href={getWhatsAppUrl("Hello Rumana Creations! I am browsing on mobile and would like some assistance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-sm font-semibold shadow-md transition active:scale-98"
              >
                <Phone className="w-4 h-4 text-gold-light" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
