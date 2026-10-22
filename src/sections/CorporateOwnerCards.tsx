import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Briefcase, Building2, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export const CorporateOwnerCards: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <section className="py-20 sm:py-24 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Corporate & Extended Stays */}
          <div
            onClick={() => navigateTo('/corporate')}
            className="group relative bg-[#14213D] text-[#FAF6F0] rounded-[24px] p-8 sm:p-12 overflow-hidden border border-[#14213D] hover:border-[#D93A6B]/50 transition-all duration-300 shadow-[0_20px_60px_rgba(20,33,61,0.1)] flex flex-col justify-between cursor-pointer"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A8CB5]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-[12px] bg-white/10 flex items-center justify-center text-[#2A8CB5] mb-6">
                <Briefcase className="w-6 h-6" />
              </div>

              <div className="text-[11px] uppercase font-semibold tracking-[0.22em] text-[#B89B72] mb-2">
                Business & Relocation
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white mb-4">
                Corporate & Long-Term Stays
              </h3>

              <p className="text-sm text-[#FAF6F0]/75 leading-relaxed mb-6 font-sans">
                Preferential monthly pricing, GST tax compliant billing, 300 Mbps fiber workstations, and dedicated account concierges for traveling founders, executives, and relocating families.
              </p>

              <div className="space-y-2 text-xs text-[#FAF6F0]/80 mb-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#9DB5A0]" />
                  <span>Verified commercial GST tax invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9DB5A0]" />
                  <span>Flexible monthly contract extensions</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#F8E1E8] group-hover:text-white">
              <span>Explore Corporate Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#D93A6B]" />
            </div>
          </div>

          {/* Card 2: List Your Property (For Owners) */}
          <div
            onClick={() => navigateTo('/list')}
            className="group relative bg-[#EFE6DA] text-[#14213D] rounded-[24px] p-8 sm:p-12 overflow-hidden border border-[#14213D]/10 hover:border-[#D93A6B]/50 transition-all duration-300 shadow-[0_20px_60px_rgba(20,33,61,0.05)] flex flex-col justify-between cursor-pointer"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D93A6B]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-[12px] bg-white flex items-center justify-center text-[#D93A6B] mb-6 shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>

              <div className="text-[11px] uppercase font-semibold tracking-[0.22em] text-[#B89B72] mb-2">
                Property Management
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#14213D] mb-4">
                Let Your Home Earn with Connekt
              </h3>

              <p className="text-sm text-[#2B2F3A]/75 leading-relaxed mb-6 font-sans">
                Full-service boutique hospitality management for homeowners in Bandra and South Mumbai. We curate premium guests, handle daily housekeeping, maintenance, and optimize net yields.
              </p>

              <div className="space-y-2 text-xs text-[#2B2F3A]/80 mb-8">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#B89B72]" />
                  <span>Rigorous multi-layer guest vetting</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B89B72]" />
                  <span>Transparent owner portal & monthly revenue share</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#14213D]/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#14213D] group-hover:text-[#D93A6B]">
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#D93A6B]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
