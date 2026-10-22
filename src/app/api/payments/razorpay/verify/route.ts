import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { getOrderById, updateOrderStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Missing payment verification parameters.' }, { status: 400 });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: `Store order ${orderId} not found.` }, { status: 404 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ success: false, error: 'Server payment secret missing.' }, { status: 500 });
    }

    // 1. Verify HMAC SHA256 Signature
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isSignatureValid) {
      updateOrderStatus(order.id, {
        paymentStatus: 'failed',
        notes: `Payment signature mismatch attempt for ${razorpay_payment_id}`,
      });
      return NextResponse.json({ success: false, error: 'Payment signature verification failed.' }, { status: 400 });
    }

    // 2. Authoritative check via Razorpay API
    const keyId = process.env.RAZORPAY_KEY_ID!;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return NextResponse.json({
        success: false,
        error: `Payment status is ${payment.status}, not captured.`,
      }, { status: 400 });
    }

    // 3. Update Store Order
    const updated = updateOrderStatus(order.id, {
      paymentStatus: 'paid',
      orderStatus: 'confirmed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      notes: `Verified online payment via Razorpay ID: ${razorpay_payment_id}`,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order confirmed successfully.',
      order: updated,
    });
  } catch (err: any) {
    console.error('Razorpay verification error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
