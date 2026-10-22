export interface Review {
  id: string;
  guestName: string;
  location: string;
  stayDate: string;
  rating: number; // out of 5
  comment: string;
  propertyStayed?: string;
  isVerified: boolean;
  avatarUrl?: string;
}

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-sajjan',
    guestName: 'Sajjan Jain',
    location: 'Bengaluru, India',
    stayDate: 'October 2026',
    rating: 5,
    comment:
      'It was happy family space. Very neat & well maintained by Host Connekt. All utensils also kept very neatly maintained n hygienic so tat we can prepare & have. Value for money . Worth it . Thank u soo muchhh😇🙏',
    propertyStayed: '2 Bed 2 Bath Prime Bandra Ocean Park',
    isVerified: true,
  },
  {
    id: 'rev-ismail',
    guestName: 'Ismail',
    location: 'Verified Guest',
    stayDate: 'February 2026',
    rating: 5,
    comment:
      "Connekt is a very reliable host. You'd be safe with them, they made my stay in Mumbai more beautiful. They keep their properties very well maintained, the cleaning service they provide is excellent.",
    propertyStayed: 'Bandra No 1 minutes away from Sea',
    isVerified: true,
  },
  {
    id: 'rev-vimal',
    guestName: 'Vimal',
    location: 'Mumbai, India',
    stayDate: 'June 2024',
    rating: 5,
    comment:
      'To my surprise, the host (Divyam) was fully responsive even during odd hours so I didn\'t face any issues with checkin, finding the place, using the kitchen, appliances etc.',
    propertyStayed: '5 Star Luxury ✪ Pool, Gym✪ Nr Airport ✪ BKC ✪Rm 1',
    isVerified: true,
  },
  {
    id: 'rev-christian',
    guestName: 'Christian',
    location: 'Verified Guest',
    stayDate: 'September 2025',
    rating: 5,
    comment:
      'Thank you so much to everyone at Connekt for making my experience in Mumbai so enjoyable.',
    propertyStayed: 'Bandra No 1 minutes away from Sea',
    isVerified: true,
  },
  {
    id: 'rev-ankita',
    guestName: 'Ankita',
    location: 'Verified Guest',
    stayDate: 'September 2025',
    rating: 5,
    comment:
      'Had some initial hiccups in checking in but the team was very very prompt to resolve the issue. The washroom size is a little small.',
    propertyStayed: '2 Bed 2 Bath Prime Bandra Ocean Park',
    isVerified: true,
  },
  {
    id: 'rev-harin',
    guestName: 'Harin',
    location: 'Verified Guest',
    stayDate: 'October 2026',
    rating: 5,
    comment: 'good cosy place',
    propertyStayed: '5 Star Luxury ✪ Pool, Gym✪ Nr Airport ✪ BKC ✪Rm 1',
    isVerified: true,
  },
  {
    id: 'rev-umar',
    guestName: 'Umar',
    location: 'Srinagar, India',
    stayDate: 'August 2024',
    rating: 4,
    comment:
      'The services are fine but home appliances needs to be upgraded. The AC & TV are of old model. The WiFi is weak and gets disconnected.',
    propertyStayed: 'Bandra No 1 minutes away from Sea',
    isVerified: true,
  },
];
