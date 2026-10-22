import React from 'react';
import { useBooking } from '../context/BookingContext';
import { BrandLogo } from './BrandLogo';
import { Instagram, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <footer className="bg-[#14213D] text-[#FAF6F0] pt-16 pb-12 border-t border-[#FAF6F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF6F0]/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="font-serif italic text-lg text-[#F8E1E8]/90 max-w-sm pt-2">
              “Homes with a soul. Short-term stays for the global traveller.”
            </p>
            <p className="text-sm text-[#FAF6F0]/70 max-w-sm leading-relaxed">
              Curated serviced residences in Mumbai’s most beloved neighborhoods. Hotel-grade care with the warmth and privacy of your own home.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.instagram.com/connekt_homes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[#FAF6F0]/10 hover:bg-[#D93A6B] text-xs font-medium text-[#FAF6F0] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@connekt_homes</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <span className="text-xs text-[#FAF6F0]/40">Mumbai · Bandra</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/80">
              <li>
                <button
                  onClick={() => navigateTo('/stays')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  All Serviced Stays
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/experiences')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  Neighbourhood Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/corporate')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  Corporate & Long Stays
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/list')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  List Your Property
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  Our Story & Values
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Opportunities */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
              Company
            </p>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/80">
              <li>
                <button
                  onClick={() => navigateTo('/careers')}
                  className="hover:text-[#D93A6B] transition-colors inline-flex items-center gap-1.5 text-left"
                >
                  <span>We’re Hiring</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#D93A6B] text-white rounded">
                    HOT
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/policies')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  House Rules & Policies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/policies')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  Cancellation Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/policies')}
                  className="hover:text-[#D93A6B] transition-colors text-left"
                >
                  Privacy & Data
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
              Office & Reception
            </p>
            <div className="space-y-2.5 text-sm text-[#FAF6F0]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
                <span>418 Ahinsa Road, Khar West, Mumbai 400052, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B89B72] shrink-0" />
                <a
                  href="https://wa.me/919769156086"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D93A6B] transition-colors"
                >
                  WhatsApp: +91 97691 56086
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B89B72] shrink-0" />
                <a
                  href="mailto:info@connekthomes.in"
                  className="hover:text-[#D93A6B] transition-colors"
                >
                  info@connekthomes.in
                </a>
              </div>
              <div className="pt-2">
                <div className="text-xs text-[#FAF6F0]/50">
                  Concierge hours: 24/7 on WhatsApp & Phone
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/50">
          <div>
            © {new Date().getFullYear()} Connekt Homes Hospitality LLP. All rights reserved. [EDIT: GST Registration Number]
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#9DB5A0]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Serviced Residences</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#F8E1E8]/70">
              <Heart className="w-3 h-3 text-[#D93A6B] fill-[#D93A6B]" />
              <span>Crafted in Bandra</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
