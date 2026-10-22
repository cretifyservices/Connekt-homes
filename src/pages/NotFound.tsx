import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useBooking();

  return (
    <div className="bg-[#FAF6F0] min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EFE6DA] text-[#D93A6B] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B89B72]">
          Page Not Found · 404
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#14213D]">
          You have wandered off the map
        </h1>

        <p className="text-xs sm:text-sm text-[#2B2F3A]/75 leading-relaxed font-sans">
          The residence or page you were seeking may have been renamed or relocated. Return to our Bandra home to explore available short-term stays.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('/')}
            className="px-6 py-3 bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] shadow transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
          <button
            onClick={() => navigateTo('/stays')}
            className="px-6 py-3 bg-white hover:bg-[#EFE6DA] text-[#14213D] border border-[#14213D]/20 text-xs font-semibold uppercase tracking-wider rounded-[10px] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse Stays</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
