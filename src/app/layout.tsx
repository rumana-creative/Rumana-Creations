import type { Metadata } from 'next';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { defaultStoreSettings } from '@/config/store';
import { getAllProducts } from '@/lib/db';

export const metadata: Metadata = {
  title: `${defaultStoreSettings.storeName} — ${defaultStoreSettings.tagline}`,
  description:
    'Shop handcrafted luxury claw clips, 100% pure mulberry silk scrunchies, padded velvet crown headbands, and bridal pearl pins from Rumana Creations. Free delivery on orders above ₹799 across India.',
  keywords: [
    'Rumana Creations',
    'hair accessories India',
    'claw clips',
    'scrunchies',
    'mulberry silk hair ties',
    'padded headbands',
    'kids hair clips',
    'pearl hair pins',
    'bridal hair accessories',
    'boutique hair jewels',
  ],
  authors: [{ name: 'Rumana Creations' }],
  metadataBase: new URL('https://rumanacreations.com'),
  openGraph: {
    title: `${defaultStoreSettings.storeName} — ${defaultStoreSettings.tagline}`,
    description:
      'Everyday Beauty, Beautifully Accessorised. Premium handcrafted hair accessories, claw clips, silk scrunchies, and velvet headbands.',
    url: 'https://rumanacreations.com',
    siteName: 'Rumana Creations',
    images: [
      {
        url: '/rumana-logo.png',
        width: 1024,
        height: 1024,
        alt: 'Rumana Creations Official Brand Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/rumana-logo.png',
    apple: '/rumana-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = getAllProducts();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: defaultStoreSettings.storeName,
    description: defaultStoreSettings.tagline,
    url: 'https://rumanacreations.com',
    logo: 'https://rumanacreations.com/rumana-logo.png',
    telephone: defaultStoreSettings.whatsappDisplay,
    priceRange: '₹229 - ₹899',
    address: {
      '@type': 'PostalAddress',
      addressLocality: defaultStoreSettings.addressCity,
      addressRegion: defaultStoreSettings.addressState,
      addressCountry: defaultStoreSettings.country,
    },
    sameAs: [defaultStoreSettings.instagramUrl],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <ClientLayoutWrapper initialProducts={products}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
