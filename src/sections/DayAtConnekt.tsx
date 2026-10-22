import React, { useState } from 'react';
import { Sun, Sunset, Moon, Coffee, Laptop, Wine } from 'lucide-react';
import heroLiving from '../assets/images/hero_apartment_mumbai_1791985649199.jpg';
import salonLiving from '../assets/images/apartment_living_room_1791985649983.jpg';
import bedroomSuite from '../assets/images/apartment_bedroom_suite_1791985650346.jpg';

export const DayAtConnekt: React.FC = () => {
  const [activeTime, setActiveTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  const times = [
    {
      id: 'morning' as const,
      time: '08:00 AM',
      title: 'Morning Awakening',
      icon: Coffee,
      image: heroLiving,
      caption:
        'Soft golden morning sunlight pours through the tall arched casement windows. Pour-over specialty coffee from Subko Roasters brews in the kitchen as Pali Hill bird calls echo outside.',
      filter: 'brightness(102%) contrast(98%) sepia(8%)',
      accent: '#B89B72',
    },
    {
      id: 'afternoon' as const,
      time: '02:30 PM',
      title: 'Uninterrupted Flow',
      icon: Laptop,
      image: salonLiving,
      caption:
        'A dedicated oak workstation, acoustic sound-insulation, and seamless 300 Mbps fiber connectivity. Quiet daily housekeeping has already swept through while you took a client call.',
      filter: 'brightness(100%) contrast(102%)',
      accent: '#2A8CB5',
    },
    {
      id: 'evening' as const,
      time: '08:00 PM',
      title: 'Twilight Sanctuary',
      icon: Wine,
      image: bedroomSuite,
      caption:
        'Warm brass sconces dim to an amber glow. Crisp Belgian linen sheets, gentle ocean breezes from Carter Road, and complete serenity away from the metropolis.',
      filter: 'brightness(92%) contrast(105%) hue-rotate(-5deg) saturate(95%)',
      accent: '#D93A6B',
    },
  ];

  const current = times.find((t) => t.id === activeTime) || times[0];

  return (
    <section className="py-20 sm:py-28 bg-[#EFE6DA]/40 border-y border-[#14213D]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            The Living Rhythm
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
            A day at <span className="italic font-normal">Connekt</span>
          </h2>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 mt-3 leading-relaxed">
            Experience how our serviced residences transform through the day—from calm sunlit mornings to twilight ease.
          </p>

          {/* Time Switcher Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white rounded-[14px] border border-[#14213D]/10 shadow-xs mt-8">
            {times.map((t) => {
              const Icon = t.icon;
              const isActive = activeTime === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTime(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                      : 'text-[#2B2F3A]/70 hover:text-[#14213D] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D93A6B]' : 'text-[#B89B72]'}`} />
                  <span>{t.time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pinned Story Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[24px] border border-[#14213D]/10 p-6 sm:p-10 shadow-[0_20px_60px_rgba(20,33,61,0.06)]">
          {/* Visual Canvas */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden bg-[#14213D]">
              <img
                src={current.image}
                alt={current.title}
                style={{ filter: current.filter }}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
                <span className="font-mono bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-[6px] border border-white/20">
                  {current.time} IST
                </span>
                <span className="text-white/80 font-medium">Bandra Serviced Suite</span>
              </div>
            </div>
          </div>

          {/* Editorial Commentary */}
          <div className="lg:col-span-5 lg:pl-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.accent }} />
              <span>{current.time}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] leading-tight">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-[#2B2F3A]/80 leading-relaxed font-sans">
              {current.caption}
            </p>

            {/* Micro Details list */}
            <div className="space-y-2 pt-2 border-t border-[#14213D]/10 text-xs text-[#2B2F3A]/70">
              <div className="flex items-center justify-between py-1">
                <span>Natural Illumination</span>
                <span className="font-semibold text-[#14213D]">
                  {activeTime === 'morning' ? 'Diffused East Sun' : activeTime === 'afternoon' ? 'Direct Amber' : 'Warm 2700K Sconces'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Sound Environment</span>
                <span className="font-semibold text-[#14213D]">
                  {activeTime === 'morning' ? 'Quiet Village Birdsong' : activeTime === 'afternoon' ? 'Double-Glazed Silence' : 'Calm Coastal Breeze'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Concierge Status</span>
                <span className="font-semibold text-[#9DB5A0]">On-Call & Discreet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
