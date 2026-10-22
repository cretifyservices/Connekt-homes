import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { currentRoute, routeParams, allStays, searchDates, searchGuests } = useBooking();
  const [showTooltip, setShowTooltip] = useState(false);

  // If on stay detail, prefill stay name
  let stayName = 'Connekt Homes Bandra';
  if (currentRoute.startsWith('/stay/') && routeParams.id) {
    const stay = allStays.find((s) => s.id === routeParams.id);
    if (stay) stayName = stay.name;
  }

  const message = `Hello Connekt Concierge! I am inquiring about booking "${stayName}" in Mumbai for ${searchGuests} guests.`;
  const whatsappUrl = `https://wa.me/919769156086?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip hint */}
      {showTooltip && (
        <div className="bg-[#14213D] text-[#FAF6F0] text-xs py-2 px-3.5 rounded-[12px] shadow-lg max-w-[220px] relative animate-in fade-in slide-in-from-right-2 duration-200">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-[#FAF6F0]/40 hover:text-white p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-[#F8E1E8]">Ask Concierge</p>
          <p className="text-[11px] text-[#FAF6F0]/75 mt-0.5">
            Instant assistance regarding dates, parking, or special requests.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group relative"
        aria-label="Chat with Connekt Concierge on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        <span className="sr-only">Chat with Connekt Concierge</span>
      </a>
    </aside>
  );
};
