import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#1A2521] text-[#EFE9DF] text-xs py-2 px-4 border-b border-[#2D3A35] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-normal tracking-wide">
          <span>Complimentary express delivery across Pakistan on orders above ₨ 7,500</span>
          <span className="mx-2 text-[#9B7A38]" aria-hidden="true">·</span>
          <span className="hidden sm:inline">Worldwide DHL shipping for diaspora</span>
          <span className="hidden md:inline mx-2 text-[#9B7A38]" aria-hidden="true">·</span>
          <span className="hidden md:inline text-[#C5A869]">Code EID2026 for 15% off</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#9B7A38] hover:text-[#EFE9DF] transition-colors p-1 ml-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A869]"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
