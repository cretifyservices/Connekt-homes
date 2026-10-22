import React, { useState } from 'react';
import { useBooking, formatINR, EXTRA_PRICES } from '../context/BookingContext';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  Calendar,
  Users,
  Tag,
  CreditCard,
  QrCode,
  Building,
  Sparkles,
  Car,
  Clock,
  ShoppingBag,
  Info,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    allStays,
    bookingDetails,
    updateBookingDetails,
    updateGuestInfo,
    toggleExtra,
    applyPromoCode,
    calculatePricing,
    confirmBooking,
    navigateTo,
  } = useBooking();

  const stay = allStays.find((s) => s.id === bookingDetails.stayId) || allStays[0];
  const pricing = calculatePricing(stay, bookingDetails);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [promoInput, setPromoInput] = useState(bookingDetails.promoCode || '');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(
    bookingDetails.promoCode ? { success: true, text: 'CONNEKT15 applied: 15% discount' } : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Validation for Step 1
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!bookingDetails.guestInfo.fullName.trim()) errs.fullName = 'Full legal name is required';
    if (!bookingDetails.guestInfo.email.trim() || !bookingDetails.guestInfo.email.includes('@')) {
      errs.email = 'Valid email address is required for booking confirmation';
    }
    if (!bookingDetails.guestInfo.phone.trim() || bookingDetails.guestInfo.phone.length < 8) {
      errs.phone = 'Valid phone / WhatsApp number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep1 = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePromoApply = () => {
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ success: res.success, text: res.message });
  };

  const handleFinalBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const bookingId = confirmBooking();
      setIsSubmitting(false);
      navigateTo('/confirmed');
    }, 1200);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Line Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-semibold text-[#14213D] mb-3">
            <span className={step >= 1 ? 'text-[#D93A6B]' : 'text-[#2B2F3A]/40'}>
              01. Guest Information
            </span>
            <span className={step >= 2 ? 'text-[#D93A6B]' : 'text-[#2B2F3A]/40'}>
              02. Extras & Promo
            </span>
            <span className={step >= 3 ? 'text-[#D93A6B]' : 'text-[#2B2F3A]/40'}>
              03. Payment Confirmation
            </span>
          </div>

          <div className="h-1.5 w-full bg-[#EFE6DA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D93A6B] transition-all duration-500 ease-out"
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            />
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Flow Steps */}
          <div className="lg:col-span-7 bg-white rounded-[24px] p-6 sm:p-10 border border-[#14213D]/10 shadow-[0_20px_50px_rgba(20,33,61,0.06)]">
            {/* STEP 1: GUEST DETAILS */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                    Step 1 of 3
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                    Primary Guest Information
                  </h2>
                  <p className="text-xs text-[#2B2F3A]/70 mt-1">
                    Please provide your contact details for digital key issuance and arrival instructions.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                      Full Legal Name <span className="text-[#D93A6B]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Swastik Sharma"
                      value={bookingDetails.guestInfo.fullName}
                      onChange={(e) => updateGuestInfo({ fullName: e.target.value })}
                      className={`w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border focus:outline-none ${
                        errors.fullName ? 'border-red-500' : 'border-[#14213D]/15 focus:border-[#D93A6B]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                        Email Address <span className="text-[#D93A6B]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={bookingDetails.guestInfo.email}
                        onChange={(e) => updateGuestInfo({ email: e.target.value })}
                        className={`w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border focus:outline-none ${
                          errors.email ? 'border-red-500' : 'border-[#14213D]/15 focus:border-[#D93A6B]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                        Phone / WhatsApp <span className="text-[#D93A6B]">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={bookingDetails.guestInfo.phone}
                        onChange={(e) => updateGuestInfo({ phone: e.target.value })}
                        className={`w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border focus:outline-none ${
                          errors.phone ? 'border-red-500' : 'border-[#14213D]/15 focus:border-[#D93A6B]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. India"
                        value={bookingDetails.guestInfo.country}
                        onChange={(e) => updateGuestInfo({ country: e.target.value })}
                        className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                        Registered Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={stay.guests}
                        value={bookingDetails.guests}
                        onChange={(e) =>
                          updateBookingDetails({ guests: Math.max(1, Number(e.target.value)) })
                        }
                        className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                      Special Requests & Arrival Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Quiet floor preferred, extra linen, or late night arrival time"
                      value={bookingDetails.guestInfo.specialRequests}
                      onChange={(e) => updateGuestInfo({ specialRequests: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                    />
                  </div>

                  {/* ID Verification Mock Upload */}
                  <div className="p-4 rounded-[14px] bg-[#EFE6DA]/40 border border-[#14213D]/10">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#FAF6F0] flex items-center justify-center shrink-0 mt-0.5">
                        <Upload className="w-4 h-4 text-[#B89B72]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-[#14213D]">
                          Government ID Verification [EDIT]
                        </div>
                        <p className="text-[11px] text-[#2B2F3A]/70 mt-0.5">
                          In compliance with local regulations, please upload a photo of your Passport or Aadhaar card now or upon arrival.
                        </p>
                        <div className="mt-2.5 flex items-center gap-3">
                          <label className="px-3 py-1.5 bg-white text-[#14213D] hover:bg-[#FAF6F0] border border-[#14213D]/20 rounded-[8px] text-[11px] font-semibold cursor-pointer shadow-xs inline-flex items-center gap-1.5">
                            <input
                              type="file"
                              className="hidden"
                              onChange={() => updateGuestInfo({ idUploaded: true })}
                            />
                            <span>{bookingDetails.guestInfo.idUploaded ? 'ID File Attached' : 'Attach ID Document'}</span>
                          </label>
                          {bookingDetails.guestInfo.idUploaded && (
                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Ready for verification
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#14213D]/10 flex justify-end">
                  <button
                    onClick={handleNextStep1}
                    className="px-6 py-3.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] shadow transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Extras & Promo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: EXTRAS & PROMO CODE */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                    Step 2 of 3
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                    Customise Your Stay
                  </h2>
                  <p className="text-xs text-[#2B2F3A]/70 mt-1">
                    Select optional concierge additions to tailor your Bandra experience.
                  </p>
                </div>

                {/* Extras Selection List */}
                <div className="space-y-3 pt-2">
                  {[
                    {
                      key: 'earlyCheckIn' as const,
                      title: 'Guaranteed Early Check-in (from 11:00 AM)',
                      price: EXTRA_PRICES.earlyCheckIn,
                      desc: 'Arrive early and settle in comfortably without waiting until standard 3:00 PM.',
                      icon: Clock,
                    },
                    {
                      key: 'lateCheckOut' as const,
                      title: 'Extended Late Check-out (up to 3:00 PM)',
                      price: EXTRA_PRICES.lateCheckOut,
                      desc: 'Enjoy a leisurely final morning and pack at your own gentle pace.',
                      icon: Clock,
                    },
                    {
                      key: 'airportPickup' as const,
                      title: 'Chauffeur Airport Transfer (BOM Airport)',
                      price: EXTRA_PRICES.airportPickup,
                      desc: 'Executive air-conditioned sedan from Mumbai International Airport direct to your apartment.',
                      icon: Car,
                    },
                    {
                      key: 'groceryPack' as const,
                      title: 'Artisanal Welcome Pantry Hamper',
                      price: EXTRA_PRICES.groceryPack,
                      desc: 'Fresh sourdough, local butter, organic eggs, cold-pressed juice & seasonal fruits.',
                      icon: ShoppingBag,
                    },
                    {
                      key: 'extraCleaning' as const,
                      title: 'Deep Mid-Stay Linen & Towel Refresh',
                      price: EXTRA_PRICES.extraCleaning,
                      desc: 'Complete mid-stay wash and pressing of all Belgian bed linens and towels.',
                      icon: Sparkles,
                    },
                  ].map((extra) => {
                    const Icon = extra.icon;
                    const isSelected = bookingDetails.extras[extra.key];
                    return (
                      <div
                        key={extra.key}
                        onClick={() => toggleExtra(extra.key)}
                        className={`p-4 rounded-[14px] border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#F8E1E8]/40 border-[#D93A6B]'
                            : 'bg-[#FAF6F0] border-[#14213D]/10 hover:border-[#14213D]/25'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#D93A6B] text-white' : 'bg-white text-[#14213D]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-[#14213D]">
                              {extra.title}
                            </div>
                            <p className="text-[11px] text-[#2B2F3A]/70 mt-0.5 leading-relaxed">
                              {extra.desc}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold text-[#14213D]">
                            +{formatINR(extra.price)}
                          </div>
                          <div className="mt-1">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-[#D93A6B] text-white'
                                  : 'bg-white text-[#2B2F3A]/60 border border-[#14213D]/10'
                              }`}
                            >
                              {isSelected ? 'Added' : 'Add'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Box */}
                <div className="pt-4 border-t border-[#14213D]/10">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#B89B72] mb-1.5">
                    Have a promo or corporate code?
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Try: CONNEKT15"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="w-full text-xs font-mono uppercase bg-[#FAF6F0] p-3 pl-8 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                      />
                      <Tag className="w-3.5 h-3.5 text-[#D93A6B] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="button"
                      onClick={handlePromoApply}
                      className="px-4 py-3 bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {promoMessage && (
                    <p
                      className={`text-xs mt-2 font-medium ${
                        promoMessage.success ? 'text-emerald-700' : 'text-red-500'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="pt-6 border-t border-[#14213D]/10 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-3 border border-[#14213D]/20 text-xs font-semibold text-[#14213D] rounded-[10px] hover:bg-[#FAF6F0] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => {
                      setStep(3);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] shadow transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD (DEMO UI) */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                    Step 3 of 3
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                    Payment & Final Guarantee
                  </h2>
                  <p className="text-xs text-[#2B2F3A]/70 mt-1">
                    Secure simulated checkout. No real financial transaction will occur.
                  </p>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-3 pt-2">
                  {[
                    {
                      id: 'upi' as const,
                      title: 'Instant UPI (Google Pay, PhonePe, Paytm, BHIM)',
                      desc: 'Scan QR code or approve instant collect request on your mobile device.',
                      icon: QrCode,
                    },
                    {
                      id: 'card' as const,
                      title: 'Credit / Debit Card (Visa, Mastercard, Amex, RuPay)',
                      desc: 'Encrypted tokenisation with international zero-markup card processing.',
                      icon: CreditCard,
                    },
                    {
                      id: 'split' as const,
                      title: 'Pay 30% Now, Balance at Check-in',
                      desc: `Pay ${formatINR(Math.round(pricing.grandTotal * 0.3))} now to confirm booking; remaining balance cleared upon arrival.`,
                      icon: Building,
                    },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = bookingDetails.paymentMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => updateBookingDetails({ paymentMethod: method.id })}
                        className={`p-4 rounded-[14px] border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#F8E1E8]/40 border-[#D93A6B]'
                            : 'bg-[#FAF6F0] border-[#14213D]/10 hover:border-[#14213D]/25'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={isSelected}
                          onChange={() => updateBookingDetails({ paymentMethod: method.id })}
                          className="mt-1 text-[#D93A6B] focus:ring-[#D93A6B]"
                        />
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm font-semibold text-[#14213D] flex items-center gap-2">
                            <Icon className="w-4 h-4 text-[#B89B72]" />
                            <span>{method.title}</span>
                          </div>
                          <p className="text-[11px] text-[#2B2F3A]/70 mt-0.5 leading-relaxed">
                            {method.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Payment Details Form */}
                <div className="p-4 rounded-[14px] bg-[#FAF6F0] border border-[#14213D]/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14213D]">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted Hospitality Checkout</span>
                  </div>
                  <p className="text-[11px] text-[#2B2F3A]/70">
                    By confirming this reservation, you acknowledge Connekt Homes' house rules, non-smoking policy, and check-in ID requirements [EDIT].
                  </p>
                </div>

                {/* Confirm Action */}
                <div className="pt-6 border-t border-[#14213D]/10 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    disabled={isSubmitting}
                    className="px-5 py-3 border border-[#14213D]/20 text-xs font-semibold text-[#14213D] rounded-[10px] hover:bg-[#FAF6F0] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleFinalBooking}
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-[#D93A6B] hover:bg-[#c42f5d] disabled:bg-[#D93A6B]/50 text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Securing Your Stay...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm Booking ({formatINR(pricing.grandTotal)})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Booking Summary */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#14213D]/12 shadow-[0_25px_60px_rgba(20,33,61,0.08)] space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-[#14213D]/10">
                <img
                  src={stay.images[0]}
                  alt={stay.name}
                  className="w-24 h-24 rounded-[12px] object-cover shrink-0"
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                    {stay.area} · {stay.type}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#14213D] line-clamp-1 mt-0.5">
                    {stay.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#2B2F3A]/70 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D93A6B]" />
                    <span>
                      {bookingDetails.checkInDate} to {bookingDetails.checkOutDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#2B2F3A]/70 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-[#D93A6B]" />
                    <span>
                      {bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'} · {bookingDetails.nights} nights
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-[#2B2F3A]/80">
                <div className="flex justify-between">
                  <span>
                    Accommodation ({bookingDetails.nights} nights)
                  </span>
                  <span className="font-semibold text-[#14213D]">
                    {formatINR(pricing.accommodationTotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Housekeeping & Preparation</span>
                  <span className="font-semibold text-[#14213D]">
                    {formatINR(pricing.cleaningFee)}
                  </span>
                </div>

                {pricing.extrasTotal > 0 && (
                  <div className="flex justify-between text-[#2A8CB5]">
                    <span>Selected Concierge Extras</span>
                    <span className="font-semibold">+{formatINR(pricing.extrasTotal)}</span>
                  </div>
                )}

                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-[#D93A6B] font-semibold">
                    <span>Direct Promo Discount (15%)</span>
                    <span>- {formatINR(pricing.discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#2B2F3A]/60">
                  <span>Hospitality GST (18%)</span>
                  <span>{formatINR(pricing.gstAmount)}</span>
                </div>

                <div className="pt-3 border-t border-[#14213D]/10 flex justify-between text-base font-bold text-[#14213D]">
                  <span>Total Amount</span>
                  <span className="font-sans text-lg text-[#D93A6B]">
                    {formatINR(pricing.grandTotal)}
                  </span>
                </div>
              </div>

              {/* Cancellation Guarantee */}
              <div className="p-3.5 rounded-[12px] bg-[#EFE6DA]/40 border border-[#14213D]/10 text-[11px] text-[#2B2F3A]/75 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#B89B72] shrink-0 mt-0.5" />
                <span>
                  <strong>Free Cancellation:</strong> Receive 100% refund up to 48 hours before check-in.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
