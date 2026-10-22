import React from 'react';
import { Instagram, CheckCircle2, Heart, ExternalLink } from 'lucide-react';

import heroLiving from '../assets/images/hero_apartment_mumbai_1791985649199.jpg';
import bedroomSuite from '../assets/images/apartment_bedroom_suite_1791985650346.jpg';
import kitchenDining from '../assets/images/apartment_kitchen_dining_1791985650416.jpg';
import salonLiving from '../assets/images/apartment_living_room_1791985649983.jpg';
import paliStreet from '../assets/images/bandra_pali_hill_street_1791985650598.jpg';

export const InstagramCreatorCards: React.FC = () => {
  const creators = [
    {
      handle: '@connekt_homes',
      name: 'Connekt Homes',
      verified: true,
      followers: '42.8K',
      role: 'Official Host Profile',
      quote: 'Morning light in The Arched Haven. Quiet luxury, lived-in warmth.',
      avatarInitial: 'C',
      avatarBg: 'bg-[#D93A6B]',
      postImage: heroLiving,
      likes: '1,420',
      aspect: 'Pali Hill',
    },
    {
      handle: '@shantanu.maheshwari',
      name: 'Shantanu Maheshwari',
      verified: true,
      followers: '2.1M',
      role: 'Actor & Performer',
      quote: 'My go-to sanctuary during hectic Mumbai shoots. Absolute calm.',
      avatarInitial: 'S',
      avatarBg: 'bg-[#183661]',
      postImage: salonLiving,
      likes: '28.4K',
      aspect: 'Carter Road',
    },
    {
      handle: '@zakirkhan_208',
      name: 'Zakir Khan',
      verified: true,
      followers: '5.8M',
      role: 'Comedian & Writer',
      quote: 'Bandra ka sukoon. Best chai corner and writing balcony in town.',
      avatarInitial: 'Z',
      avatarBg: 'bg-[#D99B26]',
      postImage: bedroomSuite,
      likes: '45.1K',
      aspect: 'Pali Village',
    },
    {
      handle: '@aisharahmed',
      name: 'Aisha Ahmed',
      verified: true,
      followers: '890K',
      role: 'Actor & Creator',
      quote: 'The natural light here is absurdly good. Subko coffee downstairs!',
      avatarInitial: 'A',
      avatarBg: 'bg-[#26533D]',
      postImage: kitchenDining,
      likes: '14.2K',
      aspect: 'Pali Hill',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] border-t border-[#14213D]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
              <Instagram className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>@connekt_homes on Instagram</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
              Community & <span className="italic font-normal">creators</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2 max-w-lg">
              Follow our daily journal of Bandra mornings, interior styling notes, and guest moments.
            </p>
          </div>

          <a
            href="https://instagram.com/connekt_homes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @connekt_homes</span>
            <ExternalLink className="w-3 h-3 text-[#B89B72]" />
          </a>
        </div>

        {/* Creator Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] overflow-hidden border border-[#14213D]/10 shadow-[0_10px_30px_rgba(20,33,61,0.06)] hover:shadow-[0_18px_40px_rgba(20,33,61,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Profile Top Bar */}
              <div className="p-4 flex items-center justify-between border-b border-[#14213D]/5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-full ${c.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                  >
                    {c.avatarInitial}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-sans font-bold text-xs text-[#14213D] leading-none">
                        {c.handle}
                      </span>
                      {c.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2A8CB5] fill-[#2A8CB5] text-white" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#2B2F3A]/60 block mt-0.5">
                      {c.role} · {c.followers}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono bg-[#FAF6F0] text-[#14213D] px-2 py-0.5 rounded border border-[#14213D]/10">
                  {c.aspect}
                </span>
              </div>

              {/* Photo Post */}
              <div className="relative aspect-[4/3] bg-[#14213D] overflow-hidden group">
                <img
                  src={c.postImage}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white drop-shadow" />
                </div>
              </div>

              {/* Post Caption & Likes */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#2B2F3A]/85 italic font-serif leading-relaxed">
                  “{c.quote}”
                </p>

                <div className="pt-3 mt-3 border-t border-[#14213D]/5 flex items-center justify-between text-[11px] text-[#2B2F3A]/60">
                  <span className="flex items-center gap-1 text-[#D93A6B]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono text-xs">{c.likes}</span>
                  </span>
                  <span className="text-[10px] font-sans">#ConnektHomes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
