import React from 'react';
import { Wifi, UtensilsCrossed, Wind, Laptop, Sparkles, Tv, KeyRound, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AmenitiesGrid: React.FC = () => {
  const amenities = [
    {
      icon: Wifi,
      title: 'High-Speed Fiber WiFi',
      desc: '300 Mbps dedicated dual-band fiber with backup power failover.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Full Gourmet Kitchen',
      desc: 'Induction hob, microwave, refrigerator, artisanal ceramics & cookware.',
    },
    {
      icon: Wind,
      title: 'Whisper-Quiet AC',
      desc: 'Inverter climate control in all bedrooms and living spaces.',
    },
    {
      icon: Laptop,
      title: 'Ergonomic Workspace',
      desc: 'Solid oak desk, ergonomic seating, and warm task lighting.',
    },
    {
      icon: Sparkles,
      title: 'Daily Housekeeping',
      desc: 'Unobtrusive fresh linen service, sanitisation, and trash clearing.',
    },
    {
      icon: KeyRound,
      title: 'Keyless Smart Check-in',
      desc: 'Encrypted digital pin lock for effortless late or early arrivals.',
    },
    {
      icon: Tv,
      title: '4K Smart TV & Audio',
      desc: 'Ultra HD streaming setup with Netflix, Prime, and soundbar.',
    },
    {
      icon: Clock,
      title: '24/7 Concierge Support',
      desc: 'Local Mumbai hospitality team on WhatsApp for any request.',
    },
    {
      icon: ShieldCheck,
      title: 'Gated Security',
      desc: 'Round-the-clock building personnel and CCTV in common corridors.',
    },
    {
      icon: HeartHandshake,
      title: 'Local Provisioning',
      desc: 'Complimentary artisanal tea, specialty coffee, and mineral water.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#EFE6DA] border-y border-[#14213D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            Standard In Every Residence
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
            Hotel comforts, <span className="italic font-normal">home warmth</span>
          </h2>
          <p className="text-sm sm:text-base text-[#2B2F3A]/70 mt-3 leading-relaxed">
            Every Connekt home comes thoroughly equipped with everything modern travellers require to work, cook, rest, and entertain effortlessly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF6F0] rounded-[16px] p-6 border border-[#14213D]/5 shadow-xs hover:border-[#D93A6B]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[10px] bg-[#EFE6DA] flex items-center justify-center text-[#D93A6B] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#14213D] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2B2F3A]/70 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
