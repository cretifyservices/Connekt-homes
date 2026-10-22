import React from 'react';
import { Instagram, ArrowUpRight, Heart, MessageSquare } from 'lucide-react';
import heroLiving from '../assets/images/hero_apartment_mumbai_1791985649199.jpg';
import salonLiving from '../assets/images/apartment_living_room_1791985649983.jpg';
import bedroomSuite from '../assets/images/apartment_bedroom_suite_1791985650346.jpg';
import kitchenDining from '../assets/images/apartment_kitchen_dining_1791985650416.jpg';
import paliStreet from '../assets/images/bandra_pali_hill_street_1791985650598.jpg';

export const InstagramGrid: React.FC = () => {
  const posts = [
    {
      image: heroLiving,
      caption: 'Morning light dancing through the arched window at Pali Hill. #connekthomes #mumbaistays',
      likes: '342',
      comments: '18',
    },
    {
      image: bedroomSuite,
      caption: 'Belgian flax linens and the quietest Sunday lie-in. Homes with a soul.',
      likes: '419',
      comments: '27',
    },
    {
      image: paliStreet,
      caption: 'Golden hour bougainvillea along the heritage lanes of Old Bandra.',
      likes: '581',
      comments: '43',
    },
    {
      image: kitchenDining,
      caption: 'Fluted oak counters and artisanal ceramics ready for breakfast.',
      likes: '290',
      comments: '14',
    },
    {
      image: salonLiving,
      caption: 'The library nook at Pali Village—where deep work feels restorative.',
      likes: '512',
      comments: '36',
    },
    {
      image: heroLiving,
      caption: 'Your home away from home is waiting. Link in bio to reserve directly.',
      likes: '468',
      comments: '29',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
              Visual Chronicle
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#14213D] tracking-tight">
              Follow our journey <span className="italic font-normal">@connekt_homes</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-2">
              Daily impressions, neighborhood dispatches, and interior design notes from Bandra.
            </p>
          </div>

          <a
            href="https://www.instagram.com/connekt_homes/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/connekt_homes/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[14px] overflow-hidden bg-[#EFE6DA] border border-[#14213D]/10 block shadow-xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#14213D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#F8E1E8]" />
                </div>
                <div>
                  <p className="text-[10px] line-clamp-3 text-white/90 leading-tight">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-white/75 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current text-[#D93A6B]" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 fill-current" /> {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
