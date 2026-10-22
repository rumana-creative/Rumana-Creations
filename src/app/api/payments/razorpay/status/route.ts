import { NextResponse } from 'next/server';

export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const isConfigured = !!(keyId && process.env.RAZORPAY_KEY_SECRET);

  return NextResponse.json({
    configured: isConfigured,
    keyId: isConfigured ? keyId : null,
    currency: 'INR',
    mode: keyId?.startsWith('rzp_test') ? 'test' : 'live',
  });
}
