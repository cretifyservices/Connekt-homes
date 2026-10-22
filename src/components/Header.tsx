import React, { useState, useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Heart,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Search,
  Sparkles,
  MapPin,
  Calendar,
  SlidersHorizontal,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface HeaderProps {
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenBookModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWishlist,
  onOpenCompare,
  onOpenBookModal,
}) => {
  const { currentRoute, navigateTo, wishlist, compareList, allStays } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'residences' | 'departures' | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  };

  const handleStaySelect = (stayId: string) => {
    navigateTo(`/stay/${stayId}`);
    setActiveMegaMenu(null);
  };

  return (
    <>
      {/* Top Floating Dark Capsule Navbar */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none">
        <div
          ref={megaMenuRef}
          className={`mx-auto max-w-6xl pointer-events-auto transition-all duration-300 rounded-full border shadow-[0_12px_36px_rgba(20,33,61,0.32)] backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 ${
            isScrolled
              ? 'bg-[#14213D]/95 border-white/15 text-white'
              : 'bg-[#14213D]/90 border-white/10 text-white'
          }`}
        >
          {/* 1. Brand Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            className="cursor-pointer flex items-center gap-2 group shrink-0"
            role="button"
            tabIndex={0}
            aria-label="Connekt Homes Home"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-sans font-bold tracking-[0.2em] text-sm sm:text-base text-white">
                CONNEKT
              </span>
              <span className="font-sans font-semibold tracking-[0.2em] text-sm sm:text-base text-white flex items-center">
                H
                <span className="inline-flex items-center justify-center text-[#D93A6B] mx-[1px]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </span>
                MES
              </span>
            </div>
          </div>

          {/* 2. Interactive Navigation Links with Working Clicks */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium tracking-wide">
            {/* Residences Button with direct click & hover menu */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('/stays')}
                onMouseEnter={() => setActiveMegaMenu('residences')}
                className={`flex items-center gap-1.5 py-1 transition-colors hover:text-[#D93A6B] cursor-pointer ${
                  currentRoute === '/stays' || activeMegaMenu === 'residences'
                    ? 'text-[#D93A6B] font-semibold'
                    : 'text-white/90'
                }`}
              >
                <span>Residences</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'residences' ? 'rotate-180 text-[#D93A6B]' : 'text-white/60'
                  }`}
                />
              </button>
            </div>

            {/* Curated Stays Button with direct click */}
            <div className="relative">
              <button
                onClick={() => handleNavClick('/stays')}
                onMouseEnter={() => setActiveMegaMenu('departures')}
                className={`flex items-center gap-1.5 py-1 transition-colors hover:text-[#D93A6B] cursor-pointer ${
                  activeMegaMenu === 'departures' ? 'text-[#D93A6B] font-semibold' : 'text-white/90'
                }`}
              >
                <span>Curated Stays</span>
                <span className="text-[9px] uppercase tracking-wider bg-[#D93A6B] text-white px-1.5 py-0.2 rounded-full font-bold">
                  Hot
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === 'departures' ? 'rotate-180 text-[#D93A6B]' : 'text-white/60'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => handleNavClick('/experiences')}
              className={`py-1 transition-colors hover:text-[#D93A6B] cursor-pointer ${
                currentRoute === '/experiences' ? 'text-[#D93A6B] font-semibold' : 'text-white/90'
              }`}
            >
              Neighbourhoods
            </button>

            <button
              onClick={() => handleNavClick('/corporate')}
              className={`py-1 transition-colors hover:text-[#D93A6B] cursor-pointer ${
                currentRoute === '/corporate' ? 'text-[#D93A6B] font-semibold' : 'text-white/90'
              }`}
            >
              Corporate & Relocation
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className={`py-1 transition-colors hover:text-[#D93A6B] cursor-pointer ${
                currentRoute === '/about' ? 'text-[#D93A6B] font-semibold' : 'text-white/90'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`py-1 transition-colors hover:text-[#D93A6B] cursor-pointer ${
                currentRoute === '/contact' ? 'text-[#D93A6B] font-semibold' : 'text-white/90'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* 3. Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => handleNavClick('/stays')}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Search residences"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compare Button */}
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Compare residences"
              >
                <SlidersHorizontal className="w-3 h-3 text-[#B89B72]" />
                <span>({compareList.length})</span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label={`Wishlist with ${wishlist.length} saved residences`}
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.length > 0 ? 'fill-[#D93A6B] text-[#D93A6B]' : 'text-white'
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#D93A6B] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Primary Pill Button: DESKTOP ONLY (hidden on mobile to prevent overflow) */}
            <button
              onClick={onOpenBookModal}
              className="hidden lg:flex items-center gap-1.5 px-5 py-2.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-[0_4px_16px_rgba(217,58,107,0.4)] transition-all duration-200 hover:scale-102 cursor-pointer"
            >
              <span>Book A Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Expandable Hamburger Menu for Mobile (and tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu 1: Residences Dropdown (Hover/Click) */}
        {activeMegaMenu === 'residences' && (
          <div
            onMouseLeave={() => setActiveMegaMenu(null)}
            className="mx-auto max-w-5xl mt-2 bg-[#14213D] border border-white/15 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 text-white pointer-events-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B89B72] block">
                  Curated Residences · Mumbai
                </span>
                <h3 className="font-serif text-xl text-white font-medium">
                  Select a verified residence
                </h3>
              </div>
              <button
                onClick={() => handleNavClick('/stays')}
                className="text-xs text-[#D93A6B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View all residences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {allStays.map((stay) => (
                <div
                  key={stay.id}
                  onClick={() => handleStaySelect(stay.id)}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-[18px] p-3 transition-all cursor-pointer hover:border-[#D93A6B]/50 hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/10] rounded-[12px] overflow-hidden mb-3 relative bg-[#0c1424]">
                    <img
                      src={stay.images[0]}
                      alt={stay.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-medium text-white/90">
                      ★ {stay.rating}
                    </div>
                  </div>
                  <h4 className="font-serif text-base font-medium text-white group-hover:text-[#D93A6B] transition-colors line-clamp-1">
                    {stay.name}
                  </h4>
                  <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">{stay.tagline}</p>
                  <div className="text-[11px] font-mono text-[#B89B72] font-semibold mt-2">
                    ₹{stay.pricePerNight.toLocaleString('en-IN')}{' '}
                    <span className="text-[10px] font-sans font-normal text-white/60">/ night</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mega Menu 2: Curated Departures */}
        {activeMegaMenu === 'departures' && (
          <div
            onMouseLeave={() => setActiveMegaMenu(null)}
            className="mx-auto max-w-4xl mt-2 bg-[#14213D] border border-white/15 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 text-white pointer-events-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B89B72] block">
                  Direct Availability
                </span>
                <h3 className="font-serif text-xl text-white font-medium">
                  Instant Confirmation Stays
                </h3>
              </div>
              <span className="text-xs text-[#9DB5A0] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#9DB5A0]" />
                <span>Live availability</span>
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {allStays.map((stay) => (
                <div
                  key={stay.id}
                  onClick={() => handleStaySelect(stay.id)}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 px-3 rounded-[12px] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#B89B72] shrink-0 font-bold text-xs">
                      {stay.type.substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-serif text-base text-white group-hover:text-[#D93A6B] transition-colors">
                        {stay.name}
                      </div>
                      <div className="text-[11px] text-white/60">
                        {stay.guests} Guests · {stay.bedrooms} Bedroom · {stay.area}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div className="font-mono text-sm font-semibold text-white">
                        ₹{stay.pricePerNight.toLocaleString('en-IN')} / nt
                      </div>
                      <div className="text-[10px] text-[#9DB5A0]">Instant Booking Available</div>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-full bg-[#D93A6B] text-white text-xs font-semibold transition-colors flex items-center gap-1">
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Expandable Mobile Drawer Menu with Prominent Book a Stay Button */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#14213D] text-white flex flex-col justify-between p-6 overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div>
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold tracking-[0.2em] text-lg text-white">
                  CONNEKT
                </span>
                <span className="font-sans font-semibold tracking-[0.2em] text-lg text-white flex items-center">
                  H
                  <span className="inline-flex items-center justify-center text-[#D93A6B] mx-[1px]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </span>
                  MES
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* PROMINENT BOOK A STAY BUTTON INSIDE MOBILE MENU */}
            <div className="py-5 border-b border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookModal();
                }}
                className="w-full py-3.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white font-semibold text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(217,58,107,0.4)] transition-all cursor-pointer active:scale-98"
              >
                <span>Book A Stay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Page Links */}
            <div className="py-6 space-y-4">
              {[
                { label: 'Curated Residences', path: '/stays' },
                { label: 'Neighbourhoods & Cafes', path: '/experiences' },
                { label: 'Corporate & Relocation', path: '/corporate' },
                { label: 'List Your Property', path: '/list' },
                { label: 'About Connekt', path: '/about' },
                { label: 'Contact & Concierge', path: '/contact' },
              ].map((link) => (
                <div key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="w-full text-left font-serif text-2xl tracking-tight text-white py-2 hover:text-[#D93A6B] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#B89B72]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Real Residences Direct Links in Mobile */}
            <div className="pt-2 pb-4 border-t border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B89B72] block mb-2.5">
                Quick Selection
              </span>
              <div className="space-y-2">
                {allStays.map((stay) => (
                  <button
                    key={stay.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo(`/stay/${stay.id}`);
                    }}
                    className="w-full text-left p-2.5 rounded-[12px] bg-white/5 hover:bg-white/10 text-xs text-white flex items-center justify-between"
                  >
                    <span className="truncate mr-2">{stay.name}</span>
                    <span className="font-mono text-[#B89B72] shrink-0">
                      ₹{stay.pricePerNight.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details in Drawer Footer */}
          <div className="pt-5 border-t border-white/10 space-y-3">
            <a
              href="https://wa.me/919769156086"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: +91 97691 56086</span>
            </a>
            <div className="text-center text-[11px] text-white/50">
              418 Ahinsa Road, Khar West, Mumbai 400052
            </div>
          </div>
        </div>
      )}
    </>
  );
};
