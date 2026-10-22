import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

interface BookStayModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedLocation?: string;
}

export const BookStayModal: React.FC<BookStayModalProps> = ({
  isOpen,
  onClose,
  preselectedLocation = '',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(preselectedLocation);
  const [numberOfDays, setNumberOfDays] = useState<number>(3);
  const [checkInDate, setCheckInDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    if (!fullName.trim()) {
      setErrors({ fullName: 'Please enter your full name' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    if (!phone.trim() || phone.trim().length < 8) {
      setErrors({ phone: 'Please provide a valid contact number' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!location.trim()) {
      errs.location = 'Please type your desired location or neighbourhood';
    }
    if (!numberOfDays || numberOfDays < 1) {
      errs.numberOfDays = 'Please enter at least 1 day';
    }
    if (!checkInDate) {
      errs.checkInDate = 'Please select a check-in date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const resetAndClose = () => {
    setStep(1);
    setErrors({});
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Connekt Homes! My name is ${fullName}. I would like to book a stay.\n\n📍 Location: ${location}\n📅 Check-in Date: ${checkInDate}\n⏳ Duration: ${numberOfDays} days\n📞 Contact: ${phone}${
      email ? `\n✉️ Email: ${email}` : ''
    }`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim Backdrop */}
      <div
        className="fixed inset-0 bg-[#14213D]/70 backdrop-blur-sm transition-opacity"
        onClick={resetAndClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#FAF6F0] rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[#14213D]/15 overflow-hidden flex flex-col">
        {/* Header with Step Progress Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#14213D]/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D93A6B]" />
              <span className="font-sans font-bold tracking-[0.2em] text-xs uppercase text-[#14213D]">
                CONNEKT HOMES
              </span>
            </div>
            <button
              onClick={resetAndClose}
              className="p-1.5 rounded-full hover:bg-[#FAF6F0] text-[#14213D] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step < 4 ? (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#B89B72] uppercase tracking-wider mb-2">
                <span>Step {step} of 3</span>
                <span>
                  {step === 1 && 'Your Name'}
                  {step === 2 && 'Contact Details'}
                  {step === 3 && 'Stay & Location'}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D93A6B] transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-xs font-semibold text-[#9DB5A0] uppercase tracking-wider flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-[#9DB5A0]" />
              <span>Request Confirmed</span>
            </div>
          )}
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: GUEST NAME */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] tracking-tight">
                  What is your name?
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-1">
                  We personalize each residence and welcome experience for you.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2">
                  Full Name <span className="text-[#D93A6B]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({});
                    }}
                    placeholder="e.g. Rahul Sharma"
                    autoFocus
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-[14px] border border-[#14213D]/15 text-sm font-medium text-[#14213D] placeholder-[#2B2F3A]/40 focus:outline-none focus:border-[#D93A6B] focus:ring-2 focus:ring-[#D93A6B]/20 transition-all shadow-xs"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.fullName}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT & EMAIL */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] tracking-tight">
                  How can our concierge reach you?
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-1">
                  We send instant availability, pricing, and self check-in details directly.
                </p>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2">
                  Contact Number / WhatsApp <span className="text-[#D93A6B]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({});
                    }}
                    placeholder="+91 98XXX XXXXX"
                    autoFocus
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-[14px] border border-[#14213D]/15 text-sm font-medium text-[#14213D] placeholder-[#2B2F3A]/40 focus:outline-none focus:border-[#D93A6B] focus:ring-2 focus:ring-[#D93A6B]/20 transition-all shadow-xs"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D]">
                    Email Address
                  </label>
                  <span className="text-[11px] text-[#2B2F3A]/50 italic">Optional</span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-[14px] border border-[#14213D]/15 text-sm font-medium text-[#14213D] placeholder-[#2B2F3A]/40 focus:outline-none focus:border-[#D93A6B] focus:ring-2 focus:ring-[#D93A6B]/20 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION (FREE-TEXT INPUT), NO OF DAYS, CHECK-IN DATE */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D] tracking-tight">
                  Where & when do you wish to stay?
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-1">
                  Type your preferred Mumbai location, stay duration, and check-in date.
                </p>
              </div>

              {/* Location to Stay (User Free-Text Input, NO restricted list) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2">
                  Location to Stay <span className="text-[#D93A6B]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D93A6B]" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (errors.location) setErrors({ ...errors, location: '' });
                    }}
                    placeholder="e.g. Bandra West, Pali Hill, BKC, Near Sea..."
                    autoFocus
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-[14px] border border-[#14213D]/15 text-sm font-medium text-[#14213D] placeholder-[#2B2F3A]/40 focus:outline-none focus:border-[#D93A6B] focus:ring-2 focus:ring-[#D93A6B]/20 transition-all shadow-xs"
                  />
                </div>
                {errors.location && (
                  <p className="text-xs text-rose-600 mt-1.5 font-medium">{errors.location}</p>
                )}
                <span className="text-[11px] text-[#2B2F3A]/60 mt-1 block">
                  You can specify any area in Mumbai or specific requirements (e.g. near BKC, Carter Road, etc.)
                </span>
              </div>

              {/* Same Screen: No of Days & Check-in Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* No of days */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2">
                    Number of Days <span className="text-[#D93A6B]">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                    <input
                      type="number"
                      min={1}
                      max={180}
                      value={numberOfDays}
                      onChange={(e) => setNumberOfDays(Number(e.target.value))}
                      className="w-full pl-11 pr-4 py-3.5 bg-white rounded-[14px] border border-[#14213D]/15 text-sm font-medium text-[#14213D] focus:outline-none focus:border-[#D93A6B] focus:ring-2 focus:ring-[#D93A6B]/20 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14213D] mb-2">
                    Check-in Date <span className="text-[#D93A6B]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A8CB5]" />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white rounded-[14px] border border-[#14213D]/15 text-sm font-medium text-[#14213D] focus:outline-none focus:border-[#D93A6B] focus:ring-2 focus:ring-[#D93A6B]/20 transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200 py-2">
              <div className="w-16 h-16 rounded-full bg-[#9DB5A0]/20 text-[#2E5A44] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#2E5A44]" />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                  Thank you, {fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2F3A]/75 mt-2 max-w-sm mx-auto leading-relaxed">
                  Your booking request has been submitted to the Connekt concierge team. We are checking availability for <strong>{location}</strong>.
                </p>
              </div>

              {/* Request Summary Card */}
              <div className="bg-white rounded-[18px] p-4 border border-[#14213D]/10 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#14213D]/5">
                  <span className="text-[#2B2F3A]/60">Location:</span>
                  <span className="font-semibold text-[#14213D]">{location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#14213D]/5">
                  <span className="text-[#2B2F3A]/60">Check-in:</span>
                  <span className="font-semibold text-[#14213D]">{checkInDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#14213D]/5">
                  <span className="text-[#2B2F3A]/60">Duration:</span>
                  <span className="font-semibold text-[#14213D]">{numberOfDays} Nights</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#2B2F3A]/60">Contact:</span>
                  <span className="font-semibold text-[#14213D]">{phone}</span>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/919769156086?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Request Instantly on WhatsApp</span>
                </a>
                <p className="text-[11px] text-[#2B2F3A]/60">
                  Concierge responds within 5 minutes on WhatsApp (+91 97691 56086)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#14213D]/10 flex items-center justify-between gap-3">
          {step > 1 && step < 4 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-full border border-[#14213D]/20 hover:bg-[#FAF6F0] text-[#14213D] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-sm transition-all flex items-center gap-2 ml-auto cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-sm transition-all flex items-center gap-2 ml-auto cursor-pointer"
            >
              <span>Submit Request</span>
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-colors cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
