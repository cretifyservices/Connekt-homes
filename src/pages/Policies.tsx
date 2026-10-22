import React, { useState } from 'react';

export const PoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cancellation' | 'rules' | 'privacy' | 'terms'>('cancellation');

  const tabs = [
    { id: 'cancellation' as const, label: 'Cancellation & Refunds' },
    { id: 'rules' as const, label: 'House Rules & Quiet Hours' },
    { id: 'privacy' as const, label: 'Privacy & Guest Verification' },
    { id: 'terms' as const, label: 'Terms of Service & GST' },
  ];

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            Transparency & Governance
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#14213D] tracking-tight">
            Policies & Guest Standards
          </h1>
          <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-2">
            Clear guidelines ensuring mutual peace of mind for our guests and local residential neighbours [EDIT].
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 border-b border-[#14213D]/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-[10px] text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#14213D] text-[#FAF6F0] shadow-xs'
                  : 'bg-white text-[#2B2F3A]/75 hover:bg-[#EFE6DA] border border-[#14213D]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#14213D]/10 shadow-xs space-y-6 text-xs sm:text-sm text-[#2B2F3A]/85 leading-relaxed font-sans">
          {activeTab === 'cancellation' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                Cancellation & Refund Framework [EDIT]
              </h2>
              <p>
                At Connekt Homes, we understand that travel schedules can shift unpredictably. Our standard policy provides flexibility while respecting the preparation required for each residence:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Full Refund (100%):</strong> Cancellations made at least 48 hours before standard check-in (3:00 PM on arrival date) receive a complete 100% refund of all accommodation and cleaning fees.
                </li>
                <li>
                  <strong>Late Cancellation (50%):</strong> Cancellations made within 48 hours of check-in are eligible for a 50% refund on remaining unstayed nights, with cleaning fees refunded in full.
                </li>
                <li>
                  <strong>Long-Term Stays (14+ nights):</strong> A 7-day advance notice is required to cancel or terminate early, guaranteeing full refund of unused nights minus modest administrative processing fees.
                </li>
              </ul>
              <p className="text-[11px] text-[#2B2F3A]/60 italic pt-2">
                Refunds are processed back to the original payment method within 5-7 business days.
              </p>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                House Rules & Neighbourhood Harmony [EDIT]
              </h2>
              <p>
                Our residences are located in peaceful, tree-canopied residential enclaves. To ensure a harmonious stay for everyone:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Check-in & Out:</strong> Standard check-in begins at 3:00 PM; check-out is by 11:00 AM. Early arrival or late departure can be requested during booking.
                </li>
                <li>
                  <strong>Quiet Hours:</strong> We observe quiet hours between 10:30 PM and 7:00 AM. Loud parties, external sound equipment, and disturbance to neighbours are strictly prohibited.
                </li>
                <li>
                  <strong>Strict Non-Smoking Policy:</strong> Smoking, vaping, and hookahs are strictly prohibited inside all apartment interiors. Selected units with private outdoor balconies have designated ashtrays.
                </li>
                <li>
                  <strong>Pet Policy:</strong> Only pet-designated residences welcome companion animals. Advance notification is required to ensure setup of bedding and bowls.
                </li>
                <li>
                  <strong>Shoe-Free Sanctuary:</strong> To maintain cleanliness on artisanal rugs and hardwood floors, we provide plush indoor slippers for all guests.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                Privacy & Guest Verification [EDIT]
              </h2>
              <p>
                Your privacy and safety are paramount. In compliance with Indian hospitality laws and Maharashtra police regulations:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Identity Documentation:</strong> All adult guests staying overnight must provide a valid government photo ID (Aadhaar, Passport, or Driver’s License for Indian nationals; valid Passport & Visa for international visitors).
                </li>
                <li>
                  <strong>Data Protection:</strong> ID documents and personal contact information are encrypted and never shared with third parties, utilized strictly for legal compliance and digital access codes.
                </li>
                <li>
                  <strong>No Hidden Devices:</strong> All Connekt residences are guaranteed free of internal surveillance. External CCTV exists solely in public building lobbies and perimeter gates for physical security.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in">
              <h2 className="font-serif text-2xl font-medium text-[#14213D]">
                Terms of Service & GST Invoicing [EDIT]
              </h2>
              <p>
                All bookings confirmed through Connekt Homes Hospitality LLP are governed by standard short-term serviced apartment licenses rather than tenancy agreements:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>License to Occupy:</strong> Guests receive a temporary, revocable license for short-term hospitality accommodation only.
                </li>
                <li>
                  <strong>Taxes & Invoicing:</strong> In accordance with statutory Indian taxation, Goods and Services Tax (GST 18%) applies to all serviced apartment tariffs. Formal tax invoices with corporate GSTIN are issued upon request.
                </li>
                <li>
                  <strong>Security Guarantee:</strong> A nominal incidental security hold may be pre-authorised at check-in and is fully released following checkout inspection.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
