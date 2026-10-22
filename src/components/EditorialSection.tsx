import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function EditorialSection() {
  const styles = [
    {
      title: 'The Minimalist French Updo',
      tagline: 'Effortless Work & Everyday Poise',
      description: 'Clean lines, comfortable all-day hold, and timeless tortoiseshell or matte buttercup claws that keep your hair secured with zero headache tension.',
      image: '/images/products/tortoise-claw-1.svg',
      link: '/category/claw-clips',
      buttonText: 'Shop Claw Clips',
    },
    {
      title: 'Festive Velvet & Baroque Pearls',
      tagline: 'Sangeet, Weddings & Festive Nights',
      description: 'Lustrous multi-sized pearls and plush padded velvet crowns that transform sarees, anarkalis, and lehengas into royal statements.',
      image: '/images/products/pearl-headband-1.svg',
      link: '/category/headbands',
      buttonText: 'Explore Headbands',
    },
    {
      title: 'Playful Snag-Free Kids Charms',
      tagline: 'Gentle Care for Delicate Little Hairs',
      description: 'Fabric-encased snap clips, pastel daisy bows, and soft glitter butterflies that stay securely in baby and kids’ hair without pulling or pinching.',
      image: '/images/products/kids-clips-1.svg',
      link: '/category/kids-clips',
      buttonText: "Shop Kids' Clips",
    },
  ];

  return (
    <section className="py-16 bg-cream-100/60 border-y border-gold-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Style Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
            Find Your Everyday Style
          </h2>
          <p className="text-sm text-charcoal-light mt-2">
            Whether running errands, heading into meetings, attending a family wedding, or dressing up your little princess.
          </p>
        </div>

        {/* 3 Columns Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styles.map((style, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gold-border overflow-hidden flex flex-col shadow-subtle hover:shadow-boutique-hover transition duration-300"
            >
              <div className="relative aspect-[4/3] w-full bg-cream-50 overflow-hidden">
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block">
                    {style.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-burgundy">
                    {style.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
                    {style.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={style.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-burgundy hover:text-gold-dark transition"
                  >
                    <span>{style.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
