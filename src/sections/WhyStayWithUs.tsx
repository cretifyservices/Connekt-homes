import React from 'react';
import { ShieldCheck, Heart, Coffee, Home, Sparkles, Clock, Compass } from 'lucide-react';

export const WhyStayWithUs: React.FC = () => {
  const stats = [
    { value: '4.96★', label: 'Average Guest Score', sub: 'Across 150+ verified reviews' },
    { value: '1,200+', label: 'Happy Guests Hosted', sub: 'From 24+ countries worldwide' },
    { value: '100%', label: 'Curated Residences', sub: 'Personally inspected & maintained' },
    { value: '24 / 7', label: 'On-Ground Concierge', sub: 'Local Bandra host on call' },
  ];

  const pillars = [
    {
      step: '01',
      title: 'Full Kitchens & True Living Rooms',
      desc: 'No sterile hotel boxes. Enjoy generous layouts, dedicated dining tables, custom fluted oak cabinetry, and fully outfitted kitchens with gas stoves, cookware, and pour-over carafes.',
      icon: Home,
      tag: 'Generous Space',
    },
    {
      step: '02',
      title: 'Hotel-Grade Cleanliness & Care',
      desc: 'Our in-house housekeeping team visits daily to keep your home immaculate. Crisp 400-thread count cotton sheets, plush organic towels, and botanical bath amenities await you.',
      icon: Sparkles,
      tag: 'Spotless Hygiene',
    },
    {
      step: '03',
      title: 'Rooted in Authentic Village Life',
      desc: 'Live like a Bandra local. Walk down quiet bougainvillea-framed lanes to artisanal sourdough bakeries, seafront sunset promenades, indie art bookstores, and neighborhood bistros.',
      icon: Compass,
      tag: 'Local Rhythms',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] border-t border-[#14213D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72]">
            The Connekt Standard
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#14213D] font-normal leading-[1.1] tracking-tight">
            “Hotels give you a bed. <br />
            Connekt gives you a <span className="italic font-normal">life in Mumbai</span>.”
          </h2>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 max-w-xl mx-auto leading-relaxed">
            We created Connekt Homes to bridge the gap between impersonal luxury hotels and unpredictable vacation rentals.
          </p>
        </div>

        {/* 4 Stat Counters Band (ThrillHikers Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-[28px] bg-white border border-[#14213D]/10 shadow-[0_10px_35px_rgba(20,33,61,0.06)] mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left sm:px-4 border-r last:border-r-0 border-[#14213D]/10">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#14213D] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#14213D] mt-1 font-sans">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#2B2F3A]/60 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* 3 Large Value Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-8 border border-[#14213D]/10 shadow-xs flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(20,33,61,0.1)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-[14px] bg-[#F8E1E8] text-[#D93A6B] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#B89B72]">
                      {pillar.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#14213D] mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#14213D]/5 text-[11px] text-[#B89B72] font-semibold uppercase tracking-wider">
                  {pillar.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
