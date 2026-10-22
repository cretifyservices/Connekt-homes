import React, { useState } from 'react';
import { Stay } from '../data/stays';
import { useBooking, formatINR } from '../context/BookingContext';
import { Heart, Star, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface StayCardProps {
  stay: Stay;
}

export const StayCard: React.FC<StayCardProps> = ({ stay }) => {
  const { navigateTo, isWishlisted, toggleWishlist, compareList, toggleCompare } = useBooking();
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isWishlisted(stay.id);
  const isCompared = compareList.includes(stay.id);

  const handleClick = () => {
    navigateTo(`/stay/${stay.id}`);
  };

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        if (stay.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
      className="bg-[#FCFAF7] rounded-[20px] border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Image Container with Soft Arch or Rounded Corner */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#14213D]" onClick={handleClick}>
        <img
          src={stay.images[imageIndex] || stay.images[0]}
          alt={stay.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
          loading="lazy"
        />

        {/* Subtle Top Gradient for Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {stay.isSuperhost ? (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-[8px] bg-[#14213D]/85 backdrop-blur-md text-[#FAF6F0] border border-white/20">
              Superhost Curated
            </span>
          ) : (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-[8px] bg-black/40 backdrop-blur-md text-[#FAF6F0]">
              {stay.type}
            </span>
          )}

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(stay.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-[#2A8CB5] text-white'
                  : 'bg-white/80 hover:bg-white text-[#14213D]'
              }`}
              title={isCompared ? 'Remove from compare' : 'Compare apartment'}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Wishlist Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(stay.id);
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-[#14213D] backdrop-blur-md transition-transform duration-150 active:scale-90 cursor-pointer"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isSaved ? 'fill-[#D93A6B] text-[#D93A6B]' : 'text-[#14213D]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image indicators dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
          {stay.images.slice(0, 4).map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                imageIndex === idx ? 'bg-white w-3' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Hover slide-up amenity preview */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#14213D]/85 backdrop-blur-xs text-[#FAF6F0] text-[11px] py-1.5 px-3 flex items-center justify-between transition-transform duration-300 pointer-events-none ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <span>WiFi 300 Mbps · Kitchen · Housekeeping</span>
          <span className="text-[#B89B72]">Self Check-in</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between" onClick={handleClick}>
        <div>
          {/* Location & Metadata */}
          <div className="flex items-center justify-between text-xs text-[#2B2F3A]/70 mb-1">
            <span className="uppercase tracking-[0.16em] text-[11px] font-semibold text-[#B89B72]">
              {stay.area} · {stay.type}
            </span>
            <div className="flex items-center gap-1 text-[#14213D] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#B89B72] text-[#B89B72]" />
              <span>{stay.rating.toFixed(2)}</span>
              <span className="text-[#2B2F3A]/50 font-normal">({stay.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#14213D] group-hover:text-[#D93A6B] transition-colors line-clamp-1">
            {stay.name}
          </h3>

          {/* Capacity and Size */}
          <div className="flex items-center gap-2 text-xs text-[#2B2F3A]/70 mt-1.5">
            <span>Up to {stay.guests} guests</span>
            <span aria-hidden="true">·</span>
            <span>{stay.bedrooms} {stay.bedrooms === 1 ? 'bed' : 'beds'}</span>
            <span aria-hidden="true">·</span>
            <span>{stay.sizeSqFt} sq ft</span>
          </div>

          <p className="text-xs text-[#2B2F3A]/75 mt-2 line-clamp-2 leading-relaxed">
            {stay.tagline}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-4 mt-3 border-t border-[#E8E2D8] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#14213D] font-sans">
                {formatINR(stay.pricePerNight)}
              </span>
              <span className="text-xs text-[#2B2F3A]/65 font-normal">/ night</span>
            </div>
            {stay.originalPrice && (
              <span className="text-[11px] text-[#2B2F3A]/45 line-through">
                {formatINR(stay.originalPrice)}
              </span>
            )}
          </div>

          <div className="text-xs font-semibold text-[#D93A6B] group-hover:translate-x-1 transition-transform flex items-center gap-1">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
