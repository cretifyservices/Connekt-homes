import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ArrowRight, Sparkles, Tag } from 'lucide-react';

interface OffersCarouselProps {
  onOpenBookModal: () => void;
}

export const OffersCarousel: React.FC<OffersCarouselProps> = ({ onOpenBookModal }) => {
  const { applyPromoCode } = useBooking();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers = [
    {
      id: 1,
      badge: 'Limited Direct Offer',
      title: 'Save 15% on Your Mumbai Stay',
      description:
        'Book directly with Connekt Homes and apply promo code CONNEKT15 at checkout. Valid across all curated serviced residences with flexible check-in.',
      code: 'CONNEKT15',
      perk: 'Complimentary early check-in when available',
      ctaText: 'Book With 15% Off',
      image:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653907/35cea001-c00d-4f04-ad9e-3a54ff250007.avif',
    },
    {
      id: 2,
      badge: '5-Star Resort Amenities',
      title: 'Pool & Gym Access Near Airport & BKC',
      description:
        'Stay at our luxury suite with full swimming pool, modern fitness center, and express access to BKC and Chhatrapati Shivaji Airport.',
      code: 'BKC5STAR',
      perk: 'Airport transfer assistance upon request',
      ctaText: 'Enquire for Suite',
      image:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654206/8f850115-35d5-47cf-82b9-994c05488668.avif',
    },
    {
      id: 3,
      badge: 'Prime Bandra Group Stays',
      title: 'Family & Group Stays for up to 7 Guests',
      description:
        'Traveling with family or work colleagues? Our 2 Bed 2 Bath Ocean Park apartment offers generous space, two bathrooms, and full kitchen.',
      code: 'FAMILYBANDRA',
      perk: 'Full kitchen with utensils & daily housekeeping',
      ctaText: 'Book Group Stay',
      image:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654430/36d01175-b1e0-4de6-8cda-26f28b3aeee6.avif',
    },
  ];

  // Auto-play every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [offers.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    applyPromoCode(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const slide = offers[currentSlide];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#14213D] text-white shadow-[0_20px_50px_rgba(20,33,61,0.22)] border border-white/10 min-h-[420px] flex flex-col justify-between p-6 sm:p-10 md:p-12">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-30 transition-all duration-1000 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14213D] via-[#14213D]/90 to-transparent" />
          </div>

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D93A6B]/20 border border-[#D93A6B]/40 text-[#F8E1E8] text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>{slide.badge}</span>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous offer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next offer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Middle Body */}
          <div className="relative z-10 max-w-2xl my-6 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight leading-[1.1]">
              {slide.title}
            </h3>
            <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed">
              {slide.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#9DB5A0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9DB5A0]" />
              <span>{slide.perk}</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-[10px] bg-white/10 border border-white/20 font-mono text-xs font-bold tracking-wider text-white flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#D93A6B]" />
                <span>{slide.code}</span>
              </div>
              <button
                onClick={() => handleCopyCode(slide.code)}
                className="text-xs text-[#F8E1E8] hover:text-white transition-colors underline cursor-pointer"
              >
                {copiedCode === slide.code ? 'Applied & Copied!' : 'Click to copy code'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {offers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-6 bg-[#D93A6B]' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={onOpenBookModal}
                className="px-6 py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
