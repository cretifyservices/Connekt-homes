import React, { useState, useMemo } from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import { Stay } from '../data/stays';
import { StayCard } from '../components/StayCard';
import { SearchCard } from '../components/SearchCard';
import {
  SlidersHorizontal,
  MapPin,
  List,
  Map,
  X,
  RotateCcw,
  Star,
  Check,
  ChevronDown,
} from 'lucide-react';

export const StaysPage: React.FC = () => {
  const { allStays, searchDestination, searchGuests, navigateTo } = useBooking();

  // Filters State
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(20000);
  const [guestCountFilter, setGuestCountFilter] = useState<number>(searchGuests || 1);
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({
    wifi: false,
    kitchen: false,
    workspace: false,
    petsAllowed: false,
    parking: false,
    washer: false,
  });
  const [sortOption, setSortOption] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [hoveredStayId, setHoveredStayId] = useState<string | null>(null);

  // Available Areas dynamically from stays
  const areas = ['all', ...Array.from(new Set(allStays.map((s) => s.area)))];

  const toggleAmenity = (key: string) => {
    setSelectedAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFilters = () => {
    setSelectedArea('all');
    setSelectedType('all');
    setPriceRange(20000);
    setGuestCountFilter(1);
    setSelectedAmenities({
      wifi: false,
      kitchen: false,
      workspace: false,
      petsAllowed: false,
      parking: false,
      washer: false,
    });
    setSortOption('recommended');
  };

  // Filter & Sort Logic
  const filteredStays = useMemo(() => {
    return allStays
      .filter((stay) => {
        // Area
        if (selectedArea !== 'all' && stay.area !== selectedArea) return false;
        // Type
        if (selectedType !== 'all' && !stay.type.toLowerCase().includes(selectedType.toLowerCase())) return false;
        // Price
        if (stay.pricePerNight > priceRange) return false;
        // Guests
        if (stay.guests < guestCountFilter) return false;
        // Amenities
        if (selectedAmenities.wifi && !stay.amenities.wifi) return false;
        if (selectedAmenities.kitchen && !stay.amenities.kitchen) return false;
        if (selectedAmenities.workspace && !stay.amenities.workspace) return false;
        if (selectedAmenities.petsAllowed && !stay.amenities.petsAllowed) return false;
        if (selectedAmenities.parking && !stay.amenities.parking) return false;
        if (selectedAmenities.washer && !stay.amenities.washer) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortOption === 'price-desc') return b.pricePerNight - a.pricePerNight;
        if (sortOption === 'rating') return b.rating - a.rating;
        // recommended
        return (b.isSuperhost ? 1 : 0) - (a.isSuperhost ? 1 : 0);
      });
  }, [allStays, selectedArea, selectedType, priceRange, guestCountFilter, selectedAmenities, sortOption]);

  const activeFilterCount =
    (selectedArea !== 'all' ? 1 : 0) +
    (selectedType !== 'all' ? 1 : 0) +
    (priceRange < 20000 ? 1 : 0) +
    (guestCountFilter > 1 ? 1 : 0) +
    Object.values(selectedAmenities).filter(Boolean).length;

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-24">
      {/* Search Header Bar */}
      <div className="bg-white border-b border-[#14213D]/10 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <SearchCard compact={true} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Results Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#14213D]/10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
              Short-Term Serviced Stays
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] mt-0.5">
              Available Homes in Bandra West
            </h1>
            <p className="text-xs text-[#2B2F3A]/70 mt-1">
              Showing {filteredStays.length} of {allStays.length} residences
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-white border border-[#14213D]/15 text-xs font-semibold text-[#14213D]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D93A6B]" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="appearance-none bg-white text-xs font-medium text-[#14213D] py-2 pl-3 pr-8 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B] cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#14213D]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Toggle: Split vs Grid */}
            <div className="hidden sm:flex items-center bg-white rounded-[10px] p-1 border border-[#14213D]/15">
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-[6px] transition-colors ${
                  viewMode === 'split' ? 'bg-[#14213D] text-white' : 'text-[#2B2F3A]/60 hover:text-[#14213D]'
                }`}
                title="List and Map View"
              >
                <Map className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-[6px] transition-colors ${
                  viewMode === 'grid' ? 'bg-[#14213D] text-white' : 'text-[#2B2F3A]/60 hover:text-[#14213D]'
                }`}
                title="Full Grid View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Left Filters + Right Listings/Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[18px] p-6 border border-[#14213D]/10 shadow-xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/10">
                <span className="font-serif text-lg font-semibold text-[#14213D]">
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#D93A6B] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Area Filter */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B89B72] block mb-2">
                  Neighborhood
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full text-xs font-medium bg-[#FAF6F0] p-2.5 rounded-[10px] border border-[#14213D]/15 text-[#14213D] focus:outline-none"
                >
                  <option value="all">All Neighborhoods</option>
                  {areas.filter((a) => a !== 'all').map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apartment Layout Type */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B89B72] block mb-2">
                  Residence Type
                </label>
                <div className="space-y-1.5 text-xs text-[#2B2F3A]">
                  {[
                    { label: 'All Layouts', value: 'all' },
                    { label: 'Studio Suite', value: 'Studio' },
                    { label: '1 BHK Apartment', value: '1 BHK' },
                    { label: '2 BHK Residence', value: '2 BHK' },
                    { label: '3 BHK Penthouse', value: 'Penthouse' },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2 cursor-pointer p-1.5 rounded-[6px] hover:bg-[#FAF6F0]"
                    >
                      <input
                        type="radio"
                        name="stayType"
                        checked={selectedType === type.value}
                        onChange={() => setSelectedType(type.value)}
                        className="text-[#D93A6B] focus:ring-[#D93A6B]"
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#B89B72]">
                    Max Nightly Rate
                  </span>
                  <span className="font-bold text-[#14213D]">{formatINR(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#D93A6B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#2B2F3A]/50 mt-1">
                  <span>₹5,000</span>
                  <span>₹20,000+</span>
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B89B72] block mb-2.5">
                  Essential Amenities
                </label>
                <div className="space-y-2 text-xs text-[#2B2F3A]">
                  {[
                    { key: 'wifi', label: '300 Mbps Fiber WiFi' },
                    { key: 'kitchen', label: 'Full Kitchen & Oven' },
                    { key: 'workspace', label: 'Dedicated Work Desk' },
                    { key: 'washer', label: 'Washer / Dryer' },
                    { key: 'petsAllowed', label: 'Pet Friendly' },
                    { key: 'parking', label: 'Covered Parking' },
                  ].map((amenity) => (
                    <label
                      key={amenity.key}
                      className="flex items-center gap-2.5 cursor-pointer hover:text-[#14213D]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities[amenity.key]}
                        onChange={() => toggleAmenity(amenity.key)}
                        className="rounded text-[#D93A6B] focus:ring-[#D93A6B] w-4 h-4"
                      />
                      <span>{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Stays List & Map Grid */}
          <main className={viewMode === 'split' ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {filteredStays.length === 0 ? (
              <div className="bg-white rounded-[20px] p-12 text-center border border-[#14213D]/10 max-w-lg mx-auto">
                <MapPin className="w-10 h-10 text-[#D93A6B] mx-auto mb-3 opacity-80" />
                <h3 className="font-serif text-2xl font-medium text-[#14213D]">
                  No residences match this criteria
                </h3>
                <p className="text-xs text-[#2B2F3A]/70 mt-2 leading-relaxed">
                  Try adjusting your price ceiling, removing amenity constraints, or browsing all Bandra West neighborhoods.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-5 py-2.5 bg-[#14213D] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] hover:bg-[#D93A6B] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'split' ? (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Apartments Column */}
                <div className="xl:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredStays.map((stay) => (
                      <div
                        key={stay.id}
                        onMouseEnter={() => setHoveredStayId(stay.id)}
                        onMouseLeave={() => setHoveredStayId(null)}
                      >
                        <StayCard stay={stay} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sticky Interactive Mini Map */}
                <div className="hidden xl:block xl:col-span-5 sticky top-28">
                  <div className="bg-[#EFE6DA]/80 rounded-[20px] border border-[#14213D]/15 p-4 shadow-sm h-[680px] relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#14213D] pb-3 border-b border-[#14213D]/10">
                      <span>Bandra West Price Map</span>
                      <span className="text-[11px] text-[#2B2F3A]/60">Hover stay to highlight</span>
                    </div>

                    {/* Map SVG Canvas */}
                    <div className="relative flex-1 my-3 bg-[#FAF6F0] rounded-[14px] border border-[#14213D]/10 overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 500 600" preserveAspectRatio="none">
                        <path d="M0,0 L120,0 Q90,300 130,600 L0,600 Z" fill="#D8E8EE" opacity="0.6" />
                        <path d="M120,0 Q90,300 130,600" stroke="#2A8CB5" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
                        <path d="M120,80 Q250,220 380,180" stroke="#B89B72" strokeWidth="2" opacity="0.3" />
                        <path d="M180,0 Q220,300 280,600" stroke="#14213D" strokeWidth="2" opacity="0.15" />
                        <text x="20" y="320" fill="#2A8CB5" fontSize="10" letterSpacing="0.2em" transform="rotate(-90 20,320)">
                          ARABIAN SEA
                        </text>
                      </svg>

                      {/* Pins */}
                      {filteredStays.map((stay) => {
                        const isHovered = hoveredStayId === stay.id;
                        return (
                          <div
                            key={stay.id}
                            style={{
                              left: `${stay.coordinates.xPercent}%`,
                              top: `${stay.coordinates.yPercent}%`,
                            }}
                            onClick={() => navigateTo(`/stay/${stay.id}`)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                          >
                            <span
                              className={`px-2 py-1 rounded-[8px] text-[11px] font-bold shadow-md transition-all duration-200 whitespace-nowrap block ${
                                isHovered
                                  ? 'bg-[#D93A6B] text-white scale-110 z-30'
                                  : 'bg-[#14213D] text-white hover:bg-[#D93A6B]'
                              }`}
                            >
                              {formatINR(stay.pricePerNight)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-[#2B2F3A]/60 text-center">
                      Click any pin to inspect residence floorplan and dates
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Full Grid Mode */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStays.map((stay) => (
                  <StayCard key={stay.id} stay={stay} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-[#14213D]/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 bg-[#FAF6F0] rounded-t-[24px] p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl border-t border-[#14213D]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/10">
              <span className="font-serif text-xl font-semibold text-[#14213D]">
                Filters ({activeFilterCount})
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#14213D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#14213D]">Max Nightly Rate</span>
                <span className="font-bold text-[#D93A6B]">{formatINR(priceRange)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="20000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#D93A6B]"
              />
            </div>

            {/* Neighborhood */}
            <div>
              <label className="text-xs font-semibold text-[#14213D] block mb-2">
                Neighborhood
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full text-xs font-medium bg-white p-3 rounded-[10px] border border-[#14213D]/15"
              >
                <option value="all">All Neighborhoods</option>
                {areas.filter((a) => a !== 'all').map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Amenities */}
            <div>
              <label className="text-xs font-semibold text-[#14213D] block mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.keys(selectedAmenities).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleAmenity(k)}
                    className={`p-2.5 rounded-[8px] border text-left capitalize transition-colors ${
                      selectedAmenities[k]
                        ? 'bg-[#D93A6B] text-white border-[#D93A6B]'
                        : 'bg-white text-[#14213D] border-[#14213D]/10'
                    }`}
                  >
                    {k === 'petsAllowed' ? 'Pets Welcome' : k}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="w-1/3 py-3 border border-[#14213D]/20 text-xs font-semibold rounded-[10px]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-3 bg-[#D93A6B] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px]"
              >
                Apply Filters ({filteredStays.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
