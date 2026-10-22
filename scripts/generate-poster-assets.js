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
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5F5F5" />
      <stop offset="40%" stop-color="#DCDCDC" />
      <stop offset="70%" stop-color="#B0B0B0" />
      <stop offset="100%" stop-color="#6B6B6B" />
    </linearGradient>
    <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5277" />
      <stop offset="50%" stop-color="#D81B60" />
      <stop offset="100%" stop-color="#880E4F" />
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFCC80" />
      <stop offset="50%" stop-color="#FB8C00" />
      <stop offset="100%" stop-color="#E65100" />
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFB2C9" />
      <stop offset="50%" stop-color="#F06292" />
      <stop offset="100%" stop-color="#AD1457" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B2EBF2" />
      <stop offset="50%" stop-color="#4DD0E1" />
      <stop offset="100%" stop-color="#00838F" />
    </linearGradient>
    <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF59D" />
      <stop offset="50%" stop-color="#FDD835" />
      <stop offset="100%" stop-color="#F57F17" />
    </linearGradient>
    <filter id="boutiqueShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#70152C" flood-opacity="0.14" />
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#C49A45" flood-opacity="0.1" />
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
    <text text-anchor="middle" dy="5" font-family="'Inter', sans-serif" font-size="12" font-weight="800" fill="#FFFDF8" letter-spacing="1">${badge}</text>
  </g>` : ''}

  ${label ? `
  <g transform="translate(400, 715)">
    <rect x="-190" y="-22" width="380" height="44" rx="22" fill="#FFFFFF" stroke="#E8D9BD" stroke-width="1.5" opacity="0.95" />
    <text text-anchor="middle" dy="6" font-family="'Playfair Display', serif" font-size="16" font-weight="700" fill="#70152C" letter-spacing="2">${label.toUpperCase()}</text>
  </g>` : ''}
</svg>`;
}

// 1. Category SVG: Patterned Hair Clips
const patternedClipsCategorySvg = createSvg(`
  <!-- Ceramic display tray -->
  <rect x="180" y="160" width="440" height="460" rx="36" fill="#F4EDE2" stroke="url(#goldGrad)" stroke-width="2" />
  <rect x="195" y="175" width="410" height="430" rx="28" fill="#FFFDF9" stroke="#E8D9BD" stroke-width="1" />

  <!-- 4 Distinct Patterned Hair Clips (inspired by store poster) -->
  <!-- Clip 1: Classic Safari Leopard -->
  <g transform="translate(260, 260) rotate(-15)">
    <ellipse cx="0" cy="0" rx="35" ry="75" fill="#E6C894" stroke="#9A752A" stroke-width="1.5" />
    <!-- Leopard spots -->
    <path d="M-12,-40 C-8,-45 -4,-42 -6,-36 C-8,-30 -14,-34 -12,-40 Z" fill="#42250F" />
    <path d="M8,-25 C14,-30 18,-24 16,-18 C14,-12 6,-16 8,-25 Z" fill="#42250F" />
    <path d="M-18,-10 C-12,-16 -6,-10 -10,-4 C-14,2 -22,-4 -18,-10 Z" fill="#42250F" />
    <path d="M4,10 C10,5 15,12 12,18 C9,24 2,18 4,10 Z" fill="#42250F" />
    <path d="M-10,35 C-6,30 -2,36 -4,42 C-6,48 -14,44 -10,35 Z" fill="#42250F" />
    <circle cx="0" cy="55" r="5" fill="url(#goldGrad)" />
  </g>

  <!-- Clip 2: Sky Blue Cheetah Spots -->
  <g transform="translate(380, 240) rotate(5)">
    <ellipse cx="0" cy="0" rx="35" ry="75" fill="#D4EAF7" stroke="#7BA4B8" stroke-width="1.5" />
    <!-- Cheetah rosettes -->
    <path d="M-10,-35 C-6,-40 -2,-36 -4,-30 C-6,-24 -14,-28 -10,-35 Z" fill="#1C3F5E" />
    <path d="M10,-18 C15,-22 18,-16 15,-10 C12,-4 5,-10 10,-18 Z" fill="#1C3F5E" />
    <path d="M-12,5 C-8,0 -2,6 -5,12 C-8,18 -16,14 -12,5 Z" fill="#1C3F5E" />
    <path d="M6,28 C12,24 16,30 13,36 C10,42 3,36 6,28 Z" fill="#1C3F5E" />
    <circle cx="0" cy="55" r="5" fill="url(#goldGrad)" />
  </g>

  <!-- Clip 3: Olive Safari Print -->
  <g transform="translate(490, 280) rotate(25)">
    <ellipse cx="0" cy="0" rx="35" ry="75" fill="#CCD5B8" stroke="#687352" stroke-width="1.5" />
    <path d="M-12,-35 C-8,-40 -2,-35 -5,-28 C-8,-22 -16,-26 -12,-35 Z" fill="#2E381A" />
    <path d="M8,-15 C14,-20 18,-14 15,-8 C12,-2 5,-8 8,-15 Z" fill="#2E381A" />
    <path d="M-10,12 C-6,6 -1,12 -4,18 C-7,24 -15,20 -10,12 Z" fill="#2E381A" />
    <circle cx="0" cy="55" r="5" fill="url(#goldGrad)" />
  </g>

  <!-- Clip 4: Charcoal & Pearl Marble Swirl -->
  <g transform="translate(320, 440) rotate(-10)">
    <ellipse cx="0" cy="0" rx="35" ry="75" fill="#E8ECEF" stroke="#9099A0" stroke-width="1.5" />
    <path d="M-20,-40 Q0,-20 10,-45 Q5,-10 -15,10 Q10,30 -5,50" fill="none" stroke="#495057" stroke-width="5" stroke-linecap="round" opacity="0.6" />
    <circle cx="0" cy="55" r="5" fill="url(#goldGrad)" />
  </g>

  <!-- Clip 5: Amber Tortoiseshell -->
  <g transform="translate(440, 460) rotate(15)">
    <ellipse cx="0" cy="0" rx="35" ry="75" fill="url(#amberGrad)" stroke="#B25900" stroke-width="1.5" opacity="0.95" />
    <circle cx="-12" cy="-25" r="10" fill="#3E1A00" opacity="0.75" />
    <circle cx="10" cy="-5" r="14" fill="#3E1A00" opacity="0.7" />
    <circle cx="-6" cy="22" r="12" fill="#3E1A00" opacity="0.75" />
    <circle cx="0" cy="55" r="5" fill="url(#goldGrad)" />
  </g>
`, 'Patterned Hair Clips', 'POSTER');

fs.writeFileSync(path.join(catDir, 'patterned-hair-clips.svg'), patternedClipsCategorySvg, 'utf8');

// 2. Product SVGs for Poster Items
const posterProductSvgs = {
  // Safari Patterned Clips
  'safari-patterned-clips-1.svg': createSvg(`
    <rect x="140" y="140" width="520" height="520" rx="40" fill="#FAF5ED" stroke="url(#goldGrad)" stroke-width="2" />
    <!-- 4 oval clips in a neat tray -->
    <g transform="translate(240, 280) rotate(-10)">
      <ellipse cx="0" cy="0" rx="40" ry="90" fill="#E8CDA0" stroke="#9A752A" stroke-width="2" />
      <path d="M-15,-50 C-10,-55 -5,-50 -8,-42 C-11,-34 -19,-38 -15,-50 Z" fill="#3B1E08" />
      <path d="M12,-30 C18,-35 22,-28 19,-20 C16,-12 8,-18 12,-30 Z" fill="#3B1E08" />
      <path d="M-18,-10 C-12,-18 -4,-10 -9,-2 C-14,6 -24,-2 -18,-10 Z" fill="#3B1E08" />
      <path d="M5,15 C12,8 18,16 14,24 C10,32 2,24 5,15 Z" fill="#3B1E08" />
      <path d="M-12,45 C-8,38 -2,46 -5,54 C-8,62 -18,56 -12,45 Z" fill="#3B1E08" />
      <circle cx="0" cy="70" r="6" fill="url(#goldGrad)" />
    </g>
    <g transform="translate(360, 270) rotate(5)">
      <ellipse cx="0" cy="0" rx="40" ry="90" fill="#D0E8F2" stroke="#6096BA" stroke-width="2" />
      <path d="M-14,-45 C-10,-50 -4,-46 -7,-38 C-10,-30 -18,-34 -14,-45 Z" fill="#1C3F5E" />
      <path d="M10,-20 C16,-26 20,-18 17,-10 C14,-2 6,-10 10,-20 Z" fill="#1C3F5E" />
      <path d="M-14,10 C-8,2 -2,10 -6,18 C-10,26 -20,20 -14,10 Z" fill="#1C3F5E" />
      <path d="M8,38 C14,32 18,40 15,48 C12,56 4,48 8,38 Z" fill="#1C3F5E" />
      <circle cx="0" cy="70" r="6" fill="url(#goldGrad)" />
    </g>
    <g transform="translate(480, 290) rotate(20)">
      <ellipse cx="0" cy="0" rx="40" ry="90" fill="#C5D3A8" stroke="#5C6B3D" stroke-width="2" />
      <path d="M-14,-40 C-10,-46 -4,-40 -7,-32 C-10,-24 -18,-28 -14,-40 Z" fill="#243010" />
      <path d="M10,-15 C16,-22 20,-14 17,-6 C14,2 6,-6 10,-15 Z" fill="#243010" />
      <path d="M-12,18 C-6,10 0,18 -4,26 C-8,34 -18,28 -12,18 Z" fill="#243010" />
      <circle cx="0" cy="70" r="6" fill="url(#goldGrad)" />
    </g>
    <g transform="translate(400, 500) rotate(-5)">
      <ellipse cx="0" cy="0" rx="40" ry="90" fill="url(#amberGrad)" stroke="#B25900" stroke-width="2" />
      <circle cx="-14" cy="-30" r="14" fill="#3E1A00" opacity="0.75" />
      <circle cx="12" cy="-6" r="18" fill="#3E1A00" opacity="0.7" />
      <circle cx="-8" cy="28" r="16" fill="#3E1A00" opacity="0.75" />
      <circle cx="0" cy="70" r="6" fill="url(#goldGrad)" />
    </g>
  `, 'Safari Patterned Snap Clips', 'SET OF 6'),

  // Crystal Translucent Flower Claw Clip
  'crystal-flower-claw-1.svg': createSvg(`
    <!-- Acrylic 5-Petal Flower Hair Claw (Ruby Pink) -->
    <g transform="translate(400, 380)">
      <!-- Central coil spring gold -->
      <circle cx="0" cy="0" r="48" fill="url(#goldGrad)" stroke="#8C661D" stroke-width="3" />
      <!-- 5 Curving Translucent Petals with Glass Shine -->
      <!-- Petal 1: Top -->
      <path d="M-30,-35 C-60,-120 60,-120 30,-35 Z" fill="url(#pinkGrad)" opacity="0.88" stroke="#AD1457" stroke-width="2" />
      <!-- Petal 2: Top Right -->
      <path d="M25,-25 C115,-70 145,45 35,15 Z" fill="url(#pinkGrad)" opacity="0.88" stroke="#AD1457" stroke-width="2" />
      <!-- Petal 3: Bottom Right -->
      <path d="M25,25 C90,115 -10,145 0,35 Z" fill="url(#pinkGrad)" opacity="0.88" stroke="#AD1457" stroke-width="2" />
      <!-- Petal 4: Bottom Left -->
      <path d="M-25,25 C-90,115 -145,-10 -35,0 Z" fill="url(#pinkGrad)" opacity="0.88" stroke="#AD1457" stroke-width="2" />
      <!-- Petal 5: Top Left -->
      <path d="M-25,-25 C-115,-70 -45,-145 -10,-35 Z" fill="url(#pinkGrad)" opacity="0.88" stroke="#AD1457" stroke-width="2" />

      <!-- Interlocking teeth visible underneath -->
      <rect x="-8" y="-70" width="16" height="40" rx="8" fill="#FFFDF8" opacity="0.8" />
      <rect x="50" y="-30" width="16" height="40" rx="8" fill="#FFFDF8" opacity="0.8" transform="rotate(72 58 -10)" />
      <rect x="35" y="45" width="16" height="40" rx="8" fill="#FFFDF8" opacity="0.8" transform="rotate(144 43 65)" />
      <rect x="-45" y="40" width="16" height="40" rx="8" fill="#FFFDF8" opacity="0.8" transform="rotate(216 -37 60)" />
      <rect x="-60" y="-30" width="16" height="40" rx="8" fill="#FFFDF8" opacity="0.8" transform="rotate(288 -52 -10)" />

      <!-- Center Gem & Gold Ring -->
      <circle cx="0" cy="0" r="28" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="3" />
      <circle cx="0" cy="0" r="18" fill="url(#rubyGrad)" />
      <circle cx="-5" cy="-5" r="5" fill="#FFFFFF" opacity="0.8" />
    </g>
  `, 'Crystal Bloom Flower Claw', 'BOUTIQUE'),

  // Mini Pastel Butterfly Clips in Organizer Box
  'mini-butterfly-box-1.svg': createSvg(`
    <!-- Acrylic Clear Organizer Box -->
    <rect x="180" y="160" width="440" height="440" rx="24" fill="#FFFFFF" stroke="#CCD5DE" stroke-width="3" opacity="0.9" />
    <!-- Grid dividers -->
    <line x1="180" y1="306" x2="620" y2="306" stroke="#CCD5DE" stroke-width="2" />
    <line x1="180" y1="453" x2="620" y2="453" stroke="#CCD5DE" stroke-width="2" />
    <line x1="326" y1="160" x2="326" y2="600" stroke="#CCD5DE" stroke-width="2" />
    <line x1="473" y1="160" x2="473" y2="600" stroke="#CCD5DE" stroke-width="2" />

    <!-- Cute Pastel Butterflies in Compartments -->
    <!-- Cell 1: Pink Butterfly -->
    <g transform="translate(253, 233)">
      <ellipse cx="-16" cy="-12" rx="14" ry="18" fill="url(#pinkGrad)" stroke="#AD1457" stroke-width="1.5" />
      <ellipse cx="16" cy="-12" rx="14" ry="18" fill="url(#pinkGrad)" stroke="#AD1457" stroke-width="1.5" />
      <ellipse cx="-12" cy="14" rx="10" ry="12" fill="url(#pinkGrad)" stroke="#AD1457" stroke-width="1.5" />
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="url(#pinkGrad)" stroke="#AD1457" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="0" y2="20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- Cell 2: Cyan Butterfly -->
    <g transform="translate(400, 233)">
      <ellipse cx="-16" cy="-12" rx="14" ry="18" fill="url(#cyanGrad)" stroke="#00838F" stroke-width="1.5" />
      <ellipse cx="16" cy="-12" rx="14" ry="18" fill="url(#cyanGrad)" stroke="#00838F" stroke-width="1.5" />
      <ellipse cx="-12" cy="14" rx="10" ry="12" fill="url(#cyanGrad)" stroke="#00838F" stroke-width="1.5" />
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="url(#cyanGrad)" stroke="#00838F" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="0" y2="20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- Cell 3: Yellow Butterfly -->
    <g transform="translate(546, 233)">
      <ellipse cx="-16" cy="-12" rx="14" ry="18" fill="url(#marigoldGrad)" stroke="#F57F17" stroke-width="1.5" />
      <ellipse cx="16" cy="-12" rx="14" ry="18" fill="url(#marigoldGrad)" stroke="#F57F17" stroke-width="1.5" />
      <ellipse cx="-12" cy="14" rx="10" ry="12" fill="url(#marigoldGrad)" stroke="#F57F17" stroke-width="1.5" />
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="url(#marigoldGrad)" stroke="#F57F17" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="0" y2="20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- Cell 4: Lilac Butterfly -->
    <g transform="translate(253, 380)">
      <ellipse cx="-16" cy="-12" rx="14" ry="18" fill="#D1C4E9" stroke="#5E35B1" stroke-width="1.5" />
      <ellipse cx="16" cy="-12" rx="14" ry="18" fill="#D1C4E9" stroke="#5E35B1" stroke-width="1.5" />
      <ellipse cx="-12" cy="14" rx="10" ry="12" fill="#D1C4E9" stroke="#5E35B1" stroke-width="1.5" />
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="#D1C4E9" stroke="#5E35B1" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="0" y2="20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- Cell 5: Coral Butterfly -->
    <g transform="translate(400, 380)">
      <ellipse cx="-16" cy="-12" rx="14" ry="18" fill="#FFAB91" stroke="#D84315" stroke-width="1.5" />
      <ellipse cx="16" cy="-12" rx="14" ry="18" fill="#FFAB91" stroke="#D84315" stroke-width="1.5" />
      <ellipse cx="-12" cy="14" rx="10" ry="12" fill="#FFAB91" stroke="#D84315" stroke-width="1.5" />
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="#FFAB91" stroke="#D84315" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="0" y2="20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- Cell 6: Mint Butterfly -->
    <g transform="translate(546, 380)">
      <ellipse cx="-16" cy="-12" rx="14" ry="18" fill="#A7FFEB" stroke="#00BFA5" stroke-width="1.5" />
      <ellipse cx="16" cy="-12" rx="14" ry="18" fill="#A7FFEB" stroke="#00BFA5" stroke-width="1.5" />
      <ellipse cx="-12" cy="14" rx="10" ry="12" fill="#A7FFEB" stroke="#00BFA5" stroke-width="1.5" />
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="#A7FFEB" stroke="#00BFA5" stroke-width="1.5" />
      <line x1="0" y1="-18" x2="0" y2="20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    </g>
  `, 'Pastel Butterfly Organizer Set', 'PACK OF 12'),

  // Geometric Square Lucite Acetate Claw
  'geometric-square-claw-1.svg': createSvg(`
    <g transform="translate(400, 370)">
      <!-- Amber Square Hollow Claw -->
      <rect x="-140" y="-100" width="280" height="200" rx="36" fill="url(#amberGrad)" stroke="#B25900" stroke-width="4" opacity="0.95" />
      <rect x="-70" y="-50" width="140" height="100" rx="20" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="2" />
      
      <!-- Interlocking teeth -->
      <rect x="-120" y="80" width="22" height="60" rx="11" fill="url(#amberGrad)" />
      <rect x="-70" y="80" width="22" height="60" rx="11" fill="url(#amberGrad)" />
      <rect x="-20" y="80" width="22" height="60" rx="11" fill="url(#amberGrad)" />
      <rect x="30" y="80" width="22" height="60" rx="11" fill="url(#amberGrad)" />
      <rect x="80" y="80" width="22" height="60" rx="11" fill="url(#amberGrad)" />

      <!-- Top Spring Coil in Gold -->
      <rect x="-50" y="-120" width="100" height="30" rx="8" fill="url(#goldGrad)" stroke="#8C661D" stroke-width="2" />
      <line x1="-30" y1="-120" x2="-30" y2="-90" stroke="#704808" stroke-width="3" />
      <line x1="0" y1="-120" x2="0" y2="-90" stroke="#704808" stroke-width="3" />
      <line x1="30" y1="-120" x2="30" y2="-90" stroke="#704808" stroke-width="3" />
    </g>
  `, 'Geometric Square Acetate Claw', 'LIMITED'),

  // Traditional Oxidised Silver Ruby Jhumkas
  'oxidised-ruby-jhumkas-1.svg': createSvg(`
    <!-- Two-Tier Oxidised Silver Dome Jhumka Pair -->
    <!-- Left Earring -->
    <g transform="translate(300, 220)">
      <!-- Stud: Ruby Crystal Flower -->
      <circle cx="0" cy="0" r="28" fill="url(#rubyGrad)" stroke="url(#silverGrad)" stroke-width="3" />
      <circle cx="0" cy="0" r="12" fill="#FFFFFF" opacity="0.6" />
      <!-- Hanging Tier 1: Small Dome -->
      <path d="M-35,50 Q0,20 35,50 L30,75 Q0,90 -30,75 Z" fill="url(#silverGrad)" stroke="#4A4A4A" stroke-width="2" />
      <!-- Hanging Tier 2: Large Ornate Dome -->
      <path d="M-55,115 Q0,70 55,115 L50,180 Q0,210 -50,180 Z" fill="url(#silverGrad)" stroke="#4A4A4A" stroke-width="2" />
      <line x1="-50" y1="180" x2="50" y2="180" stroke="#333333" stroke-width="3" stroke-dasharray="4 4" />
      <!-- Pearl droplets -->
      <circle cx="-40" cy="205" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="-20" cy="210" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="0" cy="215" r="8" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="20" cy="210" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="40" cy="205" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
    </g>

    <!-- Right Earring -->
    <g transform="translate(500, 220)">
      <circle cx="0" cy="0" r="28" fill="url(#rubyGrad)" stroke="url(#silverGrad)" stroke-width="3" />
      <circle cx="0" cy="0" r="12" fill="#FFFFFF" opacity="0.6" />
      <path d="M-35,50 Q0,20 35,50 L30,75 Q0,90 -30,75 Z" fill="url(#silverGrad)" stroke="#4A4A4A" stroke-width="2" />
      <path d="M-55,115 Q0,70 55,115 L50,180 Q0,210 -50,180 Z" fill="url(#silverGrad)" stroke="#4A4A4A" stroke-width="2" />
      <line x1="-50" y1="180" x2="50" y2="180" stroke="#333333" stroke-width="3" stroke-dasharray="4 4" />
      <circle cx="-40" cy="205" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="-20" cy="210" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="0" cy="215" r="8" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="20" cy="210" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
      <circle cx="40" cy="205" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
    </g>
  `, 'Oxidised Ruby Jhumkas', 'HERITAGE'),

  // Sunburst Marigold Yellow Enamel Jhumkas
  'marigold-enamel-jhumkas-1.svg': createSvg(`
    <g transform="translate(300, 220)">
      <!-- Sunburst Yellow Enamel Flower Stud -->
      <circle cx="0" cy="0" r="34" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" stroke-width="3" />
      <!-- Sun rays petals -->
      <circle cx="0" cy="-38" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="27" cy="-27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="38" cy="0" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="27" cy="27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="0" cy="38" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="-27" cy="27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="-38" cy="0" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="-27" cy="-27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="0" cy="0" r="14" fill="#6A1024" />

      <!-- Golden Bell Dome -->
      <path d="M-50,90 Q0,45 50,90 L45,150 Q0,175 -45,150 Z" fill="url(#goldGrad)" stroke="#8C661D" stroke-width="2" />
      <path d="M-40,110 Q0,85 40,110" fill="none" stroke="url(#marigoldGrad)" stroke-width="6" />

      <!-- Hanging Ghungroos -->
      <circle cx="-35" cy="175" r="6" fill="url(#goldGrad)" />
      <circle cx="-18" cy="180" r="6" fill="url(#goldGrad)" />
      <circle cx="0" cy="185" r="7" fill="url(#goldGrad)" />
      <circle cx="18" cy="180" r="6" fill="url(#goldGrad)" />
      <circle cx="35" cy="175" r="6" fill="url(#goldGrad)" />
    </g>

    <g transform="translate(500, 220)">
      <circle cx="0" cy="0" r="34" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" stroke-width="3" />
      <circle cx="0" cy="-38" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="27" cy="-27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="38" cy="0" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="27" cy="27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="0" cy="38" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="-27" cy="27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="-38" cy="0" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="-27" cy="-27" r="8" fill="url(#marigoldGrad)" stroke="url(#goldGrad)" />
      <circle cx="0" cy="0" r="14" fill="#6A1024" />

      <path d="M-50,90 Q0,45 50,90 L45,150 Q0,175 -45,150 Z" fill="url(#goldGrad)" stroke="#8C661D" stroke-width="2" />
      <path d="M-40,110 Q0,85 40,110" fill="none" stroke="url(#marigoldGrad)" stroke-width="6" />

      <circle cx="-35" cy="175" r="6" fill="url(#goldGrad)" />
      <circle cx="-18" cy="180" r="6" fill="url(#goldGrad)" />
      <circle cx="0" cy="185" r="7" fill="url(#goldGrad)" />
      <circle cx="18" cy="180" r="6" fill="url(#goldGrad)" />
      <circle cx="35" cy="175" r="6" fill="url(#goldGrad)" />
    </g>
  `, 'Marigold Enamel Jhumkas', 'MEENAKARI'),

  // Dainty Black Bead Floral Chain
  'black-bead-floral-chain-1.svg': createSvg(`
    <!-- Neck Display Bust Silhouette -->
    <path d="M260,180 C260,340 320,440 400,450 C480,440 540,340 540,180" fill="none" stroke="#E8D9BD" stroke-width="2" stroke-dasharray="6 4" />
    
    <!-- Delicate Gold & Black Beaded Chain -->
    <path d="M280,200 Q400,420 520,200" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
    
    <!-- Alternating black bead stations -->
    <circle cx="310" cy="240" r="5" fill="#1A1A1A" />
    <circle cx="325" cy="260" r="5" fill="#1A1A1A" />
    <circle cx="345" cy="290" r="5" fill="#1A1A1A" />
    <circle cx="370" cy="325" r="5" fill="#1A1A1A" />

    <circle cx="490" cy="240" r="5" fill="#1A1A1A" />
    <circle cx="475" cy="260" r="5" fill="#1A1A1A" />
    <circle cx="455" cy="290" r="5" fill="#1A1A1A" />
    <circle cx="430" cy="325" r="5" fill="#1A1A1A" />

    <!-- Center Floral Pendant with Crescent Drop -->
    <g transform="translate(400, 370)">
      <circle cx="0" cy="0" r="24" fill="url(#goldGrad)" stroke="#8C661D" stroke-width="2" />
      <circle cx="0" cy="0" r="10" fill="#FFFDF8" />
      <!-- Floral Petals -->
      <circle cx="0" cy="-16" r="6" fill="#FFFDF8" />
      <circle cx="15" cy="-5" r="6" fill="#FFFDF8" />
      <circle cx="10" cy="12" r="6" fill="#FFFDF8" />
      <circle cx="-10" cy="12" r="6" fill="#FFFDF8" />
      <circle cx="-15" cy="-5" r="6" fill="#FFFDF8" />

      <!-- Hanging Crescent with Pearl -->
      <path d="M-18,22 Q0,42 18,22" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
      <circle cx="0" cy="46" r="6" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
    </g>
  `, 'Floral Black Bead Daily Chain', 'DAILY WEAR'),

  // Sparkling CZ Solitaire Tennis Station Chain
  'cz-solitaire-chain-1.svg': createSvg(`
    <!-- Rhodium Silver Delicate Tennis Station Chain -->
    <path d="M260,200 Q400,430 540,200" fill="none" stroke="url(#silverGrad)" stroke-width="3" />
    
    <!-- Shimmering CZ round stones -->
    <g transform="translate(400, 370)">
      <!-- Central Solitaire Drop -->
      <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="url(#silverGrad)" stroke-width="2" />
      <!-- Diamond Facet Star -->
      <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="#E1F5FE" opacity="0.8" />
      <circle cx="0" cy="24" r="8" fill="#FFFFFF" stroke="url(#silverGrad)" stroke-width="1.5" />
    </g>

    <!-- Flanking Floral Stations -->
    <g transform="translate(350, 340)">
      <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="url(#silverGrad)" stroke-width="1.5" />
      <polygon points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3" fill="#E1F5FE" opacity="0.75" />
    </g>
    <g transform="translate(450, 340)">
      <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="url(#silverGrad)" stroke-width="1.5" />
      <polygon points="0,-8 3,-3 8,0 3,3 0,8 -3,3 -8,0 -3,-3" fill="#E1F5FE" opacity="0.75" />
    </g>
    <g transform="translate(305, 290)">
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="url(#silverGrad)" stroke-width="1.5" />
    </g>
    <g transform="translate(495, 290)">
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="url(#silverGrad)" stroke-width="1.5" />
    </g>
  `, 'Starlet CZ Station Tennis Chain', 'RHODIUM'),

  // Festive Rani Pink Kundan & Pearl Choker Set
  'festive-rani-pink-choker-1.svg': createSvg(`
    <!-- Black Velvet Display Bust (from poster) -->
    <rect x="220" y="160" width="360" height="460" rx="28" fill="#1E191C" stroke="url(#goldGrad)" stroke-width="2" />
    
    <!-- Gold Zari Adjustable Dori -->
    <path d="M260,200 Q400,260 540,200" fill="none" stroke="url(#goldGrad)" stroke-width="4" />

    <!-- Choker band of Rani Pink Kundan Flower Motifs -->
    <g transform="translate(400, 290)">
      <!-- Central Large Flower -->
      <circle cx="0" cy="0" r="32" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="3" />
      <circle cx="0" cy="0" r="14" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="0" cy="42" r="8" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />

      <!-- Left Flower 1 -->
      <circle cx="-55" cy="-8" r="24" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="2.5" />
      <circle cx="-55" cy="-8" r="10" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="1.5" />
      <circle cx="-55" cy="24" r="6" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />

      <!-- Left Flower 2 -->
      <circle cx="-105" cy="-22" r="20" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="-105" cy="-22" r="8" fill="#FFFDF8" />
      <circle cx="-105" cy="6" r="6" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />

      <!-- Right Flower 1 -->
      <circle cx="55" cy="-8" r="24" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="2.5" />
      <circle cx="55" cy="-8" r="10" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="1.5" />
      <circle cx="55" cy="24" r="6" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />

      <!-- Right Flower 2 -->
      <circle cx="105" cy="-22" r="20" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
      <circle cx="105" cy="-22" r="8" fill="#FFFDF8" />
      <circle cx="105" cy="6" r="6" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
    </g>

    <!-- Matching Round Stud Earrings on Velvet -->
    <g transform="translate(320, 480)">
      <circle cx="0" cy="0" r="26" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="2.5" />
      <circle cx="0" cy="0" r="11" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="1.5" />
      <circle cx="0" cy="34" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
    </g>
    <g transform="translate(480, 480)">
      <circle cx="0" cy="0" r="26" fill="url(#rubyGrad)" stroke="url(#goldGrad)" stroke-width="2.5" />
      <circle cx="0" cy="0" r="11" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="1.5" />
      <circle cx="0" cy="34" r="7" fill="url(#pearlGrad)" stroke="#8C7B68" stroke-width="1" />
    </g>
  `, 'Festive Rani Pink Kundan Set', 'BESTSELLER'),

  // Tribal Oxidised Silver Choker & Earrings Suite
  'tribal-silver-choker-1.svg': createSvg(`
    <rect x="220" y="160" width="360" height="460" rx="28" fill="#1A1A1A" stroke="url(#silverGrad)" stroke-width="2" />
    
    <!-- Oxidised Floral Choker -->
    <g transform="translate(400, 280)">
      <path d="M-120,-30 Q0,40 120,-30" fill="none" stroke="url(#silverGrad)" stroke-width="18" stroke-linecap="round" />
      
      <!-- Embossed silver medallions -->
      <circle cx="0" cy="18" r="24" fill="url(#silverGrad)" stroke="#333333" stroke-width="2" />
      <circle cx="0" cy="18" r="10" fill="#222222" />
      <circle cx="-50" cy="5" r="20" fill="url(#silverGrad)" stroke="#333333" stroke-width="2" />
      <circle cx="-95" cy="-12" r="16" fill="url(#silverGrad)" stroke="#333333" stroke-width="2" />
      <circle cx="50" cy="5" r="20" fill="url(#silverGrad)" stroke="#333333" stroke-width="2" />
      <circle cx="95" cy="-12" r="16" fill="url(#silverGrad)" stroke="#333333" stroke-width="2" />

      <!-- Silver bead fringe -->
      <circle cx="0" cy="52" r="6" fill="url(#silverGrad)" />
      <circle cx="-25" cy="46" r="5" fill="url(#silverGrad)" />
      <circle cx="-50" cy="35" r="5" fill="url(#silverGrad)" />
      <circle cx="25" cy="46" r="5" fill="url(#silverGrad)" />
      <circle cx="50" cy="35" r="5" fill="url(#silverGrad)" />
    </g>

    <!-- Matching Tiered Earrings -->
    <g transform="translate(320, 470)">
      <circle cx="0" cy="0" r="18" fill="url(#silverGrad)" stroke="#333333" stroke-width="1.5" />
      <path d="M-22,25 Q0,10 22,25 L18,55 Q0,70 -18,55 Z" fill="url(#silverGrad)" stroke="#333333" stroke-width="1.5" />
      <circle cx="0" cy="76" r="5" fill="url(#silverGrad)" />
    </g>
    <g transform="translate(480, 470)">
      <circle cx="0" cy="0" r="18" fill="url(#silverGrad)" stroke="#333333" stroke-width="1.5" />
      <path d="M-22,25 Q0,10 22,25 L18,55 Q0,70 -18,55 Z" fill="url(#silverGrad)" stroke="#333333" stroke-width="1.5" />
      <circle cx="0" cy="76" r="5" fill="url(#silverGrad)" />
    </g>
  `, 'Tribal Oxidised Silver Suite', 'ROYAL'),

  // Pastel Minimalist Rectangular Midi Claws Pack
  'rectangular-midi-claw-1.svg': createSvg(`
    <!-- 4 Pastel Rectangular Claws in Tray -->
    <rect x="180" y="180" width="440" height="420" rx="32" fill="#FAF5ED" stroke="url(#goldGrad)" stroke-width="2" />
    
    <!-- Rose quartz clip -->
    <g transform="translate(290, 280)">
      <rect x="-60" y="-35" width="120" height="70" rx="14" fill="url(#pinkGrad)" stroke="#AD1457" stroke-width="2" opacity="0.9" />
      <rect x="-40" y="-18" width="80" height="36" rx="8" fill="#FFFDF8" opacity="0.4" />
      <circle cx="0" cy="-35" r="10" fill="url(#goldGrad)" />
    </g>
    
    <!-- Smoke grey clip -->
    <g transform="translate(510, 280)">
      <rect x="-60" y="-35" width="120" height="70" rx="14" fill="#90A4AE" stroke="#455A64" stroke-width="2" opacity="0.9" />
      <rect x="-40" y="-18" width="80" height="36" rx="8" fill="#FFFDF8" opacity="0.4" />
      <circle cx="0" cy="-35" r="10" fill="url(#goldGrad)" />
    </g>

    <!-- Sage green clip -->
    <g transform="translate(290, 480)">
      <rect x="-60" y="-35" width="120" height="70" rx="14" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2" opacity="0.9" />
      <rect x="-40" y="-18" width="80" height="36" rx="8" fill="#FFFDF8" opacity="0.4" />
      <circle cx="0" cy="-35" r="10" fill="url(#goldGrad)" />
    </g>

    <!-- Frosted clear clip -->
    <g transform="translate(510, 480)">
      <rect x="-60" y="-35" width="120" height="70" rx="14" fill="#E0F2F1" stroke="#00897B" stroke-width="2" opacity="0.9" />
      <rect x="-40" y="-18" width="80" height="36" rx="8" fill="#FFFDF8" opacity="0.6" />
      <circle cx="0" cy="-35" r="10" fill="url(#goldGrad)" />
    </g>
  `, 'Pastel Rectangular Midi Claws', 'PACK OF 4'),
};

for (const [filename, svgContent] of Object.entries(posterProductSvgs)) {
  fs.writeFileSync(path.join(prodDir, filename), svgContent, 'utf8');
}

console.log('✅ Generated Poster SVG assets: Category and 11 Products successfully!');
