import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface ActionCtaBannerProps {
  onOpenBookModal: () => void;
}

export const ActionCtaBanner: React.FC<ActionCtaBannerProps> = ({ onOpenBookModal }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#14213D] text-white relative overflow-hidden">
      {/* Decorative background geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border-[40px] border-white" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-[40px] border-[#D93A6B]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F8E1E8] text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D93A6B]" />
          <span>psst — that Mumbai trip isn’t going to book itself</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-tight">
          Ready to experience <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#F8E1E8]">Connekt Homes?</span>
        </h2>

        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-sans leading-relaxed">
          Book directly with us for guaranteed best rates, verified cleanliness, and personalized host care from reception at 418 Ahinsa Road, Khar West.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenBookModal}
            className="px-8 py-4 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-[0_10px_30px_rgba(217,58,107,0.4)] transition-all flex items-center gap-2 group cursor-pointer hover:scale-103"
          >
            <span>Book A Stay Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="https://wa.me/919769156086?text=Hi%20Connekt%20Homes,%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 bg-white/10 hover:bg-white text-white hover:text-[#14213D] border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
