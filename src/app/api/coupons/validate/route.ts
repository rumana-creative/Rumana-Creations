import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();
    if (!code) {
      return NextResponse.json({ isValid: false, message: 'Please enter a coupon code' }, { status: 400 });
    }
    const result = validateCoupon(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ isValid: false, message: err.message }, { status: 500 });
  }
}
