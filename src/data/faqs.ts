export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQ[] = [
  {
    id: 'checkin-checkout',
    category: 'Arrival & Stay',
    question: 'What are the check-in and check-out times?',
    answer:
      'Standard check-in begins at 3:00 PM and check-out is by 11:00 AM. Early check-in (from 11:00 AM) or extended late check-out (up to 3:00 PM) can be requested during checkout or with our concierge team, subject to apartment schedule availability [EDIT].',
  },
  {
    id: 'id-requirements',
    category: 'Verification',
    question: 'What identity documents are required for check-in?',
    answer:
      'In compliance with local hospitality regulations, all adult guests must provide a valid government-issued photo ID (Indian Aadhaar / Passport / Driving Licence; or valid Passport and Indian Visa for international guests). You can upload these securely in advance during checkout, after which your digital access code is released [EDIT].',
  },
  {
    id: 'cancellation-policy',
    category: 'Bookings',
    question: 'What is your cancellation and date modification policy?',
    answer:
      'We understand travel plans evolve. For standard bookings, cancel up to 48 hours before check-in for a 100% full refund. For stays longer than 14 nights, cancellations made at least 7 days before arrival receive a full refund minus modest administrative processing fees [EDIT].',
  },
  {
    id: 'pets',
    category: 'House Policies',
    question: 'Are pets allowed in Connekt apartments?',
    answer:
      'Selected Connekt properties (such as The Curator’s Flat and The Garden Residence) are warmly pet-friendly for small to medium well-mannered companions. Please tick the "Travelling with pets" filter or notify us at booking so our team can prepare eco-friendly bowls and mats [EDIT].',
  },
  {
    id: 'housekeeping',
    category: 'Services',
    question: 'How does housekeeping work?',
    answer:
      'Daily quiet housekeeping is included in all stays. Our trusted staff refreshes linens, tidies common areas, and replenishes botanical bathroom amenities between 10:00 AM and 2:00 PM (or at a scheduled time of your preference). You can also toggle "Do Not Disturb" at any time.',
  },
  {
    id: 'long-stays',
    category: 'Corporate & Relocation',
    question: 'Do you offer monthly rates or corporate GST invoices?',
    answer:
      'Yes. For stays of 14 nights or more, preferential monthly rates (up to 25% savings) apply automatically. We issue official GST tax invoices for corporate reimbursements and provide dedicated key account managers for business relocation and project teams.',
  },
  {
    id: 'airport-pickup',
    category: 'Concierge',
    question: 'Can you arrange Mumbai airport pickup and chauffeurs?',
    answer:
      'Yes, our concierge can coordinate chauffeur-driven airport pickups from Chhatrapati Shivaji Maharaj International Airport (BOM) directly to your apartment entrance in an executive sedan or SUV. Chauffeurs assist with luggage and provide direct door-to-door transit [EDIT].',
  },
  {
    id: 'self-checkin',
    category: 'Arrival & Stay',
    question: 'How does self check-in work?',
    answer:
      'All Connekt apartments are fitted with encrypted smart keypad locks. 24 hours prior to arrival, after ID verification is acknowledged, you receive a personal 6-digit access code and a comprehensive digital arrival guide with door video instructions.',
  },
];
