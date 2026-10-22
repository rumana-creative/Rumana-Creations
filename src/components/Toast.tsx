'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toastMessage, clearToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-sm w-full transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-burgundy text-white p-4 rounded-2xl shadow-boutique-hover border border-gold/40 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-gold-light mt-0.5 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">{toastMessage}</p>
        </div>
        <button
          type="button"
          onClick={clearToast}
          className="text-white/70 hover:text-white p-0.5 rounded"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
