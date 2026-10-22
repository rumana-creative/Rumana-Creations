-- Rumana Creations: Migration 03 — Additional Jewellery Categories & Products
-- Adds Necklaces, Earrings, Rings, Bangles, Bracelets, Jewellery Sets, Fashion Jewellery & Craft Materials

-- 1. Insert New Categories
INSERT INTO categories (id, slug, name, description, image, display_order, is_visible)
VALUES
  ('cat-8', 'necklaces', 'Necklaces & Pendants', 'Statement chokers, delicate layered pendants, and handcrafted ethnic necklaces.', '/images/categories/necklaces.svg', 8, true),
  ('cat-9', 'earrings', 'Earrings & Jhumkas', 'Traditional Meenakari jhumkas, lightweight huggies, and crystal drops.', '/images/categories/earrings.svg', 9, true),
  ('cat-10', 'rings', 'Fashion Rings', 'Adjustable Polki cocktail rings, stackable gold-tone bands, and statement accents.', '/images/categories/rings.svg', 10, true),
  ('cat-11', 'bangles', 'Bangles & Kadas', 'Filigree brass kadas, bridal chooda accents, and velvet silk bangle sets.', '/images/categories/bangles.svg', 11, true),
  ('cat-12', 'bracelets', 'Bracelets & Charms', 'Delicate tennis bracelets, evil-eye charms, and baroque pearl wristlets.', '/images/categories/bracelets.svg', 12, true),
  ('cat-13', 'jewellery-sets', 'Jewellery Sets', 'Coordinated choker & earring suites, bridal combos, and festive party sets.', '/images/categories/jewellery-sets.svg', 13, true),
  ('cat-14', 'fashion-jewellery', 'Fashion & Costume Jewellery', 'Curated everyday ethnic & contemporary artificial and costume jewellery.', '/images/categories/fashion-jewellery.svg', 14, true),
  ('cat-15', 'jewellery-making-materials', 'Jewellery-Making Materials', 'High-grade glass beads, craft wires, jump rings, clasps, and DIY jewelry supplies.', '/images/categories/craft-materials.svg', 15, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order;

-- 2. Insert New Products Sample Records
INSERT INTO products (id, slug, name, category_slug, category_name, price, original_price, description, materials, care_instructions, images, stock, sku, is_featured, is_new_arrival, is_best_seller, status)
VALUES
  ('prod-13', 'royal-kundan-meenakari-choker-necklace', 'Royal Kundan Meenakari Choker Necklace', 'necklaces', 'Necklaces & Pendants', 749.00, 1299.00, 'Handcrafted bridal choker necklace featuring traditional Meenakari enamel artistry and pearls.', 'High-grade brass alloy with gold-toned lacquer plating, synthetic stones, imitation glass pearls.', 'Store in airtight pouch. Avoid moisture.', '["/images/products/choker-necklace-1.svg"]'::jsonb, 37, 'RC-NK-01', true, true, true, 'published'),
  ('prod-15', 'chandbali-pearl-drop-festive-jhumkas', 'Chandbali Pearl Drop Festive Jhumkas', 'earrings', 'Earrings & Jhumkas', 449.00, 799.00, 'Majestic crescent Chandbali jhumka earrings adorned with floral filigree work and pearls.', 'Lightweight brass alloy with antique gold polish, artificial faux pearls.', 'Clean with dry cloth. Do not soak.', '["/images/products/chandbali-earrings-1.svg"]'::jsonb, 36, 'RC-ER-01', true, true, true, 'published'),
  ('prod-17', 'vintage-floral-polki-adjustable-cocktail-ring', 'Vintage Floral Polki Adjustable Cocktail Ring', 'rings', 'Fashion Rings', 349.00, 599.00, 'Statement blooming flower cocktail ring studded with Polki stones and faux pearls.', 'Brass base with gold-toned polish, glass polki stones, artificial seed pearls.', 'Keep away from water and lotions.', '["/images/products/polki-ring-1.svg"]'::jsonb, 36, 'RC-RG-01', true, true, false, 'published'),
  ('prod-19', 'embroidered-velvet-golden-zari-bangle-set', 'Embroidered Velvet & Golden Zari Bangle Set (Set of 12)', 'bangles', 'Bangles & Kadas', 599.00, 999.00, 'Handcrafted festive bangle set combining velvet-wrapped bangles, zari braiding, and crystals.', 'Metal alloy core, plush micro-velvet, metallic zari thread.', 'Keep in dry padded bangle box.', '["/images/products/velvet-bangles-1.svg"]'::jsonb, 37, 'RC-BG-01', true, true, true, 'published'),
  ('prod-21', 'baroque-freshwater-pearl-heart-charm-bracelet', 'Baroque Freshwater Pearl & Heart Charm Bracelet', 'bracelets', 'Bracelets & Charms', 399.00, 699.00, 'Asymmetrical modern bracelet strung with imitation baroque pearls and heart charm.', 'Imitation baroque pearls, gold-plated zinc alloy charm.', 'Wipe with soft cloth. Avoid moisture.', '["/images/products/baroque-bracelet-1.svg"]'::jsonb, 22, 'RC-BR-01', true, true, false, 'published'),
  ('prod-23', 'emerald-green-pearl-royal-choker-earring-set', 'Emerald Green & Pearl Royal Choker & Earring Set', 'jewellery-sets', 'Jewellery Sets', 1199.00, 1999.00, 'Complete celebratory jewellery suite: Kundan choker with emerald beads and drop earrings.', 'Brass alloy with micro gold plating, synthetic emerald beads, faux pearls.', 'Store in moisture-proof case.', '["/images/products/royal-jewellery-set-1.svg"]'::jsonb, 22, 'RC-JS-01', true, true, true, 'published'),
  ('prod-25', 'kundan-floral-matha-patti-maang-tikka', 'Kundan Floral Matha Patti & Maang Tikka', 'fashion-jewellery', 'Fashion & Costume Jewellery', 699.00, 1199.00, 'Traditional bridal and festive hair-and-forehead adornment with floral Kundan centerpieces.', 'Lightweight brass alloy, glass kundan, faux seed pearls.', 'Store flat in dry pouch.', '["/images/products/matha-patti-1.svg"]'::jsonb, 16, 'RC-FJ-01', true, true, false, 'published'),
  ('prod-26', 'diy-deluxe-jewellery-craft-kit-24-grid-box', 'DIY Deluxe Jewellery Craft Kit: 24-Grid Beads & Findings Box', 'jewellery-making-materials', 'Jewellery-Making Materials', 599.00, 999.00, 'All-in-one jewelry crafting starter set containing 2,000+ seed beads, findings, and elastic cord.', 'Glass seed beads, acrylic alphabet beads, zinc alloy findings, nylon elastic cord.', 'Keep small parts away from children under 3 years.', '["/images/products/diy-craft-kit-1.svg"]'::jsonb, 60, 'RC-MAT-01', true, true, true, 'published')
ON CONFLICT (slug) DO NOTHING;
