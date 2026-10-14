import React from 'react';
import { Compass, Ruler, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { openTrackingModal, openSizeGuideModal, setSelectedCategory } = useShop();

  return (
    <footer className="bg-[#1A2521] text-[#E7E2D8] border-t border-[#2C3833]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 text-xs">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-wider text-white uppercase">
              Zariya Couture
            </h3>
            <p className="text-[#A2ADA7] text-xs leading-relaxed max-w-sm">
              Luxury Pakistani ready-to-wear prét, embroidered festive lawn, and bespoke wedding atelier. Handcrafted with devotion in Lahore and delivered worldwide via TCS and DHL.
            </p>
            <div className="text-[11px] text-[#A2ADA7] space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#9B7A38]" />
                <span>Flagship Atelier: 42-Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#9B7A38]" />
                <span>WhatsApp Concierge: +92 300 1234567 (Mon-Sat 10am - 8pm PKT)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9B7A38]" />
                <span>care@zariyacouture.pk</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Collections
            </h4>
            <ul className="space-y-2 text-[#A2ADA7]">
              <li>
                <button
                  onClick={() => setSelectedCategory('festive-lawn')}
                  className="hover:text-white transition-colors"
                >
                  Festive Lawn 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('luxury-pret')}
                  className="hover:text-white transition-colors"
                >
                  Luxury Prêt & Chikankari
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('formals')}
                  className="hover:text-white transition-colors"
                >
                  Formal Raw Silk Peshwas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('menswear')}
                  className="hover:text-white transition-colors"
                >
                  Menswear Kurta & Waistcoat
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('unstitched')}
                  className="hover:text-white transition-colors"
                >
                  Unstitched 3-Piece Fabric
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Client Services
            </h4>
            <ul className="space-y-2 text-[#A2ADA7]">
              <li>
                <button
                  onClick={() => openTrackingModal()}
                  className="hover:text-white flex items-center gap-1.5 transition-colors text-[#C5A869]"
                >
                  <Compass className="w-3 h-3" />
                  <span>Track TCS / Leopards Order</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openSizeGuideModal('women')}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Guides & Fit Quiz</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openSizeGuideModal('unstitched')}
                  className="hover:text-white transition-colors"
                >
                  Unstitched Yardage Guide
                </button>
              </li>
              <li>
                <a
                  href="#catalog-section"
                  className="hover:text-white transition-colors"
                >
                  Domestic & International Shipping
                </a>
              </li>
              <li>
                <a
                  href="#catalog-section"
                  className="hover:text-white transition-colors"
                >
                  7-Day Nationwide Exchange Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Gateways & Trust */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Payment Security
            </h4>
            <p className="text-[11px] text-[#A2ADA7] leading-relaxed">
              State Bank of Pakistan compliant 256-Bit SSL tokenized checkout.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] text-[#D8CEBE]">
              <span className="bg-[#26352E] px-2 py-1 rounded border border-[#34463D]">
                Cash on Delivery
              </span>
              <span className="bg-[#26352E] px-2 py-1 rounded border border-[#34463D]">
                JazzCash
              </span>
              <span className="bg-[#26352E] px-2 py-1 rounded border border-[#34463D]">
                EasyPaisa
              </span>
              <span className="bg-[#26352E] px-2 py-1 rounded border border-[#34463D]">
                Visa / MC
              </span>
              <span className="bg-[#26352E] px-2 py-1 rounded border border-[#34463D]">
                PayPak
              </span>
              <span className="bg-[#26352E] px-2 py-1 rounded border border-[#34463D]">
                Raast IBAN
              </span>
            </div>
            <div className="pt-2 text-[11px] text-[#C5A869] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Fraud Protection Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="mt-12 pt-6 border-t border-[#293832] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#86928C]">
          <p>© 2026 ZARIYA COUTURE (PVT) LTD · Crafted in Pakistan for the world.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>NTN: 8492014-9</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
