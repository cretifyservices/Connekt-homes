export interface GuestStory {
  id: string;
  name: string;
  role: string;
  tagline: string;
  story: string;
  duration: string;
  apartmentName: string;
  note: string;
  initials: string;
}

export const GUEST_STORIES_DATA: GuestStory[] = [
  {
    id: 'story-1',
    name: 'Siddharth & Rhea Rao',
    role: 'Creative Directors & Filmmakers [EDIT]',
    tagline: 'A peaceful haven between film shoots',
    story:
      'We had a two-month production schedule across Mehboob Studios and Bandra locations. Connekt gave us a home where we could hold script readings in natural sunlight and unwind with quiet tea on the balcony after 14-hour days.',
    duration: '60 nights in Bandra',
    apartmentName: 'The Arched Haven at Pali Hill',
    note: '[Notice: Testimonial details are representative placeholders. Use real guest names and photos only with their written permission]',
    initials: 'SR',
  },
  {
    id: 'story-2',
    name: 'Elena Rostova',
    role: 'Design Author & Independent Curator [EDIT]',
    tagline: 'The quietest writing desk in South Asia',
    story:
      'I was researching an upcoming publication on contemporary Indian architecture. The fluted wood details and silence at the Pali Village flat allowed me to write three entire chapters in total concentration.',
    duration: '21 nights in Pali Village',
    apartmentName: "The Curator's Flat at Pali Village",
    note: '[Notice: Use real guest names and photos only with their written permission]',
    initials: 'ER',
  },
  {
    id: 'story-3',
    name: 'Tariq Al-Mansoor',
    role: 'Venture Partner & Global Investor [EDIT]',
    tagline: 'Effortless corporate stay with soul',
    story:
      'I visit Mumbai four times a year. Standard five-star hotels feel transactional and sterile. Connekt provides seamless 300 Mbps WiFi, spotless daily housekeeping, and the feeling of belonging to a real neighborhood.',
    duration: '14 nights in Carter Road',
    apartmentName: 'The Coastal Penthouse at Carter Road',
    note: '[Notice: Use real guest names and photos only with their written permission]',
    initials: 'TM',
  },
  {
    id: 'story-4',
    name: 'Nandini Sen',
    role: 'Brand Consultant & Ceramicist [EDIT]',
    tagline: 'Artisanal calm in historic Ranwar',
    story:
      'Waking up to birdsong in the heart of Ranwar Village and strolling two minutes to Veronica’s for morning espresso was magical. Connekt’s aesthetic feels curated by someone who genuinely cares about interior harmony.',
    duration: '10 nights in Ranwar',
    apartmentName: 'Ranwar Village Atelier Suite',
    note: '[Notice: Use real guest names and photos only with their written permission]',
    initials: 'NS',
  },
];
