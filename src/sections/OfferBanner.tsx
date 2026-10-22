import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Tag, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export const OfferBanner: React.FC = () => {
  const { applyPromoCode, navigateTo } = useBooking();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('CONNEKT15');
    applyPromoCode('CONNEKT15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 bg-[#F8E1E8]/70 border-y border-[#D93A6B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[20px] p-6 sm:p-10 border border-[#D93A6B]/25 shadow-[0_15px_40px_rgba(217,58,107,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left badge & text */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 text-left">
            {/* Teal Scalloped Badge */}
            <div className="relative shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-[#2A8CB5] text-white shadow-md">
              <div className="text-center">
                <span className="block text-[11px] uppercase tracking-wider font-medium leading-none">
                  Save
                </span>
                <span className="block text-xl font-bold font-sans leading-tight">
                  15%
                </span>
                <span className="block text-[9px] uppercase tracking-wider opacity-80 leading-none">
                  Off
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D93A6B]">
                <Sparkles className="w-3.5 h-3.5 text-[#D93A6B]" />
                <span>Limited Launch Invitation · [Confirm Terms]</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] mt-1">
                Experience Connekt Homes this season
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-1 max-w-xl">
                Enjoy 15% savings across all Pali Hill and Bandra serviced residences when booking directly online. Valid on stays of 2 nights or more.
              </p>
            </div>
          </div>

          {/* Right code box & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <div className="flex items-center justify-between gap-3 bg-[#FAF6F0] px-4 py-2.5 rounded-[12px] border border-[#14213D]/15 w-full sm:w-auto">
              <div className="text-left">
                <span className="block text-[10px] uppercase font-semibold text-[#B89B72] tracking-wider">
                  Promo Code
                </span>
                <span className="font-mono text-sm font-bold text-[#14213D] tracking-widest">
                  CONNEKT15
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-[8px] hover:bg-[#EFE6DA] text-[#14213D] transition-colors cursor-pointer"
                title="Copy promo code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#D93A6B]" />
                )}
              </button>
            </div>

            <button
              onClick={() => {
                applyPromoCode('CONNEKT15');
                navigateTo('/stays');
              }}
              className="w-full sm:w-auto px-5 py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{copied ? 'Code Applied · Browse Stays' : 'Claim & Book'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
