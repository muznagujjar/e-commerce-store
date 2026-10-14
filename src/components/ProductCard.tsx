import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Ruler } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openSizeGuideModal
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>(
    product.availableSizes[1] || product.availableSizes[0] || 'M'
  );
  const [isHovered, setIsHovered] = useState(false);
  const isFav = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      size: selectedSize,
      stitchingType: product.isStitchedAvailable ? 'Stitched' : 'Unstitched',
      quantity: 1
    });
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-[#E9E2D5] rounded-sm overflow-hidden hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div
        className="relative aspect-[3/4] bg-[#F4EFE6] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle unboxed tag on top left */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#1A2521]/90 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase px-2.5 py-1">
            {product.tag}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-[#2B3530] hover:text-[#C94A4A] transition-colors focus:outline-none"
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-[#C94A4A] text-[#C94A4A]' : ''}`} />
        </button>

        {/* Quick View Floating Action on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#1A2521] text-xs font-semibold py-2 px-3 rounded shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Info Area */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Fabric metadata - Unboxed with dot separator */}
          <div className="text-[11px] uppercase tracking-wider text-[#79705E] flex items-center gap-2 mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fabric}</span>
            <span aria-hidden="true">·</span>
            <span>{product.pieces}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base lg:text-lg text-[#1A2521] font-semibold hover:text-[#9B7A38] cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="mt-2 flex items-baseline gap-2 tabular-nums">
            <span className="text-base font-semibold text-[#1A2521]">
              {formatPrice(product.pricePKR)}
            </span>
            {product.originalPricePKR && (
              <span className="text-xs text-[#8F9892] line-through">
                {formatPrice(product.originalPricePKR)}
              </span>
            )}
          </div>
        </div>

        {/* Size Selection & Quick Add */}
        <div className="mt-4 pt-3 border-t border-[#F0EAE0]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#656E68] text-[11px] font-medium">Select Size:</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openSizeGuideModal(product.category === 'menswear' ? 'men' : 'women');
              }}
              className="text-[11px] text-[#9B7A38] hover:underline flex items-center gap-1"
            >
              <Ruler className="w-3 h-3" />
              <span>Guide</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            {product.availableSizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`flex-1 py-1 text-xs font-semibold rounded border transition-colors ${
                  selectedSize === sz
                    ? 'bg-[#1A2521] text-white border-[#1A2521]'
                    : 'bg-[#FAF8F5] text-[#4E5651] border-[#E2D9CB] hover:border-[#9B7A38]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 text-xs font-semibold uppercase tracking-wider text-[#1A2521] bg-[#F7F4EE] hover:bg-[#1A2521] hover:text-white border border-[#DDD3C2] hover:border-[#1A2521] rounded transition-all flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add To Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
