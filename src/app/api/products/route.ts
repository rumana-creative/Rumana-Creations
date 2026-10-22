import { NextResponse } from 'next/server';
import { getAllProducts, saveProduct } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const newArrival = searchParams.get('new');
    const bestSeller = searchParams.get('best');
    const search = searchParams.get('search')?.toLowerCase();

    let products = getAllProducts();

    if (category) {
      if (category === 'new-arrivals') {
        products = products.filter((p) => p.isNewArrival);
      } else if (category === 'best-sellers') {
        products = products.filter((p) => p.isBestSeller);
      } else {
        products = products.filter((p) => p.category === category);
      }
    }

    if (featured === 'true') {
      products = products.filter((p) => p.isFeatured);
    }
    if (newArrival === 'true') {
      products = products.filter((p) => p.isNewArrival);
    }
    if (bestSeller === 'true') {
      products = products.filter((p) => p.isBestSeller);
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.categoryName.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ success: false, error: 'Name, price, and category are required' }, { status: 400 });
    }
    const saved = saveProduct(body);
    return NextResponse.json({ success: true, product: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
