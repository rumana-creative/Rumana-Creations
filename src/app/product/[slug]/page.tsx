import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '@/lib/db';
import ProductDetailClient from '@/components/ProductDetailClient';
import { defaultStoreSettings } from '@/config/store';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found | Rumana Creations' };
  }

  return {
    title: `${product.name} — Rumana Creations`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Rumana Creations`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.images[0] || '/rumana-logo.png',
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestSeller)
  );

  // Structured Data (Product JSON-LD)
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images[0] ? `https://rumanacreations.com${product.images[0]}` : 'https://rumanacreations.com/rumana-logo.png',
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `https://rumanacreations.com/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: defaultStoreSettings.storeName,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
