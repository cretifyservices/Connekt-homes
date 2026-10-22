import React, { useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Video,
  CheckCircle,
  Building,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';

export const ReelsGallery: React.FC = () => {
  const { siteConfig, navigateTo, allStays } = useBooking();
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredStay = allStays[2] || allStays[0];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72] mb-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#E8E2D8]">
              <Video className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>Authentic Walkthrough Film</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
              Life inside <span className="italic font-normal">Connekt Homes</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2 max-w-xl">
              Take an unedited, real-time tour through our designer serviced apartments in Bandra West, Mumbai.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/stays')}
              className="px-5 py-2.5 rounded-full bg-white text-[#14213D] border border-[#E8E2D8] hover:border-[#14213D] text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
            >
              <span>View All Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Feature Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Cinematic Video Player (7 Columns) with Continuous Autoplay & Loop (No Controls) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] overflow-hidden bg-[#14213D] shadow-[0_20px_50px_rgba(20,33,61,0.12)] border border-[#E8E2D8] aspect-video group">
              <video
                ref={videoRef}
                src={siteConfig.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              >
                Your browser does not support HTML5 video.
              </video>

              {/* Ambient Verified Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Walkthrough</span>
              </div>

              {/* Ambient Title Overlay */}
              <div className="absolute bottom-4 left-4 z-10 bg-[#14213D]/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 shadow">
                {siteConfig.videoTitle}
              </div>
            </div>
          </div>

          {/* Right Highlights & Story Column (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FCFAF7] rounded-[24px] p-6 sm:p-8 border border-[#E8E2D8] shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D93A6B]">
                <Sparkles className="w-4 h-4 text-[#D93A6B]" />
                <span>Verified Property Tour</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] leading-tight">
                {siteConfig.videoTitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#2B2F3A]/80 leading-relaxed font-sans">
                {siteConfig.videoSubtitle}
              </p>

              <div className="space-y-3 pt-2 border-t border-[#E8E2D8]">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D93A6B] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#14213D] font-medium">
                    800 sqft designer layout with cross-ventilation and natural daylight
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D93A6B] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#14213D] font-medium">
                    2 Ensuite bathrooms with 24/7 instant hot water geysers & glass partitions
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D93A6B] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#14213D] font-medium">
                    Full modular kitchen with microwave, fridge, toaster, kettle & cookware
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D93A6B] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#14213D] font-medium">
                    Dedicated on-ground host and 24/7 building security
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo(`/stay/${featuredStay.id}`)}
                  className="w-full py-3.5 bg-[#14213D] hover:bg-[#1E2E4F] text-[#FAF6F0] rounded-[14px] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building className="w-4 h-4 text-[#B89B72]" />
                  <span>Explore {featuredStay.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
