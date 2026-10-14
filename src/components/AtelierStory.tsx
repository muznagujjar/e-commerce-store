import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export const AtelierStory: React.FC = () => {
  return (
    <section className="py-16 bg-[#F4EFE6] border-t border-b border-[#E4DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase tracking-widest text-[#7D705C] flex items-center gap-2">
              <span>Lahore · Karachi · Multan</span>
              <span aria-hidden="true">·</span>
              <span>Generations of Master Craft</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A2521] font-semibold leading-tight">
              Honoring centuries of Subcontinental textile artistry.
            </h2>

            <p className="text-xs sm:text-sm text-[#4E5852] leading-relaxed">
              Every ensemble from Zariya Couture begins with the finest raw fibers: combed 80s Egyptian cotton lawn, woven Mulberry silk organza, and textured raw silk. Our master embroiderers hand-stitch intricate Marori cords, antique Zardozi metal tilla, and Lucknowi Chikankari cutwork in small, ethical atelier batches.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DECFC0] text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-[#1A2521] block flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#9B7A38]" />
                  Master Karigar Guild
                </span>
                <p className="text-[11px] text-[#6E7872]">
                  Supporting over 450 hereditary embroidery artisans with fair wages across Punjab and Sindh.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#1A2521] block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9B7A38]" />
                  Tamper-Evident Delivery
                </span>
                <p className="text-[11px] text-[#6E7872]">
                  Sealed luxury unboxing with official authenticity certificates and tracked dispatch via TCS.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#DCD3C3] shadow-md bg-white">
              <img
                src="/src/assets/images/hero_festive_lawn_campaign_1791961614322.jpg"
                alt="Pakistani Atelier Artisans and Mughal Haveli Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D5B876] font-medium block">
                    The Heritage Atelier
                  </span>
                  <p className="font-serif text-base sm:text-lg">
                    Preserving the soul of classical Pakistani needlecraft for contemporary global living.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
