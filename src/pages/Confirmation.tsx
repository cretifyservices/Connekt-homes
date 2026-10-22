import React from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import {
  CheckCircle2,
  Calendar,
  Share2,
  Download,
  MapPin,
  Clock,
  KeyRound,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const { lastConfirmedBooking, navigateTo } = useBooking();

  // If directly navigated without booking, show fallback demo details
  const booking = lastConfirmedBooking;
  const bookingId = booking?.details?.bookingId || 'CNK-829143';
  const stayName = booking?.stay?.name || 'The Arched Haven at Pali Hill';
  const area = booking?.stay?.area || 'Pali Hill, Bandra West';
  const checkIn = booking?.details?.checkInDate || '2026-10-18';
  const checkOut = booking?.details?.checkOutDate || '2026-10-21';
  const guests = booking?.details?.guests || 2;
  const total = booking?.pricing?.grandTotal || 34692;
  const guestName = booking?.details?.guestInfo?.fullName || 'Esteemed Guest';

  const handleShareWhatsApp = () => {
    const text = `I've confirmed my stay with Connekt Homes! Booking ID: ${bookingId} at ${stayName} (${area}) from ${checkIn} to ${checkOut}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAddToCalendar = () => {
    // Generate basic iCal download
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Connekt Homes//EN
BEGIN:VEVENT
SUMMARY:Stay at Connekt Homes (${stayName})
DESCRIPTION:Booking ID: ${bookingId}\\nAddress: ${area}, Mumbai\\nConcierge: +91 98XXX XXXXX
DTSTART:${checkIn.replace(/-/g, '')}T150000
DTEND:${checkOut.replace(/-/g, '')}T110000
LOCATION:${area}, Mumbai
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Connekt-Stay-${bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-98 duration-500">
        {/* Success Header with Animated Check */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#9DB5A0]/20 text-[#9DB5A0] flex items-center justify-center mx-auto border-2 border-[#9DB5A0]">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B89B72]">
            Reservation Confirmed
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
            We look forward to hosting you, <br className="hidden sm:inline" />
            <span className="italic font-normal">{guestName}</span>.
          </h1>

          <p className="text-sm text-[#2B2F3A]/70 max-w-lg mx-auto leading-relaxed">
            Your booking confirmation and check-in instructions have been dispatched. Your keyless entry code will activate at check-in time.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-[12px] border border-[#14213D]/10 shadow-xs font-mono text-sm text-[#14213D]">
            <span className="text-[#2B2F3A]/60">Booking Reference:</span>
            <span className="font-bold text-[#D93A6B]">{bookingId}</span>
          </div>
        </div>

        {/* Action Buttons: Add to Calendar & Share WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToCalendar}
            className="px-5 py-2.5 bg-white hover:bg-[#FAF6F0] border border-[#14213D]/15 text-xs font-semibold rounded-[10px] shadow-xs text-[#14213D] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#B89B72]" />
            <span>Add to Calendar (.ics)</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-[10px] shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#14213D]/10 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-medium text-[#14213D] pb-3 border-b border-[#14213D]/10">
            Stay Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B89B72] block mb-1">
                Serviced Residence
              </span>
              <div className="font-serif text-base font-semibold text-[#14213D]">
                {stayName}
              </div>
              <div className="text-xs text-[#2B2F3A]/70 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D93A6B]" />
                <span>{area}, Mumbai</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B89B72] block mb-1">
                Schedule & Guests
              </span>
              <div className="font-semibold text-[#14213D]">
                {checkIn} to {checkOut}
              </div>
              <div className="text-xs text-[#2B2F3A]/70 mt-0.5">
                {guests} Guests · Self Check-in from 3:00 PM
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#14213D]/10 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[#2B2F3A]/70">Total Amount Paid / Reserved</span>
            <span className="text-lg font-bold text-[#14213D] font-sans">
              {formatINR(total)}
            </span>
          </div>
        </div>

        {/* Check-in Instructions Card */}
        <div className="bg-[#EFE6DA]/60 rounded-[20px] p-6 sm:p-8 border border-[#14213D]/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#14213D]">
            <KeyRound className="w-4 h-4 text-[#D93A6B]" />
            <span>Digital Arrival & Check-In Guide</span>
          </div>

          <p className="text-xs sm:text-sm text-[#2B2F3A]/80 leading-relaxed font-sans">
            Your private 6-digit keycode and step-by-step video instructions will be sent via WhatsApp and email 24 hours prior to check-in, once your ID verification is validated by our front desk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-3 rounded-[10px] border border-[#14213D]/10">
              <span className="text-[#B89B72] font-semibold block text-[10px] uppercase">
                Check-in Window
              </span>
              <span className="font-semibold text-[#14213D]">3:00 PM onwards</span>
            </div>
            <div className="bg-white p-3 rounded-[10px] border border-[#14213D]/10">
              <span className="text-[#B89B72] font-semibold block text-[10px] uppercase">
                Check-out Time
              </span>
              <span className="font-semibold text-[#14213D]">By 11:00 AM</span>
            </div>
            <div className="bg-white p-3 rounded-[10px] border border-[#14213D]/10">
              <span className="text-[#B89B72] font-semibold block text-[10px] uppercase">
                Concierge Line
              </span>
              <span className="font-semibold text-[#14213D]">+91 98XXX XXXXX [EDIT]</span>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#14213D] hover:text-[#D93A6B] transition-colors"
          >
            <span>Return to Connekt Homes homepage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
