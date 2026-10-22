import React, { useState } from 'react';
import { GUEST_STORIES_DATA } from '../data/guestStories';
import { ChevronLeft, ChevronRight, Quote, ShieldAlert } from 'lucide-react';

export const GuestStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevStory = () => {
    setCurrentIndex((prev) => (prev === 0 ? GUEST_STORIES_DATA.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev === GUEST_STORIES_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = GUEST_STORIES_DATA[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#14213D] text-[#FAF6F0] relative overflow-hidden">
      {/* Subtle background brass radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D93A6B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
              Guest Experiences
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Stories from the <span className="italic font-normal text-[#F8E1E8]">global traveller</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStory}
              className="p-3 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Previous guest story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-white/50 px-2">
              0{currentIndex + 1} / 0{GUEST_STORIES_DATA.length}
            </span>
            <button
              onClick={nextStory}
              className="p-3 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Next guest story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Story Display */}
        <div className="bg-[#1C2C4E] rounded-[24px] border border-white/10 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar and Person Metadata */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#D93A6B] to-[#B89B72] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#14213D] flex items-center justify-center font-serif text-2xl font-bold text-[#F8E1E8]">
                {current.initials}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                {current.name}
              </h3>
              <p className="text-xs text-[#B89B72] uppercase tracking-wider font-semibold mt-0.5">
                {current.role}
              </p>
              <div className="text-xs text-white/60 mt-1">
                Stayed at <span className="text-white/90">{current.apartmentName}</span>
              </div>
              <div className="text-[11px] font-mono text-[#9DB5A0] mt-0.5">
                {current.duration}
              </div>
            </div>
          </div>

          {/* Quote Body */}
          <div className="lg:col-span-8 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0">
            <Quote className="w-8 h-8 text-[#D93A6B] opacity-60 mb-4" />
            <p className="font-serif italic text-lg sm:text-2xl text-white/95 leading-relaxed">
              “{current.story}”
            </p>

            {/* Compliance notice */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-start gap-2 text-[11px] text-white/40">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#B89B72]" />
              <span>{current.note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
