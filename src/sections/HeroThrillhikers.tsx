import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Search,
  MessageCircle,
  Building,
  ShieldCheck,
  Compass,
  Award,
  Key,
} from 'lucide-react';

interface HeroThrillhikersProps {
  onOpenBookModal: () => void;
}

export const HeroThrillhikers: React.FC<HeroThrillhikersProps> = ({ onOpenBookModal }) => {
  const {
    navigateTo,
    searchDates,
    setSearchDates,
    searchGuests,
    setSearchGuests,
    setSearchDestination,
    allStays,
    siteConfig,
  } = useBooking();

  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Mumbai');

  const featuredStay = allStays[0] || {
    id: 'bandra-sea-minutes',
    name: 'Bandra No 1 minutes away from Sea',
    tagline: 'Entire rental unit 1 minute away from the Arabian Sea in vibrant Bandra West',
    pricePerNight: 6500,
    rating: 4.74,
    reviewCount: 191,
    images: [
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653907/35cea001-c00d-4f04-ad9e-3a54ff250007.avif',
    ],
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNeighborhood !== 'All Mumbai') {
      setSearchDestination(selectedNeighborhood);
    } else {
      setSearchDestination('');
    }
    navigateTo('/stays');
  };

  const waUrl = `https://wa.me/919769156086?text=${encodeURIComponent(
    'Hello Connekt Concierge! I would like to check availability for a serviced residence in Mumbai.'
  )}`;

  return (
    <div className="relative bg-[#FAF7F2] pt-22 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 overflow-hidden">
      {/* 1. ELEGANT LIGHT ARCHITECTURAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Soft Ambient Radial Orbs */}
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-[#F7ECE1]/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-[#FBE8EE]/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-[#E8F0F5]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Fine Architectural Grid & Arched Vector Geometry */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="archGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B89B72" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#D93A6B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2A8CB5" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="archGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A8CB5" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#B89B72" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D93A6B" stopOpacity="0.2" />
            </linearGradient>
            <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#14213D" fillOpacity="0.06" />
            </pattern>
          </defs>

          {/* Subtle Polka Grid Fill */}
          <rect width="1440" height="900" fill="url(#dotPattern)" />

          {/* Fluid Coastal Contours */}
          <path
            d="M -100 240 C 250 160, 520 320, 850 200 C 1150 90, 1360 250, 1600 170"
            stroke="url(#archGrad1)"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <path
            d="M -60 320 C 320 220, 600 420, 960 280 C 1220 180, 1420 340, 1680 240"
            stroke="url(#archGrad2)"
            strokeWidth="1"
          />
          <path
            d="M -120 440 C 260 360, 580 520, 920 400 C 1260 290, 1450 430, 1720 350"
            stroke="url(#archGrad1)"
            strokeWidth="0.8"
          />

          {/* Architectural Compass Rings */}
          <circle cx="1250" cy="180" r="140" stroke="#B89B72" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="1250" cy="180" r="90" stroke="#B89B72" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="180" cy="420" r="110" stroke="#D93A6B" strokeOpacity="0.15" strokeWidth="1" />
        </svg>

        {/* Floating Light Accent Badges (Subtle Visual Depth) */}
        <div className="hidden lg:flex absolute top-40 left-8 z-10 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E8E2D8] text-[#14213D] text-[11px] font-medium shadow-xs">
          <Award className="w-3.5 h-3.5 text-[#D93A6B]" />
          <span>Superhost · 11 Years Welcoming Guests</span>
        </div>

        <div className="hidden lg:flex absolute top-52 right-8 z-10 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E8E2D8] text-[#14213D] text-[11px] font-medium shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#2A8CB5]" />
          <span>19.0596° N, 72.8295° E · Bandra West</span>
        </div>

        <div className="hidden xl:flex absolute bottom-44 left-10 z-10 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E8E2D8] text-[#14213D] text-[11px] font-medium shadow-xs">
          <Key className="w-3.5 h-3.5 text-[#B89B72]" />
          <span>Contactless Self Check-in with Lockbox</span>
        </div>

        <div className="hidden xl:flex absolute bottom-52 right-12 z-10 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E8E2D8] text-[#14213D] text-[11px] font-medium shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#9DB5A0]" />
          <span>100% Direct Booking Guarantee</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Kicker & Clean Balanced Typography */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14213D]/5 border border-[#E8E2D8] text-[#14213D] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D93A6B] animate-pulse" />
            <span>Verified Serviced Residences · Mumbai</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#14213D] font-normal leading-[1.1] tracking-tight max-w-4xl">
            Homes with a soul, <br className="hidden sm:inline" />
            <span className="italic font-normal">wherever you land.</span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-[#2B2F3A]/80 max-w-2xl font-sans leading-relaxed px-2">
            <span className="sm:hidden">
              Boutique serviced apartments in Bandra West & BKC with full kitchens, sunlit spaces, and 24/7 host care.
            </span>
            <span className="hidden sm:inline">
              Short-term serviced residences for the global nomad and discerning traveller. Full kitchens, sunlit living rooms, daily housekeeping, and quiet concierge support in Mumbai’s cultural heart.
            </span>
          </p>

          {/* Useful Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            {/* Primary Action: Book Stay Modal */}
            <button
              onClick={onOpenBookModal}
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-[0_8px_20px_rgba(217,58,107,0.3)] transition-all flex items-center gap-2 group cursor-pointer hover:scale-102"
            >
              <span>Book A Stay</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action: Explore Residences */}
            <button
              onClick={() => navigateTo('/stays')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/95 hover:bg-white text-[#14213D] border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:border-[#14213D]"
            >
              <Building className="w-3.5 h-3.5 text-[#B89B72]" />
              <span>Explore Residences</span>
            </button>

            {/* Tertiary Action: Direct WhatsApp Concierge */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-3 sm:py-3.5 bg-[#FAF7F2] hover:bg-[#F2ECE4] text-[#14213D] border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#2A8CB5]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 2. Central Cinematic Media Frame with Perfect Centering */}
        <div className="mx-auto max-w-5xl w-full relative rounded-[22px] sm:rounded-[36px] overflow-hidden aspect-[4/3] sm:aspect-[16/9] max-h-[540px] shadow-[0_20px_60px_rgba(20,33,61,0.14)] bg-[#14213D] border border-white/60 group">
          <img
            src={featuredStay.images[0]}
            alt={featuredStay.name}
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/90 via-transparent to-black/25 pointer-events-none" />

          {/* Floating Top Left Pill Badge */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-6 z-10 flex items-center gap-2">
            <div className="bg-[#14213D]/90 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9DB5A0]" />
              <span>1 Minute Away from Sea</span>
            </div>
          </div>

          {/* Floating Top Right Rating */}
          <div className="absolute top-3 sm:top-5 right-3 sm:right-6 z-10">
            <div className="bg-white/95 backdrop-blur-md border border-white/30 text-[#14213D] px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow">
              <Star className="w-3 h-3 fill-[#B89B72] text-[#B89B72]" />
              <span>
                {featuredStay.rating} ({featuredStay.reviewCount})
              </span>
            </div>
          </div>

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-7 right-4 sm:right-7 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div className="max-w-xl">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-[#B89B72] block">
                Featured Serviced Residence
              </span>
              <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl font-medium line-clamp-1">
                {featuredStay.name}
              </h2>
              <p className="hidden sm:block text-xs sm:text-sm text-white/85 line-clamp-1 mt-1 font-sans">
                {featuredStay.tagline}
              </p>
            </div>

            <button
              onClick={() => navigateTo(`/stay/${featuredStay.id}`)}
              className="self-start sm:self-auto px-4 py-2 bg-white/20 hover:bg-white text-white hover:text-[#14213D] backdrop-blur-md border border-white/30 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Explore Stay</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 3. Floating Search Bar Dock */}
        <div className="max-w-4xl mx-auto -mt-8 sm:-mt-10 relative z-30">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-[24px] p-3 sm:p-4 shadow-[0_20px_50px_rgba(20,33,61,0.12)] border border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            {/* Where Picker */}
            <div className="sm:col-span-4 px-3 py-2 bg-[#FAF7F2] rounded-[16px] border border-[#E8E2D8]/60">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                Where in Mumbai
              </label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-[#D93A6B] shrink-0" />
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#14213D] focus:outline-none cursor-pointer"
                >
                  <option value="All Mumbai">All Mumbai Locations</option>
                  <option value="Bandra West">Bandra West (Near Sea)</option>
                  <option value="BKC / Airport">BKC / Airport (Luxury Suite)</option>
                  <option value="Prime Bandra">Prime Bandra (Ocean Park)</option>
                </select>
              </div>
            </div>

            {/* Dates Picker */}
            <div className="sm:col-span-4 px-3 py-2 bg-[#FAF7F2] rounded-[16px] border border-[#E8E2D8]/60">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                Stay Dates
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-[#2A8CB5] shrink-0" />
                <input
                  type="date"
                  value={searchDates.start || ''}
                  onChange={(e) => setSearchDates({ ...searchDates, start: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#14213D] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Guests Picker */}
            <div className="sm:col-span-2 px-3 py-2 bg-[#FAF7F2] rounded-[16px] border border-[#E8E2D8]/60 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                Guests
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-4 h-4 text-[#9DB5A0] shrink-0" />
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#14213D] focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={7}>Up to 7 Guests</option>
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full h-full py-3.5 px-4 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[16px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
              >
                <span>Find</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Direct Booking Benefit Ribbon */}
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8E1E8] border border-[#D93A6B]/20 text-[#D93A6B] text-[11px] font-medium shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>
                <strong>Direct Booking Privilege:</strong> Free early check-in, verified 800 sqft homes & zero middleman markups
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
