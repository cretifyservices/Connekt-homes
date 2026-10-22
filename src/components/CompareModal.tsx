import React from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import { X, Check, ArrowRight, Trash2 } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  const { compareList, removeFromCompare, clearCompare, allStays, navigateTo } = useBooking();

  if (!isOpen) return null;

  const stays = allStays.filter((s) => compareList.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#14213D]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl bg-[#FAF6F0] rounded-[20px] shadow-2xl border border-[#14213D]/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#14213D]/10 flex items-center justify-between bg-white">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#14213D]">
              Compare Serviced Stays
            </h2>
            <p className="text-xs text-[#2B2F3A]/70 mt-0.5">
              Review specifications, floor plans, and amenities side by side
            </p>
          </div>
          <div className="flex items-center gap-3">
            {stays.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-[#2B2F3A]/60 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EFE6DA] text-[#2B2F3A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-x-auto p-6">
          {stays.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-lg text-[#14213D]">No apartments selected for comparison</p>
              <p className="text-xs text-[#2B2F3A]/60 mt-1">
                Select "Compare" on any apartment card in the stays catalog to view specs side by side.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[650px]">
              {stays.map((stay) => (
                <div
                  key={stay.id}
                  className="bg-white rounded-[16px] border border-[#14213D]/10 p-5 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Image & Remove */}
                    <div className="relative rounded-[10px] overflow-hidden mb-4 aspect-[4/3]">
                      <img
                        src={stay.images[0]}
                        alt={stay.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(stay.id)}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full text-[#14213D] shadow-xs"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs uppercase font-semibold text-[#B89B72] tracking-wider">
                      {stay.area} · {stay.type}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#14213D] mt-1 mb-2 line-clamp-1">
                      {stay.name}
                    </h3>
                    <div className="text-lg font-bold text-[#14213D] mb-4">
                      {formatINR(stay.pricePerNight)}
                      <span className="text-xs font-normal text-[#2B2F3A]/60"> / night</span>
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-2.5 text-xs border-t border-b border-[#14213D]/10 py-4 mb-4">
                      <div className="flex justify-between text-[#2B2F3A]/80">
                        <span className="text-[#2B2F3A]/60">Floor Area</span>
                        <span className="font-semibold">{stay.sizeSqFt} sq ft ({stay.sizeSqM} m²)</span>
                      </div>
                      <div className="flex justify-between text-[#2B2F3A]/80">
                        <span className="text-[#2B2F3A]/60">Bedrooms / Baths</span>
                        <span className="font-semibold">{stay.bedrooms} Beds · {stay.bathrooms} Baths</span>
                      </div>
                      <div className="flex justify-between text-[#2B2F3A]/80">
                        <span className="text-[#2B2F3A]/60">Guest Capacity</span>
                        <span className="font-semibold">Up to {stay.guests} Guests</span>
                      </div>
                      <div className="flex justify-between text-[#2B2F3A]/80">
                        <span className="text-[#2B2F3A]/60">Rating</span>
                        <span className="font-semibold text-[#D93A6B]">★ {stay.rating} ({stay.reviewCount})</span>
                      </div>
                    </div>

                    {/* Key Amenities */}
                    <div className="space-y-1.5 text-xs mb-6">
                      <div className="flex items-center gap-2">
                        {stay.amenities.kitchen ? <Check className="w-4 h-4 text-[#9DB5A0]" /> : <X className="w-4 h-4 text-gray-300" />}
                        <span>Full Gourmet Kitchen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {stay.amenities.workspace ? <Check className="w-4 h-4 text-[#9DB5A0]" /> : <X className="w-4 h-4 text-gray-300" />}
                        <span>Dedicated Workspace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {stay.amenities.washer ? <Check className="w-4 h-4 text-[#9DB5A0]" /> : <X className="w-4 h-4 text-gray-300" />}
                        <span>Washer / Dryer in Unit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {stay.amenities.petsAllowed ? <Check className="w-4 h-4 text-[#9DB5A0]" /> : <X className="w-4 h-4 text-gray-300" />}
                        <span>Pets Welcome</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {stay.amenities.parking ? <Check className="w-4 h-4 text-[#9DB5A0]" /> : <X className="w-4 h-4 text-gray-300" />}
                        <span>On-site Parking</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      navigateTo(`/stay/${stay.id}`);
                    }}
                    className="w-full py-2.5 bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold tracking-wider uppercase rounded-[10px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View & Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
