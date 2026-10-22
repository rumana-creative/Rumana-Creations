const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'store-data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const storeData = JSON.parse(rawData);

// 1. Add Patterned Hair Clips category if not already present
const newCategory = {
  id: "cat-16",
  slug: "patterned-hair-clips",
  name: "Patterned Hair Clips",
  description: "Trending leopard, dalmatian, and marble-swirl oval snap clips and decorative barrettes.",
  image: "/images/categories/patterned-hair-clips.svg",
  displayOrder: 16,
  isVisible: true
};

const existingCatIndex = storeData.categories.findIndex(c => c.slug === newCategory.slug);
if (existingCatIndex === -1) {
  storeData.categories.push(newCategory);
  console.log('✅ Added category: Patterned Hair Clips');
} else {
  storeData.categories[existingCatIndex] = { ...storeData.categories[existingCatIndex], ...newCategory };
  console.log('ℹ️ Updated category: Patterned Hair Clips');
}

// 2. New Poster Products
const newPosterProducts = [
  {
    id: "prod-28",
    slug: "safari-chic-patterned-oval-hair-clips-set",
    name: "Safari Chic Patterned Oval Hair Clips (Set of 6)",
    category: "patterned-hair-clips",
    categoryName: "Patterned Hair Clips",
    price: 299,
    originalPrice: 449,
    description: "Featured in our boutique showcase: Set of 6 high-gloss oval snap hair clips featuring signature safari prints—classic leopard, olive cheetah, sky blue spots, and dalmatian dots. Crafted with a snag-free metal snap mechanism that holds hair securely without pulling. Handcrafted artificial hair accessories.",
    details: [
      "Set Includes: 6 assorted patterned oval hair clips (Length: 7 cm)",
      "Patterns: Classic Leopard, Olive Safari, Sky Blue Cheetah, Dalmatian Spot, Marble Swirl, Tortoiseshell",
      "Classification: Hair Accessories (Decorative Hair Clips - Not Nail Accessories)",
      "Grip: Smooth snag-free metal snap clip backing",
      "Finish: High-gloss, scratch-resistant acetate glaze"
    ],
    materials: "Bio-cellulose acrylic resin with nickel-free gold-tone snap clip.",
    careInstructions: "Wipe clean with a soft dry cloth. Keep away from water, heat, and direct perfumes.",
    images: ["/images/products/safari-patterned-clips-1.svg"],
    variants: [
      { id: "var-28-1", name: "Safari Leopard & Cheetah Mix (Set of 6)", colorCode: "#E8CDA0", stock: 25, sku: "RC-HC-PAT-01" },
      { id: "var-28-2", name: "Monochrome Dalmatian & Marble Mix (Set of 6)", colorCode: "#D0E8F2", stock: 18, sku: "RC-HC-PAT-02" }
    ],
    stock: 43,
    sku: "RC-HC-PAT",
    status: "published",
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    seoTitle: "Safari Chic Patterned Oval Hair Clips (Set of 6) | Rumana Creations",
    seoDescription: "Shop boutique safari animal print oval hair snap clips in leopard and cheetah patterns at Rumana Creations. Lightweight and snag-free.",
    createdAt: "2026-10-23T01:30:00.000Z"
  },
  {
    id: "prod-29",
    slug: "crystal-bloom-translucent-flower-hair-claw",
    name: "Crystal Bloom Translucent Flower Hair Claw",
    category: "claw-clips",
    categoryName: "Claw Clips",
    price: 249,
    originalPrice: 349,
    description: "Featured on our official store poster: Sculpted 5-petal crystal acrylic flower hair claw clip with a reinforced gold-tone spring. Features gemstone clarity with smooth interlocking teeth for non-slip hold in half-up and full up-do hairstyles.",
    details: [
      "Design: 5-Petal sculpted blossom claw with faceted gemstone shine",
      "Diameter: 7.5 cm (Ideal for medium to thick hair)",
      "Spring: High-tension gold-tone stainless steel coil",
      "Grip: Rounded teeth for painless, all-day comfortable grip"
    ],
    materials: "Translucent high-clarity acrylic resin with gold-plated steel spring.",
    careInstructions: "Wipe clean with a microfibre cloth. Store flat when not in use.",
    images: ["/images/products/crystal-flower-claw-1.svg"],
    variants: [
      { id: "var-29-1", name: "Ruby Pink", colorCode: "#F06292", stock: 20, sku: "RC-CC-BLM-01" },
      { id: "var-29-2", name: "Amethyst Violet", colorCode: "#BA68C8", stock: 15, sku: "RC-CC-BLM-02" },
      { id: "var-29-3", name: "Sunset Amber", colorCode: "#FFB74D", stock: 18, sku: "RC-CC-BLM-03" },
      { id: "var-29-4", name: "Emerald Green", colorCode: "#81C784", stock: 14, sku: "RC-CC-BLM-04" }
    ],
    stock: 67,
    sku: "RC-CC-BLM",
    status: "published",
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 29,
    seoTitle: "Crystal Bloom Translucent Flower Hair Claw | Rumana Creations",
    seoDescription: "Shop floral translucent acrylic hair claw clips in ruby pink, violet, and amber at Rumana Creations India.",
    createdAt: "2026-10-23T01:31:00.000Z"
  },
  {
    id: "prod-30",
    slug: "pastel-wings-mini-butterfly-hair-clips-box",
    name: "Pastel Wings Mini Butterfly Hair Clips (Pack of 12 with Organizer Box)",
    category: "kids-clips",
    categoryName: "Kids' Clips",
    price: 279,
    originalPrice: 399,
    description: "Featured in our boutique organizer showcase: A set of 12 miniature butterfly hair claws in sweet candy pastel tones, packaged in a clear reusable 6-compartment storage box. Snag-free and gentle for kids, toddlers, and Y2K aesthetic hair styling.",
    details: [
      "Includes: 12 mini butterfly claw clips + clear compartmental organizer box",
      "Dimensions: 2 cm clip size",
      "Shades: Strawberry pink, baby cyan, soft marigold yellow, and lilac",
      "Safety: Snag-free rounded teeth safe for children's delicate hair"
    ],
    materials: "BPA-free lightweight acrylic with gentle metal spring.",
    careInstructions: "Rinse with mild lukewarm water if needed and dry immediately.",
    images: ["/images/products/mini-butterfly-box-1.svg"],
    variants: [
      { id: "var-30-1", name: "Pastel Candy Mix (12 Pcs + Box)", colorCode: "#FFB2C9", stock: 30, sku: "RC-KC-BTF-01" }
    ],
    stock: 30,
    sku: "RC-KC-BTF",
    status: "published",
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 41,
    seoTitle: "Pastel Wings Mini Butterfly Clips (Pack of 12 + Box) | Rumana Creations",
    seoDescription: "Gentle mini pastel butterfly hair clips for kids and trendy half-up styling with clear storage box.",
    createdAt: "2026-10-23T01:32:00.000Z"
  },
  {
    id: "prod-31",
    slug: "geometric-square-translucent-acetate-hair-claw",
    name: "Geometric Square Translucent Acetate Hair Claw",
    category: "claw-clips",
    categoryName: "Claw Clips",
    price: 299,
    originalPrice: 429,
    description: "As seen in our store showcase tray: Modernist hollow square geometric hair claw crafted from thick, translucent bio-acetate. Features rounded interlocking teeth for headache-free, non-slip all-day hold.",
    details: [
      "Design: Hollow square geometric silhouette",
      "Dimensions: 8 cm x 5 cm",
      "Finish: Glossy translucent jewel tones",
      "Hold: Extra-strong grip for thick, wavy, and textured hair"
    ],
    materials: "Heavy-duty cellulose acetate with reinforced steel coil.",
    careInstructions: "Wipe with a soft dry cloth. Avoid high heat.",
    images: ["/images/products/geometric-square-claw-1.svg"],
    variants: [
      { id: "var-31-1", name: "Honey Amber Tortoise", colorCode: "#FFB74D", stock: 22, sku: "RC-CC-SQR-01" },
      { id: "var-31-2", name: "Bubblegum Pink", colorCode: "#F48FB1", stock: 16, sku: "RC-CC-SQR-02" },
      { id: "var-31-3", name: "Sky Blue", colorCode: "#4FC3F7", stock: 14, sku: "RC-CC-SQR-03" },
      { id: "var-31-4", name: "Crimson Red", colorCode: "#E53935", stock: 12, sku: "RC-CC-SQR-04" }
    ],
    stock: 64,
    sku: "RC-CC-SQR",
    status: "published",
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 35,
    seoTitle: "Geometric Square Translucent Acetate Hair Claw | Rumana Creations",
    seoDescription: "Chunky square geometric acetate hair claws in amber tortoise and pastel colors.",
    createdAt: "2026-10-23T01:33:00.000Z"
  },
  {
    id: "prod-32",
    slug: "heritage-oxidised-silver-ruby-temple-jhumkas",
    name: "Heritage Oxidised Silver & Ruby Crystal Temple Jhumkas",
    category: "earrings",
    categoryName: "Earrings & Jhumkas",
    price: 449,
    originalPrice: 649,
    description: "Featured on our store poster: Intricately embossed dual-tier oxidised silver dome jhumkas adorned with ruby crystal floral studs and cascading pearl droplets. Traditional elegance with lightweight comfort. Artificial / costume jewellery crafted for ethnic and festive occasions.",
    details: [
      "Classification: Artificial Jewellery / Fashion Earrings (Non-precious)",
      "Plating: Antique oxidised silver finish on durable brass base",
      "Embellishments: Synthetic ruby crystal gemstones & faux glass pearls",
      "Closure: Push-back post with secure silicone stopper",
      "Weight: 28g per pair (Ergonomically balanced for comfortable wear)"
    ],
    materials: "Base brass alloy with antique silver-look plating, synthetic crystals, and faux pearls. (Not genuine silver).",
    careInstructions: "Store in an airtight ziplock pouch away from moisture and direct perfumes.",
    images: ["/images/products/oxidised-ruby-jhumkas-1.svg"],
    variants: [
      { id: "var-32-1", name: "Ruby Crystal & Pearl Drop", colorCode: "#D81B60", stock: 18, sku: "RC-ER-OX-01" },
      { id: "var-32-2", name: "Emerald Green & Pearl Drop", colorCode: "#2E7D32", stock: 14, sku: "RC-ER-OX-02" }
    ],
    stock: 32,
    sku: "RC-ER-OX",
    status: "published",
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 52,
    seoTitle: "Heritage Oxidised Silver Ruby Temple Jhumkas | Rumana Creations",
    seoDescription: "Ethnic oxidised silver dome jhumkas with ruby crystal studs and pearl droplets. Fashion jewellery by Rumana Creations.",
    createdAt: "2026-10-23T01:34:00.000Z"
  },
  {
    id: "prod-33",
    slug: "meenakari-marigold-sunburst-enamel-jhumkas",
    name: "Meenakari Marigold Sunburst Floral Enamel Jhumkas",
    category: "earrings",
    categoryName: "Earrings & Jhumkas",
    price: 399,
    originalPrice: 599,
    description: "Featured on our store poster: Radiant sunburst floral jhumkas hand-painted with vibrant yellow enamel meenakari work, golden filigree detailing, and tiny hanging ghungroo beads. Artificial jewellery designed to brighten Haldi, Mehendi, and festive celebrations.",
    details: [
      "Classification: Artificial Jewellery / Fashion Accessories (Non-precious)",
      "Technique: Artisan hand-enamelled Meenakari work",
      "Plating: Rich 18k gold-tone flash plating on copper-brass alloy",
      "Accents: Filigree bell dome with tiny golden hanging bead fringe",
      "Occasions: Haldi, Sangeet, festive family gatherings"
    ],
    materials: "High-grade copper-brass alloy with baked enamel finish. (Non-precious).",
    careInstructions: "Avoid contact with water and harsh cosmetics. Clean gently with a dry cotton swab.",
    images: ["/images/products/marigold-enamel-jhumkas-1.svg"],
    variants: [
      { id: "var-33-1", name: "Marigold Yellow & Gold", colorCode: "#FDD835", stock: 19, sku: "RC-ER-MNK-01" },
      { id: "var-33-2", name: "Crimson Red & Gold", colorCode: "#C62828", stock: 12, sku: "RC-ER-MNK-02" }
    ],
    stock: 31,
    sku: "RC-ER-MNK",
    status: "published",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 24,
    seoTitle: "Meenakari Marigold Sunburst Enamel Jhumkas | Rumana Creations",
    seoDescription: "Handcrafted yellow meenakari floral jhumkas for festive and Haldi ceremonies.",
    createdAt: "2026-10-23T01:35:00.000Z"
  },
  {
    id: "prod-34",
    slug: "dainty-floral-black-bead-station-chain-necklace",
    name: "Dainty Floral Charm Black Bead Station Chain Necklace",
    category: "necklaces",
    categoryName: "Necklaces & Pendants",
    price: 349,
    originalPrice: 499,
    description: "Showcased on our store poster: Contemporary mangalsutra-inspired daily wear necklace featuring micro black beads, a dainty gold-tone chain, and a central floral charm with a delicate pearl drop. Fashion jewellery that combines modern minimalist styling with cultural grace.",
    details: [
      "Classification: Artificial Jewellery / Daily Wear Necklace (Non-precious)",
      "Length: 16 inches + 2-inch extender chain with lobster clasp",
      "Plating: 18k micro gold-tone polish on skin-friendly brass base",
      "Beads: High-luster black glass micro beads",
      "Centerpiece: Floral motif with synthetic stone and drop"
    ],
    materials: "Gold-tone brass alloy, glass micro beads, synthetic crystal. (Not genuine gold).",
    careInstructions: "Remove before bathing or exercising. Store in a dry pouch.",
    images: ["/images/products/black-bead-floral-chain-1.svg"],
    variants: [
      { id: "var-34-1", name: "Golden Daisy Charm & Pearl Drop", colorCode: "#D4AF37", stock: 26, sku: "RC-NK-BLK-01" },
      { id: "var-34-2", name: "Crescent Filigree Charm", colorCode: "#C49A45", stock: 18, sku: "RC-NK-BLK-02" }
    ],
    stock: 44,
    sku: "RC-NK-BLK",
    status: "published",
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 63,
    seoTitle: "Dainty Floral Black Bead Daily Chain Necklace | Rumana Creations",
    seoDescription: "Minimalist black bead floral chain necklace for everyday elegance. Artificial fashion jewellery.",
    createdAt: "2026-10-23T01:36:00.000Z"
  },
  {
    id: "prod-35",
    slug: "starlet-cz-crystal-solitaire-station-tennis-chain",
    name: "Starlet CZ Crystal Solitaire Station Chain Necklace",
    category: "necklaces",
    categoryName: "Necklaces & Pendants",
    price: 499,
    originalPrice: 749,
    description: "Featured on our store poster: Sparkling station chain necklace featuring brilliant round-cut cubic zirconia crystals and dainty floral cluster stations. Delivers the breathtaking radiance of fine diamonds in everyday artificial jewellery.",
    details: [
      "Classification: Artificial Jewellery / Fashion Chain (Non-precious)",
      "Stones: AAA Grade Cubic Zirconia (CZ) simulated crystals",
      "Plating: High-polish rhodium silver plating on copper alloy",
      "Length: 15 inches + 2-inch extension chain",
      "Clasp: Secure lobster claw closure"
    ],
    materials: "Rhodium-plated copper alloy with cubic zirconia stones. (Not real diamond/platinum).",
    careInstructions: "Gently polish with a dry lint-free cloth. Avoid swimming or harsh chemicals.",
    images: ["/images/products/cz-solitaire-chain-1.svg"],
    variants: [
      { id: "var-35-1", name: "Rhodium Silver", colorCode: "#DCDCDC", stock: 20, sku: "RC-NK-CZ-01" },
      { id: "var-35-2", name: "Warm Champagne Gold", colorCode: "#E6CA65", stock: 15, sku: "RC-NK-CZ-02" }
    ],
    stock: 35,
    sku: "RC-NK-CZ",
    status: "published",
    isFeatured: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 19,
    seoTitle: "Starlet CZ Solitaire Station Tennis Chain | Rumana Creations",
    seoDescription: "Sparkling CZ solitaire station tennis necklace in rhodium silver by Rumana Creations.",
    createdAt: "2026-10-23T01:37:00.000Z"
  },
  {
    id: "prod-36",
    slug: "festive-rani-pink-kundan-cluster-pearl-choker-set",
    name: "Festive Rani Pink Kundan & Cluster Pearl Choker Set",
    category: "jewellery-sets",
    categoryName: "Jewellery Sets",
    price: 899,
    originalPrice: 1299,
    description: "Featured as our store poster highlight: Exquisite festive choker suite featuring round kundan flower motifs set in warm antique gold plating, accented by vibrant magenta rani pink stones and hanging pearl clusters. Complete with matching round floral stud earrings.",
    details: [
      "Set Includes: 1 Floral Choker Necklace + 1 Pair of Matching Round Stud Earrings",
      "Classification: Costume / Artificial Jewellery Suite (Non-precious)",
      "Plating: Antique gold finish on durable metal alloy base",
      "Stones: Synthetic kundan glass stones & faux pearl bead drops",
      "Necklace Closure: Traditional adjustable zari thread dori (fits all neck sizes)",
      "Occasion: Bridal trousseau, weddings, Diwali, Eid, and festive parties"
    ],
    materials: "Antique gold-plated alloy, synthetic glass kundan, faux pearls, zari dori. (Non-precious).",
    careInstructions: "Wipe with a soft cotton cloth after wear. Keep in the provided velvet card/box.",
    images: ["/images/products/festive-rani-pink-choker-1.svg"],
    variants: [
      { id: "var-36-1", name: "Rani Pink & Antique Gold (Full Set)", colorCode: "#D81B60", stock: 14, sku: "RC-JS-RNI-01" },
      { id: "var-36-2", name: "Royal Emerald Green & Antique Gold", colorCode: "#2E7D32", stock: 10, sku: "RC-JS-RNI-02" }
    ],
    stock: 24,
    sku: "RC-JS-RNI",
    status: "published",
    isFeatured: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 48,
    seoTitle: "Festive Rani Pink Kundan Choker & Studs Set | Rumana Creations",
    seoDescription: "Traditional magenta rani pink kundan choker necklace and earrings set. Premium costume jewellery.",
    createdAt: "2026-10-23T01:38:00.000Z"
  },
  {
    id: "prod-37",
    slug: "tribal-oxidised-silver-floral-choker-earrings-suite",
    name: "Tribal Oxidised Silver Floral Choker & Earrings Suite",
    category: "jewellery-sets",
    categoryName: "Jewellery Sets",
    price: 799,
    originalPrice: 1199,
    description: "Featured on our store poster: Statement tribal-inspired oxidised silver choker necklace with intricate floral repoussé links and hanging cluster droplets. Comes paired with matching ornate tiered chandelier jhumkas.",
    details: [
      "Set Includes: 1 Flexible Link Floral Choker + 1 Pair of Tiered Chandelier Earrings",
      "Classification: Artificial Jewellery / Ethnic Costume Set (Non-precious)",
      "Finish: Blackened antique oxidised silver patina",
      "Design: Traditional Rajasthani tribal repoussé craftsmanship",
      "Earring Closure: Push back with broad comfort disk"
    ],
    materials: "Lead-free and nickel-free white metal alloy with antique oxidised finish. (Not genuine silver).",
    careInstructions: "Avoid water, lotions, and soaps. Store in a cool dry place.",
    images: ["/images/products/tribal-silver-choker-1.svg"],
    variants: [
      { id: "var-37-1", name: "Antique Oxidised Silver (Full Suite)", colorCode: "#9E9E9E", stock: 16, sku: "RC-JS-TRB-01" }
    ],
    stock: 16,
    sku: "RC-JS-TRB",
    status: "published",
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 37,
    seoTitle: "Tribal Oxidised Silver Floral Choker Suite | Rumana Creations",
    seoDescription: "Vintage tribal oxidised silver choker and matching jhumka earrings suite by Rumana Creations.",
    createdAt: "2026-10-23T01:39:00.000Z"
  },
  {
    id: "prod-38",
    slug: "pastel-minimalist-rectangular-midi-claw-pack",
    name: "Pastel Minimalist Rectangular Midi Claw Clip Set (Pack of 4)",
    category: "claw-clips",
    categoryName: "Claw Clips",
    price: 329,
    originalPrice: 479,
    description: "As seen in our store showcase tray: Set of 4 tinted rectangular midi claw clips in curated neutral tones. Perfect for half-up twists, fine to medium hair, and effortless everyday work styles.",
    details: [
      "Pack Contents: 4 midi claw clips (Length: 6.5 cm)",
      "Colors: Rose Quartz, Sage Green, Smoke Grey, Frosted Clear",
      "Spring: Rust-proof gold-tone steel coil",
      "Texture: Soft-touch frosted acrylic finish with non-slip teeth"
    ],
    materials: "Bio-acetate acrylic with gold-plated spring mechanism.",
    careInstructions: "Wipe with a damp cloth if needed. Air dry away from direct heat.",
    images: ["/images/products/rectangular-midi-claw-1.svg"],
    variants: [
      { id: "var-38-1", name: "Boutique Pastel Quad (Set of 4)", colorCode: "#E0F2F1", stock: 25, sku: "RC-CC-MID-01" }
    ],
    stock: 25,
    sku: "RC-CC-MID",
    status: "published",
    isFeatured: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 21,
    seoTitle: "Pastel Minimalist Rectangular Midi Claw Clips (Set of 4) | Rumana Creations",
    seoDescription: "Four pack of pastel tinted rectangular midi hair claw clips for effortless everyday hair styling.",
    createdAt: "2026-10-23T01:40:00.000Z"
  }
];

newPosterProducts.forEach(prod => {
  const existingIdx = storeData.products.findIndex(p => p.id === prod.id || p.slug === prod.slug);
  if (existingIdx === -1) {
    storeData.products.push(prod);
    console.log(`✅ Added product: ${prod.name}`);
  } else {
    storeData.products[existingIdx] = { ...storeData.products[existingIdx], ...prod };
    console.log(`ℹ️ Updated product: ${prod.name}`);
  }
});

fs.writeFileSync(dataPath, JSON.stringify(storeData, null, 2), 'utf8');
console.log(`\n🎉 Data updated successfully! Total Categories: ${storeData.categories.length}, Total Products: ${storeData.products.length}`);
