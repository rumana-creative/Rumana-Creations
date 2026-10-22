import { getAllCategories, getAllProducts, getAllReviews } from '@/lib/db';
import HomeClientView from '@/components/HomeClientView';

export const revalidate = 0; // ensure fresh data when admin edits

export default function HomePage() {
  const categories = getAllCategories();
  const products = getAllProducts();
  const reviews = getAllReviews();

  const newArrivals = products.filter((p) => p.isNewArrival);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <HomeClientView
      categories={categories}
      newArrivals={newArrivals}
      bestSellers={bestSellers}
      reviews={reviews}
    />
  );
}
