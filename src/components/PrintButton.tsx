'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="px-6 py-3 bg-cream-100 hover:bg-cream-200 text-charcoal border border-gold-border rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition"
    >
      <Printer className="w-4 h-4 text-gold-dark" />
      <span>Print Invoice Receipt</span>
    </button>
  );
}
