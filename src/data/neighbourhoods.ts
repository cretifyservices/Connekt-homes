export interface NeighbourhoodSpot {
  name: string;
  category: 'Cafe & Coffee' | 'Dining & Wine' | 'Culture & Heritage' | 'Seaside & Nature' | 'Boutique & Retail';
  distance: string;
  walkMinutes: number;
  description: string;
  coordinates: { x: number; y: number }; // relative map percentage
}

export interface NeighbourhoodArea {
  id: string;
  name: string;
  headline: string;
  vibe: string;
  description: string;
  keySpots: NeighbourhoodSpot[];
}

export const NEIGHBOURHOODS_DATA: NeighbourhoodArea[] = [
  {
    id: 'pali-hill',
    name: 'Pali Hill',
    headline: 'Bandra’s Green Sanctuary',
    vibe: 'Quiet tree-canopied residential lanes, discreet celebrities, bougainvillea gates, and calm serenity.',
    description:
      'Perched gently above the bustle of suburban Mumbai, Pali Hill is celebrated for its lush gulmohar trees, heritage bungalows, and serene atmosphere. It feels like a secret coastal garden where writers, designers, and film professionals find retreat.',
    keySpots: [
      {
        name: 'Subko Coffee Roasters',
        category: 'Cafe & Coffee',
        distance: '350m',
        walkMinutes: 4,
        description: 'Single-origin Indian coffee and craft sourdough pastries in a restored heritage bungalow.',
        coordinates: { x: 45, y: 44 },
      },
      {
        name: 'Pali Bhavan',
        category: 'Dining & Wine',
        distance: '600m',
        walkMinutes: 7,
        description: 'Vintage vintage Indian cuisine in an antique wood-paneled bohemian salon.',
        coordinates: { x: 50, y: 48 },
      },
      {
        name: 'Candies at Mac Ronells',
        category: 'Cafe & Coffee',
        distance: '750m',
        walkMinutes: 9,
        description: 'Iconic multi-level Portuguese villa serving iced teas and comfort delicacies.',
        coordinates: { x: 54, y: 52 },
      },
      {
        name: 'Bandra Gymkhana',
        category: 'Culture & Heritage',
        distance: '800m',
        walkMinutes: 10,
        description: 'Heritage members club dating to 1935 with historic sporting courts.',
        coordinates: { x: 48, y: 56 },
      },
    ],
  },
  {
    id: 'carter-road',
    name: 'Carter Road & Seaside',
    headline: 'Arabian Sea Breezes & Sunsets',
    vibe: 'Seaside promenade, open horizons, early morning runners, and seaside sunset cafes.',
    description:
      'Stretching along the western coast of Bandra, Carter Road promenade is Mumbai’s favorite sunset gathering spot. Sea breezes, dog walkers, and open sky combine with an eclectic culinary row of gelaterias and coastal bistros.',
    keySpots: [
      {
        name: 'Joggers Park',
        category: 'Seaside & Nature',
        distance: '400m',
        walkMinutes: 5,
        description: 'Lush coastal park with duck ponds, clay running tracks, and sea breezes.',
        coordinates: { x: 26, y: 35 },
      },
      {
        name: 'Bastian Bandra',
        category: 'Dining & Wine',
        distance: '650m',
        walkMinutes: 8,
        description: 'Acclaimed modern seafood dining and creative desserts.',
        coordinates: { x: 30, y: 38 },
      },
      {
        name: 'Carter Road Amphitheatre',
        category: 'Culture & Heritage',
        distance: '300m',
        walkMinutes: 4,
        description: 'Open-air seafront pavilion hosting acoustic gigs and spoken word.',
        coordinates: { x: 24, y: 40 },
      },
    ],
  },
  {
    id: 'ranwar-village',
    name: 'Ranwar & Chapel Road',
    headline: '18th-Century Portuguese Enclave',
    vibe: 'Cobblestone streets, colorful wooden balconies, vibrant street murals, and boutique cafes.',
    description:
      'One of Bandra’s original 24 pakhadis (villages), Ranwar retains its distinct communal squares, timber verandas, and quiet charm. Chapel Road winds through famous international street art pieces and intimate specialty bakeries.',
    keySpots: [
      {
        name: 'Veronica’s Deli',
        category: 'Dining & Wine',
        distance: '200m',
        walkMinutes: 2,
        description: 'New York style pastrami sandwiches in a former heritage bakery.',
        coordinates: { x: 62, y: 70 },
      },
      {
        name: 'Birdsong Organic Cafe',
        category: 'Cafe & Coffee',
        distance: '300m',
        walkMinutes: 3,
        description: 'Sun-filled rustic brick cafe offering farm-to-table organic treats.',
        coordinates: { x: 64, y: 73 },
      },
      {
        name: 'Ranwar Village Square',
        category: 'Culture & Heritage',
        distance: '150m',
        walkMinutes: 2,
        description: 'The historic communal wooden cross square founded in 1716.',
        coordinates: { x: 60, y: 71 },
      },
    ],
  },
  {
    id: 'mount-mary-bandstand',
    name: 'Mount Mary & Bandstand',
    headline: 'Panoramic Hillside & Coastal Rocks',
    vibe: 'Spiritual quietude, colonial architectural heritage, sea forts, and sweeping views of the city skyline.',
    description:
      'Ascend the winding hill toward the Basilica of Our Lady of the Mount, an 18th-century sanctuary. Just down the slope lies Bandstand promenade with Bandra Fort and the historic Portuguese Castella de Aguada looking across Mahim Bay.',
    keySpots: [
      {
        name: 'Mount Mary Basilica',
        category: 'Culture & Heritage',
        distance: '250m',
        walkMinutes: 3,
        description: 'Gothic revival historic church overlooking the Arabian Sea.',
        coordinates: { x: 32, y: 84 },
      },
      {
        name: 'Bandra Fort (Castella de Aguada)',
        category: 'Culture & Heritage',
        distance: '650m',
        walkMinutes: 8,
        description: '1640 Portuguese sea fortress watching over the Sea Link suspension bridge.',
        coordinates: { x: 28, y: 88 },
      },
      {
        name: 'Taj Lands End Sunset Lounge',
        category: 'Dining & Wine',
        distance: '500m',
        walkMinutes: 6,
        description: 'Panoramic open-air terrace with cocktails and tranquil sea views.',
        coordinates: { x: 34, y: 86 },
      },
    ],
  },
];
