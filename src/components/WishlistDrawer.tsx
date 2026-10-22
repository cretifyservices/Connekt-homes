import React from 'react';
import { useBooking, formatINR } from '../context/BookingContext';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, allStays, navigateTo } = useBooking();

  if (!isOpen) return null;

  const wishlistedStays = allStays.filter((s) => wishlist.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#14213D]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col justify-between border-l border-[#14213D]/10">
        {/* Header */}
        <div className="p-6 border-b border-[#14213D]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D93A6B] fill-[#D93A6B]" />
            <h2 className="font-serif text-xl font-medium text-[#14213D]">
              Saved Stays ({wishlistedStays.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFE6DA] text-[#2B2F3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedStays.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#2B2F3A]/60">
              <div className="w-12 h-12 rounded-full bg-[#EFE6DA] flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-[#2B2F3A]/40" />
              </div>
              <p className="font-serif text-lg text-[#14213D]">Your wishlist is empty</p>
              <p className="text-xs max-w-xs mt-1 text-[#2B2F3A]/70">
                Click the heart on any apartment to curate your favorite stays in Bandra.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('/stays');
                }}
                className="mt-5 px-4 py-2 bg-[#14213D] text-white text-xs font-medium rounded-[10px] hover:bg-[#D93A6B] transition-colors"
              >
                Browse Stays
              </button>
            </div>
          ) : (
            wishlistedStays.map((stay) => (
              <div
                key={stay.id}
                className="bg-white rounded-[14px] p-3 border border-[#14213D]/10 shadow-xs flex gap-3 group hover:border-[#D93A6B]/30 transition-all"
              >
                <img
                  src={stay.images[0]}
                  alt={stay.name}
                  className="w-24 h-24 object-cover rounded-[8px] shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#B89B72] font-semibold">
                      {stay.area} · {stay.type}
                    </div>
                    <h3
                      onClick={() => {
                        onClose();
                        navigateTo(`/stay/${stay.id}`);
                      }}
                      className="font-serif text-sm font-semibold text-[#14213D] line-clamp-1 cursor-pointer hover:text-[#D93A6B]"
                    >
                      {stay.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#14213D] mt-1">
                      {formatINR(stay.pricePerNight)}
                      <span className="text-[11px] font-normal text-[#2B2F3A]/60"> / night</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#14213D]/5">
                    <button
                      onClick={() => {
                        onClose();
                        navigateTo(`/stay/${stay.id}`);
                      }}
                      className="text-xs font-medium text-[#D93A6B] hover:underline flex items-center gap-1"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(stay.id)}
                      className="text-[#2B2F3A]/40 hover:text-red-500 p-1"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedStays.length > 0 && (
          <div className="p-6 border-t border-[#14213D]/10 bg-[#EFE6DA]/40">
            <button
              onClick={() => {
                onClose();
                navigateTo('/stays');
              }}
              className="w-full py-3 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px] shadow transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore More Stays</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
