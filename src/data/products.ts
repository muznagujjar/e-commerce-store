import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Gul-e-Maryam 3-Piece Festive Lawn',
    slug: 'gul-e-maryam-festive-lawn',
    category: 'festive-lawn',
    categoryLabel: 'Festive Lawn',
    pricePKR: 16850,
    originalPricePKR: 19500,
    image: '/src/assets/images/product_embroidered_festive_lawn_1791961614788.jpg',
    secondaryImage: '/src/assets/images/hero_festive_lawn_campaign_1791961614322.jpg',
    fabric: 'Lawn',
    pieces: '3-Piece',
    isStitchedAvailable: true,
    isUnstitchedAvailable: true,
    description: 'A poetic ode to Lahore heritage, crafted from super-fine 80s Egyptian cotton lawn in muted tea rose. Featuring intricate resham floral jaal on the front and sleeves, paired with an embroidered organza neckline patti, gold printed pure silk organza dupatta, and matching cambric trousers with organza pintucks.',
    embroideryDetails: [
      'Multi-thread floral resham embroidery on front panel',
      'Hand-embellished pearl neckband patti & sleeve borders',
      'Subtle gold metallic foil tilla highlights on daman',
      'Pure silk organza dupatta with scalloped zardozi laser-cut borders',
      'Cambric trousers with stitched tucks & lace inserts'
    ],
    fabricSpecs: {
      shirt: '3.25m Embroidered Digital Lawn Front & Back',
      dupatta: '2.5m Pure Silk Organza Dupatta with Embroidered Pallu',
      trouser: '2.5m Solid Dyed Luxury Cambric Trouser'
    },
    careInstructions: [
      'Dry clean recommended for first wash',
      'Iron at moderate temperature inside-out',
      'Do not bleach or tumble dry',
      'Store in cotton muslin bag'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    tag: 'Festive Eid Edit'
  },
  {
    id: 'prod-002',
    name: 'Shaban-o-Noor Midnight Peshwas',
    slug: 'shaban-o-noor-midnight-peshwas',
    category: 'formals',
    categoryLabel: 'Formal & Wedding Atelier',
    pricePKR: 44500,
    originalPricePKR: 52000,
    image: '/src/assets/images/product_raw_silk_formal_1791961615967.jpg',
    secondaryImage: '/src/assets/images/product_raw_silk_formal_1791961615967.jpg',
    fabric: 'Raw Silk',
    pieces: '3-Piece',
    isStitchedAvailable: true,
    isUnstitchedAvailable: false,
    description: 'An ethereal 16-kali flared floor-length peshwas rendered in deep royal midnight navy pure Korean raw silk. Encrusted with antique gold tilla, badla, kora-dabka, and delicate micro-pearls inspired by Mughal motifs. Paired with a fitted churidar and heavy border organza dupatta.',
    embroideryDetails: [
      '16 kalis individually embroidered with antique gold zardozi',
      'Handcrafted peacock and cypress tree Mughal motifs on border',
      'Choli bodice embellished with nakshi and French knots',
      'Richly embellished dupatta with heavy 4-sided matha patti',
      'Raw silk tailored churidar with concealed zip ankle fit'
    ],
    fabricSpecs: {
      shirt: '16 Kalis Pure 80g Korean Raw Silk Floor-Length Peshwas',
      dupatta: '2.75m Royal Organza with Hand-cut Zardozi Work',
      trouser: '2.5m Pure Raw Silk Churidar'
    },
    careInstructions: [
      'Strictly dry clean only',
      'Do not spray perfume directly on metallic zari',
      'Fold and preserve wrapped in unbleached cotton fabric'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    featured: true,
    tag: 'Haute Couture'
  },
  {
    id: 'prod-003',
    name: 'Nilofer Ivory Chikankari Prêt Kurta',
    slug: 'nilofer-ivory-chikankari-pret-kurta',
    category: 'luxury-pret',
    categoryLabel: 'Luxury Prêt',
    pricePKR: 12500,
    originalPricePKR: 14000,
    image: '/src/assets/images/product_chikankari_pret_kurta_1791961616497.jpg',
    secondaryImage: '/src/assets/images/hero_festive_lawn_campaign_1791961614322.jpg',
    fabric: 'Chikankari Cotton',
    pieces: '2-Piece',
    isStitchedAvailable: true,
    isUnstitchedAvailable: false,
    description: 'Timeless understated elegance. Made from pure breathable swiss voile featuring traditional Lucknowi style Chikankari shadow work and geometric cutwork bell sleeves. Finished with mother-of-pearl buttons and pure cotton crochet lace hems.',
    embroideryDetails: [
      'All-over white-on-white delicate floral Chikankari embroidery',
      'Cutwork lattice (jaali) lace panels on flared sleeves',
      'Natural mother-of-pearl looped button placket',
      'Includes matching tapered pure cotton cigarette trousers'
    ],
    fabricSpecs: {
      shirt: 'Stitched Pure Swiss Voile Chikankari Kurta with Slip (Lining)',
      trouser: 'Pure Cotton Tapered Cigarette Pants with Lace Border'
    },
    careInstructions: [
      'Gentle hand wash in cold water with mild detergent',
      'Dry in shade to maintain pristine ivory color',
      'Steam iron while slightly damp'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    tag: 'Best Seller'
  },
  {
    id: 'prod-004',
    name: 'Zeb-un-Nisa Emerald Haveli Suit',
    slug: 'zeb-un-nisa-emerald-haveli-suit',
    category: 'festive-lawn',
    categoryLabel: 'Festive Lawn',
    pricePKR: 18900,
    image: '/src/assets/images/hero_festive_lawn_campaign_1791961614322.jpg',
    secondaryImage: '/src/assets/images/product_embroidered_festive_lawn_1791961614788.jpg',
    fabric: 'Lawn',
    pieces: '3-Piece',
    isStitchedAvailable: true,
    isUnstitchedAvailable: true,
    description: 'The centerpiece of our Royal Haveli campaign. Deep jewel-tone emerald green lawn with opulent gold marori thread work, framed with royal archways on the border. Accompanied by a pure gold-foil printed sheer organza dupatta that drapes like liquid light.',
    embroideryDetails: [
      'Mughal archway laser appliqué daman embroidery',
      'Fine gold tilla & resham work on neckline and cuff sleeves',
      'Pure organza embroidered side slits and neck motifs',
      'Heavily bordered dupatta with scalloped borders'
    ],
    fabricSpecs: {
      shirt: '3.5m Heavy Embroidered Slub Lawn',
      dupatta: '2.5m Organza Jacquard Gold Foil Dupatta',
      trouser: '2.5m Dyed Cambric Trouser with Embroidered Motif Patches'
    },
    careInstructions: [
      'Dry clean only',
      'Keep away from direct high heat ironing on gold foil surfaces'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    tag: 'Campaign Star'
  },
  {
    id: 'prod-005',
    name: 'Shahsawar Charcoal Silk Kurta & Prince Waistcoat',
    slug: 'shahsawar-charcoal-silk-kurta-waistcoat',
    category: 'menswear',
    categoryLabel: 'Menswear Atelier',
    pricePKR: 28500,
    originalPricePKR: 32000,
    image: '/src/assets/images/product_menswear_kurta_waistcoat_1791961617208.jpg',
    secondaryImage: '/src/assets/images/product_menswear_kurta_waistcoat_1791961617208.jpg',
    fabric: 'Jacquard',
    pieces: '3-Piece',
    isStitchedAvailable: true,
    isUnstitchedAvailable: false,
    description: 'Distinguished menswear tailored for wedding soirees and festive gatherings. Includes a charcoal slate textured raw silk kurta with bespoke hand-embroidered ban collar, matched with an intricate self-embossed damask jacquard prince waistcoat with brass crest buttons and pure cotton pajama.',
    embroideryDetails: [
      'Hand-stitched thread piping along ban collar and French cuffs',
      'Bespoke antiqued metal buttons with royal heraldic crest',
      'Self-patterned pure jacquard waistcoat with structured canvas chest piece',
      'Tailored matching charcoal trousers with slash pockets'
    ],
    fabricSpecs: {
      shirt: 'Charcoal Raw Silk Kurta with Mandarin Band Collar',
      dupatta: 'Damask Silk Jacquard Prince Waistcoat with Satin Lining',
      trouser: 'Charcoal Raw Silk Straight Pajama / Shalwar'
    },
    careInstructions: [
      'Dry clean only',
      'Always hang on shaped wooden coat hanger to preserve shoulder form'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    tag: 'Menswear Exclusive'
  },
  {
    id: 'prod-006',
    name: 'Meena-Kari Unstitched Pure Chiffon 3-Piece',
    slug: 'meena-kari-unstitched-chiffon-3-piece',
    category: 'unstitched',
    categoryLabel: 'Unstitched Luxury',
    pricePKR: 21500,
    originalPricePKR: 24500,
    image: '/src/assets/images/product_raw_silk_formal_1791961615967.jpg',
    secondaryImage: '/src/assets/images/product_embroidered_festive_lawn_1791961614788.jpg',
    fabric: 'Chiffon',
    pieces: '3-Piece',
    isStitchedAvailable: true,
    isUnstitchedAvailable: true,
    description: 'Pure 100% Crinkle Chiffon in soft pearl blush with intricate Kashmiri Kashida and Meenakari floral threadwork. Includes extra yardage for bespoke tailoring, matching pure crepe silk lining, and heavily embellished dupatta borders.',
    embroideryDetails: [
      'Full front panel embroidered in dense floral Kashida needlework',
      'Separate embroidered neckline and sleeve patches (organza base)',
      'Pure crinkle chiffon embroidered dupatta with 4-side borders',
      'Raw silk trousers with organza border laces'
    ],
    fabricSpecs: {
      shirt: '3.0m Pure Crinkle Chiffon Embroidered',
      dupatta: '2.5m Pure Crinkle Chiffon Dupatta with Heavy Pallu',
      trouser: '2.5m Pure Dyed Raw Silk Trouser with Slip Fabric'
    },
    careInstructions: [
      'Dry clean only',
      'Steam press gently'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    tag: 'Unstitched Collection'
  }
];
