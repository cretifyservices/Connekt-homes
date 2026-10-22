import React, { useState } from 'react';
import { Plus, Minus, MessageSquare, PhoneCall, HelpCircle, ArrowRight } from 'lucide-react';

export const SplitFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does check-in and check-out work?',
      a: 'We provide seamless contactless self check-in with digital keypad door locks and backup smart keycards. Our on-ground Bandra host also personally greets you upon arrival if requested to give a quick orientation of the home and neighborhood.',
    },
    {
      q: 'Are your residences suitable for remote work and corporate stays?',
      a: 'Yes, absolutely. Every Connekt residence features a dedicated work desk with ergonomic seating, a private 300 Mbps high-speed dual-band fiber connection with power backup (UPS/inverter), and ample universal power sockets.',
    },
    {
      q: 'Is daily housekeeping included in the nightly rate?',
      a: 'Yes. Professional housekeeping is provided every single day at a time that suits your schedule. Bed linens and towels are refreshed every 3 days for standard stays, or on request.',
    },
    {
      q: 'Can I cook my own meals? What kitchen equipment is provided?',
      a: 'All our apartments feature fully equipped chef-grade kitchens with gas or induction stoves, chimneys, microwaves, refrigerators, electric kettles, toasters, cookware, cutlery, and glassware. Salt, pepper, oil, and tea/coffee provisions are included.',
    },
    {
      q: 'What is your cancellation and booking deposit policy?',
      a: 'Direct bookings made on our site enjoy flexible cancellation: full refund up to 7 days prior to check-in. For reservations cancelled within 7 days, 50% is refunded. No long-term hidden deposits for stays under 30 days.',
    },
    {
      q: 'Do you provide GST tax invoices for company reimbursements?',
      a: 'Yes. We issue formal GST tax invoices compliant with Indian corporate travel reimbursement requirements. You can enter your company legal name and GSTIN during the checkout step.',
    },
    {
      q: 'Are pets allowed in Connekt residences?',
      a: 'Selected residences (such as The Arched Haven in Pali Hill and The Courtyard Loft in Pali Village) welcome quiet, house-trained pets. A one-time pet sanitation fee applies.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] border-t border-[#14213D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading, Pitch & Direct WhatsApp/Call */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89B72]">
              <HelpCircle className="w-3.5 h-3.5 text-[#D93A6B]" />
              <span>Before You Book</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight leading-[1.15]">
              The questions <br className="hidden sm:inline" />
              everyone <span className="italic font-normal">asks us.</span>
            </h2>

            <p className="text-sm text-[#2B2F3A]/75 leading-relaxed font-sans max-w-md">
              Everything you need to know about our serviced apartments, arrival protocols, housekeeping schedules, and corporate stays in Mumbai.
            </p>

            <div className="pt-4 space-y-3 max-w-sm">
              <a
                href="https://wa.me/919769156086?text=Hi%20Connekt%20Homes,%20I%20have%20a%20question%20about%20booking%20a%20stay"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-[14px] bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="tel:+919769156086"
                className="w-full py-3 px-5 rounded-[14px] bg-white hover:bg-[#EFE6DA] text-[#14213D] border border-[#14213D]/15 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#B89B72]" />
                  <span>Call Reception Desk</span>
                </div>
                <span className="font-mono text-[11px] text-[#2B2F3A]/70">+91 97691 56086</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accordion with Round Toggles */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[20px] border border-[#14213D]/10 overflow-hidden transition-all duration-200 shadow-xs hover:border-[#14213D]/25"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-[#14213D] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#14213D] text-white' : 'bg-[#FAF6F0] text-[#14213D]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#2B2F3A]/80 leading-relaxed font-sans border-t border-[#14213D]/5 pt-4 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
