import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Ruler } from 'lucide-react';

interface HeroProps {
  onExplore: (category: string) => void;
  onOpenTracking: () => void;
  onOpenSizeGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenTracking, onOpenSizeGuide }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Unboxed subtle kicker with typographic separator */}
            <div className="text-xs uppercase tracking-widest text-[#7D705C] flex items-center gap-2">
              <span>Atelier Lahore & Karachi</span>
              <span aria-hidden="true">·</span>
              <span>The Festive Eid Edit 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A2521] font-normal leading-[1.1] tracking-tight">
              Regal needlework, modern Pakistani grace.
            </h1>

            <p className="text-sm sm:text-base text-[#4F5953] leading-relaxed max-w-xl">
              Immerse in pure Egyptian lawn, Kashmiri Kashida threadwork, and bespoke royal raw silk peshwas. Tailored precisely to your measurements with nationwide TCS express dispatch and secure digital gateways.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onExplore('festive-lawn')}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A2521] hover:bg-[#2C3B34] active:scale-[0.98] transition-all flex items-center gap-2 rounded shadow-sm"
              >
                <span>Shop Festive Lawn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A2521] bg-white border border-[#D5CBB9] hover:bg-[#F2ECE1] transition-all flex items-center gap-2 rounded"
              >
                <Ruler className="w-3.5 h-3.5 text-[#9B7A38]" />
                <span>Size Guide & Fit Quiz</span>
              </button>
            </div>

            {/* Unboxed Trust Markers / Quantitative rigor */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-3 gap-4 text-xs text-[#5D6761]">
              <div>
                <p className="font-serif text-lg font-semibold text-[#1A2521] tabular-nums">24-48 hrs</p>
                <p className="text-[11px] text-[#78827C]">TCS & Leopards Dispatch</p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#1A2521] tabular-nums">100%</p>
                <p className="text-[11px] text-[#78827C]">Pure Egyptian 80s Lawn</p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#1A2521] tabular-nums">7 Days</p>
                <p className="text-[11px] text-[#78827C]">Easy Exchanges across PK</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Fashion Campaign Photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-[#E0D7C8] bg-[#EDE6D9]">
              <img
                src="/src/assets/images/hero_festive_lawn_campaign_1791961614322.jpg"
                alt="Pakistani Festive Lawn Luxury Couture in Mughal Haveli"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Subtle luxury caption scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D5B876] font-medium block">
                    Zeb-un-Nisa Collection
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-medium">
                    Hand-crafted Emerald Haveli 3-Piece
                  </p>
                </div>
                <button
                  onClick={() => onExplore('festive-lawn')}
                  className="text-xs font-semibold bg-white/95 text-[#1A2521] hover:bg-white px-3.5 py-1.5 rounded transition-all whitespace-nowrap"
                >
                  View Ensemble
                </button>
              </div>
            </div>

            {/* Quick Order Tracker floating strip */}
            <div className="mt-4 bg-white/90 backdrop-blur-sm border border-[#E4DCce] rounded p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#35403A]">
                <ShieldCheck className="w-4 h-4 text-[#9B7A38]" />
                <span>Have an active order? Track via TCS, Leopards, or Trax</span>
              </div>
              <button
                onClick={onOpenTracking}
                className="flex items-center gap-1.5 text-[#9B7A38] font-bold hover:text-[#7C5F25] transition-colors whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Live Consignment Lookup &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
