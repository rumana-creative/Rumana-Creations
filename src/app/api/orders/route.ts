import { NextResponse } from 'next/server';
import { getAllOrders, createOrder, getProductById, validateCoupon } from '@/lib/db';
import { defaultStoreSettings } from '@/config/store';

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, couponCode } = body;

    if (!customer || !customer.fullName || !customer.phone || !customer.addressLine1 || !customer.city || !customer.pinCode) {
      return NextResponse.json({ success: false, error: 'Incomplete shipping details' }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Shopping cart is empty' }, { status: 400 });
    }

    // Verify stock and recalculate subtotal from database prices
    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dbProduct = getProductById(item.productId);
      if (!dbProduct) {
        return NextResponse.json({ success: false, error: `Product "${item.name}" not found.` }, { status: 400 });
      }

      let availableStock = dbProduct.stock;
      if (item.variantName && dbProduct.variants) {
        const variant = dbProduct.variants.find((v) => v.name === item.variantName);
        if (variant) {
          availableStock = variant.stock;
        }
      }

      if (availableStock < item.quantity) {
        return NextResponse.json({
          success: false,
          error: `Insufficient stock for "${dbProduct.name}" (${item.variantName || 'Standard'}). Only ${availableStock} left.`,
        }, { status: 400 });
      }

      const itemPrice = dbProduct.price;
      const itemSubtotal = itemPrice * item.quantity;
      calculatedSubtotal += itemSubtotal;

      validatedItems.push({
        productId: dbProduct.id,
        name: dbProduct.name,
        variantName: item.variantName,
        price: itemPrice,
        quantity: item.quantity,
        subtotal: itemSubtotal,
        image: dbProduct.images[0] || '/images/products/tortoise-claw-1.svg',
      });
    }

    // Server-side discount calculation
    let discount = 0;
    let validCouponCode = undefined;
    if (couponCode) {
      const couponResult = validateCoupon(couponCode, calculatedSubtotal);
      if (couponResult.isValid) {
        discount = couponResult.discount;
        validCouponCode = couponResult.coupon?.code;
      }
    }

    // Server-side shipping fee calculation
    const freeShippingThreshold = defaultStoreSettings.freeShippingThreshold;
    const shippingFee = calculatedSubtotal >= freeShippingThreshold ? 0 : defaultStoreSettings.standardShippingFee;
    const total = Math.max(0, calculatedSubtotal - discount + shippingFee);

    // Initial payment and order statuses
    let paymentStatus: 'pending' | 'cod_pending' | 'paid' = 'pending';
    if (paymentMethod === 'cod') {
      paymentStatus = 'cod_pending';
    } else if (paymentMethod === 'online') {
      // In simulation/ready mode, or set to pending if awaiting gateway verification
      paymentStatus = 'pending';
    } else if (paymentMethod === 'whatsapp') {
      paymentStatus = 'pending';
    }

    const order = createOrder({
      customer,
      items: validatedItems,
      subtotal: calculatedSubtotal,
      discount,
      couponCode: validCouponCode,
      shippingFee,
      total,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus,
      orderStatus: 'pending',
      notes: body.notes,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order,
    });
  } catch (err: any) {
    console.error('Order creation error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
