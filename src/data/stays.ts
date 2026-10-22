export interface SpaceBreakdown {
  livingRoom: string;
  bedroom1: string;
  bedroom2?: string;
  bathrooms: string;
  kitchen: string;
  amenitiesNotes: string;
  guestAccess: string;
  addOnServices: string[];
}

export interface RatingBreakdown {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

export interface HostInfo {
  name: string;
  badge: string;
  yearsHosting: string;
  bio: string;
  coHosts?: string[];
}

export interface Stay {
  id: string;
  name: string;
  tagline: string;
  area: string;
  neighborhood: string;
  city: string;
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  sizeSqM: number;
  sizeSqFt: number;
  floor?: string;
  pricePerNight: number;
  originalPrice?: number;
  cleaningFee: number;
  rating: number;
  reviewCount: number;
  isSuperhost?: boolean;
  featured?: boolean;
  images: string[];
  description: string;
  conciergeNote: string;
  highlights: string[];
  hostInfo: HostInfo;
  ratingBreakdown: RatingBreakdown;
  spaceBreakdown: SpaceBreakdown;
  amenities: {
    wifi: boolean;
    kitchen: boolean;
    ac: boolean;
    workspace: boolean;
    washer: boolean;
    smartTv: boolean;
    housekeeping: boolean;
    elevator: boolean;
    selfCheckIn: boolean;
    petsAllowed: boolean;
    parking: boolean;
    balcony: boolean;
    pool?: boolean;
    gym?: boolean;
  };
  sleepingArrangements: {
    room: string;
    bedType: string;
    details: string;
  }[];
  houseRules: string[];
  cancellationPolicy: string;
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number;
    yPercent: number;
  };
  nearbyPlaces: {
    name: string;
    distance: string;
    type: string;
  }[];
}

export const STAYS_DATA: Stay[] = [
  {
    id: 'bandra-sea-minutes',
    name: 'Bandra No 1 minutes away from Sea',
    tagline: 'Entire rental unit 1 minute away from the Arabian Sea in vibrant Bandra West',
    area: 'Bandra West',
    neighborhood: 'Bandra West (Carter Road Promenade)',
    city: 'Mumbai',
    type: 'Entire Serviced Apartment',
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    sizeSqM: 65,
    sizeSqFt: 700,
    floor: '2nd Floor with Lift Access',
    pricePerNight: 6500,
    originalPrice: 7800,
    cleaningFee: 1000,
    rating: 4.74,
    reviewCount: 191,
    isSuperhost: true,
    featured: true,
    images: [
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653907/35cea001-c00d-4f04-ad9e-3a54ff250007.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653917/0d4dfab5-2a10-4ce0-9758-825be4c53b38.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653927/8a84cce4-63ae-4cf0-b256-018909569c78.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653943/1db0129b-0ec3-4261-bcf9-aa2fad743725.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792653935/ee156bd2-ef22-4c49-b1aa-bdb1e353113e.avif',
    ],
    description:
      'Step outside and inhale the fresh Arabian Sea breeze. Located just 1 minute away from the coastal promenade in Bandra West, this bright, sun-dappled 1-bedroom serviced apartment offers curated bespoke interiors, dedicated work desk with fast optical Wi-Fi, full chef kitchen, and serene coastal tranquility while keeping you within walking distance of Bandra’s top cafes and bistros.',
    conciergeNote:
      'Our Bandra guest experience manager is available on WhatsApp 24/7 for seamless contactless self check-in, cafe recommendations, and luggage assistance.',
    highlights: [
      '1 minute leisurely stroll to the Arabian Sea & Carter Road Promenade',
      'Contactless digital self check-in with private lockbox',
      'Ergonomic workstation with 300 Mbps high-speed WiFi',
      'Full modular kitchen with gas stove, microwave, fridge & cookware',
      'Daily scheduled housekeeping and crisp hotel-grade linens',
    ],
    hostInfo: {
      name: 'Connekt Homes',
      badge: 'Superhost',
      yearsHosting: '11 years hosting',
      bio: 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests across Mumbai.',
      coHosts: ['Divyam', 'Pooja'],
    },
    ratingBreakdown: {
      cleanliness: 4.8,
      accuracy: 4.7,
      checkIn: 4.9,
      communication: 4.8,
      location: 4.9,
      value: 4.7,
    },
    spaceBreakdown: {
      livingRoom:
        'Lounge with plush 3-seater sofa, artisanal coffee table, 43" 4K Smart TV with Netflix & Prime, warm accent ambient lighting, and broad windows capturing the evening sea breeze.',
      bedroom1:
        'Serene private sanctuary featuring a Queen-size bed with a supportive 8-inch orthopaedic mattress, crisp 400TC satin-stripe Egyptian cotton bedsheets, silent inverter split AC, double wardrobe with wooden hangers, and blackout roller blinds.',
      bathrooms:
        'Modern tiled bathroom equipped with a high-pressure instantaneous geyser (hot water 24/7), glass shower partition separating wet and dry zones, plush bath towels, and herbal organic toiletries.',
      kitchen:
        'Fully-equipped kitchen with 3-burner gas stove, microwave oven, double-door refrigerator, electric kettle, bread toaster, mixer grinder, non-stick cookware, stainless steel dinner set, and glassware.',
      amenitiesNotes:
        'High-speed optical fiber Wi-Fi (300 Mbps), front-loading automatic washing machine with detergent pods, iron with ironing board, and daily housekeeping between 11:00 AM – 2:00 PM.',
      guestAccess:
        'Guests enjoy full private access to the entire apartment. Building features elevator access, CCTV in common premises, and 24/7 security guard.',
      addOnServices: [
        'Home-cooked healthy breakfast and regional meals by verified home chefs',
        'In-house professional therapeutic massage upon advance booking',
        'Airport pickup and drop service in executive sedans',
        'Partner day pass to Bandra fitness studios',
      ],
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
      washer: true,
      smartTv: true,
      housekeeping: true,
      elevator: true,
      selfCheckIn: true,
      petsAllowed: false,
      parking: false,
      balcony: true,
    },
    sleepingArrangements: [
      {
        room: 'Master Bedroom',
        bedType: '1 Queen Bed',
        details: 'Orthopaedic mattress, 400TC linens, silent inverter AC, ensuite bath',
      },
      {
        room: 'Living Area',
        bedType: '1 Plush Sofa Bed',
        details: 'Comfortable daybed/sofa suitable for additional adult or child',
      },
    ],
    houseRules: [
      'Self check-in with lockbox anytime after 2:00 PM',
      'Check-out before 11:00 AM',
      'Strictly non-smoking inside the premises (balcony permitted)',
      'Quiet residential hours observed after 10:00 PM',
      'Government ID verification required prior to arrival',
    ],
    cancellationPolicy: 'Free cancellation up to 7 days before check-in. 50% refund thereafter.',
    coordinates: {
      lat: 19.0596,
      lng: 72.8295,
      xPercent: 32,
      yPercent: 48,
    },
    nearbyPlaces: [
      { name: 'Carter Road Promenade', distance: '1 min walk', type: 'Scenic' },
      { name: 'Subko Coffee & Bakehouse', distance: '5 mins walk', type: 'Artisan Cafe' },
      { name: 'Olive Bar & Kitchen', distance: '8 mins walk', type: 'Fine Dining' },
      { name: 'Bandra Bandstand & Fort', distance: '6 mins drive', type: 'Heritage' },
    ],
  },
  {
    id: 'luxury-pool-gym-airport-bkc',
    name: '5 Star Luxury ✪ Pool, Gym✪ Nr Airport ✪ BKC ✪Rm 1',
    tagline: '5 Star luxury suite with resort pool & fitness center near Mumbai Airport and BKC',
    area: 'BKC / Airport Corridor',
    neighborhood: 'Near BKC & Mumbai International Airport (T2)',
    city: 'Mumbai',
    type: '5-Star Serviced Suite',
    guests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    sizeSqM: 55,
    sizeSqFt: 590,
    floor: '7th Floor with High-Speed Elevators',
    pricePerNight: 8200,
    originalPrice: 9900,
    cleaningFee: 1200,
    rating: 4.92,
    reviewCount: 148,
    isSuperhost: true,
    featured: true,
    images: [
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654206/8f850115-35d5-47cf-82b9-994c05488668.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654208/c4a81ce8-6924-4077-b074-86b54c7cb329.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654215/a1e7fe1d-b233-4560-9a79-1c1345aad685.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654221/d7baef89-d9d9-4746-9113-404c9fcb432c.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654227/be50ad2b-d53b-4387-a2ef-b23c053a738a.avif',
    ],
    description:
      'A true five-star urban sanctuary strategically situated between the Bandra Kurla Complex (BKC) financial hub and Mumbai International Airport. Featuring resort-class amenities including an Olympic swimming pool, fully equipped Technogym fitness center, high-speed business WiFi, soundproof acoustic double glazing, and plush designer finishes throughout.',
    conciergeNote:
      'Seamless corporate and VIP check-in. Keycard access to the pool and gym provided upon arrival. Express airport shuttle can be coordinated 24/7.',
    highlights: [
      'Complimentary access to outdoor swimming pool & state-of-the-art gym',
      '8 minutes drive to Bandra Kurla Complex (BKC) & 12 mins to Airport T2',
      'Keyless digital smart lock check-in',
      'Full marble bathroom with rainfall shower & luxury bath amenities',
      'Dedicated executive work desk with multi-plug universal sockets',
    ],
    hostInfo: {
      name: 'Connekt Homes',
      badge: 'Superhost',
      yearsHosting: '11 years hosting',
      bio: 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests across Mumbai.',
      coHosts: ['Divyam', 'Nikhil'],
    },
    ratingBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.9,
      checkIn: 4.9,
      communication: 5.0,
      location: 4.8,
      value: 4.8,
    },
    spaceBreakdown: {
      livingRoom:
        'Sunlit open-plan studio suite with Italian leather armchair, executive desk with Herman Miller-style chair, 50" 4K Smart TV, ambient pendant lighting, and floor-to-ceiling glass windows with panoramic city skyline views.',
      bedroom1:
        'King-size pillowtop bed with hypoallergenic plush pillows, 500TC organic bamboo-cotton sheets, bedside USB charging docks, central climate control, and extensive built-in mirrored wardrobes.',
      bathrooms:
        'Imported Italian marble bathroom featuring a thermostatic ceiling rainfall shower, glass enclosure, backlit vanity mirror, soft spa bathrobes, and luxury Forest Essentials botanicals.',
      kitchen:
        'Compact chef kitchenette with induction hob, convection microwave oven, mini-refrigerator, Nespresso coffee maker, electric kettle, wine glasses, and ceramic dinner set.',
      amenitiesNotes:
        'High-speed 300 Mbps Wi-Fi, in-suite combination washer-dryer, steam iron, electronic laptop-size safe, and daily premium housekeeping.',
      guestAccess:
        'Full private access to the suite. Access cards grant entry to the ground-level swimming pool, 2nd-floor fitness center, executive lounge, and basement parking.',
      addOnServices: [
        'Airport pickup and drop in Mercedes or Toyota Innova Hycross',
        'Chef-curated gourmet dinner experience in your suite',
        'Laundry and dry-cleaning express service',
        'Personal yoga instructor or gym trainer sessions',
      ],
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
      washer: true,
      smartTv: true,
      housekeeping: true,
      elevator: true,
      selfCheckIn: true,
      petsAllowed: false,
      parking: true,
      balcony: false,
      pool: true,
      gym: true,
    },
    sleepingArrangements: [
      {
        room: 'Master Executive Suite',
        bedType: '1 King Bed',
        details: 'Custom plush pillowtop mattress, feather pillows, 500TC sheets',
      },
    ],
    houseRules: [
      'Self check-in via electronic keypad from 2:00 PM',
      'Check-out strictly by 11:00 AM',
      'Pool & Gym timings: 6:00 AM – 10:00 PM (swimming attire required)',
      'No parties, bachelor events, or outside unregistered visitors',
      'Valid Government photo ID mandatory prior to check-in',
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in. Full refund available.',
    coordinates: {
      lat: 19.0688,
      lng: 72.8656,
      xPercent: 68,
      yPercent: 35,
    },
    nearbyPlaces: [
      { name: 'Bandra Kurla Complex (BKC)', distance: '8 mins drive', type: 'Financial Hub' },
      { name: 'Chhatrapati Shivaji Maharaj Airport (T2)', distance: '12 mins drive', type: 'Airport' },
      { name: 'Jio World Drive & Convention Centre', distance: '10 mins drive', type: 'Shopping & Dining' },
      { name: 'Bandra Railway Station', distance: '12 mins drive', type: 'Transit' },
    ],
  },
  {
    id: 'prime-bandra-ocean-park',
    name: '2 Bed 2 Bath Prime Bandra Ocean Park',
    tagline: 'Spacious 2 bedroom, 2 bath serviced apartment with generous living & dining in Prime Bandra',
    area: 'Prime Bandra West',
    neighborhood: 'Prime Bandra (Ocean Park, Near Joggers Park & Carter Rd)',
    city: 'Mumbai',
    type: 'Entire 2 BHK Serviced Apartment',
    guests: 7,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    sizeSqM: 75,
    sizeSqFt: 800,
    floor: '1st Floor Flat with Lift Access',
    pricePerNight: 11500,
    originalPrice: 13500,
    cleaningFee: 1500,
    rating: 4.67,
    reviewCount: 102,
    isSuperhost: true,
    featured: true,
    images: [
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654430/36d01175-b1e0-4de6-8cda-26f28b3aeee6.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654433/4f7d20a5-5983-4886-bf82-1aa95fb11c3e.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654372/0ab0598e-5a06-444e-9674-e48f21c55aad.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654377/c8f5c349-c4bc-4fcc-9b82-66a11a1a4e8a.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654366/062c8c9f-8982-4531-9366-f648c8b3dfc8.avif',
      'https://res.cloudinary.com/yvbshrkz/image/upload/v1792654362/673d7f77-3a08-4951-93c0-dd21625eab68.avif',
    ],
    description:
      'In the ❤️ of Bandra(W) few walks from Sachin Tendulkar\'s Bungalow, Joggers Park & Carter Rd. Within walking distance to majority of restaurants, supermarkets & Cafes. This 800 sqft 1st floor flat with lift boasts designer decor curated by our founder-architect, 2 spacious bedrooms with 2 ensuite bathrooms, in-unit washing machine, 42" Smart TV, hi-speed Wi-Fi, 24/7 security, dedicated car parking, and on-call airport ride support.',
    conciergeNote:
      'Ideal for families and groups visiting Mumbai. Complete video tour and personalized neighborhood map provided on WhatsApp upon booking confirmation.',
    highlights: [
      'In the ❤️ of Bandra(W) — walks from Sachin Tendulkar\'s Bungalow, Joggers Park & Carter Rd',
      'Self check-in: Check yourself in with the digital lockbox',
      'Dedicated workspace: A bright room with high-speed WiFi well-suited for working',
      'Superhost: Hosted by Connekt · 11 years hosting with 440+ verified guest reviews',
      '800 sqft 1st floor flat with lift, dedicated car parking & 24/7 security',
      '2 Bedrooms with 2 Ensuite Bathrooms & separate glass shower enclosures',
    ],
    hostInfo: {
      name: 'Connekt Homes',
      badge: 'Superhost',
      yearsHosting: '11 years hosting',
      bio: 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests in Mumbai.',
      coHosts: ['Divyam', 'Pooja'],
    },
    ratingBreakdown: {
      cleanliness: 4.7,
      accuracy: 4.7,
      checkIn: 4.8,
      communication: 4.8,
      location: 4.8,
      value: 4.6,
    },
    spaceBreakdown: {
      livingRoom:
        'Large family lounge featuring comfortable plush seating, 42" Smart TV with high-speed streaming capabilities, handcrafted center table, dining nook, ambient architectural lighting, and large windows bringing in pleasant natural cross-ventilation.',
      bedroom1:
        'Bedroom 1 features 1 double bed with a premium orthopaedic mattress, window AC, attached ensuite bathroom, full wardrobe, designer privacy blinds, reading lamps, and crisp hotel linens.',
      bedroom2:
        'Bedroom 2 features 1 queen bed with hotel-grade mattress, split AC, ensuite bathroom, window with blackout blinds, work desk with ergonomic chair, and ample wardrobe storage.',
      bathrooms:
        '2 full ensuite bathrooms equipped with instant geysers ensuring 24/7 hot water, modern glass partitions separating the shower and dry space, plush towels, and organic toiletries.',
      kitchen:
        'Fully-equipped kitchen with microwave, double-door refrigerator, electric toaster, electric kettle, mixer grinder, pressure cooker, 3-burner gas stove, and complete cookware, dinnerware, wine glasses and cutlery.',
      amenitiesNotes:
        'Fresh linens and towels provided upon check-in, 2 complimentary laundry loads per week using the in-unit washing machine, and daily housekeeping scheduled between 3:00 PM – 6:00 PM (or on request).',
      guestAccess:
        'Guests have private, exclusive access to the entire 800 sqft apartment. The building offers elevator / lift access from the ground floor, reserved car parking space inside the compound, and 24/7 security guard.',
      addOnServices: [
        'Home-cooked healthy meals and in-house cook service',
        'In-house certified therapeutic massage upon appointment',
        'Airport pickup & drop-off in clean sanitised vehicles',
        'In-salon grooming and styling services',
        'Curated Bandra architectural and culinary walking tours',
        'Day pass access to nearby partner fitness gym',
      ],
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
      washer: true,
      smartTv: true,
      housekeeping: true,
      elevator: true,
      selfCheckIn: true,
      petsAllowed: true,
      parking: true,
      balcony: true,
    },
    sleepingArrangements: [
      {
        room: 'Bedroom 1',
        bedType: '1 Double Bed',
        details: 'Premium orthopaedic mattress, attached bathroom, window AC, blinds',
      },
      {
        room: 'Bedroom 2',
        bedType: '1 Queen Bed',
        details: 'Air-conditioned, ensuite bathroom, work desk, window with blinds',
      },
    ],
    houseRules: [
      'Self check-in with lockbox anytime from 2:00 PM',
      'Check-out strictly by 11:00 AM',
      'Family and business friendly · Respect residential community quiet hours (after 10:00 PM)',
      'No loud parties or commercial shoots without prior written clearance',
      'Government-issued ID required for all adult guests prior to arrival',
    ],
    cancellationPolicy: 'Free cancellation up to 7 days before check-in. 50% refund thereafter.',
    coordinates: {
      lat: 19.0625,
      lng: 72.834,
      xPercent: 45,
      yPercent: 52,
    },
    nearbyPlaces: [
      { name: "Sachin Tendulkar's Bungalow", distance: '3 mins walk', type: 'Landmark' },
      { name: 'Joggers Park & Carter Road Promenade', distance: '4 mins walk', type: 'Seaside & Park' },
      { name: 'Pali Market, Supermarkets & Organic Stores', distance: '5 mins walk', type: 'Groceries' },
      { name: 'Bandra Linking Road Shopping', distance: '6 mins walk', type: 'Fashion District' },
      { name: 'Bandra Railway Station', distance: '8 mins drive', type: 'Transit' },
    ],
  },
];
