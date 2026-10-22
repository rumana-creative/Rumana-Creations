import React from 'react';
import Image from 'next/image';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { defaultStoreSettings } from '@/config/store';

export default function InstagramGallery() {
  const posts = [
    { id: 1, image: '/images/instagram/ig-1.svg', title: 'Everyday Claw Styling' },
    { id: 2, image: '/images/instagram/ig-2.svg', title: 'Festive Pearl Accents' },
    { id: 3, image: '/images/instagram/ig-3.svg', title: 'Mulberry Silk Essentials' },
    { id: 4, image: '/images/instagram/ig-4.svg', title: 'Little Princess Barrettes' },
    { id: 5, image: '/images/instagram/ig-5.svg', title: 'Bridal Updo Elegance' },
    { id: 6, image: '/images/instagram/ig-6.svg', title: 'Boutique Packaging & Love' },
  ];

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>@rumana_creations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
              Follow Our Hair Journey
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light mt-1">
              Daily updo tutorials, seasonal drops, and behind-the-scenes moments from our studio.
            </p>
          </div>

          <a
            href={defaultStoreSettings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-border bg-white hover:bg-cream-100 text-burgundy text-xs font-semibold tracking-wider uppercase transition shadow-xs"
          >
            <Instagram className="w-4 h-4 text-burgundy" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>

        {/* 6 Grid Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={defaultStoreSettings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-50 border border-gold-border shadow-xs block"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center transition duration-500 group-hover:scale-110"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-burgundy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-gold-light mb-1 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                <span className="text-[11px] font-semibold tracking-wide leading-tight line-clamp-2">
                  {post.title}
                </span>
                <span className="text-[9px] text-gold-light mt-1 uppercase font-bold tracking-widest">
                  View Post
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
