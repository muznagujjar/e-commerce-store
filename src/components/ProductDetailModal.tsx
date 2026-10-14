import React, { useState } from 'react';
import {
  X,
  Heart,
  Ruler,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Scissors,
  Check,
  Share2
} from 'lucide-react';
import { Product, CustomMeasurements } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openSizeGuideModal,
    showToast
  } = useShop();

  if (!product) return null;

  const isFav = isInWishlist(product.id);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [stitchingType, setStitchingType] = useState<'Stitched' | 'Unstitched'>(
    product.isStitchedAvailable ? 'Stitched' : 'Unstitched'
  );
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom Stitching'>(
    product.availableSizes[1] || 'M'
  );
  const [trouserStyle, setTrouserStyle] = useState<
    'Straight Trouser' | 'Cigarette Pant' | 'Tulip Shalwar' | 'Flared Palazzos'
  >('Cigarette Pant');

  // Custom measurements state
  const [showCustomDrawer, setShowCustomDrawer] = useState(false);
  const [customUnit, setCustomUnit] = useState<'inches' | 'cm'>('inches');
  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: 38,
    waist: 34,
    hip: 42,
    kameezLength: 43,
    shoulder: 15,
    sleeveLength: 22,
    trouserLength: 39,
    unit: 'inches',
    notes: ''
  });

  const handleAddToCart = () => {
    addToCart({
      product,
      size: selectedSize,
      stitchingType,
      trouserStyle: stitchingType === 'Stitched' ? trouserStyle : undefined,
      customMeasurements: selectedSize === 'Custom Stitching' ? measurements : undefined,
      quantity: 1
    });
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this luxury Pakistani ensemble: ${product.name} by Zariya Couture`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F5] w-full max-w-5xl rounded-sm shadow-2xl border border-[#DED6C7] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 px-6 bg-white border-b border-[#E8E2D7] flex items-center justify-between shrink-0">
          <div className="text-[11px] uppercase tracking-widest text-[#7D705C] flex items-center gap-2">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fabric}</span>
            <span aria-hidden="true">·</span>
            <span>{product.pieces}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#68736D] hover:text-[#1A2521] rounded hover:bg-[#F4EFE6] transition-colors"
              title="Share ensemble"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 text-[#68736D] hover:text-[#C94A4A] rounded hover:bg-[#F4EFE6] transition-colors"
              title="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-[#C94A4A] text-[#C94A4A]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#68736D] hover:text-[#1A2521] rounded hover:bg-[#F4EFE6] transition-colors"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body: Contiguous PDP Architecture */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[3/4] bg-[#F2EDE4] rounded-sm overflow-hidden border border-[#E0D7C9]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />

                {product.tag && (
                  <div className="absolute top-3 left-3 bg-[#1A2521] text-white text-[11px] font-medium tracking-wider uppercase px-3 py-1">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Thumbnail selector */}
              {product.secondaryImage && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedImage(product.image)}
                    className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all ${
                      selectedImage === product.image ? 'border-[#1A2521]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt="Front view"
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                  <button
                    onClick={() => setSelectedImage(product.secondaryImage!)}
                    className={`w-16 h-20 rounded-xs overflow-hidden border-2 transition-all ${
                      selectedImage === product.secondaryImage ? 'border-[#1A2521]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={product.secondaryImage}
                      alt="Campaign view"
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase Module (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A2521]">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mt-2.5 flex items-baseline gap-3 tabular-nums">
                  <span className="text-2xl font-bold text-[#1A2521]">
                    {formatPrice(
                      selectedSize === 'Custom Stitching'
                        ? product.pricePKR + 3500
                        : stitchingType === 'Unstitched' && product.originalPricePKR
                        ? Math.max(8000, product.pricePKR - 2500)
                        : product.pricePKR
                    )}
                  </span>
                  {product.originalPricePKR && (
                    <span className="text-sm text-[#8D9690] line-through">
                      {formatPrice(product.originalPricePKR)}
                    </span>
                  )}
                  <span className="text-xs text-[#2F6B42] font-semibold">Taxes Included</span>
                </div>
              </div>

              {/* Stitching Option: Ready-to-Wear vs Unstitched Fabric */}
              {product.isStitchedAvailable && product.isUnstitchedAvailable && (
                <div className="pt-2 border-t border-[#EAE3D6]">
                  <label className="text-xs font-semibold text-[#323B36] block mb-2">
                    Select Attire Format:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setStitchingType('Stitched')}
                      className={`p-2.5 text-center rounded border font-semibold transition-colors ${
                        stitchingType === 'Stitched'
                          ? 'bg-[#1A2521] text-white border-[#1A2521]'
                          : 'bg-white text-[#4A544E] border-[#D8CEBE] hover:border-[#9B7A38]'
                      }`}
                    >
                      Ready-to-Wear (Stitched)
                    </button>
                    <button
                      onClick={() => {
                        setStitchingType('Unstitched');
                        if (selectedSize === 'Custom Stitching') {
                          setSelectedSize('M');
                        }
                      }}
                      className={`p-2.5 text-center rounded border font-semibold transition-colors ${
                        stitchingType === 'Unstitched'
                          ? 'bg-[#1A2521] text-white border-[#1A2521]'
                          : 'bg-white text-[#4A544E] border-[#D8CEBE] hover:border-[#9B7A38]'
                      }`}
                    >
                      Unstitched Fabric (3-Piece)
                    </button>
                  </div>
                </div>
              )}

              {/* Sizing Section */}
              {stitchingType === 'Stitched' && (
                <div className="pt-2 border-t border-[#EAE3D6] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#323B36]">Select Size:</span>
                    <button
                      onClick={() =>
                        openSizeGuideModal(product.category === 'menswear' ? 'men' : 'women')
                      }
                      className="text-[#9B7A38] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide & Fit Quiz</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          setSelectedSize(sz);
                          setShowCustomDrawer(false);
                        }}
                        className={`w-11 h-10 font-bold rounded border transition-colors ${
                          selectedSize === sz
                            ? 'bg-[#1A2521] text-white border-[#1A2521]'
                            : 'bg-white text-[#4A544E] border-[#D8CEBE] hover:border-[#9B7A38]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}

                    {/* Custom Made-to-measure button */}
                    <button
                      onClick={() => {
                        setSelectedSize('Custom Stitching');
                        setShowCustomDrawer(!showCustomDrawer);
                      }}
                      className={`px-3 h-10 text-[11px] font-bold rounded border flex items-center gap-1.5 transition-colors ${
                        selectedSize === 'Custom Stitching'
                          ? 'bg-[#9B7A38] text-white border-[#9B7A38]'
                          : 'bg-[#FAF4EA] text-[#8C6D2B] border-[#DECFB5] hover:border-[#9B7A38]'
                      }`}
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Custom Stitching (+₨ 3,500)</span>
                    </button>
                  </div>

                  {/* Trouser Cut Style */}
                  {product.category !== 'menswear' && (
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-[#5B655F] block mb-1.5">
                        Bottom Silhouette Style:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                        {[
                          'Straight Trouser',
                          'Cigarette Pant',
                          'Tulip Shalwar',
                          'Flared Palazzos'
                        ].map((style) => (
                          <button
                            key={style}
                            onClick={() => setTrouserStyle(style as any)}
                            className={`p-1.5 rounded border text-center transition-colors ${
                              trouserStyle === style
                                ? 'bg-[#1A2521] text-white border-[#1A2521]'
                                : 'bg-white text-[#4A544E] border-[#D8CEBE] hover:border-[#9B7A38]'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Measurement Drawer Form */}
                  {selectedSize === 'Custom Stitching' && (
                    <div className="p-4 bg-white border border-[#DECFB5] rounded space-y-3 animate-in fade-in duration-200 text-xs">
                      <div className="flex items-center justify-between border-b border-[#F0EAE0] pb-2">
                        <span className="font-semibold text-[#1A2521] flex items-center gap-1.5">
                          <Scissors className="w-3.5 h-3.5 text-[#9B7A38]" />
                          Bespoke Tailoring Form
                        </span>
                        <div className="flex items-center gap-1 bg-[#F5EFE4] p-0.5 rounded text-[10px]">
                          <button
                            onClick={() => setCustomUnit('inches')}
                            className={`px-2 py-0.5 rounded ${
                              customUnit === 'inches' ? 'bg-[#1A2521] text-white font-bold' : ''
                            }`}
                          >
                            Inches
                          </button>
                          <button
                            onClick={() => setCustomUnit('cm')}
                            className={`px-2 py-0.5 rounded ${
                              customUnit === 'cm' ? 'bg-[#1A2521] text-white font-bold' : ''
                            }`}
                          >
                            CM
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-[#7A837D] block">Bust / Chest</label>
                          <input
                            type="number"
                            value={measurements.bust}
                            onChange={(e) =>
                              setMeasurements({ ...measurements, bust: Number(e.target.value) })
                            }
                            className="w-full p-1.5 border border-[#D5CAB9] rounded tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A837D] block">Waist</label>
                          <input
                            type="number"
                            value={measurements.waist}
                            onChange={(e) =>
                              setMeasurements({ ...measurements, waist: Number(e.target.value) })
                            }
                            className="w-full p-1.5 border border-[#D5CAB9] rounded tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A837D] block">Hip</label>
                          <input
                            type="number"
                            value={measurements.hip}
                            onChange={(e) =>
                              setMeasurements({ ...measurements, hip: Number(e.target.value) })
                            }
                            className="w-full p-1.5 border border-[#D5CAB9] rounded tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A837D] block">Kameez Length</label>
                          <input
                            type="number"
                            value={measurements.kameezLength}
                            onChange={(e) =>
                              setMeasurements({
                                ...measurements,
                                kameezLength: Number(e.target.value)
                              })
                            }
                            className="w-full p-1.5 border border-[#D5CAB9] rounded tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A837D] block">Shoulder</label>
                          <input
                            type="number"
                            value={measurements.shoulder}
                            onChange={(e) =>
                              setMeasurements({ ...measurements, shoulder: Number(e.target.value) })
                            }
                            className="w-full p-1.5 border border-[#D5CAB9] rounded tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A837D] block">Trouser Length</label>
                          <input
                            type="number"
                            value={measurements.trouserLength}
                            onChange={(e) =>
                              setMeasurements({
                                ...measurements,
                                trouserLength: Number(e.target.value)
                              })
                            }
                            className="w-full p-1.5 border border-[#D5CAB9] rounded tabular-nums"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Additional notes for our master tailor (e.g. higher neckline)..."
                        value={measurements.notes || ''}
                        onChange={(e) =>
                          setMeasurements({ ...measurements, notes: e.target.value })
                        }
                        className="w-full p-1.5 border border-[#D5CAB9] rounded text-[11px]"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Add To Bag Primary CTA */}
              <div className="pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#1A2521] hover:bg-[#2C3B34] active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A869]" />
                  <span>Add To Shopping Bag</span>
                </button>

                <div className="mt-3 flex items-center justify-between text-[11px] text-[#69736D]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#9B7A38]" />
                    <span>TCS 2-Day Delivery</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9B7A38]" />
                    <span>Safe Online & COD Gateway</span>
                  </span>
                  <span>7-Day Exchange</span>
                </div>
              </div>

              {/* Description & Specs Tabs */}
              <div className="pt-4 border-t border-[#EAE3D6] space-y-4 text-xs text-[#4F5852]">
                <div>
                  <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] mb-1">
                    Atelier Silhouette & Story
                  </h4>
                  <p className="leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] mb-1.5">
                    Embroidery & Needlework Craft
                  </h4>
                  <ul className="space-y-1 list-disc list-inside text-[#55605A]">
                    {product.embroideryDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] mb-1.5">
                    Fabric Yardage Composition
                  </h4>
                  <div className="bg-white p-3 border border-[#E0D7C9] rounded space-y-1 text-[11px]">
                    <div>
                      <strong className="text-[#1A2521]">Kameez / Shirt:</strong>{' '}
                      {product.fabricSpecs.shirt}
                    </div>
                    {product.fabricSpecs.dupatta && (
                      <div>
                        <strong className="text-[#1A2521]">Dupatta / Shawl:</strong>{' '}
                        {product.fabricSpecs.dupatta}
                      </div>
                    )}
                    {product.fabricSpecs.trouser && (
                      <div>
                        <strong className="text-[#1A2521]">Bottom / Trouser:</strong>{' '}
                        {product.fabricSpecs.trouser}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1A2521] uppercase tracking-wider text-[11px] mb-1">
                    Fabric Preservation & Care
                  </h4>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#6B756F]">
                    {product.careInstructions.map((care, idx) => (
                      <span key={idx} className="bg-white px-2 py-1 rounded border border-[#E4DCCE]">
                        {care}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
