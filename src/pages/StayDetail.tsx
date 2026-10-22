import React, { useState, useEffect } from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import { StayCard } from '../components/StayCard';
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  Users,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  Wifi,
  UtensilsCrossed,
  Laptop,
  Wind,
  Key,
  Award,
  Layers,
  Car,
  Tv,
  Coffee,
  CheckCircle2,
} from 'lucide-react';

export const StayDetailPage: React.FC = () => {
  const {
    routeParams,
    allStays,
    navigateTo,
    wishlist,
    toggleWishlist,
    bookingDetails,
    updateBookingDetails,
    calculatePricing,
    addRecentlyViewed,
    siteConfig,
  } = useBooking();

  const stayId = routeParams.id || allStays[0]?.id;
  const stay = allStays.find((s) => s.id === stayId) || allStays[0];

  useEffect(() => {
    if (stay) {
      addRecentlyViewed(stay.id);
      updateBookingDetails({ stayId: stay.id });
    }
  }, [stayId, stay]);

  // Full-screen Lightbox Gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Space Breakdown Expanded State
  const [spaceModalOpen, setSpaceModalOpen] = useState(false);

  // Booking Card State inside Detail
  const [nights, setNights] = useState(bookingDetails.nights || 3);
  const [checkIn, setCheckIn] = useState(bookingDetails.checkInDate);
  const [checkOut, setCheckOut] = useState(bookingDetails.checkOutDate);
  const [guestsCount, setGuestsCount] = useState(Math.min(bookingDetails.guests || 2, stay?.guests || 4));

  useEffect(() => {
    if (stay) {
      updateBookingDetails({
        stayId: stay.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests: guestsCount,
      });
    }
  }, [checkIn, checkOut, guestsCount, stay?.id]);

  if (!stay) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-36 px-4 text-center">
        <h2 className="font-serif text-3xl text-[#14213D]">Residence Not Found</h2>
        <button
          onClick={() => navigateTo('/stays')}
          className="mt-4 px-6 py-2.5 bg-[#14213D] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          View All Residences
        </button>
      </div>
    );
  }

  const pricing = calculatePricing(stay, {
    ...bookingDetails,
    nights,
    guests: guestsCount,
    stayId: stay.id,
  });

  const isSaved = wishlist.includes(stay.id);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % stay.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev === 0 ? stay.images.length - 1 : prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, stay.images.length]);

  const handleDateChange = (startStr: string, endStr: string) => {
    setCheckIn(startStr);
    setCheckOut(endStr);
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    setNights(diffDays);
  };

  const handleReserve = () => {
    updateBookingDetails({
      stayId: stay.id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      guests: guestsCount,
    });
    navigateTo('/checkout');
  };

  // WhatsApp Pre-filled link
  const waMsg = `Hello Connekt Concierge! I'm inquiring about ${stay.name} (${stay.area}) from ${checkIn} to ${checkOut} for ${guestsCount} guests. Is this available?`;
  const waUrl = `https://wa.me/919769156086?text=${encodeURIComponent(waMsg)}`;

  const similarStays = allStays.filter((s) => s.id !== stay.id).slice(0, 2);

  // Default rating breakdown if custom property
  const ratings = stay.ratingBreakdown || {
    cleanliness: 4.8,
    accuracy: 4.8,
    checkIn: 4.9,
    communication: 4.9,
    location: 4.8,
    value: 4.7,
  };

  // Default host info
  const host = stay.hostInfo || {
    name: 'Connekt Homes',
    badge: 'Superhost',
    yearsHosting: '11 years hosting',
    bio: 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.',
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-28 sm:pt-36 pb-24 text-[#14213D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between py-3 mb-4 text-xs text-[#2B2F3A]/70">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('/stays')}
              className="hover:text-[#D93A6B] transition-colors"
            >
              All Residences
            </button>
            <span>/</span>
            <span className="text-[#14213D] font-medium">{stay.area}</span>
            <span>/</span>
            <span className="text-[#14213D] font-semibold truncate max-w-[200px] sm:max-w-none">
              {stay.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: stay.name,
                    text: stay.tagline,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center gap-1.5 hover:text-[#14213D] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => toggleWishlist(stay.id)}
              className="flex items-center gap-1.5 hover:text-[#D93A6B] transition-colors cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D93A6B] text-[#D93A6B]' : ''}`}
              />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-6 space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#14213D]">
            {stay.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#2B2F3A]/80 pt-1">
            <div className="flex items-center gap-1 font-semibold text-[#14213D]">
              <Star className="w-4 h-4 fill-[#B89B72] text-[#B89B72]" />
              <span>{stay.rating.toFixed(2)}</span>
              <span className="font-normal text-[#2B2F3A]/60">({stay.reviewCount} reviews)</span>
            </div>

            <span>·</span>

            {stay.isSuperhost && (
              <>
                <div className="flex items-center gap-1 text-[#D93A6B] font-semibold">
                  <Award className="w-4 h-4" />
                  <span>Superhost · 11 Years Hosting</span>
                </div>
                <span>·</span>
              </>
            )}

            <div className="flex items-center gap-1 text-[#2B2F3A]/80">
              <MapPin className="w-3.5 h-3.5 text-[#2A8CB5]" />
              <span>{stay.neighborhood || stay.area}, Mumbai</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden mb-12 shadow-sm border border-[#E8E2D8] bg-[#14213D]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 aspect-[4/3] sm:aspect-[16/9] max-h-[580px]">
            {/* Primary Main Photo */}
            <div
              className="md:col-span-8 relative cursor-pointer overflow-hidden group"
              onClick={() => {
                setActivePhotoIndex(0);
                setLightboxOpen(true);
              }}
            >
              <img
                src={stay.images[0]}
                alt={stay.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* Thumbnails on right */}
            <div className="hidden md:grid md:col-span-4 grid-cols-2 gap-2">
              {stay.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer overflow-hidden group h-full"
                  onClick={() => {
                    setActivePhotoIndex(idx + 1);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`${stay.name} photo view ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Show All Photos Floating Action */}
          <button
            onClick={() => {
              setActivePhotoIndex(0);
              setLightboxOpen(true);
            }}
            className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md hover:bg-white text-[#14213D] text-xs font-semibold px-4 py-2.5 rounded-[12px] shadow-md border border-[#E8E2D8] flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#D93A6B]" />
            <span>Show all {stay.images.length} photos</span>
          </button>
        </div>

        {/* Content Layout: Left Story + Right Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Host Bio & Key Badges (Matching Airbnb Video) */}
            <div className="bg-[#FCFAF7] rounded-[22px] p-6 border border-[#E8E2D8] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D8]">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#14213D]">
                    {stay.type} hosted by {host.name}
                  </h2>
                  <p className="text-xs text-[#2B2F3A]/70 mt-1">
                    {stay.guests} guests · {stay.bedrooms} bedrooms · {stay.beds} beds · {stay.bathrooms} ensuite bathrooms · {stay.sizeSqFt} sqft
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#14213D] text-[#FAF6F0] font-serif text-lg font-bold flex items-center justify-center shrink-0 shadow">
                  C
                </div>
              </div>

              {/* 3 Key Badges directly from video */}
              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F2EB] flex items-center justify-center text-[#14213D] shrink-0">
                    <Key className="w-4 h-4 text-[#D93A6B]" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-[#14213D] block">Self check-in</span>
                    <span className="text-[#2B2F3A]/75">
                      Check yourself in smoothly with the digital lockbox anytime from 2:00 PM.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F2EB] flex items-center justify-center text-[#14213D] shrink-0">
                    <Laptop className="w-4 h-4 text-[#2A8CB5]" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-[#14213D] block">Dedicated workspace</span>
                    <span className="text-[#2B2F3A]/75">
                      A quiet, sunlit room with optical WiFi (300 Mbps) well-suited for executive remote work.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F2EB] flex items-center justify-center text-[#14213D] shrink-0">
                    <Award className="w-4 h-4 text-[#B89B72]" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-[#14213D] block">
                      {host.name} is a Superhost · {host.yearsHosting}
                    </span>
                    <span className="text-[#2B2F3A]/75">
                      {host.bio}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. On-Ground Concierge Note Banner */}
            <div className="bg-[#F7F3EC] rounded-[20px] p-6 border border-[#E8E2D8] flex items-start gap-4">
              <div className="w-10 h-10 rounded-[12px] bg-[#14213D] text-[#FAF6F0] flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5 text-[#B89B72]" />
              </div>
              <div className="text-xs sm:text-sm text-[#2B2F3A]/85 leading-relaxed">
                <span className="font-semibold text-[#14213D] block text-xs uppercase tracking-wider mb-1">
                  On-Ground Concierge Note
                </span>
                {stay.conciergeNote}
              </div>
            </div>

            {/* 3. Residence Highlights */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-4">
                Residence Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stay.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FCFAF7] rounded-[14px] p-4 border border-[#E8E2D8] shadow-2xs flex items-start gap-3"
                  >
                    <Check className="w-4 h-4 text-[#D93A6B] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#14213D] leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. About this Home & Full Description */}
            <div className="pt-6 border-t border-[#E8E2D8] space-y-4">
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                About this home
              </h2>
              <p className="text-sm sm:text-base text-[#2B2F3A]/85 font-sans leading-relaxed whitespace-pre-line">
                {stay.description}
              </p>
            </div>

            {/* 5. Where You'll Sleep (Bedroom Cards from video) */}
            <div className="pt-6 border-t border-[#E8E2D8] space-y-4">
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                Where you’ll sleep
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stay.sleepingArrangements.map((room, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FCFAF7] rounded-[18px] p-5 border border-[#E8E2D8] shadow-xs space-y-2 hover:border-[#14213D]/25 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F6F2EB] flex items-center justify-center text-[#D93A6B]">
                      <Bed className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-[#14213D] pt-1">
                      {room.room}
                    </h3>
                    <div className="text-xs font-bold text-[#B89B72] uppercase tracking-wider">
                      {room.bedType}
                    </div>
                    <p className="text-xs text-[#2B2F3A]/75 leading-relaxed font-sans">
                      {room.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Comprehensive Space Breakdown (Video specifications) */}
            {stay.spaceBreakdown && (
              <div className="pt-6 border-t border-[#E8E2D8] space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                    The Space Breakdown
                  </h2>
                  <span className="text-[11px] font-semibold text-[#B89B72] uppercase tracking-wider">
                    800 sqft · Lift Access
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  <div className="bg-[#FCFAF7] rounded-[16px] p-4.5 border border-[#E8E2D8] space-y-1.5">
                    <div className="text-xs font-bold text-[#14213D] uppercase tracking-wide flex items-center gap-2">
                      <Tv className="w-4 h-4 text-[#D93A6B]" />
                      <span>Living Room & Entertainment</span>
                    </div>
                    <p className="text-xs text-[#2B2F3A]/80 leading-relaxed font-sans">
                      {stay.spaceBreakdown.livingRoom}
                    </p>
                  </div>

                  <div className="bg-[#FCFAF7] rounded-[16px] p-4.5 border border-[#E8E2D8] space-y-1.5">
                    <div className="text-xs font-bold text-[#14213D] uppercase tracking-wide flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4 text-[#2A8CB5]" />
                      <span>Kitchen & Cooking Appliances</span>
                    </div>
                    <p className="text-xs text-[#2B2F3A]/80 leading-relaxed font-sans">
                      {stay.spaceBreakdown.kitchen}
                    </p>
                  </div>

                  <div className="bg-[#FCFAF7] rounded-[16px] p-4.5 border border-[#E8E2D8] space-y-1.5">
                    <div className="text-xs font-bold text-[#14213D] uppercase tracking-wide flex items-center gap-2">
                      <Bath className="w-4 h-4 text-[#9DB5A0]" />
                      <span>Bathrooms & 24/7 Hot Water Geysers</span>
                    </div>
                    <p className="text-xs text-[#2B2F3A]/80 leading-relaxed font-sans">
                      {stay.spaceBreakdown.bathrooms}
                    </p>
                  </div>

                  <div className="bg-[#FCFAF7] rounded-[16px] p-4.5 border border-[#E8E2D8] space-y-1.5">
                    <div className="text-xs font-bold text-[#14213D] uppercase tracking-wide flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#B89B72]" />
                      <span>Guest Access & Dedicated Parking</span>
                    </div>
                    <p className="text-xs text-[#2B2F3A]/80 leading-relaxed font-sans">
                      {stay.spaceBreakdown.guestAccess}
                    </p>
                  </div>
                </div>

                {/* Add-on Services List */}
                {stay.spaceBreakdown.addOnServices && (
                  <div className="bg-[#F7F3EC] rounded-[18px] p-5 border border-[#E8E2D8] space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#B89B72]">
                      Available Add-on Concierge Services
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#14213D]">
                      {stay.spaceBreakdown.addOnServices.map((service, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D93A6B] shrink-0" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. Rating Breakdown Sub-scores (From video: 4.7 Cleanliness, 4.8 Check-in, etc.) */}
            <div className="pt-6 border-t border-[#E8E2D8] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                    Guest Reviews & Rating Breakdown
                  </h2>
                  <p className="text-xs text-[#2B2F3A]/70">
                    Overall score {stay.rating.toFixed(2)} out of 5 from {stay.reviewCount} verified stays
                  </p>
                </div>
                <div className="bg-[#FCFAF7] px-3.5 py-1.5 rounded-full border border-[#E8E2D8] font-serif text-lg font-bold text-[#14213D] flex items-center gap-1.5 shadow-2xs">
                  <Star className="w-4 h-4 fill-[#B89B72] text-[#B89B72]" />
                  <span>{stay.rating.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs text-[#14213D]">
                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Cleanliness</span>
                    <span className="font-bold">{ratings.cleanliness}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#14213D] rounded-full"
                      style={{ width: `${(ratings.cleanliness / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Accuracy</span>
                    <span className="font-bold">{ratings.accuracy}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#14213D] rounded-full"
                      style={{ width: `${(ratings.accuracy / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Check-in</span>
                    <span className="font-bold">{ratings.checkIn}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#14213D] rounded-full"
                      style={{ width: `${(ratings.checkIn / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Communication</span>
                    <span className="font-bold">{ratings.communication}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#14213D] rounded-full"
                      style={{ width: `${(ratings.communication / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Location</span>
                    <span className="font-bold">{ratings.location}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#14213D] rounded-full"
                      style={{ width: `${(ratings.location / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Value</span>
                    <span className="font-bold">{ratings.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#14213D] rounded-full"
                      style={{ width: `${(ratings.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Full Amenities Grid */}
            <div className="pt-6 border-t border-[#E8E2D8] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                  Amenities & Comforts
                </h2>
                <span className="text-xs text-[#2B2F3A]/60">Hotel-grade standards</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#14213D]">
                <div className="bg-[#FCFAF7] p-3.5 rounded-[12px] border border-[#E8E2D8] flex items-center gap-2.5">
                  <Wifi className="w-4 h-4 text-[#2A8CB5]" />
                  <span>300 Mbps Fiber WiFi</span>
                </div>
                <div className="bg-[#FCFAF7] p-3.5 rounded-[12px] border border-[#E8E2D8] flex items-center gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#2A8CB5]" />
                  <span>Full Kitchen & Utensils</span>
                </div>
                <div className="bg-[#FCFAF7] p-3.5 rounded-[12px] border border-[#E8E2D8] flex items-center gap-2.5">
                  <Wind className="w-4 h-4 text-[#2A8CB5]" />
                  <span>Split Inverter AC</span>
                </div>
                <div className="bg-[#FCFAF7] p-3.5 rounded-[12px] border border-[#E8E2D8] flex items-center gap-2.5">
                  <Laptop className="w-4 h-4 text-[#2A8CB5]" />
                  <span>Dedicated Workstation</span>
                </div>
                <div className="bg-[#FCFAF7] p-3.5 rounded-[12px] border border-[#E8E2D8] flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#2A8CB5]" />
                  <span>Daily Housekeeping</span>
                </div>
                <div className="bg-[#FCFAF7] p-3.5 rounded-[12px] border border-[#E8E2D8] flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2A8CB5]" />
                  <span>24/7 Gated Security</span>
                </div>
              </div>
            </div>

            {/* 9. Location & Proximity */}
            <div className="pt-6 border-t border-[#E8E2D8] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                    Where you’ll be
                  </h2>
                  <p className="text-xs text-[#2B2F3A]/70 mt-0.5">
                    {stay.area}, {stay.neighborhood}, Mumbai
                  </p>
                </div>
                <span className="text-xs font-mono text-[#B89B72]">Bandra West</span>
              </div>

              {/* Proximity Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stay.nearbyPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FCFAF7] p-3.5 rounded-[14px] border border-[#E8E2D8] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#14213D]">{place.name}</div>
                      <div className="text-[11px] text-[#2B2F3A]/60">{place.type}</div>
                    </div>
                    <span className="font-mono text-[#D93A6B] font-semibold text-[11px] bg-[#F8E1E8] px-2.5 py-0.5 rounded-full">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_20px_50px_rgba(20,33,61,0.08)] space-y-6">
              {/* Price per night header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#E8E2D8]">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#14213D] font-sans">
                    {formatINR(stay.pricePerNight)}
                  </span>
                  <span className="text-xs text-[#2B2F3A]/60 font-normal"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#14213D]">
                  <Star className="w-3.5 h-3.5 fill-[#B89B72] text-[#B89B72]" />
                  <span>{stay.rating.toFixed(2)}</span>
                  <span className="text-[#2B2F3A]/50">({stay.reviewCount})</span>
                </div>
              </div>

              {/* Date & Guests Selection */}
              <div className="border border-[#E8E2D8] rounded-[16px] overflow-hidden divide-y divide-[#E8E2D8]">
                <div className="grid grid-cols-2 divide-x divide-[#E8E2D8]">
                  <div className="p-3 bg-[#FAF7F2]">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#B89B72] block">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(e.target.value, checkOut)}
                      className="w-full text-xs font-semibold text-[#14213D] bg-transparent focus:outline-none mt-0.5 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 bg-[#FAF7F2]">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#B89B72] block">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => handleDateChange(checkIn, e.target.value)}
                      className="w-full text-xs font-semibold text-[#14213D] bg-transparent focus:outline-none mt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] flex items-center justify-between">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#B89B72] block">
                      Guests
                    </label>
                    <div className="text-xs font-semibold text-[#14213D]">
                      {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'} (Max {stay.guests})
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      disabled={guestsCount <= 1}
                      className="w-7 h-7 rounded-full border border-[#E8E2D8] bg-white flex items-center justify-center text-xs font-bold disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.min(stay.guests, guestsCount + 1))}
                      disabled={guestsCount >= stay.guests}
                      className="w-7 h-7 rounded-full border border-[#E8E2D8] bg-white flex items-center justify-center text-xs font-bold disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-[#2B2F3A]/80 pt-2 border-t border-[#E8E2D8]">
                <div className="flex justify-between">
                  <span>
                    {formatINR(stay.pricePerNight)} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-semibold text-[#14213D]">
                    {formatINR(pricing.accommodationTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Housekeeping & Preparation</span>
                  <span className="font-semibold text-[#14213D]">
                    {formatINR(pricing.cleaningFee)}
                  </span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-[#D93A6B] font-semibold">
                    <span>Direct Booking Discount</span>
                    <span>- {formatINR(pricing.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#2B2F3A]/60">
                  <span>Hospitality GST (12%)</span>
                  <span>{formatINR(pricing.gstAmount)}</span>
                </div>

                <div className="pt-3 border-t border-[#E8E2D8] flex justify-between text-base font-bold text-[#14213D]">
                  <span>Total Due</span>
                  <span className="font-sans text-[#14213D]">{formatINR(pricing.grandTotal)}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={handleReserve}
                className="w-full py-3.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[14px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Reserve Residence</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="text-center pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#2A8CB5] hover:underline inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat with Connekt Concierge on WhatsApp</span>
                </a>
                <p className="text-[11px] text-[#2B2F3A]/50 mt-1">
                  100% Direct Booking Guarantee · No Hidden Platform Fees
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Stays */}
        {similarStays.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8E2D8]">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                Curated Collection
              </div>
              <h2 className="font-serif text-3xl font-medium text-[#14213D]">
                Explore other Connekt residences
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {similarStays.map((s) => (
                <StayCard key={s.id} stay={s} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Reserve Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D8] p-4 shadow-2xl flex items-center justify-between">
        <div>
          <div className="text-xs text-[#2B2F3A]/60">Total for {nights} nights</div>
          <div className="text-base font-bold text-[#14213D] font-sans">
            {formatINR(pricing.grandTotal)}
          </div>
        </div>
        <button
          onClick={handleReserve}
          className="px-6 py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm cursor-pointer"
        >
          Reserve Now
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md">
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-xs tracking-wider font-mono">
              {activePhotoIndex + 1} / {stay.images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={stay.images[activePhotoIndex]}
              alt={`${stay.name} full view`}
              className="max-w-full max-h-[82vh] object-contain rounded-[12px]"
            />
            <button
              onClick={() =>
                setActivePhotoIndex((prev) => (prev === 0 ? stay.images.length - 1 : prev - 1))
              }
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActivePhotoIndex((prev) => (prev + 1) % stay.images.length)}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
            {stay.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-12 h-12 rounded-[8px] object-cover cursor-pointer border-2 transition-all ${
                  idx === activePhotoIndex ? 'border-[#D93A6B] scale-105' : 'border-transparent opacity-60'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
