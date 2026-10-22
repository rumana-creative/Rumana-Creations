import { getAllCategories, getAllProducts } from '@/lib/db';
import ShopCatalogClient from '@/components/ShopCatalogClient';

export const revalidate = 0;

export default function ShopPage() {
  const categories = getAllCategories();
  const products = getAllProducts();

  return (
    <ShopCatalogClient
      initialProducts={products}
      categories={categories}
      initialCategory="all"
    />
  );
}
