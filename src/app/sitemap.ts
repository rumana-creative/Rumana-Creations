import { MetadataRoute } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rumanacreations.com';
  const products = getAllProducts();
  const categories = getAllCategories();

  const staticRoutes = [
    '',
    '/shop',
    '/category/new-arrivals',
    '/category/best-sellers',
    '/about',
    '/contact',
    '/wishlist',
    '/policies/shipping',
    '/policies/returns',
    '/policies/terms',
    '/policies/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: new Date(prod.createdAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
