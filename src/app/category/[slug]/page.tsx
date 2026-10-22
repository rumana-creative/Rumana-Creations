import { notFound } from 'next/navigation';
import { getAllCategories, getAllProducts } from '@/lib/db';
import ShopCatalogClient from '@/components/ShopCatalogClient';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const categories = getAllCategories();
  const products = getAllProducts();

  let categoryTitle = '';
  let categoryDescription = '';

  if (slug === 'new-arrivals') {
    categoryTitle = 'New Arrivals';
    categoryDescription = 'The latest seasonal curation of trending boutique hair accessories.';
  } else if (slug === 'best-sellers') {
    categoryTitle = 'Best Sellers';
    categoryDescription = 'Our most loved hair jewels and everyday staples, handpicked by you.';
  } else {
    const category = categories.find((c) => c.slug === slug);
    if (!category) {
      notFound();
    }
    categoryTitle = category.name;
    categoryDescription = category.description;
  }

  return (
    <ShopCatalogClient
      initialProducts={products}
      categories={categories}
      initialCategory={slug}
      categoryTitle={categoryTitle}
      categoryDescription={categoryDescription}
    />
  );
}
