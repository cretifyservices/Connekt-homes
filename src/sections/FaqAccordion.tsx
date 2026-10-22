import React, { useState } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQS_DATA[0]?.id || '');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] border-t border-[#14213D]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            Clear Guidance
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#14213D] tracking-tight">
            Frequently asked <span className="italic font-normal">questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2B2F3A]/70 mt-3">
            Everything you need to know regarding arrivals, security, amenities, and extended stays.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-[16px] border border-[#14213D]/10 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6F0]/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#B89B72] uppercase tracking-wider font-semibold">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#14213D]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#14213D] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#D93A6B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#2B2F3A]/80 leading-relaxed border-t border-[#14213D]/5 pt-4 bg-[#FAF6F0]/30 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 bg-[#EFE6DA]/40 rounded-[18px] border border-[#14213D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg font-semibold text-[#14213D]">
              Have a bespoke request or query?
            </h4>
            <p className="text-xs text-[#2B2F3A]/70">
              Our Bandra concierge is available daily on WhatsApp and phone.
            </p>
          </div>
          <a
            href="https://wa.me/919800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#14213D] hover:bg-[#D93A6B] text-white text-xs font-semibold rounded-[10px] transition-colors flex items-center gap-2 shrink-0 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat With Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
};
