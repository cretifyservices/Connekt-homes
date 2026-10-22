import React from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import {
  Star,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Building,
} from 'lucide-react';

interface SignatureStaysProps {
  onOpenBookModal: (stayName?: string) => void;
}

export const SignatureStays: React.FC<SignatureStaysProps> = ({ onOpenBookModal }) => {
  const { allStays, navigateTo, toggleWishlist, isWishlisted } = useBooking();

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72] mb-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#E8E2D8]">
              <Sparkles className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>Verified Handpicked Stays</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
              Our signature <span className="italic font-normal">residences</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2 max-w-lg">
              Individually inspected and professionally managed in Mumbai with full kitchens, air conditioning, and hotel-grade care.
            </p>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#14213D] bg-[#FCFAF7] px-4 py-2 rounded-full border border-[#E8E2D8] shadow-2xs self-start md:self-auto">
            {allStays.length} Residences Available Now
          </div>
        </div>

        {/* Dynamic Stays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allStays.map((stay) => {
            const wish = isWishlisted(stay.id);
            return (
              <div
                key={stay.id}
                onClick={() => navigateTo(`/stay/${stay.id}`)}
                className="group bg-[#FCFAF7] rounded-[24px] overflow-hidden border border-[#E8E2D8] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#14213D]">
                  <img
                    src={stay.images[0]}
                    alt={stay.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Top Left Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#14213D]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                      {stay.type}
                    </span>
                  </div>

                  {/* Top Right Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(stay.id);
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/85 hover:bg-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wish ? 'fill-[#D93A6B] text-[#D93A6B]' : 'text-[#14213D]'
                      }`}
                    />
                  </button>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white font-medium">
                    <Star className="w-3.5 h-3.5 fill-[#B89B72] text-[#B89B72]" />
                    <span className="font-bold">{stay.rating.toFixed(2)}</span>
                    <span className="text-white/70">({stay.reviewCount} reviews)</span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-10 text-[10px] bg-[#9DB5A0] text-[#14213D] font-bold px-2 py-0.5 rounded">
                    Verified Host
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#14213D] group-hover:text-[#D93A6B] transition-colors leading-snug line-clamp-1">
                      {stay.name}
                    </h3>
                    <p className="text-xs text-[#2B2F3A]/70 line-clamp-2 mt-1.5 leading-relaxed font-sans">
                      {stay.tagline}
                    </p>

                    {/* Features Row */}
                    <div className="flex items-center gap-3 text-xs text-[#2B2F3A]/70 mt-4 pt-3 border-t border-[#E8E2D8]">
                      <span>{stay.guests} Guests</span>
                      <span>·</span>
                      <span>{stay.bedrooms} Beds</span>
                      <span>·</span>
                      <span>{stay.bathrooms} Baths</span>
                      <span>·</span>
                      <span>{stay.sizeSqFt} sqft</span>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
                    <div>
                      {stay.originalPrice && (
                        <span className="text-[11px] text-[#2B2F3A]/50 line-through block font-mono">
                          {formatINR(stay.originalPrice)}
                        </span>
                      )}
                      <div className="font-mono text-lg font-bold text-[#14213D]">
                        {formatINR(stay.pricePerNight)}
                        <span className="text-xs font-sans font-normal text-[#2B2F3A]/60">
                          {' '}
                          / night
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBookModal(stay.name);
                        }}
                        className="px-4 py-2 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs transition-colors flex items-center gap-1 cursor-pointer hover:scale-102"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
