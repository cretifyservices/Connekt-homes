import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [enquiryType, setEnquiryType] = useState<string>('Booking');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const enquiryOptions = ['Booking', 'Corporate Stay', 'Owner Partnership', 'Careers', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B89B72] mb-2">
            Get in Touch
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#14213D] tracking-tight">
            We are here to <span className="italic font-normal">welcome you</span>
          </h1>
          <p className="text-sm sm:text-base text-[#2B2F3A]/75 mt-3 leading-relaxed">
            Whether inquiring about an upcoming reservation, long-term corporate arrangement, or listing your Bandra home, our hospitality team is at your service.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[12px] bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-1">
                WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#2B2F3A]/70 mb-4">
                Fastest response for dates, pricing, keys, or directions.
              </p>
              <div className="font-mono text-sm font-semibold text-[#14213D]">
                +91 97691 56086
              </div>
            </div>
            <a
              href="https://wa.me/919769156086"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-xs font-semibold text-[#25D366] hover:underline inline-flex items-center gap-1"
            >
              <span>Chat on WhatsApp now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[12px] bg-[#EFE6DA] text-[#14213D] flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-1">
                Email Inquiries
              </h3>
              <p className="text-xs text-[#2B2F3A]/70 mb-4">
                For reservations, corporate arrangements, and invoices.
              </p>
              <div className="font-mono text-sm font-semibold text-[#14213D]">
                info@connekthomes.in
              </div>
            </div>
            <a
              href="mailto:info@connekthomes.in"
              className="mt-6 text-xs font-semibold text-[#D93A6B] hover:underline inline-flex items-center gap-1"
            >
              <span>Send an email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-[20px] p-8 border border-[#14213D]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-[12px] bg-[#F8E1E8] text-[#D93A6B] flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#14213D] mb-1">
                Office & Reception
              </h3>
              <p className="text-xs text-[#2B2F3A]/70 mb-4">
                Main office and reception desk.
              </p>
              <div className="text-xs text-[#14213D] font-medium leading-relaxed">
                418 Ahinsa Road, Khar West, Mumbai 400052, India
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#2B2F3A]/60">
              <Clock className="w-3.5 h-3.5 text-[#B89B72]" />
              <span>Reception: 24/7 on Call & WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Contact Form & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 bg-white rounded-[24px] p-8 sm:p-12 border border-[#14213D]/10 shadow-[0_20px_50px_rgba(20,33,61,0.06)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-[#9DB5A0]/20 text-[#9DB5A0] flex items-center justify-center mx-auto border-2 border-[#9DB5A0]">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#14213D]">
                  Message Received
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2F3A]/75 max-w-md mx-auto leading-relaxed">
                  Thank you for writing to Connekt Homes. Our team will review your message and reply via email or WhatsApp promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-[#14213D] text-white text-xs font-semibold uppercase tracking-wider rounded-[10px]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B89B72] mb-1">
                    Send a Message
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#14213D]">
                    How can we assist you?
                  </h2>
                </div>

                {/* Enquiry Type Chips */}
                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-2">
                    Enquiry Subject
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {enquiryOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setEnquiryType(opt)}
                        className={`px-3.5 py-1.5 rounded-[8px] text-xs font-medium transition-colors cursor-pointer ${
                          enquiryType === opt
                            ? 'bg-[#14213D] text-white'
                            : 'bg-[#FAF6F0] text-[#2B2F3A]/80 hover:bg-[#EFE6DA] border border-[#14213D]/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                      Your Name <span className="text-[#D93A6B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Swastik Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                      Email Address <span className="text-[#D93A6B]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14213D] mb-1.5">
                    Your Message <span className="text-[#D93A6B]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your dates, preferences, or partnership request..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#FAF6F0] p-3 rounded-[10px] border border-[#14213D]/15 focus:outline-none focus:border-[#D93A6B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D93A6B] hover:bg-[#c42f5d] text-white text-xs font-semibold uppercase tracking-wider rounded-[12px] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Concierge Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Information & Map Placeholder */}
          <div className="lg:col-span-4 space-y-6">
            {/* Map Placeholder Graphic */}
            <div className="bg-[#EFE6DA]/70 rounded-[20px] p-6 border border-[#14213D]/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#14213D]">
                <span>Neighborhood Presence</span>
                <span className="text-[#D93A6B]">Bandra West</span>
              </div>

              <div className="h-48 rounded-[14px] bg-white border border-[#14213D]/10 overflow-hidden relative flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-[#D93A6B] mx-auto animate-bounce" />
                  <div className="font-serif text-sm font-semibold text-[#14213D]">
                    Pali Hill, Pali Village & Carter Road
                  </div>
                  <div className="text-[11px] text-[#2B2F3A]/60">
                    Bandra West, Mumbai 400050 [EDIT]
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#2B2F3A]/70 leading-relaxed">
                All residences are within 5 to 15 minutes drive from Bandra Terminus, Western Express Highway, and the Bandra-Worli Sea Link.
              </div>
            </div>

            {/* Social Link */}
            <div className="bg-white rounded-[20px] p-6 border border-[#14213D]/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#14213D]">
                  Follow on Instagram
                </div>
                <div className="text-xs text-[#2B2F3A]/60">@connekt_homes</div>
              </div>
              <a
                href="https://www.instagram.com/connekt_homes/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#D93A6B] hover:text-white transition-colors text-[#14213D]"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
