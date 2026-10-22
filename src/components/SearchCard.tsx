import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { MapPin, Calendar, Users, Search, ChevronDown, Check } from 'lucide-react';

interface SearchCardProps {
  compact?: boolean;
}

export const SearchCard: React.FC<SearchCardProps> = ({ compact = false }) => {
  const {
    searchDestination,
    setSearchDestination,
    searchDates,
    setSearchDates,
    searchGuests,
    setSearchGuests,
    navigateTo,
  } = useBooking();

  const [locationOpen, setLocationOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);

  const areas = [
    { name: 'All of Bandra West', sub: 'Mumbai (All curated residences)' },
    { name: 'Pali Hill', sub: 'Leafy heritage streets & calm avenues' },
    { name: 'Pali Village', sub: 'Bohemian cafes, boutiques & vintage villas' },
    { name: 'Carter Road', sub: 'Seaside promenade & sunset vistas' },
    { name: 'Ranwar Village', sub: '18th-century Portuguese heritage quarter' },
    { name: 'Mount Mary', sub: 'Hillside ridge near the historic basilica' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
      if (datesRef.current && !datesRef.current.contains(e.target as Node)) {
        setDatesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocationOpen(false);
    setGuestsOpen(false);
    setDatesOpen(false);
    navigateTo('/stays');
  };

  return (
    <div className={`w-full ${compact ? '' : 'max-w-4xl mx-auto'}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-[18px] sm:rounded-[20px] p-2.5 sm:p-3 shadow-[0_20px_60px_rgba(20,33,61,0.12)] border border-[#14213D]/10 grid grid-cols-1 md:grid-cols-12 gap-2 relative z-30"
      >
        {/* Destination */}
        <div ref={locationRef} className="md:col-span-4 relative">
          <div
            onClick={() => {
              setLocationOpen(!locationOpen);
              setDatesOpen(false);
              setGuestsOpen(false);
            }}
            className="p-3 rounded-[12px] hover:bg-[#FAF6F0] transition-colors cursor-pointer border border-transparent hover:border-[#14213D]/10"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B89B72] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>Where</span>
            </div>
            <div className="text-sm font-semibold text-[#14213D] truncate mt-0.5">
              {searchDestination}
            </div>
            <div className="text-[11px] text-[#2B2F3A]/60 truncate">Mumbai, Maharashtra</div>
          </div>

          {/* Location Suggestions Dropdown */}
          {locationOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-[16px] shadow-2xl border border-[#14213D]/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#B89B72] border-b border-[#14213D]/5">
                Suggested Neighborhoods
              </div>
              <div className="py-1 max-h-64 overflow-y-auto">
                {areas.map((area) => (
                  <div
                    key={area.name}
                    onClick={() => {
                      setSearchDestination(area.name);
                      setLocationOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-[10px] cursor-pointer text-left hover:bg-[#FAF6F0] transition-colors flex items-start justify-between ${
                      searchDestination === area.name ? 'bg-[#F8E1E8]/40' : ''
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#14213D]">{area.name}</div>
                      <div className="text-xs text-[#2B2F3A]/60">{area.sub}</div>
                    </div>
                    {searchDestination === area.name && (
                      <Check className="w-4 h-4 text-[#D93A6B] mt-0.5 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Range Picker Dropdown */}
        <div ref={datesRef} className="md:col-span-4 relative">
          <div
            onClick={() => {
              setDatesOpen(!datesOpen);
              setLocationOpen(false);
              setGuestsOpen(false);
            }}
            className="p-3 rounded-[12px] hover:bg-[#FAF6F0] transition-colors cursor-pointer border border-transparent hover:border-[#14213D]/10"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B89B72] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>Stay Dates</span>
            </div>
            <div className="text-sm font-semibold text-[#14213D] truncate mt-0.5">
              {new Date(searchDates.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
              {new Date(searchDates.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-[11px] text-[#2B2F3A]/60 truncate">
              {Math.max(
                1,
                Math.ceil(
                  (new Date(searchDates.end).getTime() - new Date(searchDates.start).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              )}{' '}
              nights duration
            </div>
          </div>

          {/* Quick Date Picker Popover */}
          {datesOpen && (
            <div className="absolute top-full left-0 md:-left-12 mt-2 w-80 sm:w-96 bg-white rounded-[16px] shadow-2xl border border-[#14213D]/10 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#14213D]">
                  Select Check-in & Check-out
                </span>
                <span className="text-[11px] text-[#2B2F3A]/60">Min 2 nights</span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3">
                <div>
                  <label className="text-[11px] font-medium text-[#2B2F3A]/70 block mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={searchDates.start}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) =>
                      setSearchDates({
                        ...searchDates,
                        start: e.target.value,
                        end:
                          e.target.value >= searchDates.end
                            ? new Date(new Date(e.target.value).getTime() + 86400000 * 2)
                                .toISOString()
                                .split('T')[0]
                            : searchDates.end,
                      })
                    }
                    className="w-full text-xs font-medium bg-[#FAF6F0] p-2.5 rounded-[8px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#2B2F3A]/70 block mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={searchDates.end}
                    min={searchDates.start}
                    onChange={(e) => setSearchDates({ ...searchDates, end: e.target.value })}
                    className="w-full text-xs font-medium bg-[#FAF6F0] p-2.5 rounded-[8px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#14213D]/10">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    const s = new Date(today.getTime() + 86400000);
                    const e = new Date(today.getTime() + 86400000 * 4);
                    setSearchDates({
                      start: s.toISOString().split('T')[0],
                      end: e.toISOString().split('T')[0],
                    });
                  }}
                  className="px-2.5 py-1 text-[11px] rounded-[6px] bg-[#EFE6DA]/60 hover:bg-[#EFE6DA] text-[#14213D] transition-colors"
                >
                  This Weekend (3n)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    const s = new Date(today.getTime() + 86400000 * 2);
                    const e = new Date(today.getTime() + 86400000 * 9);
                    setSearchDates({
                      start: s.toISOString().split('T')[0],
                      end: e.toISOString().split('T')[0],
                    });
                  }}
                  className="px-2.5 py-1 text-[11px] rounded-[6px] bg-[#EFE6DA]/60 hover:bg-[#EFE6DA] text-[#14213D] transition-colors"
                >
                  1 Week (7n)
                </button>
                <button
                  type="button"
                  onClick={() => setDatesOpen(false)}
                  className="ml-auto text-xs font-semibold text-[#D93A6B] hover:underline"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guests */}
        <div ref={guestsRef} className="md:col-span-2 relative">
          <div
            onClick={() => {
              setGuestsOpen(!guestsOpen);
              setLocationOpen(false);
              setDatesOpen(false);
            }}
            className="p-3 rounded-[12px] hover:bg-[#FAF6F0] transition-colors cursor-pointer border border-transparent hover:border-[#14213D]/10"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B89B72] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>Guests</span>
            </div>
            <div className="text-sm font-semibold text-[#14213D] truncate mt-0.5">
              {searchGuests} {searchGuests === 1 ? 'Guest' : 'Guests'}
            </div>
            <div className="text-[11px] text-[#2B2F3A]/60 truncate">All welcome</div>
          </div>

          {/* Guests Stepper Popover */}
          {guestsOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-[16px] shadow-2xl border border-[#14213D]/10 p-4 z-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#14213D]">Guests</div>
                  <div className="text-[11px] text-[#2B2F3A]/60">Ages 13 or above</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchGuests(Math.max(1, searchGuests - 1))}
                    disabled={searchGuests <= 1}
                    className="w-8 h-8 rounded-full border border-[#14213D]/20 flex items-center justify-center text-sm font-bold text-[#14213D] disabled:opacity-30 hover:bg-[#FAF6F0]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{searchGuests}</span>
                  <button
                    type="button"
                    onClick={() => setSearchGuests(Math.min(8, searchGuests + 1))}
                    disabled={searchGuests >= 8}
                    className="w-8 h-8 rounded-full border border-[#14213D]/20 flex items-center justify-center text-sm font-bold text-[#14213D] disabled:opacity-30 hover:bg-[#FAF6F0]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#14213D]/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuestsOpen(false)}
                  className="text-xs font-semibold text-[#D93A6B] hover:underline"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search CTA Button */}
        <div className="md:col-span-2 flex items-center">
          <button
            type="submit"
            className="w-full h-full min-h-[52px] bg-[#D93A6B] hover:bg-[#c42f5d] text-white font-semibold text-xs tracking-wider uppercase rounded-[12px] flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group"
          >
            <Search className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Quiet Trust Chips underneath */}
      {!compact && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#2B2F3A]/75">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" />
            <span>Fully furnished</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" />
            <span>Daily housekeeping</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" />
            <span>Self check-in</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72]" />
            <span>24/7 concierge support</span>
          </span>
        </div>
      )}
    </div>
  );
};
