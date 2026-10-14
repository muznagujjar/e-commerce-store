/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { AtelierStory } from './components/AtelierStory';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckCircle2 } from 'lucide-react';

function ShopContent() {
  const {
    setSelectedCategory,
    openTrackingModal,
    openSizeGuideModal,
    quickViewProduct,
    setQuickViewProduct,
    toastMessage
  } = useShop();

  const catalogRef = useRef<HTMLDivElement>(null);

  const handleNavigateToCategory = (category: string) => {
    setSelectedCategory(category);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E2320]">
      {/* 1. Subtle Announcement Kicker */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract Navbar */}
      <Navbar onNavigateToCollection={handleNavigateToCategory} />

      {/* 3. Main Content Views */}
      <main className="flex-1">
        <Hero
          onExplore={handleNavigateToCategory}
          onOpenTracking={() => openTrackingModal()}
          onOpenSizeGuide={() => openSizeGuideModal('women')}
        />

        <div ref={catalogRef}>
          <ProductGrid onQuickView={(prod) => setQuickViewProduct(prod)} />
        </div>

        <AtelierStory />
      </main>

      {/* 4. Quiet Footer */}
      <Footer />

      {/* 5. Modals & Overlay Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <SizeGuideModal />
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2521] text-white text-xs px-4 py-3 rounded shadow-lg border border-[#3A4841] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}
