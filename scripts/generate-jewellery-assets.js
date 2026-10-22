const fs = require('fs');
const path = require('path');

const catDir = path.join(__dirname, '..', 'public', 'images', 'categories');
const prodDir = path.join(__dirname, '..', 'public', 'images', 'products');

[catDir, prodDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function createSvg(content, label = '', badge = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="60%" stop-color="#F9F3EA" />
      <stop offset="100%" stop-color="#EFE4D2" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2DFB3" />
      <stop offset="30%" stop-color="#D4AF37" />
      <stop offset="70%" stop-color="#C49A45" />
      <stop offset="100%" stop-color="#9A752A" />
    </linearGradient>
    <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9C2241" />
      <stop offset="50%" stop-color="#70152C" />
      <stop offset="100%" stop-color="#4A0B1B" />
    </linearGradient>
    <linearGradient id="pearlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FFF9F0" />
      <stop offset="80%" stop-color="#EBDBC8" />
      <stop offset="100%" stop-color="#CBB59B" />
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B5E20" />
      <stop offset="50%" stop-color="#2E7D32" />
      <stop offset="100%" stop-color="#0F3813" />
    </linearGradient>
    <filter id="boutiqueShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#70152C" flood-opacity="0.14" />
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#C49A45" flood-opacity="0.1" />
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#bgGrad)" />
  <rect x="28" y="28" width="744" height="744" rx="16" fill="none" stroke="#E8D9BD" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.75" />
  <rect x="36" y="36" width="728" height="728" rx="12" fill="none" stroke="#C49A45" stroke-width="0.75" opacity="0.4" />

  <g filter="url(#boutiqueShadow)">
    ${content}
  </g>

  ${badge ? `
  <g transform="translate(670, 110)">
    <circle r="44" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="2.5" />
    <text text-anchor="middle" dy="5" font-family="'Inter', sans-serif" font-size="13" font-weight="800" fill="#FFFDF8" letter-spacing="1">${badge}</text>
  </g>` : ''}

  ${label ? `
  <g transform="translate(400, 715)">
    <rect x="-180" y="-22" width="360" height="44" rx="22" fill="#FFFFFF" stroke="#E8D9BD" stroke-width="1.5" opacity="0.95" />
    <text text-anchor="middle" dy="6" font-family="'Playfair Display', serif" font-size="17" font-weight="700" fill="#70152C" letter-spacing="2">${label.toUpperCase()}</text>
  </g>` : ''}
</svg>`;
}

// 1. Category SVGs
const categorySvgs = {
  'necklaces.svg': createSvg(`
    <!-- Royal Choker & Pendant -->
    <path d="M 220 320 C 230 480 350 560 400 560 C 450 560 570 480 580 320" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" />
    <path d="M 250 350 C 260 460 350 520 400 520 C 450 520 540 460 550 350" fill="none" stroke="url(#burgundyGrad)" stroke-width="8" stroke-linecap="round" />
    <!-- Pearl Drops -->
    <circle cx="400" cy="580" r="22" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
    <circle cx="340" cy="550" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="460" cy="550" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="290" cy="500" r="13" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="510" cy="500" r="13" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <!-- Center Kundan Stone -->
    <polygon points="400,470 425,510 400,530 375,510" fill="url(#emeraldGrad)" stroke="url(#goldGrad)" stroke-width="3" />
  `, 'Necklaces & Pendants', 'ROYAL'),

  'earrings.svg': createSvg(`
    <!-- Chandbali & Jhumka Duo -->
    <g transform="translate(300, 390)">
      <circle cx="0" cy="-110" r="20" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2" />
      <path d="M -60 -40 C -70 50 70 50 60 -40 C 40 30 -40 30 -60 -40 Z" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2.5" />
      <path d="M -45 50 Q 0 85 45 50 L 35 110 Q 0 125 -35 110 Z" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="0" cy="135" r="10" fill="url(#pearlGrad)" />
      <circle cx="-25" cy="130" r="8" fill="url(#pearlGrad)" />
      <circle cx="25" cy="130" r="8" fill="url(#pearlGrad)" />
    </g>
    <g transform="translate(500, 390)">
      <circle cx="0" cy="-110" r="20" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2" />
      <path d="M -60 -40 C -70 50 70 50 60 -40 C 40 30 -40 30 -60 -40 Z" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2.5" />
      <path d="M -45 50 Q 0 85 45 50 L 35 110 Q 0 125 -35 110 Z" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="0" cy="135" r="10" fill="url(#pearlGrad)" />
      <circle cx="-25" cy="130" r="8" fill="url(#pearlGrad)" />
      <circle cx="25" cy="130" r="8" fill="url(#pearlGrad)" />
    </g>
  `, 'Earrings & Jhumkas', 'ETHNIC'),

  'rings.svg': createSvg(`
    <!-- Polki Statement Cocktail Ring -->
    <g transform="translate(400, 390)">
      <!-- Band Base -->
      <ellipse cx="0" cy="120" rx="140" ry="40" fill="none" stroke="url(#goldGrad)" stroke-width="20" />
      <!-- Center Floral Crest -->
      <circle cx="0" cy="0" r="95" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="4" />
      <circle cx="0" cy="0" r="50" fill="url(#goldGrad)" />
      <circle cx="0" cy="0" r="25" fill="#FFFFFF" stroke="#C49A45" stroke-width="2" />
      <!-- Surrounding Petals -->
      <circle cx="0" cy="-75" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="55" cy="-55" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="75" cy="0" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="55" cy="55" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="0" cy="75" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="-55" cy="55" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="-75" cy="0" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="-55" cy="-55" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    </g>
  `, 'Fashion Rings', 'POLKI'),

  'bangles.svg': createSvg(`
    <!-- Stack of Velvet & Gold Zari Bangles -->
    <g transform="translate(400, 380)">
      <ellipse cx="0" cy="-70" rx="160" ry="70" fill="none" stroke="url(#goldGrad)" stroke-width="18" />
      <ellipse cx="0" cy="-35" rx="160" ry="70" fill="none" stroke="url(#burgundyGrad)" stroke-width="22" />
      <ellipse cx="0" cy="0" rx="160" ry="70" fill="none" stroke="url(#emeraldGrad)" stroke-width="22" />
      <ellipse cx="0" cy="35" rx="160" ry="70" fill="none" stroke="url(#burgundyGrad)" stroke-width="22" />
      <ellipse cx="0" cy="70" rx="160" ry="70" fill="none" stroke="url(#goldGrad)" stroke-width="18" />
    </g>
  `, 'Bangles & Kadas', 'SET OF 12'),

  'bracelets.svg': createSvg(`
    <!-- Baroque Pearl & Charm Bracelet -->
    <g transform="translate(400, 390)">
      <ellipse cx="0" cy="0" rx="170" ry="130" fill="none" stroke="url(#goldGrad)" stroke-width="8" stroke-dasharray="24 16" />
      <!-- Baroque Pearls along path -->
      <circle cx="-160" cy="-40" r="22" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="-110" cy="-110" r="24" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="0" cy="-135" r="20" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="110" cy="-110" r="26" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="160" cy="-40" r="20" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <!-- Dangling Heart Talisman -->
      <path d="M 0 130 C -35 90 -70 140 0 200 C 70 140 35 90 0 130 Z" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2.5" />
    </g>
  `, 'Bracelets & Charms', 'CHARM'),

  'jewellery-sets.svg': createSvg(`
    <!-- Bridal Choker & Matching Earring Set -->
    <path d="M 240 280 C 250 440 360 500 400 500 C 440 500 550 440 560 280" fill="none" stroke="url(#goldGrad)" stroke-width="18" stroke-linecap="round" />
    <circle cx="400" cy="530" r="24" fill="url(#emeraldGrad)" stroke="url(#goldGrad)" stroke-width="3" />
    <g transform="translate(230, 480)">
      <ellipse cx="0" cy="0" rx="20" ry="32" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="0" cy="45" r="12" fill="url(#pearlGrad)" />
    </g>
    <g transform="translate(570, 480)">
      <ellipse cx="0" cy="0" rx="20" ry="32" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="0" cy="45" r="12" fill="url(#pearlGrad)" />
    </g>
  `, 'Jewellery Sets', 'COMBO'),

  'fashion-jewellery.svg': createSvg(`
    <!-- Kundan Hair Tikka & Brooch -->
    <g transform="translate(400, 360)">
      <line x1="0" y1="-140" x2="0" y2="0" stroke="url(#goldGrad)" stroke-width="6" stroke-dasharray="10 8" />
      <polygon points="0,-10 60,60 0,130 -60,60" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="4" />
      <circle cx="0" cy="60" r="30" fill="url(#goldGrad)" />
      <circle cx="0" cy="60" r="15" fill="#FFFFFF" />
      <!-- Pearl Latkan -->
      <circle cx="0" cy="165" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="-35" cy="140" r="12" fill="url(#pearlGrad)" />
      <circle cx="35" cy="140" r="12" fill="url(#pearlGrad)" />
    </g>
  `, 'Fashion & Costume', 'BOUTIQUE'),

  'craft-materials.svg': createSvg(`
    <!-- Beads, Findings & Wire Spool -->
    <g transform="translate(400, 380)">
      <!-- Wire Spool -->
      <rect x="-120" y="-80" width="240" height="160" rx="20" fill="url(#goldGrad)" stroke="#4A0B1B" stroke-width="3" />
      <line x1="-100" y1="-40" x2="100" y2="-40" stroke="#FFF" stroke-width="4" opacity="0.6" />
      <line x1="-100" y1="0" x2="100" y2="0" stroke="#FFF" stroke-width="4" opacity="0.6" />
      <line x1="-100" y1="40" x2="100" y2="40" stroke="#FFF" stroke-width="4" opacity="0.6" />
      <!-- Scattered Craft Beads -->
      <circle cx="-160" cy="110" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="-110" cy="130" r="16" fill="url(#emeraldGrad)" />
      <circle cx="-50" cy="120" r="15" fill="url(#burgundyGrad)" />
      <circle cx="30" cy="130" r="18" fill="url(#goldGrad)" />
      <circle cx="100" cy="110" r="16" fill="url(#pearlGrad)" />
      <circle cx="160" cy="130" r="17" fill="url(#emeraldGrad)" />
    </g>
  `, 'Jewellery-Making Materials', 'DIY CRAFT')
};

for (const [filename, content] of Object.entries(categorySvgs)) {
  fs.writeFileSync(path.join(catDir, filename), content);
  console.log(`Generated category asset: ${filename}`);
}

// 2. Product SVGs for New Categories
const productSvgs = {
  'choker-necklace-1.svg': categorySvgs['necklaces.svg'],
  'layered-pendant-1.svg': createSvg(`
    <path d="M 280 280 C 290 400 370 470 400 470 C 430 470 510 400 520 280" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <path d="M 230 260 C 240 440 360 550 400 550 C 440 550 560 440 570 260" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-dasharray="14 10" />
    <circle cx="400" cy="470" r="14" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="400" cy="575" r="25" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2" />
  `, 'Layered Pendant', 'TRENDING'),

  'chandbali-earrings-1.svg': categorySvgs['earrings.svg'],
  'huggie-hoops-1.svg': createSvg(`
    <g transform="translate(400, 380)">
      <circle cx="-80" cy="0" r="70" fill="none" stroke="url(#goldGrad)" stroke-width="24" />
      <circle cx="80" cy="0" r="70" fill="none" stroke="url(#goldGrad)" stroke-width="24" />
    </g>
  `, 'Chunky Huggie Hoops', 'MINIMAL'),

  'polki-ring-1.svg': categorySvgs['rings.svg'],
  'stackable-rings-1.svg': createSvg(`
    <g transform="translate(400, 380)">
      <ellipse cx="0" cy="-60" rx="140" ry="45" fill="none" stroke="url(#goldGrad)" stroke-width="12" />
      <ellipse cx="0" cy="0" rx="140" ry="45" fill="none" stroke="url(#burgundyGrad)" stroke-width="14" stroke-dasharray="10 8" />
      <ellipse cx="0" cy="60" rx="140" ry="45" fill="none" stroke="url(#goldGrad)" stroke-width="12" />
    </g>
  `, 'Stackable Bands (3 pcs)', 'SET'),

  'velvet-bangles-1.svg': categorySvgs['bangles.svg'],
  'antique-kada-1.svg': createSvg(`
    <g transform="translate(400, 380)">
      <ellipse cx="0" cy="0" rx="160" ry="80" fill="none" stroke="url(#goldGrad)" stroke-width="38" />
      <ellipse cx="0" cy="0" rx="160" ry="80" fill="none" stroke="#70152C" stroke-width="4" stroke-dasharray="14 10" />
      <circle cx="160" cy="0" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
    </g>
  `, 'Antique Filigree Kada', 'ANTIQUE'),

  'baroque-bracelet-1.svg': categorySvgs['bracelets.svg'],
  'evil-eye-bracelet-1.svg': createSvg(`
    <g transform="translate(400, 390)">
      <ellipse cx="0" cy="0" rx="170" ry="110" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-dasharray="28 14" />
      <g transform="translate(0, 110)">
        <ellipse cx="0" cy="0" rx="45" ry="30" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" />
        <circle cx="0" cy="0" r="18" fill="#0284C7" />
        <circle cx="0" cy="0" r="8" fill="#000000" />
      </g>
    </g>
  `, 'Evil Eye Charm Bracelet', 'LUCKY'),

  'royal-jewellery-set-1.svg': categorySvgs['jewellery-sets.svg'],
  'pearl-duo-set-1.svg': createSvg(`
    <path d="M 260 290 C 270 440 370 510 400 510 C 430 510 530 440 540 290" fill="none" stroke="url(#goldGrad)" stroke-width="5" />
    <circle cx="400" cy="535" r="25" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
    <circle cx="260" cy="450" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="540" cy="450" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
  `, 'Pearl Solitaire & Studs', 'CLASSIC'),

  'matha-patti-1.svg': categorySvgs['fashion-jewellery.svg'],
  'diy-craft-kit-1.svg': categorySvgs['craft-materials.svg'],
  'jump-rings-pack-1.svg': createSvg(`
    <g transform="translate(400, 380)">
      <circle cx="-70" cy="-60" r="40" fill="none" stroke="url(#goldGrad)" stroke-width="14" stroke-dasharray="210 20" />
      <circle cx="70" cy="-60" r="40" fill="none" stroke="url(#goldGrad)" stroke-width="14" stroke-dasharray="210 20" />
      <circle cx="-70" cy="60" r="30" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-dasharray="160 16" />
      <circle cx="70" cy="60" r="30" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-dasharray="160 16" />
    </g>
  `, 'Craft Jump Rings (300 pcs)', 'FINDINGS')
};

for (const [filename, content] of Object.entries(productSvgs)) {
  fs.writeFileSync(path.join(prodDir, filename), content);
  console.log(`Generated product asset: ${filename}`);
}

console.log('✨ All new jewellery category and product assets generated successfully!');
