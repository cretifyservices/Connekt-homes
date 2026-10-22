import React, { useRef } from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import { ArrowLeft, ArrowRight, MapPin, Star } from 'lucide-react';

export const EnclavesCarousel: React.FC = () => {
  const { allStays, navigateTo } = useBooking();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
              Boutique Hospitality
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
              Curated Mumbai <span className="italic font-normal">enclaves</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2 max-w-lg">
              Explore neighborhoods by character — from the sea promenade in Bandra West to the resort suites near BKC.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E8E2D8] hover:border-[#14213D] bg-[#FCFAF7] flex items-center justify-center text-[#14213D] shadow-2xs hover:bg-[#14213D] hover:text-white transition-all cursor-pointer"
              aria-label="Previous enclave"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E8E2D8] hover:border-[#14213D] bg-[#FCFAF7] flex items-center justify-center text-[#14213D] shadow-2xs hover:bg-[#14213D] hover:text-white transition-all cursor-pointer"
              aria-label="Next enclave"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allStays.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo(`/stay/${item.id}`)}
              className="group w-[300px] sm:w-[360px] md:w-[380px] shrink-0 bg-[#FCFAF7] rounded-[26px] overflow-hidden border border-[#E8E2D8] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#14213D]">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-[#14213D]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    {item.area}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#14213D] shadow-xs">
                  <Star className="w-3 h-3 fill-[#B89B72] text-[#B89B72]" />
                  <span>{item.rating.toFixed(2)}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/80 mb-1">
                    <MapPin className="w-3 h-3 text-[#D93A6B]" />
                    <span>{item.neighborhood}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium leading-snug line-clamp-1 text-white">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#2B2F3A]/75 leading-relaxed font-sans line-clamp-2">
                  {item.tagline}
                </p>

                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <span className="text-[#2B2F3A]/70 font-medium">
                    {item.guests} Guests · {item.bedrooms} Bed · {item.bathrooms} Bath
                  </span>
                  <div className="font-mono font-bold text-[#14213D]">
                    {formatINR(item.pricePerNight)}
                    <span className="text-[10px] font-normal text-[#2B2F3A]/60">/night</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
