import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Star, ArrowRight, Heart } from 'lucide-react';

export const PolaroidStories: React.FC = () => {
  const { navigateTo } = useBooking();

  const stories = [
    {
      id: 1,
      stayId: 'prime-bandra-ocean-park',
      stayName: '2 Bed 2 Bath Prime Bandra Ocean Park',
      bgColor: 'bg-[#D99B26]', // Mustard Gold
      textColor: 'text-[#14213D]',
      author: 'Sajjan Jain',
      role: 'Family Holiday · Bengaluru',
      location: '3 days ago · Verified Stay',
      quote:
        'It was happy family space. Very neat & well maintained by Host Connekt. All utensils also kept very neatly maintained n hygienic so tat we can prepare & have. Value for money . Worth it . Thank u soo muchhh😇🙏',
      polaroidImage:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654430/36d01175-b1e0-4de6-8cda-26f28b3aeee6.avif',
      caption: 'Prime Bandra Ocean Park living area',
      rotation: '-rotate-2',
    },
    {
      id: 2,
      stayId: 'bandra-sea-minutes',
      stayName: 'Bandra No 1 minutes away from Sea',
      bgColor: 'bg-[#26533D]', // Forest Sage
      textColor: 'text-white',
      author: 'Ismail',
      role: 'Solo Leisure · Verified Airbnb Guest',
      location: 'February 2026',
      quote:
        "Connekt is a very reliable host. You'd be safe with them, they made my stay in Mumbai more beautiful. They keep their properties very well maintained, the cleaning service they provide is excellent.",
      polaroidImage:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653907/35cea001-c00d-4f04-ad9e-3a54ff250007.avif',
      caption: 'Bandra No 1 min away from Sea',
      rotation: 'rotate-3',
    },
    {
      id: 3,
      stayId: 'luxury-pool-gym-airport-bkc',
      stayName: '5 Star Luxury ✪ Pool & Gym ✪ BKC',
      bgColor: 'bg-[#183661]', // Royal Cobalt
      textColor: 'text-white',
      author: 'Vimal',
      role: 'Business Stay · Mumbai',
      location: 'June 2024 · Verified Stay',
      quote:
        "To my surprise, the host (Divyam) was fully responsive even during odd hours so I didn't face any issues with checkin, finding the place, using the kitchen, appliances etc.",
      polaroidImage:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654206/8f850115-35d5-47cf-82b9-994c05488668.avif',
      caption: '5-Star Suite near BKC & Airport',
      rotation: '-rotate-3',
    },
    {
      id: 4,
      stayId: 'bandra-sea-minutes',
      stayName: 'Bandra No 1 minutes away from Sea',
      bgColor: 'bg-[#B64A2F]', // Terracotta Rust
      textColor: 'text-white',
      author: 'Christian',
      role: 'International Guest',
      location: 'September 2025',
      quote:
        'Thank you so much to everyone at Connekt for making my experience in Mumbai so enjoyable. The location near the sea promenade is simply unbeatable.',
      polaroidImage:
        'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653917/0d4dfab5-2a10-4ce0-9758-825be4c53b38.avif',
      caption: 'Bedroom with natural coastal light',
      rotation: 'rotate-2',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] relative overflow-hidden border-t border-[#14213D]/10">
      {/* Decorative Dotted Trail Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 200 C 300 150, 400 350, 600 250 C 800 150, 950 400, 1100 300"
            stroke="#14213D"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <circle cx="100" cy="200" r="6" fill="#D93A6B" />
          <circle cx="600" cy="250" r="6" fill="#D93A6B" />
          <circle cx="1100" cy="300" r="6" fill="#D93A6B" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            <Heart className="w-3.5 h-3.5 text-[#D93A6B] fill-[#D93A6B]" />
            <span>Stories From Our Residences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
            Unfiltered reflections from <span className="italic font-normal">those who stayed</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-3 max-w-lg mx-auto">
            From families and corporate executives to international nomads, here is how Connekt felt like home in Mumbai.
          </p>
        </div>

        {/* 4 Polaroid Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {stories.map((story) => (
            <div
              key={story.id}
              className={`${story.bgColor} ${story.textColor} rounded-[24px] p-6 shadow-[0_15px_35px_rgba(20,33,61,0.12)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 relative group overflow-hidden border border-black/5`}
            >
              {/* Polaroid with Scotch Tape */}
              <div className="relative mb-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 scotch-tape z-20 pointer-events-none rounded-[2px]" />

                <div
                  className={`bg-white p-2.5 pb-5 rounded-[4px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:rotate-0 ${story.rotation}`}
                >
                  <div className="aspect-[4/3] rounded-[2px] overflow-hidden bg-neutral-200">
                    <img
                      src={story.polaroidImage}
                      alt={story.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-2 text-center">
                    <span className="font-serif italic text-[11px] text-[#2B2F3A] block truncate">
                      {story.caption}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-3 text-[#FAF6F0]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-white/90" />
                    ))}
                  </div>

                  <p className="font-serif italic text-sm leading-relaxed mb-6 opacity-95">
                    “{story.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="font-sans font-bold text-sm tracking-tight">{story.author}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{story.role}</div>
                  <div className="text-[10px] font-mono opacity-70 mt-0.5">{story.location}</div>

                  <button
                    onClick={() => navigateTo(`/stay/${story.stayId}`)}
                    className="mt-4 w-full py-2 px-3 rounded-[10px] bg-white/15 hover:bg-white text-current hover:text-[#14213D] text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{story.stayName}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
