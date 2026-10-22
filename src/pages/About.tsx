import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Heart, Sparkles, ShieldCheck, Compass, Check, ArrowRight } from 'lucide-react';
import heroLiving from '../assets/images/hero_apartment_mumbai_1791985649199.jpg';
import salonLiving from '../assets/images/apartment_living_room_1791985649983.jpg';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useBooking();

  const values = [
    {
      title: 'Warmth over Formality',
      desc: 'We reject sterile corporate hotel scripts. Our hospitality is attentive, lived-in, and genuinely human.',
    },
    {
      title: 'Architectural Integrity',
      desc: 'We curate homes with character: natural materials, soft arch profiles, artisanal pottery, and generous natural light.',
    },
    {
      title: 'Neighbourhood Respect',
      desc: 'We celebrate Bandra’s historic pakhadis and residential peace. Our guests live as considerate temporary neighbours.',
    },
    {
      title: 'Zero Friction',
      desc: 'From keyless self check-in to quiet daily housekeeping and responsive WhatsApp support, your stay is frictionless.',
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The First Pali Hill Residence [EDIT]',
      desc: 'Connekt Homes was born with two sunlit heritage apartments in Bandra West, designed for visiting creative directors.',
    },
    {
      year: '2024',
      title: 'Corporate Partnerships & Expansion [EDIT]',
      desc: 'Expanded our portfolio to 8 residences, introducing bespoke workstations and formal GST corporate billing.',
    },
    {
      year: '2025',
      title: 'Superhost & Boutique Distinction [EDIT]',
      desc: 'Achieved an average 4.96/5 guest rating, welcoming global writers, tech founders, and relocating families.',
    },
    {
      year: '2026',
      title: 'Next Horizon [EDIT]',
      desc: 'Deepening our Bandra presence and preparing selective residences across Goa and South Mumbai.',
    },
  ];

  const teamMembers = [
    {
      name: 'Aditya & Rhea K. [EDIT]',
      role: 'Co-Founders & Creative Directors',
      bio: 'Lifelong Bandra residents with backgrounds in boutique hospitality design and property restoration.',
      initials: 'AR',
    },
    {
      name: 'Farhan Merchant [EDIT]',
      role: 'Head of Operations & Guest Concierge',
      bio: 'Oversees daily housekeeping standards, on-ground security, and emergency guest support.',
      initials: 'FM',
    },
    {
      name: 'Pooja Nair [EDIT]',
      role: 'Property Partner Relations',
      bio: 'Works directly with Bandra homeowners to design, stage, and maximize short-term rental yields.',
      initials: 'PN',
    },
  ];

  const careList = [
    '2-hour thorough turnover sanitisation with hospital-grade eco disinfectants',
    'Triple-sheet Belgian linen pressing with hypoallergenic laundry processing',
    'Custom water filtration check and fresh mineral water carafe replenishment',
    'Comprehensive WiFi speed and smart TV diagnostics before every arrival',
    'Pantry provisioning with fresh local sourdough, artisanal tea, and coffee beans',
    'Discreet daily linen refresh and trash clearance at your chosen hour',
  ];

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Brand Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72]">
              Our Story
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#14213D] tracking-tight">
              Homes with a soul, <br />
              <span className="italic font-normal">crafted for the global traveller.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#2B2F3A]/80 leading-relaxed font-sans">
              Connekt Homes was founded to bridge the gap between impersonal, generic hotel rooms and unpredictable vacation rentals. We believe where you stay should feel like your own sanctuary—filled with warm linen, morning sunshine, good books, and the quiet rhythm of a real neighborhood.
            </p>
            <p className="text-sm sm:text-base text-[#2B2F3A]/80 leading-relaxed font-sans">
              Headquartered in Bandra West, Mumbai, we meticulously design, furnish, and manage every apartment in our collection. We treat every guest as a distinguished friend and every home as a living masterpiece.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-xl border border-[#14213D]/10">
              <img
                src={heroLiving}
                alt="Connekt Homes living room in Pali Hill"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-serif italic text-lg">
                “Your home away from home.”
              </div>
            </div>
          </div>
        </div>

        {/* Brand Values */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-1">
              Guiding Principles
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#14213D]">
              What we stand for
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[18px] p-6 sm:p-8 border border-[#14213D]/10 shadow-xs"
              >
                <div className="text-xs font-mono font-bold text-[#D93A6B] mb-3">0{idx + 1}</div>
                <h3 className="font-serif text-lg font-semibold text-[#14213D] mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-[#2B2F3A]/75 leading-relaxed font-sans">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How We Care For Every Stay */}
        <div className="bg-[#EFE6DA]/70 rounded-[24px] p-8 sm:p-12 border border-[#14213D]/10">
          <div className="max-w-3xl mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-1">
              Housekeeping & Hospitality Protocol
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#14213D]">
              How we care for every stay
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2">
              Before your arrival code is dispatched, each residence undergoes our 42-point quality checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[14px] p-4 border border-[#14213D]/10 flex items-start gap-3 shadow-xs"
              >
                <Check className="w-4 h-4 text-[#D93A6B] shrink-0 mt-0.5" />
                <span className="text-xs text-[#14213D] font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-1">
              Milestones
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#14213D]">
              Our journey so far
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[16px] p-6 border border-[#14213D]/10 shadow-xs relative"
              >
                <span className="font-serif text-3xl font-bold text-[#B89B72] block mb-2">
                  {item.year}
                </span>
                <h3 className="font-serif text-base font-semibold text-[#14213D] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2B2F3A]/70 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Placeholders */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-1">
              Leadership & Hospitality Desk
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#14213D]">
              Meet our team [EDIT]
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[20px] p-6 border border-[#14213D]/10 shadow-xs text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#14213D] text-[#FAF6F0] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-4 shadow-sm">
                  {member.initials}
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#14213D]">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-[#B89B72] uppercase tracking-wider mt-0.5 mb-2">
                  {member.role}
                </div>
                <p className="text-xs text-[#2B2F3A]/75 leading-relaxed font-sans">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => navigateTo('/stays')}
            className="px-8 py-3.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] shadow transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Our Residences</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
