import React from 'react';

export const PressMarquee: React.FC = () => {
  const publications = [
    { name: 'ARCHITECTURAL DIGEST', quote: 'Redefining the serviced apartment experience in Mumbai' },
    { name: 'VOGUE LIVING', quote: 'Boutique hospitality with authentic village soul' },
    { name: 'CONDÉ NAST TRAVELLER', quote: 'Where international creatives stay in Bandra' },
    { name: 'ELLE DECOR', quote: 'Unpretentious luxury, fluted oak and sunlit sanctuaries' },
    { name: 'MINT LOUNGE', quote: 'The antidote to soulless corporate business hotels' },
    { name: 'TRAVEL + LEISURE', quote: 'Bandra’s best kept hospitality secret' },
    { name: 'GQ INDIA', quote: 'Effortless living for the modern global nomad' },
  ];

  // Repeat for continuous seamless marquee loop
  const marqueeItems = [...publications, ...publications];

  return (
    <section className="py-8 sm:py-10 bg-[#14213D] text-[#FAF6F0] overflow-hidden border-y border-[#FAF6F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 text-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#B89B72]">
          As Featured & Celebrated In
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left & Right subtle edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#14213D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#14213D] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-12 sm:gap-16">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-6 shrink-0 group">
              <span className="font-serif tracking-widest text-sm sm:text-base font-semibold text-white/90 group-hover:text-[#D93A6B] transition-colors">
                {item.name}
              </span>
              <span className="text-white/30 text-xs hidden sm:inline">“{item.quote}”</span>
              <span className="text-[#B89B72]/40 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
