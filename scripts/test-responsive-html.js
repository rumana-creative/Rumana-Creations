const http = require('http');

async function testPageIntegrity(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        const hasViewport = data.includes('name="viewport"');
        const hasLogo = data.includes('/rumana-logo.png');
        const hasTitle = data.includes('<title>');
        resolve({ urlPath, status: res.statusCode, hasViewport, hasLogo, hasTitle, length: data.length });
      });
    }).on('error', reject);
  });
}

async function run() {
  const pages = [
    '/',
    '/shop',
    '/category/claw-clips',
    '/category/patterned-hair-clips',
    '/category/necklaces',
    '/category/jewellery-making-materials',
    '/product/french-tortoise-shell-claw-clip',
    '/product/safari-chic-patterned-oval-hair-clips-set',
    '/product/royal-kundan-meenakari-choker-necklace',
    '/product/festive-rani-pink-kundan-cluster-pearl-choker-set',
    '/cart',
    '/checkout',
    '/admin'
  ];
  for (const p of pages) {
    const res = await testPageIntegrity(p);
    console.log(`Verified ${p}: status=${res.status}, hasViewport=${res.hasViewport}, hasLogo=${res.hasLogo}, length=${res.length} bytes`);
  }
}

run();
