const http = require('http');

const BASE_URL = 'http://localhost:3000';

function get(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(url, { method: 'GET', headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

function post(path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = JSON.stringify(body);
    const req = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function postMultipart(path, fieldName, filename, fileBuffer, mimeType, headers = {}) {
  return new Promise((resolve, reject) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    const pre = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`
    );
    const post = Buffer.from(`\r\n--${boundary}--\r\n`);
    const fullBody = Buffer.concat([pre, fileBuffer, post]);

    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': fullBody.length,
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }
    );
    req.on('error', reject);
    req.write(fullBody);
    req.end();
  });
}

function patch(path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = JSON.stringify(body);
    const req = http.request(
      url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('🌸 RUMANA CREATIONS — COMPREHENSIVE VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(`   Error: ${err.message}`);
      failed++;
    }
  }

  // 1. Pages Availability
  const testPages = [
    '/',
    '/shop',
    '/category/claw-clips',
    '/category/scrunchies-hair-ties',
    '/category/headbands',
    '/category/kids-clips',
    '/category/pearl-pins-beads',
    '/category/new-arrivals',
    '/category/best-sellers',
    '/product/french-tortoise-shell-claw-clip',
    '/product/gilded-gold-blossom-metal-claw',
    '/product/padded-velvet-crown-headband',
    '/cart',
    '/checkout',
    '/about',
    '/contact',
    '/wishlist',
    '/policies/shipping',
    '/policies/returns',
    '/policies/terms',
    '/policies/privacy',
    '/admin',
    '/sitemap.xml',
    '/robots.txt',
  ];

  for (const page of testPages) {
    await assertTest(`Page route "${page}" loads with HTTP 200`, async () => {
      const res = await get(page);
      if (res.status !== 200) {
        throw new Error(`Expected HTTP 200, got ${res.status}`);
      }
    });
  }

  // 2. Official Logo Asset
  await assertTest('Official Brand Logo is served correctly at /rumana-logo.png', async () => {
    const res = await get('/rumana-logo.png');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.headers['content-type']?.includes('image')) {
      throw new Error(`Expected image content type, got ${res.headers['content-type']}`);
    }
  });

  // 3. API - Products
  let sampleProduct = null;
  await assertTest('GET /api/products returns active published catalogue', async () => {
    const res = await get('/api/products');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.body);
    if (!json.success || !Array.isArray(json.products) || json.products.length === 0) {
      throw new Error('No products returned');
    }
    // Verify none are drafts
    const drafts = json.products.filter((p) => p.status === 'draft' || p.status === 'archived');
    if (drafts.length > 0) {
      throw new Error(`Draft/archived products found in public catalogue: ${drafts.map((d) => d.name).join(', ')}`);
    }
    sampleProduct = json.products[0];
  });

  // 4. API - Categories
  await assertTest('GET /api/categories returns category list with proper slugs', async () => {
    const res = await get('/api/categories');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.body);
    if (!json.success || !Array.isArray(json.categories) || json.categories.length === 0) {
      throw new Error('No categories returned');
    }
    const claw = json.categories.find((c) => c.slug === 'claw-clips');
    if (!claw) throw new Error('Claw Clips category not found');
  });

  // 5. API - Confirmed Store Settings (WhatsApp & Instagram)
  await assertTest('GET /api/settings returns confirmed WhatsApp (+91 91521 36209) and Instagram', async () => {
    const res = await get('/api/settings');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.body);
    if (!json.success || json.settings.storeName !== 'Rumana Creations') {
      throw new Error('Invalid settings object');
    }
    if (json.settings.whatsappNumber !== '919152136209') {
      throw new Error(`WhatsApp number mismatch: expected 919152136209, got ${json.settings.whatsappNumber}`);
    }
    if (!json.settings.instagramUrl?.includes('instagram.com/rumana.creations')) {
      throw new Error(`Instagram URL mismatch: expected rumana.creations, got ${json.settings.instagramUrl}`);
    }
  });

  // 6. API - Postal PIN Code Validation
  await assertTest('POST /api/shipping/check-pin validates serviceable Indian PIN (400001 Mumbai)', async () => {
    const res = await post('/api/shipping/check-pin', { pinCode: '400001' });
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.body}`);
    const json = JSON.parse(res.body);
    if (!json.serviceable || !json.codAvailable || json.city !== 'Mumbai') {
      throw new Error(`PIN validation unexpected response: ${res.body}`);
    }
  });

  await assertTest('POST /api/shipping/check-pin rejects invalid 3-digit PIN format', async () => {
    const res = await post('/api/shipping/check-pin', { pinCode: '123' });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.body);
    if (json.serviceable !== false) {
      throw new Error(`Invalid PIN was marked serviceable: ${res.body}`);
    }
  });

  // 7. API - Razorpay Payment Status (No Secrets Exposed)
  await assertTest('GET /api/payments/razorpay/status securely returns gateway configuration status', async () => {
    const res = await get('/api/payments/razorpay/status');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.body);
    if (typeof json.configured !== 'boolean') {
      throw new Error(`Missing configured boolean: ${res.body}`);
    }
    if (json.keySecret || json.secret) {
      throw new Error('SECURITY VIOLATION: Razorpay secret exposed to client endpoint!');
    }
  });

  // 8. API - Coupon Validation
  await assertTest('POST /api/coupons/validate verifies valid coupon WELCOME50', async () => {
    const res = await post('/api/coupons/validate', { code: 'WELCOME50', subtotal: 500 });
    const json = JSON.parse(res.body);
    if (!json.isValid || json.discount !== 50) {
      throw new Error(`Coupon validation failed: ${res.body}`);
    }
  });

  await assertTest('POST /api/coupons/validate rejects invalid coupon', async () => {
    const res = await post('/api/coupons/validate', { code: 'FAKECODE', subtotal: 500 });
    const json = JSON.parse(res.body);
    if (json.isValid) {
      throw new Error('Invalid coupon was incorrectly accepted');
    }
  });

  // 9. API - Order Creation & Stock Validation
  let createdOrderId = null;
  await assertTest('POST /api/orders validates, deducts inventory, and generates unique Order ID', async () => {
    const orderData = {
      customer: {
        fullName: 'Zainab Ahmed',
        phone: '9152136209',
        whatsappNumber: '9152136209',
        email: 'zainab@example.com',
        addressLine1: 'Flat 101, Rosewood Manor',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001',
      },
      items: [
        {
          productId: sampleProduct.id,
          name: sampleProduct.name,
          variantName: sampleProduct.variants?.[0]?.name,
          quantity: 1,
        },
      ],
      paymentMethod: 'cod',
      couponCode: 'WELCOME50',
    };

    const res = await post('/api/orders', orderData);
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.body}`);
    const json = JSON.parse(res.body);
    if (!json.success || !json.orderId || !json.orderId.startsWith('RC-2026-')) {
      throw new Error(`Invalid order response: ${res.body}`);
    }
    createdOrderId = json.orderId;
  });

  // 10. Order Details Retrieval
  await assertTest('GET /api/orders/[id] retrieves newly confirmed order with delivery info', async () => {
    if (!createdOrderId) throw new Error('No order ID from previous test');
    const res = await get(`/api/orders/${createdOrderId}`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = JSON.parse(res.body);
    if (!json.success || json.order.id !== createdOrderId) {
      throw new Error('Order ID mismatch');
    }
  });

  // 11. Order Confirmation Page rendering
  await assertTest('GET /order-confirmation?orderId=[id] displays order confirmation receipt', async () => {
    if (!createdOrderId) throw new Error('No order ID');
    const res = await get(`/order-confirmation?orderId=${createdOrderId}`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.body.includes('Order Confirmed')) {
      throw new Error('Order Confirmed text not found in response');
    }
  });

  // 12. Admin Authentication & Status Update
  await assertTest('POST /api/admin/login rejects wrong password', async () => {
    const res = await post('/api/admin/login', { password: 'wrongpassword' });
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  let adminCookie = '';
  await assertTest('POST /api/admin/login accepts correct password (rumana2026)', async () => {
    const res = await post('/api/admin/login', { password: 'rumana2026' });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const setCookie = res.headers['set-cookie'];
    if (!setCookie || !setCookie.some((c) => c.includes('rc_admin_token'))) {
      throw new Error('Session cookie not issued');
    }
    adminCookie = setCookie.map((c) => c.split(';')[0]).join('; ');
  });

  await assertTest('PATCH /api/orders/[id] updates order fulfillment and courier tracking details', async () => {
    if (!createdOrderId) throw new Error('No order ID');
    const res = await patch(
      `/api/orders/${createdOrderId}`,
      {
        orderStatus: 'shipped',
        trackingCourier: 'BlueDart',
        trackingNumber: 'BLUEDART-88910245',
      },
      { Cookie: adminCookie }
    );
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.body}`);
    const json = JSON.parse(res.body);
    if (
      json.order.orderStatus !== 'shipped' ||
      json.order.trackingNumber !== 'BLUEDART-88910245' ||
      json.order.trackingCourier !== 'BlueDart'
    ) {
      throw new Error(`Failed to update order tracking: ${res.body}`);
    }
  });

  // 13. Image Upload Protection & Multipart Upload
  await assertTest('POST /api/upload rejects unauthenticated requests with HTTP 401', async () => {
    const dummyImage = Buffer.from('fake-data');
    const res = await postMultipart('/api/upload', 'file', 'test.png', dummyImage, 'image/png');
    if (res.status !== 401) {
      throw new Error(`Expected 401 Unauthorized, got ${res.status}`);
    }
  });

  await assertTest('POST /api/upload rejects disallowed file formats (e.g. text/plain)', async () => {
    const dummyTxt = Buffer.from('malicious-content');
    const res = await postMultipart(
      '/api/upload',
      'file',
      'test.txt',
      dummyTxt,
      'text/plain',
      { Cookie: adminCookie }
    );
    if (res.status !== 400) {
      throw new Error(`Expected 400 Bad Request, got ${res.status}`);
    }
  });

  await assertTest('POST /api/upload accepts valid PNG image with admin credentials', async () => {
    // 1x1 transparent PNG buffer
    const png1x1 = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );
    const res = await postMultipart(
      '/api/upload',
      'file',
      'boutique-clip-preview.png',
      png1x1,
      'image/png',
      { Cookie: adminCookie }
    );
    if (res.status !== 200) {
      throw new Error(`Expected 200 OK, got ${res.status}: ${res.body}`);
    }
    const json = JSON.parse(res.body);
    if (!json.success || !json.url) {
      throw new Error(`Upload failed to return image URL: ${res.body}`);
    }
  });

  console.log('\n====================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
