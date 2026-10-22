import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Check, Send, Sparkles, ArrowRight } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [appliedRole, setAppliedRole] = useState('Venue Manager - Bandra West');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '2-4 Years',
    resumeLink: '',
    coverNote: '',
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
            Join Connekt Homes
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#14213D] tracking-tight">
            We’re hiring: <span className="italic font-normal">grow with us</span>
          </h1>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 mt-3 leading-relaxed">
            Help us redefine boutique hospitality in Mumbai. We look for passionate individuals who obsess over interior details, guest delight, and proactive hospitality.
          </p>
        </div>

        {/* Featured Open Position: Venue Manager */}
        <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#14213D]/12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#14213D]/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#D93A6B]/15 text-[#D93A6B] text-[10px] font-bold uppercase tracking-wider mb-2">
                Priority Opening
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                Venue Manager – Serviced Residences
              </h2>
              <div className="flex items-center gap-4 text-xs text-[#2B2F3A]/70 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B72]" /> Pali Hill & Bandra West, Mumbai
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B89B72]" /> Full-Time / On-Ground [EDIT]
                </span>
              </div>
            </div>

            <a
              href="#apply-form"
              className="px-6 py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] shadow transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Apply for this Role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-[#2B2F3A]/80 font-sans">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#14213D] mb-3">
                Key Responsibilities [EDIT]
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D93A6B] mt-2 shrink-0" />
                  <span>Oversee daily turnover operations and cleanliness audits across Bandra properties.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D93A6B] mt-2 shrink-0" />
                  <span>Coordinate digital check-ins, guest arrival hampers, and rapid WhatsApp inquiries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D93A6B] mt-2 shrink-0" />
                  <span>Manage third-party vendor maintenance, plumbing, electrical, and appliance servicing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D93A6B] mt-2 shrink-0" />
                  <span>Maintain linen stock inventories and conduct periodic property condition reports.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#14213D] mb-3">
                Candidate Profile & Qualifications [EDIT]
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72] mt-2 shrink-0" />
                  <span>2+ years experience in boutique hospitality, luxury retail, or serviced property operations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72] mt-2 shrink-0" />
                  <span>Impeccable communication skills (English & Hindi) with an empathetic hospitality instinct.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72] mt-2 shrink-0" />
                  <span>Located in Mumbai with reliable mobility across Bandra West enclaves.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B72] mt-2 shrink-0" />
                  <span>Ability to handle fast-paced guest requests with calm composure.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply-form" className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#14213D]/10 shadow-[0_20px_50px_rgba(20,33,61,0.06)] max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#9DB5A0]/20 text-[#9DB5A0] flex items-center justify-center mx-auto border-2 border-[#9DB5A0]">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#14213D]">
                Application Submitted
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2F3A]/75 max-w-md mx-auto leading-relaxed">
                Thank you for applying to Connekt Homes! Our talent team will review your application for {appliedRole} and reach out to schedule an interview.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 bg-[#14213D] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px]"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                  Career Application
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                  Apply for a Role
                </h2>
                <p className="text-xs text-[#2B2F3A]/70 mt-1">
                  Fill in your details below. We review all applications within 48 hours.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                  Position of Interest
                </label>
                <select
                  value={appliedRole}
                  onChange={(e) => setAppliedRole(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                >
                  <option>Venue Manager – Bandra West</option>
                  <option>Guest Concierge & Experience Lead</option>
                  <option>Housekeeping Team Lead</option>
                  <option>General / Spontaneous Application</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Full Name <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swastik Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Email Address <span className="text-[#D93A6B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Years of Hospitality / Ops Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none"
                  >
                    <option>0-1 Years (Entry Level)</option>
                    <option>2-4 Years</option>
                    <option>5+ Years (Senior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                  LinkedIn Profile or Resume Link
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                  Brief Introduction or Cover Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what excites you about Connekt Homes and how you approach hospitality."
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Job Application</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
