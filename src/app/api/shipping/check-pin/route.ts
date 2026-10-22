import { NextResponse } from 'next/server';
import { getStoreSettings } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { pinCode } = await request.json();

    if (!pinCode) {
      return NextResponse.json({ success: false, error: 'PIN code is required' }, { status: 400 });
    }

    const cleanPin = String(pinCode).trim().replace(/[^0-9]/g, '');

    // Validate 6 digit format for India
    if (cleanPin.length !== 6 || cleanPin.startsWith('0')) {
      return NextResponse.json({
        success: false,
        isServiceable: false,
        error: 'Please enter a valid 6-digit Indian postal PIN code.',
      }, { status: 400 });
    }

    const settings = getStoreSettings();

    // Check custom serviceable list if configured by admin
    if (settings.serviceablePinCodes && settings.serviceablePinCodes.length > 0) {
      const isConfigured = settings.serviceablePinCodes.includes(cleanPin);
      if (!isConfigured) {
        return NextResponse.json({
          success: true,
          isServiceable: false,
          pinCode: cleanPin,
          message: `Delivery is currently not available to PIN code ${cleanPin}.`,
        });
      }
    }

    // Determine estimated delivery based on Indian PIN prefix (tier 1 metros vs standard)
    // 11-13 (Delhi NCR), 40 (Mumbai), 56 (Bengaluru), 60 (Chennai), 70 (Kolkata), 50 (Hyderabad)
    const metroPrefixes = ['11', '12', '13', '40', '56', '60', '70', '50'];
    const isMetro = metroPrefixes.some((p) => cleanPin.startsWith(p));

    const estimatedDays = isMetro
      ? settings.deliveryEstimateMetro || '2 to 4 business days'
      : settings.deliveryEstimateStandard || '4 to 7 business days';

    return NextResponse.json({
      success: true,
      isServiceable: true,
      pinCode: cleanPin,
      isMetro,
      estimatedDelivery: estimatedDays,
      standardShippingFee: settings.standardShippingFee,
      freeShippingThreshold: settings.freeShippingThreshold,
      codAvailable: settings.codEnabled,
      message: `Delivery available to ${cleanPin}. Estimated dispatch: ${estimatedDays}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
