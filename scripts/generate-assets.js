const fs = require('fs');
const path = require('path');

const catDir = path.join(__dirname, '..', 'public', 'images', 'categories');
const prodDir = path.join(__dirname, '..', 'public', 'images', 'products');
const igDir = path.join(__dirname, '..', 'public', 'images', 'instagram');

[catDir, prodDir, igDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Helper for luxury SVG wrapper
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
    <filter id="boutiqueShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#70152C" flood-opacity="0.14" />
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#C49A45" flood-opacity="0.1" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="800" fill="url(#bgGrad)" />

  <!-- Subtle Boutique Border -->
  <rect x="28" y="28" width="744" height="744" rx="16" fill="none" stroke="#E8D9BD" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.75" />
  <rect x="36" y="36" width="728" height="728" rx="12" fill="none" stroke="#C49A45" stroke-width="0.75" opacity="0.4" />

  <!-- Corner Flourishes -->
  <path d="M 46 66 C 56 66 66 56 66 46" fill="none" stroke="#C49A45" stroke-width="1.5" />
  <path d="M 754 66 C 744 66 734 56 734 46" fill="none" stroke="#C49A45" stroke-width="1.5" />
  <path d="M 46 734 C 56 734 66 744 66 754" fill="none" stroke="#C49A45" stroke-width="1.5" />
  <path d="M 754 734 C 744 734 734 744 734 754" fill="none" stroke="#C49A45" stroke-width="1.5" />

  <!-- Central Graphic Subject -->
  <g filter="url(#boutiqueShadow)">
    ${content}
  </g>

  <!-- Label / Tag -->
  ${label ? `
  <g transform="translate(400, 710)">
    <rect x="-140" y="-22" width="280" height="44" rx="22" fill="#FFFDF8" stroke="#E8D9BD" stroke-width="1.2" />
    <text text-anchor="middle" y="6" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="600" fill="#70152C" letter-spacing="2">${label.toUpperCase()}</text>
  </g>` : ''}

  ${badge ? `
  <g transform="translate(680, 80)">
    <circle r="34" fill="url(#burgundyGrad)" />
    <circle r="32" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <text text-anchor="middle" y="5" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFDF8" letter-spacing="1">${badge}</text>
  </g>` : ''}
</svg>`;
}

// Category SVGs
const categories = {
  'claw-clips.svg': createSvg(`
    <!-- Claw Clip Illustration -->
    <path d="M 280 430 C 270 320 330 250 400 250 C 470 250 530 320 520 430 C 490 480 310 480 280 430 Z" fill="url(#goldGrad)" opacity="0.9" />
    <!-- Teeth Interlocking -->
    <path d="M 310 430 L 320 510 L 340 430 L 355 515 L 375 430 L 395 515 L 415 430 L 435 515 L 455 430 L 475 515 L 490 430" fill="none" stroke="#70152C" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Gold Pivot Spring -->
    <circle cx="400" cy="275" r="32" fill="url(#goldGrad)" stroke="#4A0B1B" stroke-width="3" />
    <circle cx="400" cy="275" r="14" fill="#70152C" />
    <line x1="380" y1="275" x2="420" y2="275" stroke="#F2DFB3" stroke-width="4" />
  `, 'Claw Clips', 'HOT'),

  'scrunchies.svg': createSvg(`
    <!-- Scrunchie Cloud Ruffle -->
    <g fill="#F3DDE1" stroke="#70152C" stroke-width="3" stroke-linejoin="round">
      <path d="M 400 210 C 440 200 480 220 520 240 C 560 260 600 310 590 360 C 580 410 600 460 570 510 C 540 560 480 580 430 590 C 380 600 330 570 280 550 C 230 530 200 470 210 420 C 220 370 200 310 240 260 C 280 210 350 220 400 210 Z" fill="#F8E7EA" />
    </g>
    <!-- Center Hole -->
    <ellipse cx="400" cy="400" rx="90" ry="80" fill="url(#bgGrad)" stroke="#70152C" stroke-width="3" />
    <!-- Mulberry Silk Drape Folds -->
    <path d="M 330 250 C 360 300 360 350 330 380" fill="none" stroke="#C49A45" stroke-width="2.5" />
    <path d="M 470 250 C 440 300 440 350 470 380" fill="none" stroke="#C49A45" stroke-width="2.5" />
    <path d="M 400 480 C 400 520 410 550 400 580" fill="none" stroke="#C49A45" stroke-width="2.5" />
    <!-- Pearl Accent -->
    <circle cx="490" cy="470" r="14" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
  `, 'Scrunchies & Ties', 'SILK'),

  'headbands.svg': createSvg(`
    <!-- Crown Arch Headband -->
    <path d="M 210 530 C 200 300 290 190 400 190 C 510 190 600 300 590 530" fill="none" stroke="url(#burgundyGrad)" stroke-width="52" stroke-linecap="round" />
    <!-- Gold Velvet Trim -->
    <path d="M 210 530 C 200 300 290 190 400 190 C 510 190 600 300 590 530" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="12 16" />
    <!-- Pearls on Crown -->
    <circle cx="400" cy="190" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="340" cy="210" r="13" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="460" cy="210" r="13" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="285" cy="255" r="11" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    <circle cx="515" cy="255" r="11" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
  `, 'Headbands', 'CHIC'),

  'kids-clips.svg': createSvg(`
    <!-- Kids Pastel Bow & Blossom Clips -->
    <g transform="translate(400, 370)">
      <!-- Left Bow Loop -->
      <path d="M 0 0 C -120 -80 -140 80 0 20 Z" fill="#F3DDE1" stroke="#70152C" stroke-width="3" />
      <!-- Right Bow Loop -->
      <path d="M 0 0 C 120 -80 140 80 0 20 Z" fill="#F3DDE1" stroke="#70152C" stroke-width="3" />
      <!-- Tails -->
      <path d="M -15 20 L -60 120 L -20 100 L 0 30" fill="#F7F0E5" stroke="#70152C" stroke-width="2.5" />
      <path d="M 15 20 L 60 120 L 20 100 L 0 30" fill="#F7F0E5" stroke="#70152C" stroke-width="2.5" />
      <!-- Center Floral Knot -->
      <circle cx="0" cy="10" r="24" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2" />
      <circle cx="0" cy="10" r="10" fill="#70152C" />
    </g>
  `, "Kids' Clips", 'GENTLE'),

  'pearl-pins.svg': createSvg(`
    <!-- Handcrafted Pearl Bobby Pins -->
    <g transform="translate(250, 480) rotate(-45)">
      <!-- Bobby Pin Body -->
      <rect x="0" y="0" width="300" height="12" rx="6" fill="url(#goldGrad)" stroke="#4A0B1B" stroke-width="1.5" />
      <path d="M 0 32 L 280 32 C 295 32 305 20 300 6" fill="none" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" />
      <!-- Graduated Pearls -->
      <circle cx="280" cy="-8" r="28" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="225" cy="-6" r="22" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="175" cy="-4" r="17" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="132" cy="-2" r="13" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    </g>
  `, 'Pearl Pins & Beads', 'HANDMADE'),

  'new-arrivals.svg': createSvg(`
    <!-- Sparkle Diamond & Monogram Motif -->
    <g transform="translate(400, 380)">
      <circle r="140" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="6 8" />
      <circle r="120" fill="#FDFBF7" stroke="#E8D9BD" stroke-width="1" />
      <!-- 4 Point Stars -->
      <path d="M 0 -80 Q 0 0 80 0 Q 0 0 0 80 Q 0 0 -80 0 Q 0 0 0 -80 Z" fill="url(#burgundyGrad)" />
      <circle cx="0" cy="0" r="18" fill="url(#goldGrad)" />
      <!-- Mini Sparkles -->
      <circle cx="100" cy="-60" r="6" fill="url(#goldGrad)" />
      <circle cx="-90" cy="70" r="5" fill="url(#goldGrad)" />
      <circle cx="70" cy="80" r="7" fill="url(#goldGrad)" />
    </g>
  `, 'New Arrivals', 'NEW'),

  'best-sellers.svg': createSvg(`
    <!-- Crown & Laurel Wreath -->
    <g transform="translate(400, 390)">
      <path d="M -110 30 C -120 -50 -50 -120 0 -130 C 50 -120 120 -50 110 30 C 90 90 40 120 0 125 C -40 120 -90 90 -110 30 Z" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-dasharray="8 6" />
      <!-- Royal Crown -->
      <path d="M -60 30 L -80 -40 L -30 -10 L 0 -55 L 30 -10 L 80 -40 L 60 30 Z" fill="url(#burgundyGrad)" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round" />
      <circle cx="-80" cy="-45" r="8" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="0" cy="-60" r="10" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="80" cy="-45" r="8" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    </g>
  `, 'Best Sellers', 'TOP 1'),
};

for (const [filename, content] of Object.entries(categories)) {
  fs.writeFileSync(path.join(catDir, filename), content);
}

// Product SVGs
const products = {
  'tortoise-claw-1.svg': createSvg(`
    <!-- Tortoise Claw Clip Front -->
    <g transform="translate(400, 390)">
      <rect x="-170" y="-80" width="340" height="150" rx="40" fill="#99582A" stroke="#43281C" stroke-width="5" />
      <!-- Tortoise Shell Marble Spots -->
      <ellipse cx="-100" cy="-30" rx="35" ry="25" fill="#43281C" opacity="0.85" />
      <ellipse cx="-40" cy="20" rx="45" ry="30" fill="#2C1810" opacity="0.9" />
      <ellipse cx="60" cy="-40" rx="40" ry="25" fill="#43281C" opacity="0.85" />
      <ellipse cx="110" cy="15" rx="30" ry="25" fill="#FFE6A7" opacity="0.6" />
      <ellipse cx="0" cy="-10" rx="25" ry="20" fill="#FFE6A7" opacity="0.5" />
      <!-- Interlocking Teeth -->
      <g fill="#43281C">
        <path d="M -130 70 L -120 140 L -90 70 Z" />
        <path d="M -70 70 L -60 140 L -30 70 Z" />
        <path d="M -10 70 L 0 140 L 30 70 Z" />
        <path d="M 50 70 L 60 140 L 90 70 Z" />
        <path d="M 110 70 L 120 140 L 150 70 Z" />
      </g>
      <!-- Top Gold Spring -->
      <rect x="-35" y="-105" width="70" height="28" rx="8" fill="url(#goldGrad)" stroke="#2C1810" stroke-width="2" />
      <circle cx="0" cy="-91" r="7" fill="#70152C" />
    </g>
  `, 'Amber Tortoise Claw', 'PREMIUM'),

  'tortoise-claw-2.svg': createSvg(`
    <!-- Tortoise Claw Clip Open Angle -->
    <g transform="translate(400, 390) rotate(15)">
      <rect x="-160" y="-70" width="320" height="130" rx="35" fill="#2C1810" stroke="#70152C" stroke-width="4" />
      <ellipse cx="-70" cy="-20" rx="50" ry="25" fill="#D4A373" opacity="0.75" />
      <ellipse cx="70" cy="10" rx="45" ry="25" fill="#FAEDCD" opacity="0.8" />
      <!-- Teeth -->
      <path d="M -120 60 L -110 130 L -80 60 L -50 130 L -20 60 L 10 130 L 40 60 L 70 130 L 100 60" fill="none" stroke="#2C1810" stroke-width="12" stroke-linecap="round" />
    </g>
  `, 'Onyx & Cream Marble'),

  'gold-blossom-1.svg': createSvg(`
    <!-- Gilded Blossom Floral Metal Clip -->
    <g transform="translate(400, 390)">
      <!-- Sculpted Botanical Petals -->
      <path d="M 0 -130 C -80 -120 -150 -50 -160 30 C -170 110 -80 140 0 140 C 80 140 170 110 160 30 C 150 -50 80 -120 0 -130 Z" fill="none" stroke="url(#goldGrad)" stroke-width="12" />
      <!-- Hollow Floral Filigree -->
      <circle cx="-60" cy="-20" r="30" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
      <circle cx="60" cy="-20" r="30" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
      <circle cx="0" cy="40" r="35" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
      <!-- Center Bud -->
      <circle cx="0" cy="-20" r="22" fill="#70152C" stroke="url(#goldGrad)" stroke-width="3" />
      <!-- Gold Teeth -->
      <path d="M -130 80 L -120 150 L -90 80 L -60 150 L -30 80 L 0 150 L 30 80 L 60 150 L 90 80 L 120 150 L 130 80" fill="none" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" />
    </g>
  `, 'Gilded Blossom Claw', 'LUXE'),

  'gold-blossom-2.svg': createSvg(`
    <g transform="translate(400, 390)">
      <path d="M -140 -50 Q 0 -120 140 -50 Q 180 50 140 90 Q 0 150 -140 90 Q -180 50 -140 -50 Z" fill="none" stroke="url(#goldGrad)" stroke-width="14" />
      <circle cx="0" cy="0" r="45" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="-80" cy="10" r="25" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="80" cy="10" r="25" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
    </g>
  `, 'Rose Gold Blossom'),

  'silk-scrunchie-1.svg': createSvg(`
    <!-- Mulberry Silk Scrunchie Set -->
    <g transform="translate(400, 390)">
      <!-- Back Scrunchie (Burgundy) -->
      <ellipse cx="-50" cy="-40" rx="140" ry="110" fill="url(#burgundyGrad)" />
      <ellipse cx="-50" cy="-40" rx="55" ry="40" fill="url(#bgGrad)" />
      <!-- Middle Scrunchie (Champagne Gold) -->
      <ellipse cx="60" cy="-10" rx="130" ry="105" fill="url(#goldGrad)" opacity="0.95" />
      <ellipse cx="60" cy="-10" rx="50" ry="38" fill="url(#bgGrad)" />
      <!-- Front Scrunchie (Dusty Rose) -->
      <ellipse cx="0" cy="60" rx="135" ry="100" fill="#F3DDE1" stroke="#70152C" stroke-width="3" />
      <ellipse cx="0" cy="60" rx="50" ry="35" fill="url(#bgGrad)" stroke="#70152C" stroke-width="2" />
      <!-- 100% Pure Silk Ribbon Tag -->
      <rect x="-35" y="130" width="70" height="24" rx="4" fill="#70152C" />
      <text text-anchor="middle" x="0" y="146" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FDFBF7">100% SILK</text>
    </g>
  `, 'Mulberry Silk Trio', 'PURE SILK'),

  'silk-scrunchie-2.svg': createSvg(`
    <g transform="translate(400, 390)">
      <circle cx="0" cy="0" r="140" fill="#FAF6EE" stroke="url(#goldGrad)" stroke-width="6" />
      <circle cx="0" cy="0" r="60" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="3" />
      <path d="M -70 -70 C 0 -20 20 0 70 70" stroke="#C49A45" stroke-width="4" stroke-dasharray="6 6" />
    </g>
  `, 'Silk Cloud Individual'),

  'organza-cloud-1.svg': createSvg(`
    <!-- Organza Cloud Oversized -->
    <g transform="translate(400, 390)">
      <circle cx="0" cy="0" r="170" fill="#FFFDF8" stroke="#E8D9BD" stroke-width="4" opacity="0.9" />
      <path d="M -120 -100 Q 0 -180 120 -100 Q 180 0 120 100 Q 0 180 -120 100 Q -180 0 -120 -100 Z" fill="#F7F0E5" opacity="0.75" />
      <circle cx="0" cy="0" r="65" fill="url(#bgGrad)" stroke="#C49A45" stroke-width="2" />
      <!-- Pearl Droplet Charm -->
      <line x1="80" y1="80" x2="110" y2="130" stroke="url(#goldGrad)" stroke-width="3" />
      <circle cx="110" cy="135" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    </g>
  `, 'Organza Cloud Scrunchie', 'NEW'),

  'velvet-headband-1.svg': createSvg(`
    <!-- Royal Padded Velvet Headband -->
    <g transform="translate(400, 420)">
      <path d="M -180 100 C -190 -160 -100 -260 0 -260 C 100 -260 190 -160 180 100" fill="none" stroke="url(#burgundyGrad)" stroke-width="68" stroke-linecap="round" />
      <path d="M -180 100 C -190 -160 -100 -260 0 -260 C 100 -260 190 -160 180 100" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
      <!-- Velvet Sheen Highlight -->
      <path d="M -110 -150 C -60 -210 60 -210 110 -150" fill="none" stroke="#F3DDE1" stroke-width="8" opacity="0.35" stroke-linecap="round" />
    </g>
  `, 'Padded Velvet Headband', 'ROYAL'),

  'pearl-headband-1.svg': createSvg(`
    <!-- Baroque Pearl Embellished Arch Headband -->
    <g transform="translate(400, 420)">
      <!-- Golden Slim Arch -->
      <path d="M -170 90 C -180 -150 -90 -240 0 -240 C 90 -240 180 -150 170 90" fill="none" stroke="url(#goldGrad)" stroke-width="18" stroke-linecap="round" />
      <!-- Hand-threaded Pearls -->
      <circle cx="0" cy="-240" r="22" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="-50" cy="-230" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="50" cy="-230" r="18" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="-95" cy="-200" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="95" cy="-200" r="16" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      <circle cx="-135" cy="-140" r="14" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="135" cy="-140" r="14" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="-160" cy="-70" r="12" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="160" cy="-70" r="12" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    </g>
  `, 'Baroque Pearl Headband', 'BRIDAL'),

  'pearl-pins-1.svg': createSvg(`
    <!-- Pearl Hair Pin Trio -->
    <g transform="translate(400, 390)">
      <!-- Pin 1 -->
      <g transform="rotate(-30) translate(-80, -50)">
        <rect x="0" y="0" width="220" height="8" rx="4" fill="url(#goldGrad)" />
        <circle cx="220" cy="4" r="22" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="2" />
      </g>
      <!-- Pin 2 -->
      <g transform="rotate(10) translate(-100, 0)">
        <rect x="0" y="0" width="230" height="8" rx="4" fill="url(#goldGrad)" />
        <circle cx="230" cy="4" r="15" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
        <circle cx="205" cy="4" r="11" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
        <circle cx="185" cy="4" r="8" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      </g>
      <!-- Pin 3 Branch -->
      <g transform="rotate(45) translate(-60, 40)">
        <rect x="0" y="0" width="200" height="8" rx="4" fill="url(#goldGrad)" />
        <path d="M 180 4 L 210 -15" stroke="url(#goldGrad)" stroke-width="4" />
        <circle cx="210" cy="-15" r="12" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
        <path d="M 170 4 L 195 25" stroke="url(#goldGrad)" stroke-width="4" />
        <circle cx="195" cy="25" r="10" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      </g>
    </g>
  `, 'Pearl Pin Trio', 'TRIO'),

  'hair-vine-1.svg': createSvg(`
    <!-- Bridal Hair Vine -->
    <g transform="translate(400, 390)">
      <path d="M -180 80 Q -60 -120 40 40 T 190 -80" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
      <!-- Golden Leaves -->
      <ellipse cx="-120" cy="-10" rx="20" ry="10" transform="rotate(-40 -120 -10)" fill="url(#goldGrad)" />
      <ellipse cx="-40" cy="-40" rx="20" ry="10" transform="rotate(30 -40 -40)" fill="url(#goldGrad)" />
      <ellipse cx="60" cy="10" rx="20" ry="10" transform="rotate(-25 60 10)" fill="url(#goldGrad)" />
      <ellipse cx="140" cy="-40" rx="20" ry="10" transform="rotate(45 140 -40)" fill="url(#goldGrad)" />
      <!-- Crystal Blossoms -->
      <circle cx="-150" cy="30" r="12" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="0" cy="-15" r="14" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
      <circle cx="110" cy="-10" r="12" fill="url(#pearlGrad)" stroke="#C49A45" stroke-width="1.5" />
    </g>
  `, 'Bridal Hair Vine', 'FESTIVE'),

  'kids-clips-1.svg': createSvg(`
    <!-- Kids Pastel Daisy Snap Clips -->
    <g transform="translate(400, 390)">
      <!-- Clip 1 (Pink) -->
      <g transform="translate(-100, -60) rotate(-15)">
        <rect x="0" y="0" width="160" height="42" rx="21" fill="#F3DDE1" stroke="#70152C" stroke-width="2.5" />
        <!-- Daisy Petals -->
        <circle cx="140" cy="21" r="10" fill="#FFFDF8" stroke="#70152C" stroke-width="1.5" />
        <circle cx="140" cy="21" r="5" fill="url(#goldGrad)" />
      </g>
      <!-- Clip 2 (Cream) -->
      <g transform="translate(-80, 20) rotate(10)">
        <rect x="0" y="0" width="160" height="42" rx="21" fill="#F7F0E5" stroke="#70152C" stroke-width="2.5" />
        <circle cx="140" cy="21" r="10" fill="#FAF2F4" stroke="#70152C" stroke-width="1.5" />
        <circle cx="140" cy="21" r="5" fill="#70152C" />
      </g>
      <!-- Clip 3 (Mint/Lilac) -->
      <g transform="translate(-60, 100) rotate(-5)">
        <rect x="0" y="0" width="160" height="42" rx="21" fill="#E8D9BD" stroke="#70152C" stroke-width="2.5" />
        <circle cx="140" cy="21" r="10" fill="#FFFDF8" stroke="#70152C" stroke-width="1.5" />
        <circle cx="140" cy="21" r="5" fill="url(#goldGrad)" />
      </g>
    </g>
  `, "Kids' Blossom Snap Clips", 'PACK OF 6'),

  'kids-butterfly-1.svg': createSvg(`
    <!-- Kids Flutter Butterfly Barrettes -->
    <g transform="translate(400, 380)">
      <!-- Wings -->
      <path d="M 0 0 C -90 -120 -140 -20 0 10 C 140 -20 90 -120 0 0 Z" fill="#F3DDE1" stroke="url(#goldGrad)" stroke-width="4" />
      <path d="M 0 10 C -80 30 -100 110 0 40 C 100 110 80 30 0 10 Z" fill="#FAF6EE" stroke="url(#goldGrad)" stroke-width="3" />
      <!-- Body & Antennae -->
      <ellipse cx="0" cy="15" rx="8" ry="35" fill="#70152C" />
      <path d="M -5 -15 Q -15 -40 -25 -45" stroke="#70152C" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M 5 -15 Q 15 -40 25 -45" stroke="#70152C" stroke-width="3" fill="none" stroke-linecap="round" />
    </g>
  `, 'Shimmer Butterfly Barrettes', 'GENTLE'),

  'matte-claw-1.svg': createSvg(`
    <!-- Matte Buttercup Hair Claw -->
    <g transform="translate(400, 390)">
      <rect x="-150" y="-70" width="300" height="135" rx="36" fill="#F3DDE1" stroke="#C49A45" stroke-width="3" />
      <path d="M -110 65 L -100 135 L -75 65 L -50 135 L -25 65 L 0 135 L 25 65 L 50 135 L 75 65 L 100 135 L 110 65" fill="none" stroke="#70152C" stroke-width="10" stroke-linecap="round" />
      <rect x="-30" y="-95" width="60" height="26" rx="6" fill="#70152C" />
    </g>
  `, 'Matte Pastel Buttercup Claw'),

  'satin-bow-1.svg': createSvg(`
    <!-- Champagne Satin Tail Bow -->
    <g transform="translate(400, 380)">
      <!-- Left Bow Loop -->
      <path d="M 0 0 C -140 -90 -180 70 0 25 Z" fill="url(#goldGrad)" stroke="#70152C" stroke-width="3" />
      <!-- Right Bow Loop -->
      <path d="M 0 0 C 140 -90 180 70 0 25 Z" fill="url(#goldGrad)" stroke="#70152C" stroke-width="3" />
      <!-- Long Satin Drape Tails -->
      <path d="M -20 25 C -60 100 -90 180 -110 240 L -70 230 C -50 170 -20 100 0 35" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2.5" />
      <path d="M 20 25 C 60 100 90 180 110 240 L 70 230 C 50 170 20 100 0 35" fill="url(#goldGrad)" stroke="#70152C" stroke-width="2.5" />
      <!-- Center Knot -->
      <rect x="-25" y="-5" width="50" height="40" rx="12" fill="#70152C" stroke="url(#goldGrad)" stroke-width="2" />
    </g>
  `, 'Champagne Satin Tail Bow', 'ELEGANT'),
};

for (const [filename, content] of Object.entries(products)) {
  fs.writeFileSync(path.join(prodDir, filename), content);
}

// Instagram feed visuals
const igPosts = [
  { file: 'ig-1.svg', title: 'Everyday Claw Styling' },
  { file: 'ig-2.svg', title: 'Festive Pearl Accents' },
  { file: 'ig-3.svg', title: 'Mulberry Silk Essentials' },
  { file: 'ig-4.svg', title: 'Little Princess Barrettes' },
  { file: 'ig-5.svg', title: 'Bridal Updo Elegance' },
  { file: 'ig-6.svg', title: 'Boutique Packaging & Love' },
];

igPosts.forEach((post, i) => {
  const content = createSvg(`
    <g transform="translate(400, 380)">
      <circle r="130" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="10 8" />
      <circle r="110" fill="#FAF6EE" stroke="#E8D9BD" stroke-width="1.5" />
      <text text-anchor="middle" y="5" font-family="'Cormorant Garamond', serif" font-size="28" font-weight="bold" fill="#70152C">#RumanaCreations</text>
      <text text-anchor="middle" y="40" font-family="sans-serif" font-size="14" fill="#C49A45">Post 0${i+1}</text>
    </g>
  `, post.title, 'INSTAGRAM');
  fs.writeFileSync(path.join(igDir, post.file), content);
});

console.log('Successfully generated all category, product, and Instagram visual assets!');
