import React, { useState } from 'react';
import {
  Briefcase,
  Wifi,
  Receipt,
  Calendar,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Send,
} from 'lucide-react';

export const CorporatePage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    teamSize: '1-2 People',
    duration: '1-3 Months',
    startDate: '',
    specialRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            Executive Living
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#14213D] tracking-tight">
            Corporate & Extended Stays in <span className="italic font-normal">Bandra</span>
          </h1>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 mt-3 leading-relaxed">
            Eliminate hotel fatigue for visiting founders, consultants, and relocated executive teams. Fully serviced residential apartments designed for deep focus and restorative downtime.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs">
            <div className="w-12 h-12 rounded-[12px] bg-[#EFE6DA] flex items-center justify-center text-[#2A8CB5] mb-5">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
              High-Speed Fiber & Power Backup
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
              300 Mbps unthrottled fiber network, dedicated ergonomic workstations, and silent inverter generator failover ensuring 100% uptime on video conferences.
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs">
            <div className="w-12 h-12 rounded-[12px] bg-[#EFE6DA] flex items-center justify-center text-[#B89B72] mb-5">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
              Corporate GST Invoicing
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
              Consolidated corporate monthly billing with compliant GST tax input credits, formal rental receipts, and hassle-free accounts payable processing.
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs">
            <div className="w-12 h-12 rounded-[12px] bg-[#F8E1E8] flex items-center justify-center text-[#D93A6B] mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-2">
              Preferential Monthly Pricing
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
              Substantial tiered tariff discounts for 14+ night bookings, flexible rolling extensions, and no lock-in lease headaches.
            </p>
          </div>
        </div>

        {/* Corporate Enquiry Form */}
        <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#14213D]/10 shadow-[0_20px_50px_rgba(20,33,61,0.06)] max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#9DB5A0]/20 text-[#9DB5A0] flex items-center justify-center mx-auto border-2 border-[#9DB5A0]">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#14213D]">
                Corporate Request Received
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/75 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Our Corporate Accounts Director will contact {formData.contactPerson || 'you'} within 4 business hours with customized rates and availability.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 bg-[#14213D] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                  Custom Quotation
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                  Request an Executive Proposal
                </h2>
                <p className="text-xs text-[#2B2F3A]/70 mt-1">
                  Provide your requirements below and our corporate desk will arrange property previews and corporate tariff sheets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Company Name <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. McKinsey & Co / Sequoia / Stripe"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Contact Person Name <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swastik Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Work Email <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Estimated Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                  >
                    <option>1 Individual (Executive Suite)</option>
                    <option>2-4 People (Multiple 1-2 BHKs)</option>
                    <option>5-10 People (Full Floor / Cluster)</option>
                    <option>10+ People (Custom Corporate Program)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Anticipated Stay Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                  >
                    <option>2 to 4 Weeks</option>
                    <option>1 to 3 Months</option>
                    <option>3 to 6 Months</option>
                    <option>Annual Retainer / Flexible Rotation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Approximate Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                  Specific Requirements or Preferred Neighborhood
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Proximity to BKC, dual monitors needed, private parking requirement"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Corporate Proposal Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
