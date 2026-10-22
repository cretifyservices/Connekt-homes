import React, { useState } from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import { NEIGHBOURHOODS_DATA } from '../data/neighbourhoods';
import { MapPin, Navigation, ArrowRight, Compass, Coffee, Utensils, Waves, Landmark } from 'lucide-react';

export const NeighbourhoodMap: React.FC = () => {
  const { allStays, navigateTo } = useBooking();
  const [selectedAreaId, setSelectedAreaId] = useState<string>('pali-hill');
  const [activeStayId, setActiveStayId] = useState<string>(allStays[0]?.id || '');

  const activeStay = allStays.find((s) => s.id === activeStayId) || allStays[0];
  const activeArea = NEIGHBOURHOODS_DATA.find((a) => a.id === selectedAreaId) || NEIGHBOURHOODS_DATA[0];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
              Bandra West Enclave
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
              A neighbourhood to <span className="italic font-normal">wander</span>
            </h2>
            <p className="text-sm sm:text-base text-[#2B2F3A]/70 mt-3 max-w-xl leading-relaxed">
              Tree-canopied lanes, heritage Portuguese villages, artisanal coffee roasters, and the Arabian Sea promenade—all within walking reach.
            </p>
          </div>

          {/* Area Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {NEIGHBOURHOODS_DATA.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`px-3.5 py-1.5 rounded-[10px] text-xs font-medium transition-all cursor-pointer ${
                  selectedAreaId === area.id
                    ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                    : 'bg-[#EFE6DA] text-[#2B2F3A]/80 hover:bg-[#EFE6DA]/70'
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map & Guide Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stylised Interactive Map Visual */}
          <div className="lg:col-span-8 bg-[#EFE6DA]/60 rounded-[20px] p-4 sm:p-6 border border-[#14213D]/10 relative min-h-[440px] flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Map Canvas Background with Stylised Contours & Shoreline */}
            <div className="absolute inset-0 pointer-events-none opacity-80">
              <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
                {/* Arabian Sea Water on left */}
                <path
                  d="M0,0 L200,0 C170,120 220,240 180,360 C150,440 190,500 160,500 L0,500 Z"
                  fill="#D8E8EE"
                  opacity="0.6"
                />
                {/* Coastal Tide lines */}
                <path
                  d="M190,0 C160,120 210,240 170,360 C140,440 180,500 150,500"
                  stroke="#2A8CB5"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
                {/* Major Arteries */}
                <path
                  d="M200,80 Q350,150 480,120 T750,180"
                  stroke="#B89B72"
                  strokeWidth="3"
                  opacity="0.25"
                />
                <path
                  d="M260,0 Q340,220 380,500"
                  stroke="#14213D"
                  strokeWidth="2.5"
                  opacity="0.2"
                />
                <path
                  d="M180,240 Q400,280 650,380"
                  stroke="#B89B72"
                  strokeWidth="2"
                  opacity="0.25"
                />
                {/* Pali Hill Contour Ring */}
                <circle cx="420" cy="230" r="140" stroke="#9DB5A0" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
                <circle cx="420" cy="230" r="85" stroke="#9DB5A0" strokeWidth="1.5" opacity="0.2" />

                {/* Geography Labels */}
                <text x="40" y="260" fill="#2A8CB5" fontSize="12" letterSpacing="0.2em" opacity="0.6" fontWeight="600" transform="rotate(-90 40,260)">
                  ARABIAN SEA
                </text>
                <text x="370" y="235" fill="#14213D" fontSize="11" letterSpacing="0.25em" opacity="0.35" fontWeight="700">
                  PALI HILL
                </text>
                <text x="210" y="440" fill="#14213D" fontSize="10" letterSpacing="0.2em" opacity="0.3" fontWeight="600">
                  CARTER ROAD WATERFRONT
                </text>
                <text x="540" y="320" fill="#14213D" fontSize="10" letterSpacing="0.2em" opacity="0.3" fontWeight="600">
                  RANWAR VILLAGE
                </text>
              </svg>
            </div>

            {/* Map Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-[10px] text-xs font-semibold text-[#14213D] shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#D93A6B]" />
                <span>Bandra West Serviced Stays</span>
              </div>
              <span className="text-[11px] font-mono text-[#2B2F3A]/60 bg-white/70 px-2 py-1 rounded-[6px]">
                19.0600° N, 72.8300° E
              </span>
            </div>

            {/* Interactive Pins on Map */}
            <div className="relative z-20 flex-1 my-6 min-h-[300px]">
              {allStays.map((stay) => {
                const isActive = activeStayId === stay.id;
                return (
                  <div
                    key={stay.id}
                    style={{
                      left: `${stay.coordinates.xPercent}%`,
                      top: `${stay.coordinates.yPercent}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    onClick={() => setActiveStayId(stay.id)}
                  >
                    {/* Pulsing Pin */}
                    <div
                      className={`relative flex items-center justify-center transition-transform duration-300 ${
                        isActive ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                          isActive
                            ? 'bg-[#D93A6B] text-white ring-4 ring-[#F8E1E8]'
                            : 'bg-[#14213D] text-white hover:bg-[#D93A6B]'
                        }`}
                      >
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>

                      {/* Small Price Tag */}
                      <span
                        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold shadow-xs transition-colors ${
                          isActive
                            ? 'bg-[#D93A6B] text-white'
                            : 'bg-white text-[#14213D] border border-[#14213D]/10'
                        }`}
                      >
                        {formatINR(stay.pricePerNight)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mini Property Card on bottom of Map */}
            {activeStay && (
              <div className="relative z-30 bg-white/95 backdrop-blur-md rounded-[16px] p-3.5 border border-[#14213D]/10 shadow-lg flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-3">
                  <img
                    src={activeStay.images[0]}
                    alt={activeStay.name}
                    className="w-16 h-16 rounded-[8px] object-cover shrink-0"
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#B89B72] tracking-wider">
                      {activeStay.area} · {activeStay.type}
                    </div>
                    <div className="font-serif text-sm font-semibold text-[#14213D] line-clamp-1">
                      {activeStay.name}
                    </div>
                    <div className="text-xs font-bold text-[#14213D] mt-0.5">
                      {formatINR(activeStay.pricePerNight)}
                      <span className="text-[10px] font-normal text-[#2B2F3A]/60"> / night</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo(`/stay/${activeStay.id}`)}
                  className="px-3.5 py-2 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold rounded-[8px] uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <span>Reserve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Neighborhood Guide & Walk Distances */}
          <div className="lg:col-span-4 bg-[#EFE6DA]/30 rounded-[20px] p-6 border border-[#14213D]/10 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase font-semibold text-[#B89B72] tracking-[0.2em] mb-1">
                Local Proximity
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#14213D]">
                {activeArea.name}
              </h3>
              <p className="text-xs text-[#2B2F3A]/70 mt-2 leading-relaxed">
                {activeArea.description}
              </p>

              {/* Nearby Spots List */}
              <div className="mt-6 space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-[#14213D] font-bold pb-2 border-b border-[#14213D]/10">
                  Walk Times from Residences
                </div>
                {activeArea.keySpots.map((spot, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[12px] p-3 border border-[#14213D]/5 shadow-xs hover:border-[#D93A6B]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#14213D]">{spot.name}</span>
                      <span className="font-mono text-[#D93A6B] font-semibold text-[11px] bg-[#F8E1E8] px-2 py-0.5 rounded">
                        {spot.walkMinutes} min walk
                      </span>
                    </div>
                    <div className="text-[11px] text-[#2B2F3A]/60 mt-1 line-clamp-1">
                      {spot.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#14213D]/10 flex items-center justify-between">
              <span className="text-xs text-[#2B2F3A]/60">Need a curated itinerary?</span>
              <button
                onClick={() => navigateTo('/experiences')}
                className="text-xs font-semibold text-[#D93A6B] hover:underline flex items-center gap-1"
              >
                <span>Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
