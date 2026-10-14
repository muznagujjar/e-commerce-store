import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { Product, ApparelCategory, FabricType } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductGridProps {
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onQuickView }) => {
  const { selectedCategory, setSelectedCategory, wishlist } = useShop();
  const [fabricFilter, setFabricFilter] = useState<string>('all');
  const [stitchingFilter, setStitchingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Ensembles' },
    { id: 'festive-lawn', label: 'Festive Lawn' },
    { id: 'luxury-pret', label: 'Luxury Prêt' },
    { id: 'formals', label: 'Formal Atelier' },
    { id: 'menswear', label: 'Menswear' },
    { id: 'unstitched', label: 'Unstitched Fabric' },
    { id: 'wishlist', label: `Saved (${wishlist.length})` }
  ];

  const fabrics: FabricType[] = [
    'Lawn',
    'Raw Silk',
    'Chiffon',
    'Organza',
    'Chikankari Cotton',
    'Jacquard'
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory === 'wishlist') {
        if (!wishlist.includes(item.id)) return false;
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Fabric filter
      if (fabricFilter !== 'all' && item.fabric !== fabricFilter) {
        return false;
      }

      // Stitching filter
      if (stitchingFilter === 'stitched' && !item.isStitchedAvailable) return false;
      if (stitchingFilter === 'unstitched' && !item.isUnstitchedAvailable) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesPieces = item.pieces.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesDesc && !matchesPieces) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, fabricFilter, stitchingFilter, sortBy, searchQuery, wishlist]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setFabricFilter('all');
    setStitchingFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    fabricFilter !== 'all' ||
    stitchingFilter !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <section id="catalog-section" className="py-12 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E8E2D7] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7D705C] flex items-center gap-2 mb-1">
              <span>Haute Couture & Ready-to-Wear</span>
              <span aria-hidden="true">·</span>
              <span>Made in Pakistan</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A2521] font-semibold tracking-tight">
              Curated Spring/Festive Atelier
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lawn, silk, chikankari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E0D7C9] rounded text-[#1A2521] placeholder-[#8F887C] focus:outline-none focus:border-[#1A2521]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8476] hover:text-[#1A2521]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Segmented Filter Tabs (Frontend Design Section 1.A Allowed) */}
        <div className="mt-6 flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#F1EBE1] rounded-md shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#1A2521] shadow-xs font-semibold'
                    : 'text-[#58625C] hover:text-[#1A2521]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Fabric dropdown */}
            <select
              value={fabricFilter}
              onChange={(e) => setFabricFilter(e.target.value)}
              className="text-xs bg-white border border-[#E0D7C9] text-[#343D38] py-1.5 px-3 rounded focus:outline-none focus:border-[#1A2521]"
            >
              <option value="all">All Fabrics</option>
              {fabrics.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Stitching filter */}
            <select
              value={stitchingFilter}
              onChange={(e) => setStitchingFilter(e.target.value)}
              className="text-xs bg-white border border-[#E0D7C9] text-[#343D38] py-1.5 px-3 rounded focus:outline-none focus:border-[#1A2521]"
            >
              <option value="all">Stitched & Unstitched</option>
              <option value="stitched">Ready-to-Wear (Stitched)</option>
              <option value="unstitched">Unstitched Fabric</option>
            </select>

            {/* Sort order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-[#E0D7C9] text-[#343D38] py-1.5 px-3 rounded focus:outline-none focus:border-[#1A2521]"
            >
              <option value="featured">Featured Ensembles</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mt-3 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-[#E0D7C9] rounded text-[#343D38] font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine Filters</span>
          </button>
          <span className="text-[#6D7771]">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {showFiltersMobile && (
          <div className="lg:hidden mt-3 p-4 bg-white border border-[#E0D7C9] rounded space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-[#343D38] block mb-1">
                Fabric Material
              </label>
              <select
                value={fabricFilter}
                onChange={(e) => setFabricFilter(e.target.value)}
                className="w-full text-xs bg-[#FAF9F5] border border-[#E0D7C9] py-1.5 px-3 rounded"
              >
                <option value="all">All Fabrics</option>
                {fabrics.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#343D38] block mb-1">
                Stitching Style
              </label>
              <select
                value={stitchingFilter}
                onChange={(e) => setStitchingFilter(e.target.value)}
                className="w-full text-xs bg-[#FAF9F5] border border-[#E0D7C9] py-1.5 px-3 rounded"
              >
                <option value="all">All Options</option>
                <option value="stitched">Stitched (Prêt)</option>
                <option value="unstitched">Unstitched Fabric</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#343D38] block mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full text-xs bg-[#FAF9F5] border border-[#E0D7C9] py-1.5 px-3 rounded"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Active filter count & reset */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2 text-xs text-[#636C66]">
            <span>Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="font-semibold text-[#1A2521]">
                Category: {selectedCategory}
              </span>
            )}
            {fabricFilter !== 'all' && (
              <span className="font-semibold text-[#1A2521]">
                · Fabric: {fabricFilter}
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-[#9B7A38] hover:underline ml-2 font-medium"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Product Cards Grid - 3 Column desktop layout */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white border border-[#EAE3D6] rounded-sm p-8">
              <Sparkles className="w-8 h-8 text-[#9B7A38] mx-auto mb-3 opacity-60" />
              <h3 className="font-serif text-xl font-semibold text-[#1A2521]">
                No ensembles found matching your criteria
              </h3>
              <p className="text-xs text-[#6B756F] max-w-md mx-auto mt-2">
                Try resetting your filters or searching for terms like "lawn", "chiffon", or "menswear".
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A2521] hover:bg-[#2C3B34] rounded transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
