import React, { useRef, useState } from 'react';
import { Star, CheckCircle, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const RealReviewsMarquee: React.FC = () => {
  const { allReviews } = useBooking();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews for seamless continuous infinite loop
  const marqueeReviews = [...allReviews, ...allReviews];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] overflow-hidden border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14213D]/5 text-[#14213D] text-[11px] font-bold uppercase tracking-[0.2em] mb-2 border border-[#E8E2D8]">
              <CheckCircle className="w-3.5 h-3.5 text-[#2A8CB5]" />
              <span>Real Verified Guest Reflections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
              What guests are saying <br className="hidden sm:inline" />
              <span className="italic font-normal">about Connekt</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2 max-w-xl">
              Authentic, unedited words from travelers and families who made our Mumbai serviced residences their home.
            </p>
          </div>

          {/* Controls & Rating Score */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="bg-[#FCFAF7] px-4 py-2.5 rounded-[16px] border border-[#E8E2D8] shadow-xs flex items-center gap-3">
              <div className="font-serif text-2xl font-bold text-[#14213D]">4.8 ★</div>
              <div className="text-[11px] text-[#2B2F3A]/70 leading-tight">
                <span className="font-semibold block text-[#14213D]">Superhost</span>
                Over 440+ verified stays
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full border border-[#E8E2D8] hover:border-[#14213D] bg-white flex items-center justify-center text-[#14213D] shadow-xs hover:bg-[#14213D] hover:text-white transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full border border-[#E8E2D8] hover:border-[#14213D] bg-white flex items-center justify-center text-[#14213D] shadow-xs hover:bg-[#14213D] hover:text-white transition-all cursor-pointer"
                aria-label="Next review"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-loop Horizontal Scrolling Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className={`flex items-stretch gap-6 px-4 ${
            isPaused ? '' : 'animate-marquee'
          } overflow-x-auto scrollbar-none py-2`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {marqueeReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[310px] sm:w-[360px] md:w-[390px] shrink-0 bg-[#FCFAF7] rounded-[24px] p-6 sm:p-7 border border-[#E8E2D8] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Header: Guest avatar, name, verification */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#14213D] text-[#FAF6F0] font-bold flex items-center justify-center text-sm shadow-xs">
                      {rev.guestName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#14213D] leading-tight">
                          {rev.guestName}
                        </span>
                        {rev.isVerified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#2A8CB5]" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#2B2F3A]/60 block mt-0.5">
                        {rev.location} · {rev.stayDate}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-[#B89B72]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-[#B89B72]/20 mb-2" />
                  <p className="font-serif text-sm sm:text-base text-[#14213D] leading-relaxed italic">
                    “{rev.comment}”
                  </p>
                </div>
              </div>

              {/* Property Stayed Tag */}
              {rev.propertyStayed && (
                <div className="pt-4 mt-5 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="text-[10px] uppercase font-bold text-[#B89B72] tracking-wider block">
                      Residence
                    </span>
                    <span className="text-xs text-[#2B2F3A]/80 font-medium truncate block">
                      {rev.propertyStayed}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#FAF7F2] px-2.5 py-0.5 rounded-full text-[#14213D] border border-[#E8E2D8] shrink-0 font-medium">
                    Verified Guest
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
