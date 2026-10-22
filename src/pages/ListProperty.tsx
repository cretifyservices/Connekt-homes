import React, { useState } from 'react';
import { formatINR } from '../context/BookingContext';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  KeyRound,
  Check,
  Sparkles,
  Calculator,
  ArrowRight,
  Send,
} from 'lucide-react';

export const ListPropertyPage: React.FC = () => {
  // Earnings Slider state
  const [apartmentType, setApartmentType] = useState<'1 BHK' | '2 BHK' | '3 BHK'>('2 BHK');
  const [occupancyRate, setOccupancyRate] = useState<number>(75);

  // Illustrative calculation
  const baseRate = apartmentType === '1 BHK' ? 7000 : apartmentType === '2 BHK' ? 10000 : 16000;
  const daysInMonth = 30;
  const bookedNights = Math.round((daysInMonth * occupancyRate) / 100);
  const grossMonthlyRevenue = bookedNights * baseRate;
  const estimatedOwnerShare = Math.round(grossMonthlyRevenue * 0.75); // 75% owner net yield after full management

  const [submitted, setSubmitted] = useState(false);
  const [ownerForm, setOwnerForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyArea: 'Pali Hill',
    bedrooms: '2 BHK',
    propertyDetails: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            For Property Owners
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#14213D] tracking-tight">
            Let your home earn with <span className="italic font-normal">Connekt</span>
          </h1>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 mt-3 leading-relaxed">
            We partner with discerning apartment owners in Bandra, Pali Hill, and South Mumbai. Enjoy 2-3x traditional residential rental yields with zero day-to-day tenant hassles.
          </p>
        </div>

        {/* 3-Step Process */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
              The Onboarding Journey
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] mt-1">
              How we partner with you in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs relative">
              <span className="text-4xl font-serif text-[#B89B72]/40 font-bold block mb-4">
                01
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
                Curation & Styling Audit
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
                Our interior team conducts an on-site walkthrough, assists with furnishing styling, linen procurement, and professional architectural photography.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs relative">
              <span className="text-4xl font-serif text-[#B89B72]/40 font-bold block mb-4">
                02
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
                Multi-Channel Staging & Vetting
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
                We list your home across Connekt’s private guest network, international corporate accounts, and premium channels with strict multi-step guest background checks.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs relative">
              <span className="text-4xl font-serif text-[#B89B72]/40 font-bold block mb-4">
                03
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
                Hands-Off Yields & Care
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
                Our staff handles daily housekeeping, maintenance, and 24/7 guest concierges. You receive direct monthly bank payouts and full dashboard reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Earnings Calculator Slider */}
        <div className="bg-[#14213D] text-[#FAF6F0] rounded-[24px] p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72]">
                <Calculator className="w-4 h-4 text-[#D93A6B]" />
                <span>Yield Simulator</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
                Estimate your monthly earnings
              </h2>

              <p className="text-xs sm:text-sm text-[#FAF6F0]/70 max-w-lg leading-relaxed">
                Adjust apartment layout and projected occupancy to estimate potential net returns compared to standard locked lease agreements.
              </p>

              {/* Layout Switcher */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B89B72] block mb-2">
                  Apartment Configuration
                </label>
                <div className="flex gap-2">
                  {(['1 BHK', '2 BHK', '3 BHK'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setApartmentType(t)}
                      className={`px-4 py-2 rounded-[10px] text-xs font-semibold transition-all cursor-pointer ${
                        apartmentType === t
                          ? 'bg-[#D93A6B] text-white shadow-xs'
                          : 'bg-white/10 text-white hover:bg-white/15'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupancy Slider */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#FAF6F0]/80">Estimated Monthly Occupancy</span>
                  <span className="font-mono text-[#D93A6B] font-bold">{occupancyRate}% (~{bookedNights} nights/mo)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(Number(e.target.value))}
                  className="w-full accent-[#D93A6B] cursor-pointer"
                />
              </div>

              <div className="text-[11px] text-[#FAF6F0]/50 italic">
                * Note: Illustrative estimate only based on historical Bandra seasonal averages [EDIT]. Actual earnings vary by furnishing quality and season.
              </div>
            </div>

            {/* Simulated Payout Metric Box */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[20px] p-8 text-center space-y-4">
              <span className="text-xs uppercase font-semibold text-[#B89B72] tracking-[0.2em] block">
                Estimated Net Owner Monthly Yield
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {formatINR(estimatedOwnerShare)}
              </div>
              <p className="text-xs text-[#FAF6F0]/70">
                Projected annual return: ~{formatINR(estimatedOwnerShare * 12)}
              </p>
              <div className="pt-4 border-t border-white/10 text-[11px] text-[#9DB5A0] flex items-center justify-center gap-1.5 font-medium">
                <Check className="w-4 h-4" />
                <span>Zero management headaches · Paid on the 5th of each month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Enquiry Form */}
        <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#14213D]/10 shadow-[0_20px_50px_rgba(20,33,61,0.06)] max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#9DB5A0]/20 text-[#9DB5A0] flex items-center justify-center mx-auto border-2 border-[#9DB5A0]">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#14213D]">
                Thank you for your interest!
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/75 max-w-md mx-auto leading-relaxed">
                Our property partnership team will review your apartment details and contact {ownerForm.name || 'you'} within 24 hours to schedule an introductory walkthrough.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 bg-[#14213D] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px]"
              >
                Submit Another Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                  Owner Consultation
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                  List Your Property with Connekt
                </h2>
                <p className="text-xs text-[#2B2F3A]/70 mt-1">
                  Tell us about your home in Mumbai. We respond with a complimentary valuation and hospitality yield model.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Your Name <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swastik Sharma"
                    value={ownerForm.name}
                    onChange={(e) => setOwnerForm({ ...ownerForm, name: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Phone / WhatsApp <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={ownerForm.phone}
                    onChange={(e) => setOwnerForm({ ...ownerForm, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Email Address <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={ownerForm.email}
                    onChange={(e) => setOwnerForm({ ...ownerForm, email: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Location in Mumbai
                  </label>
                  <select
                    value={ownerForm.propertyArea}
                    onChange={(e) => setOwnerForm({ ...ownerForm, propertyArea: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                  >
                    <option>Pali Hill</option>
                    <option>Pali Village</option>
                    <option>Carter Road</option>
                    <option>Ranwar / Chapel Road</option>
                    <option>Bandra West (Other)</option>
                    <option>Khar West</option>
                    <option>South Mumbai / Colaba</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Apartment Type
                  </label>
                  <select
                    value={ownerForm.bedrooms}
                    onChange={(e) => setOwnerForm({ ...ownerForm, bedrooms: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                  >
                    <option>Studio</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>Penthouse / Villa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                  About the Property (Furnishing condition, parking, balcony, etc.)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Recently renovated, fully furnished with imported appliances, 2nd floor with balcony overlooking greenery."
                  value={ownerForm.propertyDetails}
                  onChange={(e) => setOwnerForm({ ...ownerForm, propertyDetails: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Property for Review</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
