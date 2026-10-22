import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOrderByRazorpayOrderId, getOrderById, updateOrderStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('Razorpay webhook called but RAZORPAY_WEBHOOK_SECRET is not configured.');
      return NextResponse.json({ success: false, error: 'Webhook secret not configured' }, { status: 503 });
    }

    if (!signature) {
      return NextResponse.json({ success: false, error: 'Missing webhook signature header' }, { status: 400 });
    }

    // 1. Verify Webhook Signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('Razorpay webhook signature verification failed.');
      return NextResponse.json({ success: false, error: 'Invalid webhook signature' }, { status: 400 });
    }

    // 2. Parse Event Payload
    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    const rzpOrderId = paymentEntity?.order_id || orderEntity?.id;
    const storeOrderId = paymentEntity?.notes?.storeOrderId || orderEntity?.notes?.storeOrderId;

    let targetOrder = storeOrderId ? getOrderById(storeOrderId) : undefined;
    if (!targetOrder && rzpOrderId) {
      targetOrder = getOrderByRazorpayOrderId(rzpOrderId);
    }

    if (!targetOrder) {
      console.warn(`Webhook received for unknown order: ${rzpOrderId || storeOrderId}`);
      return NextResponse.json({ received: true, note: 'Order not found in database' });
    }

    // 3. Process Events Idempotently
    if (event === 'payment.captured' || event === 'order.paid') {
      if (targetOrder.paymentStatus === 'paid') {
        // Idempotent: already processed
        return NextResponse.json({ received: true, status: 'already_paid' });
      }

      updateOrderStatus(targetOrder.id, {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        razorpayPaymentId: paymentEntity?.id,
        notes: `Payment captured via Razorpay Webhook (${event})`,
      });
      console.log(`Order ${targetOrder.id} marked as PAID via webhook.`);
    } else if (event === 'payment.failed') {
      if (targetOrder.paymentStatus !== 'paid') {
        updateOrderStatus(targetOrder.id, {
          paymentStatus: 'failed',
          notes: `Payment failed via Razorpay Webhook: ${paymentEntity?.error_description || 'Unknown error'}`,
        });
        console.log(`Order ${targetOrder.id} marked as FAILED via webhook.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Razorpay webhook processing error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
