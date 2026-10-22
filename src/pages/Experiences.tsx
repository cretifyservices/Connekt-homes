import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Coffee, Utensils, Waves, ShoppingBag, Landmark, ArrowRight, MapPin } from 'lucide-react';
import paliStreet from '../assets/images/bandra_pali_hill_street_1791985650598.jpg';
import heroLiving from '../assets/images/hero_apartment_mumbai_1791985649199.jpg';
import salonLiving from '../assets/images/apartment_living_room_1791985649983.jpg';

export const ExperiencesPage: React.FC = () => {
  const { navigateTo } = useBooking();
  const [activeTab, setActiveTab] = useState<'cafes' | 'beaches' | 'culture' | 'shopping' | 'daytrips'>('cafes');

  const categories = [
    { id: 'cafes' as const, label: 'Cafes & Sourdough', icon: Coffee },
    { id: 'beaches' as const, label: 'Seaside & Promenades', icon: Waves },
    { id: 'culture' as const, label: 'Heritage & Art', icon: Landmark },
    { id: 'shopping' as const, label: 'Boutiques & Design', icon: ShoppingBag },
    { id: 'daytrips' as const, label: 'Day Excursions', icon: MapPin },
  ];

  const items = {
    cafes: [
      {
        name: 'Subko Coffee Roasters & Craft Bakehouse',
        area: 'Ranwar / Chapel Road [EDIT]',
        desc: 'Single-origin roast coffee from tribal estates across the Western Ghats paired with twice-baked podi croissants in a 19th-century cottage.',
        bestFor: 'Morning pour-overs & quiet writing',
        walkTime: '4 min walk from Pali Hill Stays',
        targetStayArea: 'Pali Hill',
        image: paliStreet,
      },
      {
        name: 'Veronica’s Sandwich Shop',
        area: 'Ranwar Village [EDIT]',
        desc: 'Housed in the restored St. Jude Bakery, serving legendary house-cured pastrami and natural wines amidst vibrant wall frescoes.',
        bestFor: 'Artisanal lunches & neighborhood vibes',
        walkTime: '2 min walk from Ranwar Atelier',
        targetStayArea: 'Ranwar Village',
        image: salonLiving,
      },
      {
        name: 'Birdsong The Organic Cafe',
        area: 'Waroda Road [EDIT]',
        desc: 'Exposed brick walls, massive teak windows, and 100% organic gluten-free pastries, almond milk lattes, and vegan delicacies.',
        bestFor: 'Nutritious slow breakfasts',
        walkTime: '5 min walk from Pali Village Flat',
        targetStayArea: 'Pali Village',
        image: heroLiving,
      },
    ],
    beaches: [
      {
        name: 'Carter Road Seafront Promenade',
        area: 'Carter Road [EDIT]',
        desc: 'A 1.6 km pedestrian walkway facing the open Arabian Sea. Watch local dogs run at twilight and catch cool maritime breezes.',
        bestFor: 'Sunset strolls & sea air',
        walkTime: '1 min walk from Carter Penthouse',
        targetStayArea: 'Carter Road',
        image: heroLiving,
      },
      {
        name: 'Bandra Bandstand & Fort',
        area: 'Mount Mary [EDIT]',
        desc: 'Historical rocky coastline crowned by the 1640 Portuguese fort Castella de Aguada overlooking the Bandra-Worli Sea Link.',
        bestFor: 'Panoramic photography & architectural ruins',
        walkTime: '6 min walk from Mount Mary Sanctuary',
        targetStayArea: 'Mount Mary',
        image: paliStreet,
      },
    ],
    culture: [
      {
        name: 'The Basilica of Our Lady of the Mount',
        area: 'Mount Mary [EDIT]',
        desc: 'Perched upon a green hill overlooking the bay, this centuries-old sanctuary is an architectural beacon of old Bombay peace.',
        bestFor: 'Spiritual quietude & heritage architecture',
        walkTime: '3 min walk from Mount Mary Sanctuary',
        targetStayArea: 'Mount Mary',
        image: paliStreet,
      },
      {
        name: 'Chapel Road Murals & Portuguese Pakhadis',
        area: 'Ranwar [EDIT]',
        desc: 'Open-air gallery of hand-painted Bollywood icons and contemporary graffiti painted onto 200-year-old lime-washed wooden homes.',
        bestFor: 'Street photography & architectural history',
        walkTime: 'Steps from Ranwar Atelier',
        targetStayArea: 'Ranwar Village',
        image: salonLiving,
      },
    ],
    shopping: [
      {
        name: 'Pali Village Artisan Boutiques',
        area: 'Pali Village [EDIT]',
        desc: 'Independent clothing labels, hand-thrown ceramic studios, indie bookstores, and organic perfume ateliers hidden in residential lanes.',
        bestFor: 'Curated fashion & artisanal gifts',
        walkTime: '3 min walk from Pali Village Flat',
        targetStayArea: 'Pali Village',
        image: salonLiving,
      },
    ],
    daytrips: [
      {
        name: 'Kala Ghoda Art District & Colaba',
        area: 'South Mumbai (25 min via Coastal Road) [EDIT]',
        desc: 'Explore historic Gothic architecture, modern art galleries, the Jehangir Art Gallery, and seaside dining along Mumbai Harbour.',
        bestFor: 'Weekend culture & museum hopping',
        walkTime: 'Concierge chauffeur available',
        targetStayArea: 'All Stays',
        image: heroLiving,
      },
    ],
  };

  const currentList = items[activeTab] || items.cafes;

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            Local Curation
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#14213D] tracking-tight">
            The Connekt neighbourhood <span className="italic font-normal">guide</span>
          </h1>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 mt-3 leading-relaxed">
            Our insider journal of where to drink the finest espresso, discover hidden heritage squares, and take sunset strolls along the Arabian Sea.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#14213D]/10 pb-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#14213D] text-[#FAF6F0] shadow-sm'
                    : 'bg-white text-[#2B2F3A]/75 hover:bg-[#EFE6DA] border border-[#14213D]/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D93A6B]' : 'text-[#B89B72]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentList.map((spot, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] overflow-hidden border border-[#14213D]/10 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE6DA]">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 bg-[#14213D]/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {spot.walkTime}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B89B72] mb-1">
                    {spot.area}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-[#2B2F3A]/75 leading-relaxed mb-4">
                    {spot.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#14213D]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#2A8CB5] font-medium">
                    {spot.bestFor}
                  </span>
                  <button
                    onClick={() => navigateTo('/stays')}
                    className="text-xs font-semibold text-[#D93A6B] hover:underline flex items-center gap-1"
                  >
                    <span>Stay near this</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
