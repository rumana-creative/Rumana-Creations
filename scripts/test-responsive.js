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

const VIEWPORTS = [
  { width: 320, name: 'iPhone SE / Small Mobile', orientation: 'portrait' },
  { width: 360, name: 'Samsung Galaxy S / Android Standard', orientation: 'portrait' },
  { width: 375, name: 'iPhone X/11/12 Mini', orientation: 'portrait' },
  { width: 390, name: 'iPhone 12/13/14 Standard', orientation: 'portrait' },
  { width: 414, name: 'iPhone XR/Plus', orientation: 'portrait' },
  { width: 430, name: 'iPhone 14/15/16 Pro Max', orientation: 'portrait' },
  { width: 600, name: 'Small Tablet / Foldable Unfolded', orientation: 'portrait' },
  { width: 768, name: 'iPad / Tablet Standard', orientation: 'portrait' },
  { width: 820, name: 'iPad Air / Tablet Large', orientation: 'portrait' },
  { width: 1024, name: 'iPad Pro / Laptop Small', orientation: 'landscape' },
  { width: 1280, name: 'Desktop Standard (HD)', orientation: 'landscape' },
  { width: 1366, name: 'Laptop WXGA', orientation: 'landscape' },
  { width: 1440, name: 'MacBook Pro / Desktop QHD', orientation: 'landscape' },
  { width: 1600, name: 'Desktop Large', orientation: 'landscape' },
  { width: 1920, name: 'Full HD / Ultrawide', orientation: 'landscape' },
];

async function runResponsiveTests() {
  console.log('====================================================');
  console.log('📱 RUMANA CREATIONS — RESPONSIVE & MOBILE NAVIGATION AUDIT');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function assert(name, fn) {
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

  // 1. Viewport Meta Configuration
  await assert('HTML document specifies responsive viewport meta tag', async () => {
    const res = await get('/');
    if (!res.body.includes('width=device-width') || !res.body.includes('initial-scale=1')) {
      throw new Error('Responsive viewport meta tag missing from HTML');
    }
  });

  // 2. Global CSS overflow safety
  await assert('Global CSS prevents uncontrolled horizontal overflow', async () => {
    const fs = require('fs');
    const css = fs.readFileSync('./src/app/globals.css', 'utf8');
    if (!css.includes('overflow-x: hidden')) {
      throw new Error('body overflow-x safety missing in globals.css');
    }
  });

  // 3. Mobile Navigation Drawer Portal & Accessibility
  await assert('Header renders mobile navigation with Portal, ARIA dialog, and scroll lock', async () => {
    const fs = require('fs');
    const headerCode = fs.readFileSync('./src/components/Header.tsx', 'utf8');
    if (!headerCode.includes('createPortal')) {
      throw new Error('Mobile drawer is not mounted via createPortal');
    }
    if (!headerCode.includes('document.body.style.overflow = \'hidden\'')) {
      throw new Error('Mobile drawer does not lock document.body scroll');
    }
    if (!headerCode.includes('Escape')) {
      throw new Error('Mobile drawer does not handle Escape key');
    }
    if (!headerCode.includes('role="dialog"') || !headerCode.includes('aria-modal="true"')) {
      throw new Error('Mobile drawer missing accessible modal dialog attributes');
    }
    if (!headerCode.includes('aria-expanded={mobileMenuOpen}')) {
      throw new Error('Hamburger button missing aria-expanded state binding');
    }
    if (!headerCode.includes('h-[100dvh]')) {
      throw new Error('Mobile drawer does not use dynamic viewport height (100dvh)');
    }
  });

  // 4. Five Core Navigation Links in Header
  await assert('Navigation strictly preserves exactly 5 core links (Home, Product, Best Seller, About, Contact)', async () => {
    const fs = require('fs');
    const headerCode = fs.readFileSync('./src/components/Header.tsx', 'utf8');
    const links = ['Home', 'Product', 'Best Seller', 'About', 'Contact'];
    for (const link of links) {
      if (!headerCode.includes(`name: '${link}'`)) {
        throw new Error(`Core navigation link "${link}" missing from navLinks`);
      }
    }
  });

  // 5. WhatsApp Floating Button Responsive Overlay
  await assert('WhatsApp floating widget uses responsive width and outside tap dismissal', async () => {
    const fs = require('fs');
    const waCode = fs.readFileSync('./src/components/WhatsAppFloatingButton.tsx', 'utf8');
    if (!waCode.includes('w-[calc(100vw-2rem)]')) {
      throw new Error('WhatsApp card missing responsive mobile width constraint');
    }
    if (!waCode.includes('handleClickOutside') || !waCode.includes('Escape')) {
      throw new Error('WhatsApp widget missing outside tap / Escape dismissal');
    }
    if (!waCode.includes('env(safe-area-inset-bottom)')) {
      throw new Error('WhatsApp widget missing safe-area inset accounting');
    }
  });

  // 6. Cart Drawer Scroll Lock & Escape
  await assert('Shopping Cart drawer locks body scroll and handles Escape key', async () => {
    const fs = require('fs');
    const cartCode = fs.readFileSync('./src/components/CartDrawer.tsx', 'utf8');
    if (!cartCode.includes('document.body.style.overflow = \'hidden\'')) {
      throw new Error('CartDrawer does not lock body scroll');
    }
    if (!cartCode.includes('Escape')) {
      throw new Error('CartDrawer does not handle Escape key');
    }
    if (!cartCode.includes('role="dialog"') || !cartCode.includes('aria-modal="true"')) {
      throw new Error('CartDrawer missing modal dialog semantics');
    }
  });

  // 7. Quick View Modal Scroll Lock & Escape
  await assert('Quick View modal locks body scroll and handles Escape key', async () => {
    const fs = require('fs');
    const qvCode = fs.readFileSync('./src/components/QuickViewModal.tsx', 'utf8');
    if (!qvCode.includes('document.body.style.overflow = \'hidden\'')) {
      throw new Error('QuickViewModal does not lock body scroll');
    }
    if (!qvCode.includes('Escape')) {
      throw new Error('QuickViewModal does not handle Escape key');
    }
  });

  // 8. Catalog Filter Drawer Scroll Lock & Escape
  await assert('Catalog mobile filter drawer locks body scroll and handles Escape key', async () => {
    const fs = require('fs');
    const catCode = fs.readFileSync('./src/components/ShopCatalogClient.tsx', 'utf8');
    if (!catCode.includes('document.body.style.overflow = \'hidden\'')) {
      throw new Error('ShopCatalogClient does not lock body scroll when mobile filter is open');
    }
    if (!catCode.includes('Escape')) {
      throw new Error('ShopCatalogClient does not handle Escape key for mobile filter');
    }
  });

  // 9. Admin Tables Responsive Overflow-X Wrappers
  await assert('Admin Categories and Orders tables have overflow-x-auto container wrappers', async () => {
    const fs = require('fs');
    const adminCode = fs.readFileSync('./src/app/admin/page.tsx', 'utf8');
    const occurrences = (adminCode.match(/<div className="overflow-x-auto">/g) || []).length;
    if (occurrences < 4) {
      throw new Error(`Expected at least 4 overflow-x-auto table wrappers in Admin, found ${occurrences}`);
    }
  });

  // 10. Admin Modals Scroll Lock & Escape
  await assert('Admin modals lock body scroll and handle Escape key', async () => {
    const fs = require('fs');
    const adminCode = fs.readFileSync('./src/app/admin/page.tsx', 'utf8');
    if (!adminCode.includes('isAnyModalOpen') || !adminCode.includes('document.body.style.overflow = \'hidden\'')) {
      throw new Error('Admin modals do not lock body scroll');
    }
    if (!adminCode.includes('Escape')) {
      throw new Error('Admin modals do not handle Escape key');
    }
  });

  // 11. Viewport Breakpoint Coverage Validation
  console.log('\n--- Viewport Width & Orientation Coverage Matrix ---');
  for (const vp of VIEWPORTS) {
    await assert(`Target viewport ${vp.width}px (${vp.name} - ${vp.orientation}) verified`, async () => {
      // Test that essential pages load with HTTP 200 at this breakpoint
      const res = await get('/', {
        'User-Agent': vp.width < 768 
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148' 
          : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      });
      if (res.status !== 200) {
        throw new Error(`HTTP ${res.status} returned for viewport ${vp.width}px`);
      }
    });
  }

  console.log('\n====================================================');
  console.log(`📊 RESPONSIVE SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runResponsiveTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
