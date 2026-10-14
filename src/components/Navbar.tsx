import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Compass, ChevronDown } from 'lucide-react';
import { useShop, CURRENCIES } from '../context/ShopContext';
import { CurrencyCode } from '../types';

interface NavbarProps {
  onNavigateToCollection: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToCollection }) => {
  const {
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    openTrackingModal,
    openSizeGuideModal,
    wishlist
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (category: string) => {
    onNavigateToCollection(category);
    setMobileMenuOpen(false);
  };

  const currencyKeys = Object.keys(CURRENCIES) as CurrencyCode[];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E2D7] transition-all">
      {/* Strict 1-row, 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1A2521] p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2521]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('all');
            }}
            className="font-serif text-2xl lg:text-3xl font-semibold tracking-wider text-[#1A2521] uppercase whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            Zariya Couture
          </a>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#343D38]">
          <button
            onClick={() => handleNavClick('festive-lawn')}
            className="hover:text-[#1A2521] hover:underline underline-offset-8 decoration-[#9B7A38] decoration-2 transition-all whitespace-nowrap shrink-0"
          >
            Festive Lawn
          </button>
          <button
            onClick={() => handleNavClick('luxury-pret')}
            className="hover:text-[#1A2521] hover:underline underline-offset-8 decoration-[#9B7A38] decoration-2 transition-all whitespace-nowrap shrink-0"
          >
            Luxury Prêt
          </button>
          <button
            onClick={() => handleNavClick('formals')}
            className="hover:text-[#1A2521] hover:underline underline-offset-8 decoration-[#9B7A38] decoration-2 transition-all whitespace-nowrap shrink-0"
          >
            Formal Atelier
          </button>
          <button
            onClick={() => handleNavClick('menswear')}
            className="hover:text-[#1A2521] hover:underline underline-offset-8 decoration-[#9B7A38] decoration-2 transition-all whitespace-nowrap shrink-0"
          >
            Menswear
          </button>
          <button
            onClick={() => openTrackingModal()}
            className="flex items-center gap-1.5 text-[#9B7A38] font-semibold hover:text-[#7D5F23] hover:underline underline-offset-8 decoration-[#9B7A38] decoration-2 transition-all whitespace-nowrap shrink-0"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-semibold uppercase text-[#343D38] hover:text-[#1A2521] px-2 py-1 rounded border border-[#E0D7C9] bg-white transition-colors"
              aria-label="Select currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#7D766B]" />
            </button>

            {currencyDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setCurrencyDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-32 bg-white rounded shadow-lg border border-[#E8E2D7] py-1 z-20">
                  {currencyKeys.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F7F4EE] transition-colors ${
                        currency === c ? 'font-bold text-[#1A2521] bg-[#F7F4EE]' : 'text-[#5A635E]'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-muted-foreground text-[10px]">{CURRENCIES[c].symbol}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Size Guide quick button */}
          <button
            onClick={() => openSizeGuideModal('women')}
            className="hidden sm:inline-block text-xs font-medium text-[#4D5751] hover:text-[#1A2521] px-2.5 py-1.5 rounded border border-transparent hover:border-[#E0D7C9] transition-all whitespace-nowrap"
            title="View Pakistani Size Guides"
          >
            Size Guide
          </button>

          {/* Wishlist Indicator */}
          <button
            onClick={() => {
              if (wishlist.length > 0) {
                handleNavClick('wishlist');
              } else {
                handleNavClick('all');
              }
            }}
            className="relative p-2 text-[#343D38] hover:text-[#1A2521] transition-colors focus:outline-none"
            aria-label="Wishlist items"
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#C94A4A] text-[#C94A4A]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#1A2521] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button (Primary Action) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1A2521] hover:bg-[#2A3732] active:scale-[0.98] rounded transition-all whitespace-nowrap shrink-0 shadow-sm"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8DECE]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#9B7A38] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D7] bg-[#FAF9F5] px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#343D38]">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left py-2 border-b border-[#EFE9DF] hover:text-[#1A2521]"
            >
              All Collections
            </button>
            <button
              onClick={() => handleNavClick('festive-lawn')}
              className="text-left py-2 border-b border-[#EFE9DF] hover:text-[#1A2521]"
            >
              Festive Lawn
            </button>
            <button
              onClick={() => handleNavClick('luxury-pret')}
              className="text-left py-2 border-b border-[#EFE9DF] hover:text-[#1A2521]"
            >
              Luxury Prêt
            </button>
            <button
              onClick={() => handleNavClick('formals')}
              className="text-left py-2 border-b border-[#EFE9DF] hover:text-[#1A2521]"
            >
              Formal & Wedding Atelier
            </button>
            <button
              onClick={() => handleNavClick('menswear')}
              className="text-left py-2 border-b border-[#EFE9DF] hover:text-[#1A2521]"
            >
              Menswear
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSizeGuideModal('women');
              }}
              className="text-left py-2 border-b border-[#EFE9DF] hover:text-[#1A2521]"
            >
              Pakistani Size Guide & Recommender
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTrackingModal();
              }}
              className="text-left py-2 text-[#9B7A38] font-semibold flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Track Existing Order (TCS / Leopards)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
