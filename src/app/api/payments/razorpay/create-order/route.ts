import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getOrderById, updateOrderStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Store Order ID is required' }, { status: 400 });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: `Order ${orderId} not found` }, { status: 404 });
    }

    if (order.paymentStatus === 'paid') {
      return NextResponse.json({ success: false, error: 'Order is already paid.' }, { status: 400 });
    }

    if (order.orderStatus === 'cancelled') {
      return NextResponse.json({ success: false, error: 'Order has been cancelled.' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({
        success: false,
        configured: false,
        error: 'Razorpay credentials are not configured on the server. Please provide RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
      }, { status: 503 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Calculate integer paise
    const amountInPaise = Math.round(order.total * 100);

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.id,
      notes: {
        storeOrderId: order.id,
        customerName: order.customer.fullName,
        customerPhone: order.customer.phone,
      },
    });

    // Associate Razorpay Order ID with our store order
    updateOrderStatus(order.id, {
      razorpayOrderId: razorpayOrder.id,
    });

    return NextResponse.json({
      success: true,
      configured: true,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      keyId,
      orderId: order.id,
      customerName: order.customer.fullName,
      customerEmail: order.customer.email || 'care@rumanacreations.com',
      customerPhone: order.customer.phone,
    });
  } catch (err: any) {
    console.error('Razorpay order creation error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
