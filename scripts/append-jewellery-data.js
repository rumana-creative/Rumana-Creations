const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'store-data.json');
const currentData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

const newCategories = [
  {
    id: 'cat-8',
    slug: 'necklaces',
    name: 'Necklaces & Pendants',
    description: 'Statement chokers, delicate layered pendants, and handcrafted ethnic necklaces.',
    image: '/images/categories/necklaces.svg',
    displayOrder: 8,
    isVisible: true
  },
  {
    id: 'cat-9',
    slug: 'earrings',
    name: 'Earrings & Jhumkas',
    description: 'Traditional Meenakari jhumkas, lightweight huggies, and crystal drops.',
    image: '/images/categories/earrings.svg',
    displayOrder: 9,
    isVisible: true
  },
  {
    id: 'cat-10',
    slug: 'rings',
    name: 'Fashion Rings',
    description: 'Adjustable Polki cocktail rings, stackable gold-tone bands, and statement accents.',
    image: '/images/categories/rings.svg',
    displayOrder: 10,
    isVisible: true
  },
  {
    id: 'cat-11',
    slug: 'bangles',
    name: 'Bangles & Kadas',
    description: 'Filigree brass kadas, bridal chooda accents, and velvet silk bangle sets.',
    image: '/images/categories/bangles.svg',
    displayOrder: 11,
    isVisible: true
  },
  {
    id: 'cat-12',
    slug: 'bracelets',
    name: 'Bracelets & Charms',
    description: 'Delicate tennis bracelets, evil-eye charms, and baroque pearl wristlets.',
    image: '/images/categories/bracelets.svg',
    displayOrder: 12,
    isVisible: true
  },
  {
    id: 'cat-13',
    slug: 'jewellery-sets',
    name: 'Jewellery Sets',
    description: 'Coordinated choker & earring suites, bridal combos, and festive party sets.',
    image: '/images/categories/jewellery-sets.svg',
    displayOrder: 13,
    isVisible: true
  },
  {
    id: 'cat-14',
    slug: 'fashion-jewellery',
    name: 'Fashion & Costume Jewellery',
    description: 'Curated everyday ethnic & contemporary artificial and costume jewellery.',
    image: '/images/categories/fashion-jewellery.svg',
    displayOrder: 14,
    isVisible: true
  },
  {
    id: 'cat-15',
    slug: 'jewellery-making-materials',
    name: 'Jewellery-Making Materials',
    description: 'High-grade glass beads, craft wires, jump rings, clasps, and DIY jewelry supplies.',
    image: '/images/categories/craft-materials.svg',
    displayOrder: 15,
    isVisible: true
  }
];

const newProducts = [
  {
    id: 'prod-13',
    slug: 'royal-kundan-meenakari-choker-necklace',
    name: 'Royal Kundan Meenakari Choker Necklace',
    category: 'necklaces',
    categoryName: 'Necklaces & Pendants',
    price: 749,
    originalPrice: 1299,
    description: 'Exquisite handcrafted bridal choker necklace featuring traditional Meenakari enamel artistry, luminous imitation glass pearls, and micro-plated antique gold finish. A timeless statement piece for weddings and festive evenings.',
    details: [
      'Costume & Fashion Jewellery — Non-precious alloy with gold-tone finish',
      'Traditional hand-enameled Meenakari reverse detailing',
      'Adjustable soft zari drawstring closure fits all neck circumferences comfortably',
      'Total necklace weight: 68g'
    ],
    materials: 'High-grade brass alloy with gold-toned lacquer plating, synthetic stones, imitation glass pearls, cotton-zari dori.',
    careInstructions: 'Fashion jewellery: Store in an airtight container or zip lock bag. Avoid contact with perfumes, hairspray, and direct moisture.',
    images: ['/images/products/choker-necklace-1.svg'],
    variants: [
      { id: 'v13-1', name: 'Royal Pearl White', colorCode: '#FDFBF7', stock: 15, sku: 'RC-NK-01-WHT' },
      { id: 'v13-2', name: 'Ruby Maroon', colorCode: '#70152C', stock: 12, sku: 'RC-NK-01-RBY' },
      { id: 'v13-3', name: 'Emerald Green', colorCode: '#1B5E20', stock: 10, sku: 'RC-NK-01-EMR' }
    ],
    stock: 37,
    sku: 'RC-NK-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.95,
    reviewCount: 28,
    seoTitle: 'Royal Kundan Meenakari Choker Necklace | Rumana Creations',
    seoDescription: 'Handcrafted Kundan Meenakari choker necklace with pearls. Premium Indian costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-14',
    slug: 'layered-dainty-pearl-coin-pendant-necklace',
    name: 'Layered Dainty Pearl & Coin Pendant Necklace',
    category: 'necklaces',
    categoryName: 'Necklaces & Pendants',
    price: 399,
    originalPrice: 599,
    description: 'Chic dual-strand everyday necklace featuring a polished coin medallion and delicate imitation freshwater seed pearls on an anti-tarnish gold-tone link chain.',
    details: [
      'Contemporary Fashion Jewellery',
      'Dual layered design: 16-inch + 18-inch chains with 2-inch extender',
      'Lobster claw clasp with Rumana Creations charm',
      'Weight: 14g'
    ],
    materials: 'Gold-tone plated alloy, imitation freshwater shell pearls.',
    careInstructions: 'Wipe gently with a soft microfibre cloth after wear. Keep away from water and cosmetics.',
    images: ['/images/products/layered-pendant-1.svg'],
    variants: [
      { id: 'v14-1', name: 'Warm Polished Gold', colorCode: '#C49A45', stock: 25, sku: 'RC-NK-02-GLD' }
    ],
    stock: 25,
    sku: 'RC-NK-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 16,
    seoTitle: 'Layered Dainty Pearl & Coin Pendant Necklace | Rumana Creations',
    seoDescription: 'Delicate dual-strand gold-tone necklace with imitation pearls. Everyday chic fashion jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-15',
    slug: 'chandbali-pearl-drop-festive-jhumkas',
    name: 'Chandbali Pearl Drop Festive Jhumkas',
    category: 'earrings',
    categoryName: 'Earrings & Jhumkas',
    price: 449,
    originalPrice: 799,
    description: 'Majestic crescent Chandbali jhumka earrings adorned with floral filigree work, tiny dangling pearl bunches, and ruby-tinted stones. Feather-light for all-day celebrations.',
    details: [
      'Traditional Indian Costume Jewellery',
      'Push-back post with secure silicone stopper for comfortable wear',
      'Length: 7.5 cm, Width: 4.5 cm',
      'Weight: 24g per pair'
    ],
    materials: 'Lightweight brass alloy with antique gold finish, artificial faux pearls, synthetic stones.',
    careInstructions: 'Clean with a dry lint-free cloth. Do not soak in water or liquid cleaners.',
    images: ['/images/products/chandbali-earrings-1.svg'],
    variants: [
      { id: 'v15-1', name: 'Antique Gold & Pearl', colorCode: '#D4AF37', stock: 20, sku: 'RC-ER-01-GLD' },
      { id: 'v15-2', name: 'Gold & Ruby Red', colorCode: '#9C2241', stock: 16, sku: 'RC-ER-01-RBY' }
    ],
    stock: 36,
    sku: 'RC-ER-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 22,
    seoTitle: 'Chandbali Pearl Drop Festive Jhumkas | Rumana Creations',
    seoDescription: 'Handcrafted Chandbali earrings with dangling pearls. Lightweight festive costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-16',
    slug: 'twisted-gold-tone-huggie-hoop-earrings',
    name: 'Twisted Gold-Tone Huggie Hoop Earrings',
    category: 'earrings',
    categoryName: 'Earrings & Jhumkas',
    price: 299,
    originalPrice: 499,
    description: 'Modern everyday chunky twist hoop earrings with a radiant warm gold finish. Lightweight, versatile, and effortlessly stylish from morning coffee to dinner parties.',
    details: [
      'Everyday Modern Fashion Jewellery',
      'Diameter: 22 mm, Thickness: 5 mm',
      'Hinge click-top clasp closure',
      'Weight: 8g per pair'
    ],
    materials: 'High-polished gold-tone alloy with anti-tarnish protective lacquer, stainless steel posts.',
    careInstructions: 'Avoid contact with moisture and harsh soaps to maintain long-lasting shine.',
    images: ['/images/products/huggie-hoops-1.svg'],
    variants: [
      { id: 'v16-1', name: 'Classic Yellow Gold', colorCode: '#C49A45', stock: 30, sku: 'RC-ER-02-YGL' },
      { id: 'v16-2', name: 'Rose Gold', colorCode: '#E5A99B', stock: 18, sku: 'RC-ER-02-RGL' }
    ],
    stock: 48,
    sku: 'RC-ER-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.85,
    reviewCount: 14,
    seoTitle: 'Twisted Gold-Tone Huggie Hoop Earrings | Rumana Creations',
    seoDescription: 'Chunky twist gold-tone huggie hoop earrings. Minimalist everyday fashion jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-17',
    slug: 'vintage-floral-polki-adjustable-cocktail-ring',
    name: 'Vintage Floral Polki Adjustable Cocktail Ring',
    category: 'rings',
    categoryName: 'Fashion Rings',
    price: 349,
    originalPrice: 599,
    description: 'Statement blooming flower cocktail ring studded with shimmering uncut-style Polki stones and bordered with miniature faux pearls. Features a comfortable expandable back band.',
    details: [
      'Ethnic Costume Jewellery Statement Piece',
      'Free-size adjustable open back fits Indian ring sizes 12 to 20',
      'Floral head diameter: 3.5 cm',
      'Weight: 18g'
    ],
    materials: 'Brass base with gold-toned polish, glass polki stones, artificial seed pearls.',
    careInstructions: 'Handle gently when adjusting band size. Keep away from water and lotions.',
    images: ['/images/products/polki-ring-1.svg'],
    variants: [
      { id: 'v17-1', name: 'Golden Ivory', colorCode: '#FFF9E6', stock: 22, sku: 'RC-RG-01-IVR' },
      { id: 'v17-2', name: 'Rose Pink Accent', colorCode: '#F3DDE1', stock: 14, sku: 'RC-RG-01-PNK' }
    ],
    stock: 36,
    sku: 'RC-RG-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 19,
    seoTitle: 'Vintage Floral Polki Adjustable Cocktail Ring | Rumana Creations',
    seoDescription: 'Statement adjustable Polki cocktail ring with faux pearls. Festive costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-18',
    slug: 'stackable-minimalist-pave-band-trio',
    name: 'Stackable Minimalist Pavé Band Trio (Set of 3)',
    category: 'rings',
    categoryName: 'Fashion Rings',
    price: 299,
    originalPrice: 499,
    description: 'Set of three stackable slender rings featuring one micro-pavé crystal band, one twisted rope band, and one smooth gold-tone band. Wear together or individually.',
    details: [
      'Contemporary Fashion Jewellery Set',
      'Includes 3 complementary stacking rings',
      'Available in Indian size 14 & 16',
      'Band width: 1.5 mm each'
    ],
    materials: 'Gold-plated brass alloy, synthetic cubic zirconia crystals.',
    careInstructions: 'Remove before hand washing or applying sanitisers to preserve gold tone.',
    images: ['/images/products/stackable-rings-1.svg'],
    variants: [
      { id: 'v18-1', name: 'Size 14 (Medium)', colorCode: '#C49A45', stock: 20, sku: 'RC-RG-02-S14' },
      { id: 'v18-2', name: 'Size 16 (Large)', colorCode: '#C49A45', stock: 18, sku: 'RC-RG-02-S16' }
    ],
    stock: 38,
    sku: 'RC-RG-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.75,
    reviewCount: 11,
    seoTitle: 'Stackable Minimalist Pavé Band Trio (3 pcs) | Rumana Creations',
    seoDescription: 'Dainty stackable gold-tone rings with micro-pavé crystals. Everyday costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-19',
    slug: 'embroidered-velvet-golden-zari-bangle-set',
    name: 'Embroidered Velvet & Golden Zari Bangle Set (Set of 12)',
    category: 'bangles',
    categoryName: 'Bangles & Kadas',
    price: 599,
    originalPrice: 999,
    description: 'Handcrafted festive bangle set combining plush velvet-wrapped metal bangles, delicate golden zari braiding, and sparkling crystal micro-borders. Perfect for Eid, Diwali, and sangeet parties.',
    details: [
      'Ethnic Costume Jewellery Bangle Suite',
      'Complete set of 12 coordinated bangles',
      'Available in standard sizes: 2.6 (Medium) and 2.8 (Large)',
      'Total set weight: 110g'
    ],
    materials: 'Metal alloy core, plush micro-velvet, metallic zari thread, glass rhinestones.',
    careInstructions: 'Keep in padded bangle box. Keep completely dry to protect velvet texture.',
    images: ['/images/products/velvet-bangles-1.svg'],
    variants: [
      { id: 'v19-1', name: 'Royal Burgundy (Size 2.6)', colorCode: '#70152C', stock: 15, sku: 'RC-BG-01-BUR26' },
      { id: 'v19-2', name: 'Royal Burgundy (Size 2.8)', colorCode: '#70152C', stock: 12, sku: 'RC-BG-01-BUR28' },
      { id: 'v19-3', name: 'Emerald Green (Size 2.6)', colorCode: '#1B5E20', stock: 10, sku: 'RC-BG-01-EMR26' }
    ],
    stock: 37,
    sku: 'RC-BG-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 25,
    seoTitle: 'Embroidered Velvet & Golden Zari Bangle Set | Rumana Creations',
    seoDescription: 'Handcrafted velvet and golden zari bangle set of 12. Indian festive costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-20',
    slug: 'openable-filigree-brass-antique-kada',
    name: 'Openable Filigree Brass Antique Kada',
    category: 'bangles',
    categoryName: 'Bangles & Kadas',
    price: 499,
    originalPrice: 799,
    description: 'Heritage temple-inspired cuff bracelet featuring intricate filigree jali work and floral embossed motifs with an easy-screw side clasp.',
    details: [
      'Heritage Costume Jewellery Bracelet / Kada',
      'Secure screw-pin side hinge opening for effortless wearing',
      'Inner diameter: 60 mm (fits wrist sizes 2.4 to 2.8)',
      'Kada width: 2.2 cm, Weight: 42g'
    ],
    materials: 'Brass alloy with antique matte gold finish and anti-tarnish coating.',
    careInstructions: 'Clean with a soft dry cloth. Store separately from other jewellery to avoid friction.',
    images: ['/images/products/antique-kada-1.svg'],
    variants: [
      { id: 'v20-1', name: 'Matte Antique Gold', colorCode: '#C49A45', stock: 20, sku: 'RC-BG-02-AGL' }
    ],
    stock: 20,
    sku: 'RC-BG-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.85,
    reviewCount: 15,
    seoTitle: 'Openable Filigree Brass Antique Kada | Rumana Creations',
    seoDescription: 'Antique gold filigree openable kada bracelet. Traditional Indian costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-21',
    slug: 'baroque-freshwater-pearl-heart-charm-bracelet',
    name: 'Baroque Freshwater Pearl & Heart Charm Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets & Charms',
    price: 399,
    originalPrice: 699,
    description: 'Asymmetrical modern bracelet strung with organic-shaped imitation baroque pearls and an engraved brushed gold heart charm with toggle bar closure.',
    details: [
      'Boutique Fashion Jewellery',
      'Unique imitation baroque pearl silhouette',
      'Total length: 19 cm, fits most wrists',
      'Custom T-bar toggle clasp'
    ],
    materials: 'Hand-selected imitation baroque pearls, gold-plated zinc alloy charm.',
    careInstructions: 'Wipe with soft cloth. Avoid moisture and cosmetics.',
    images: ['/images/products/baroque-bracelet-1.svg'],
    variants: [
      { id: 'v21-1', name: 'Warm Gold & Pearl', colorCode: '#FFFDF8', stock: 22, sku: 'RC-BR-01-PRL' }
    ],
    stock: 22,
    sku: 'RC-BR-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.85,
    reviewCount: 17,
    seoTitle: 'Baroque Freshwater Pearl & Heart Charm Bracelet | Rumana Creations',
    seoDescription: 'Chic baroque pearl bracelet with heart pendant. Contemporary fashion jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-22',
    slug: 'evil-eye-lucky-charm-paperclip-chain-bracelet',
    name: 'Evil Eye Lucky Charm Paperclip Chain Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets & Charms',
    price: 329,
    originalPrice: 499,
    description: 'Protective talisman bracelet featuring a double-sided blue enamel evil eye charm mounted on a trendy oblong paperclip link chain.',
    details: [
      'Everyday Protection Fashion Jewellery',
      '16 cm chain with 4 cm extender',
      'Lobster claw closure with tear drop tag',
      'Weight: 9g'
    ],
    materials: '14k gold-tone plated brass, blue & white kiln-fired enamel.',
    careInstructions: 'Keep away from perfumes and sanitizers.',
    images: ['/images/products/evil-eye-bracelet-1.svg'],
    variants: [
      { id: 'v22-1', name: 'Celestial Blue Eye', colorCode: '#0284C7', stock: 28, sku: 'RC-BR-02-BLU' }
    ],
    stock: 28,
    sku: 'RC-BR-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 19,
    seoTitle: 'Evil Eye Lucky Charm Paperclip Chain Bracelet | Rumana Creations',
    seoDescription: 'Blue enamel evil eye paperclip bracelet. Protective fashion jewellery in gold tone.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-23',
    slug: 'emerald-green-pearl-royal-choker-earring-set',
    name: 'Emerald Green & Pearl Royal Choker & Earring Set',
    category: 'jewellery-sets',
    categoryName: 'Jewellery Sets',
    price: 1199,
    originalPrice: 1999,
    description: 'A complete celebratory jewellery suite including an ornate Kundan choker necklace with cascading emerald-green beaded drops, paired with matching statement drop earrings.',
    details: [
      'Complete Festive Costume Jewellery Set',
      'Includes 1 Choker Necklace + 1 Pair Matching Drop Earrings',
      'Necklace has adjustable zari cord; Earrings feature push-back post',
      'Total suite weight: 115g'
    ],
    materials: 'Brass alloy with high-luster micro gold plating, synthetic emerald beads, glass stones, faux pearls.',
    careInstructions: 'Store in moisture-proof velvet case. Clean with dry microfibre cloth.',
    images: ['/images/products/royal-jewellery-set-1.svg'],
    variants: [
      { id: 'v23-1', name: 'Emerald Green & Gold', colorCode: '#1B5E20', stock: 12, sku: 'RC-JS-01-EMR' },
      { id: 'v23-2', name: 'Royal Ruby Maroon', colorCode: '#70152C', stock: 10, sku: 'RC-JS-01-RBY' }
    ],
    stock: 22,
    sku: 'RC-JS-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.95,
    reviewCount: 31,
    seoTitle: 'Emerald Green & Pearl Royal Choker & Earring Set | Rumana Creations',
    seoDescription: 'Kundan choker necklace with matching drop earrings. Complete wedding costume jewellery suite.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-24',
    slug: 'dainty-pearl-solitaire-pendant-studs-daily-set',
    name: 'Dainty Pearl Solitaire Pendant & Studs Daily Set',
    category: 'jewellery-sets',
    categoryName: 'Jewellery Sets',
    price: 549,
    originalPrice: 899,
    description: 'Understated office and brunch elegance. Comprises a floating imitation South Sea pearl pendant necklace on a fine Singapore chain with matching pearl stud earrings.',
    details: [
      'Everyday Fashion Jewellery Duo',
      'Includes 18-inch necklace with 8mm pendant + 8mm matching stud earrings',
      'Comfortable butterfly push back stoppers',
      'Total set weight: 12g'
    ],
    materials: 'Gold-tone plated copper alloy, luminous imitation shell pearls.',
    careInstructions: 'Wipe clean after use. Store away from moisture.',
    images: ['/images/products/pearl-duo-set-1.svg'],
    variants: [
      { id: 'v24-1', name: 'Warm Champagne Gold', colorCode: '#C49A45', stock: 24, sku: 'RC-JS-02-CHP' }
    ],
    stock: 24,
    sku: 'RC-JS-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 12,
    seoTitle: 'Dainty Pearl Solitaire Pendant & Studs Daily Set | Rumana Creations',
    seoDescription: 'Minimalist pearl pendant necklace and matching studs. Everyday fashion jewellery duo.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-25',
    slug: 'kundan-floral-matha-patti-maang-tikka',
    name: 'Kundan Floral Matha Patti & Maang Tikka',
    category: 'fashion-jewellery',
    categoryName: 'Fashion & Costume Jewellery',
    price: 699,
    originalPrice: 1199,
    description: 'Traditional bridal and festive hair-and-forehead adornment featuring floral Kundan centerpieces, delicate side pearl chains, and tiny jhumki drops.',
    details: [
      'Traditional Indian Costume Jewellery & Hair Adornment',
      'Attaches securely into hair with discreet bobby pin hooks',
      'Center Tikka Length: 12 cm, Side chains: 18 cm each',
      'Weight: 45g'
    ],
    materials: 'Lightweight brass alloy, glass kundan, faux seed pearls, metallic hair clips.',
    careInstructions: 'Store flat in dry pouch to avoid tangling of chains.',
    images: ['/images/products/matha-patti-1.svg'],
    variants: [
      { id: 'v25-1', name: 'Antique Gold & Pearl', colorCode: '#D4AF37', stock: 16, sku: 'RC-FJ-01-GLD' }
    ],
    stock: 16,
    sku: 'RC-FJ-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 20,
    seoTitle: 'Kundan Floral Matha Patti & Maang Tikka | Rumana Creations',
    seoDescription: 'Bridal Kundan matha patti and maang tikka. Traditional Indian hair costume jewellery.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-26',
    slug: 'diy-deluxe-jewellery-craft-kit-24-grid-box',
    name: 'DIY Deluxe Jewellery Craft Kit: 24-Grid Beads & Findings Box',
    category: 'jewellery-making-materials',
    categoryName: 'Jewellery-Making Materials',
    price: 599,
    originalPrice: 999,
    description: 'All-in-one jewelry crafting starter set containing 2,000+ multi-colored glass seed beads, letter beads, 50 lobster clasps, 100 jump rings, jewelry scissors, and 2 rolls of 0.8mm crystal elastic stretch cord.',
    details: [
      'Jewellery-Making Supplies & DIY Craft Materials',
      '24-compartment reusable storage organizer box included',
      'Over 2,000+ glass seed beads in curated pastel & vibrant shades',
      'Complete with tools: safety scissors, elastic rolls, tweezers, and findings'
    ],
    materials: 'Glass seed beads, acrylic alphabet beads, zinc alloy findings, nylon elastic cord.',
    careInstructions: 'Keep small parts away from children under 3 years. Store box horizontally.',
    images: ['/images/products/diy-craft-kit-1.svg'],
    variants: [
      { id: 'v26-1', name: 'Pastel Rainbow Palette', colorCode: '#F3DDE1', stock: 35, sku: 'RC-MAT-01-PST' },
      { id: 'v26-2', name: 'Bohemian Earth Tones', colorCode: '#C49A45', stock: 25, sku: 'RC-MAT-01-ETH' }
    ],
    stock: 60,
    sku: 'RC-MAT-01',
    status: 'published',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.95,
    reviewCount: 38,
    seoTitle: 'DIY Deluxe Jewellery Craft Kit (24-Grid Box) | Rumana Creations',
    seoDescription: 'All-in-one jewelry making materials kit with 2000+ seed beads, findings, and elastic cord.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-27',
    slug: 'golden-brass-jump-rings-headpins-craft-pack',
    name: 'Golden Brass Jump Rings & Headpins Craft Essentials Pack (300 pcs)',
    category: 'jewellery-making-materials',
    categoryName: 'Jewellery-Making Materials',
    price: 249,
    originalPrice: 399,
    description: 'Essential crafting findings bundle including 150 open jump rings (5mm & 7mm) and 150 ball headpins (40mm) in premium gold-tone finish for earrings, pendants, and charm making.',
    details: [
      'Professional Jewellery-Making Findings',
      'Pack includes: 150 open jump rings (75x 5mm, 75x 7mm) + 150 ball headpins (40mm)',
      'Lead & Cadmium free craft supplies',
      'Total count: 300 pieces'
    ],
    materials: 'Tarnish-resistant gold-toned brass wire.',
    careInstructions: 'Keep in dry sealed polybag to avoid tarnishing over time.',
    images: ['/images/products/jump-rings-pack-1.svg'],
    variants: [
      { id: 'v27-1', name: 'Warm Gold Finish', colorCode: '#D4AF37', stock: 40, sku: 'RC-MAT-02-GLD' },
      { id: 'v27-2', name: 'Antique Bronze Finish', colorCode: '#8B5A2B', stock: 30, sku: 'RC-MAT-02-BRZ' }
    ],
    stock: 70,
    sku: 'RC-MAT-02',
    status: 'published',
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.85,
    reviewCount: 16,
    seoTitle: 'Golden Brass Jump Rings & Headpins Pack (300 pcs) | Rumana Creations',
    seoDescription: 'High quality jewelry making findings: 150 jump rings and 150 headpins in gold finish.',
    createdAt: new Date().toISOString()
  }
];

// Combine without duplicates
const existingCatSlugs = new Set(currentData.categories.map(c => c.slug));
const addedCategories = [];
for (const cat of newCategories) {
  if (!existingCatSlugs.has(cat.slug)) {
    currentData.categories.push(cat);
    addedCategories.push(cat.name);
  }
}

const existingProdSlugs = new Set(currentData.products.map(p => p.slug));
const addedProducts = [];
for (const prod of newProducts) {
  if (!existingProdSlugs.has(prod.slug)) {
    currentData.products.push(prod);
    addedProducts.push(prod.name);
  }
}

fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf8');

console.log(`✅ Added ${addedCategories.length} new categories:`, addedCategories);
console.log(`✅ Added ${addedProducts.length} new products:`, addedProducts);
console.log(`📊 Total Categories in Store: ${currentData.categories.length}`);
console.log(`📊 Total Products in Store: ${currentData.products.length}`);
