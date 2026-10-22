import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stay, STAYS_DATA } from '../data/stays';
import { Review, REVIEWS_DATA } from '../data/reviews';

export interface BookingDetails {
  stayId: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  guests: number;
  extras: {
    earlyCheckIn: boolean;
    lateCheckOut: boolean;
    airportPickup: boolean;
    groceryPack: boolean;
    extraCleaning: boolean;
  };
  promoCode: string;
  discountPercentage: number;
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests: string;
    idUploaded: boolean;
  };
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'split';
  bookingId?: string;
  createdAt?: string;
}

export interface SiteConfig {
  videoUrl: string;
  videoTitle: string;
  videoSubtitle: string;
  whatsappNumber: string;
  email: string;
  receptionAddress: string;
  phone: string;
  instagramUrl: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  videoUrl:
    'https://res.cloudinary.com/yvbshrkz/video/upload/v1792657573/WhatsApp_Video_2026-10-19_at_2.25.31_PM_2.mp4',
  videoTitle: 'Cinematic Residence Tour',
  videoSubtitle:
    'Step inside our curated serviced residences in Bandra West, Mumbai — bathed in natural daylight and quiet elegance.',
  whatsappNumber: '+91 97691 56086',
  email: 'info@connekthomes.in',
  receptionAddress: '418 Ahinsa Road Khar West, Mumbai 400052 India',
  phone: '+91 97691 56086',
  instagramUrl: 'https://www.instagram.com/connekt_homes/',
};

interface BookingContextType {
  // Navigation / Hash
  currentRoute: string;
  routeParams: Record<string, string>;
  navigateTo: (path: string) => void;

  // Stays & Persistence
  allStays: Stay[];
  addStay: (stay: Stay) => void;
  updateStay: (id: string, updates: Partial<Stay>) => void;
  deleteStay: (id: string) => void;

  // Reviews & Persistence
  allReviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;

  // Site / Media / Contact Config
  siteConfig: SiteConfig;
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;

  // Data Import / Export / Backup
  exportAllData: () => string;
  importAllData: (jsonStr: string) => { success: boolean; message: string; count?: { stays: number; reviews: number } };
  resetToDefaults: () => void;

  // Search
  searchDestination: string;
  setSearchDestination: (val: string) => void;
  searchDates: { start: string; end: string };
  setSearchDates: (val: { start: string; end: string }) => void;
  searchGuests: number;
  setSearchGuests: (val: number) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (stayId: string) => void;
  isWishlisted: (stayId: string) => boolean;

  // Comparison
  compareList: string[];
  toggleCompare: (stayId: string) => void;
  removeFromCompare: (stayId: string) => void;
  clearCompare: () => void;

  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (stayId: string) => void;

  // Active Booking
  bookingDetails: BookingDetails;
  updateBookingDetails: (updates: Partial<BookingDetails>) => void;
  updateGuestInfo: (updates: Partial<BookingDetails['guestInfo']>) => void;
  toggleExtra: (key: keyof BookingDetails['extras']) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  calculatePricing: (stay: Stay, details?: BookingDetails) => {
    nightlyRate: number;
    nights: number;
    accommodationTotal: number;
    cleaningFee: number;
    extrasTotal: number;
    subtotal: number;
    discountAmount: number;
    gstAmount: number;
    grandTotal: number;
  };
  confirmBooking: () => string; // returns bookingId
  lastConfirmedBooking: {
    details: BookingDetails;
    stay: Stay;
    pricing: ReturnType<BookingContextType['calculatePricing']>;
  } | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const EXTRA_PRICES = {
  earlyCheckIn: 1200,
  lateCheckOut: 1200,
  airportPickup: 1800,
  groceryPack: 1500,
  extraCleaning: 800,
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Route resolution supporting both direct path (e.g. /admin) and hash
  const resolveCurrentRoute = (): string => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    // Direct path check for /admin or clean routes
    if (path && path !== '/' && path !== '/index.html') {
      return path;
    }
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(() => resolveCurrentRoute());
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleRouteSync = () => {
      const route = resolveCurrentRoute();
      setCurrentRoute(route);

      // Route param matching: /stay/:id
      if (route.startsWith('/stay/')) {
        const id = route.replace('/stay/', '').split('?')[0];
        setRouteParams({ id });
      } else {
        setRouteParams({});
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);
    handleRouteSync();

    return () => {
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
    };
  }, []);

  const navigateTo = (path: string) => {
    const target = path.startsWith('/') ? path : `/${path}`;
    try {
      window.history.pushState({}, '', target);
    } catch {
      // fallback
    }
    window.location.hash = target;
    setCurrentRoute(target);
    if (target.startsWith('/stay/')) {
      const id = target.replace('/stay/', '').split('?')[0];
      setRouteParams({ id });
    } else {
      setRouteParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. DYNAMIC STAYS WITH LOCALSTORAGE PERSISTENCE
  const [allStays, setAllStays] = useState<Stay[]>(() => {
    try {
      const stored = localStorage.getItem('connekt_stays');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed reading stays from localStorage:', e);
    }
    return STAYS_DATA;
  });

  const saveStays = (newStays: Stay[]) => {
    setAllStays(newStays);
    try {
      localStorage.setItem('connekt_stays', JSON.stringify(newStays));
    } catch (e) {
      console.error('Failed saving stays to localStorage:', e);
    }
  };

  const addStay = (stay: Stay) => {
    const updated = [stay, ...allStays];
    saveStays(updated);
  };

  const updateStay = (id: string, updates: Partial<Stay>) => {
    const updated = allStays.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveStays(updated);
  };

  const deleteStay = (id: string) => {
    const updated = allStays.filter((s) => s.id !== id);
    saveStays(updated);
  };

  // 2. DYNAMIC REVIEWS WITH LOCALSTORAGE PERSISTENCE
  const [allReviews, setAllReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem('connekt_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed reading reviews from localStorage:', e);
    }
    return REVIEWS_DATA;
  });

  const saveReviews = (newReviews: Review[]) => {
    setAllReviews(newReviews);
    try {
      localStorage.setItem('connekt_reviews', JSON.stringify(newReviews));
    } catch (e) {
      console.error('Failed saving reviews to localStorage:', e);
    }
  };

  const addReview = (review: Review) => {
    const updated = [review, ...allReviews];
    saveReviews(updated);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    const updated = allReviews.map((r) => (r.id === id ? { ...r, ...updates } : r));
    saveReviews(updated);
  };

  const deleteReview = (id: string) => {
    const updated = allReviews.filter((r) => r.id !== id);
    saveReviews(updated);
  };

  // 3. DYNAMIC SITE CONFIG WITH LOCALSTORAGE PERSISTENCE
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const stored = localStorage.getItem('connekt_site_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error('Failed reading siteConfig from localStorage:', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => {
      const merged = { ...prev, ...updates };
      try {
        localStorage.setItem('connekt_site_config', JSON.stringify(merged));
      } catch (e) {
        console.error('Failed saving siteConfig to localStorage:', e);
      }
      return merged;
    });
  };

  // 4. DATA EXPORT / IMPORT / RESTORE
  const exportAllData = (): string => {
    const payload = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      siteConfig,
      stays: allStays,
      reviews: allReviews,
    };
    return JSON.stringify(payload, null, 2);
  };

  const importAllData = (
    jsonStr: string
  ): { success: boolean; message: string; count?: { stays: number; reviews: number } } => {
    try {
      const parsed = JSON.parse(jsonStr);
      let importedStays: Stay[] | null = null;
      let importedReviews: Review[] | null = null;
      let importedConfig: Partial<SiteConfig> | null = null;

      // Check if it's our complete export format or a direct array
      if (Array.isArray(parsed)) {
        // Check if first element looks like a Stay or Review
        if (parsed.length > 0 && 'pricePerNight' in parsed[0]) {
          importedStays = parsed as Stay[];
        } else if (parsed.length > 0 && 'comment' in parsed[0]) {
          importedReviews = parsed as Review[];
        }
      } else if (typeof parsed === 'object' && parsed !== null) {
        if (Array.isArray(parsed.stays)) {
          importedStays = parsed.stays;
        }
        if (Array.isArray(parsed.reviews)) {
          importedReviews = parsed.reviews;
        }
        if (parsed.siteConfig && typeof parsed.siteConfig === 'object') {
          importedConfig = parsed.siteConfig;
        }
      }

      if (!importedStays && !importedReviews && !importedConfig) {
        return {
          success: false,
          message: 'Could not detect valid Stays, Reviews, or Site Config in the uploaded file.',
        };
      }

      if (importedStays && importedStays.length > 0) {
        saveStays(importedStays);
      }
      if (importedReviews && importedReviews.length > 0) {
        saveReviews(importedReviews);
      }
      if (importedConfig) {
        updateSiteConfig(importedConfig);
      }

      return {
        success: true,
        message: `Successfully synchronized! Detected ${importedStays?.length ?? 0} stays and ${importedReviews?.length ?? 0} reviews.`,
        count: {
          stays: importedStays?.length ?? allStays.length,
          reviews: importedReviews?.length ?? allReviews.length,
        },
      };
    } catch (err: any) {
      return {
        success: false,
        message: `JSON parse error: ${err.message || 'Invalid JSON format'}`,
      };
    }
  };

  const resetToDefaults = () => {
    saveStays(STAYS_DATA);
    saveReviews(REVIEWS_DATA);
    updateSiteConfig(DEFAULT_SITE_CONFIG);
  };

  // Search State
  const [searchDestination, setSearchDestination] = useState('Bandra West, Mumbai');
  const today = new Date();
  const defStart = new Date(today);
  defStart.setDate(today.getDate() + 1);
  const defEnd = new Date(today);
  defEnd.setDate(today.getDate() + 4);

  const formatDateStr = (d: Date) => d.toISOString().split('T')[0];

  const [searchDates, setSearchDates] = useState({
    start: formatDateStr(defStart),
    end: formatDateStr(defEnd),
  });
  const [searchGuests, setSearchGuests] = useState(2);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('connekt_wishlist');
      return stored ? JSON.parse(stored) : ['bandra-sea-minutes'];
    } catch {
      return ['bandra-sea-minutes'];
    }
  });

  const toggleWishlist = (stayId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(stayId) ? prev.filter((id) => id !== stayId) : [...prev, stayId];
      try {
        localStorage.setItem('connekt_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isWishlisted = (stayId: string) => wishlist.includes(stayId);

  // Compare List (up to 3)
  const [compareList, setCompareList] = useState<string[]>([]);
  const toggleCompare = (stayId: string) => {
    setCompareList((prev) => {
      if (prev.includes(stayId)) {
        return prev.filter((id) => id !== stayId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], stayId];
      }
      return [...prev, stayId];
    });
  };
  const removeFromCompare = (stayId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== stayId));
  };
  const clearCompare = () => setCompareList([]);

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const addRecentlyViewed = (stayId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== stayId);
      return [stayId, ...filtered].slice(0, 5);
    });
  };

  // Booking details state
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    stayId: 'bandra-sea-minutes',
    checkInDate: formatDateStr(defStart),
    checkOutDate: formatDateStr(defEnd),
    nights: 3,
    guests: 2,
    extras: {
      earlyCheckIn: false,
      lateCheckOut: false,
      airportPickup: false,
      groceryPack: false,
      extraCleaning: false,
    },
    promoCode: '',
    discountPercentage: 0,
    guestInfo: {
      fullName: '',
      email: '',
      phone: '',
      country: 'India',
      specialRequests: '',
      idUploaded: false,
    },
    paymentMethod: 'upi',
  });

  const updateBookingDetails = (updates: Partial<BookingDetails>) => {
    setBookingDetails((prev) => {
      const merged = { ...prev, ...updates };
      if (updates.checkInDate || updates.checkOutDate) {
        const start = new Date(merged.checkInDate);
        const end = new Date(merged.checkOutDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        merged.nights = diffDays;
      }
      return merged;
    });
  };

  const updateGuestInfo = (updates: Partial<BookingDetails['guestInfo']>) => {
    setBookingDetails((prev) => ({
      ...prev,
      guestInfo: { ...prev.guestInfo, ...updates },
    }));
  };

  const toggleExtra = (key: keyof BookingDetails['extras']) => {
    setBookingDetails((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [key]: !prev.extras[key],
      },
    }));
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CONNEKT10') {
      updateBookingDetails({ promoCode: clean, discountPercentage: 10 });
      return { success: true, message: '10% Direct Booking Discount Applied!' };
    }
    if (clean === 'LONGSTAY15') {
      updateBookingDetails({ promoCode: clean, discountPercentage: 15 });
      return { success: true, message: '15% Extended Stay Privilege Applied!' };
    }
    return { success: false, message: 'Invalid or expired code. Try CONNEKT10' };
  };

  // Dynamic pricing engine
  const calculatePricing = (stay: Stay, details?: BookingDetails) => {
    const activeDetails = details || bookingDetails;
    const nightlyRate = stay.pricePerNight;
    const nightsCount = activeDetails.nights || 1;
    const accommodationTotal = nightlyRate * nightsCount;

    let extrasTotal = 0;
    if (activeDetails.extras.earlyCheckIn) extrasTotal += EXTRA_PRICES.earlyCheckIn;
    if (activeDetails.extras.lateCheckOut) extrasTotal += EXTRA_PRICES.lateCheckOut;
    if (activeDetails.extras.airportPickup) extrasTotal += EXTRA_PRICES.airportPickup;
    if (activeDetails.extras.groceryPack) extrasTotal += EXTRA_PRICES.groceryPack;
    if (activeDetails.extras.extraCleaning) extrasTotal += EXTRA_PRICES.extraCleaning;

    const cleaningFee = stay.cleaningFee || 1000;
    const subtotal = accommodationTotal + extrasTotal + cleaningFee;
    const discountAmount = Math.round((subtotal * activeDetails.discountPercentage) / 100);
    const postDiscount = subtotal - discountAmount;
    const gstAmount = Math.round(postDiscount * 0.12);
    const grandTotal = postDiscount + gstAmount;

    return {
      nightlyRate,
      nights: nightsCount,
      accommodationTotal,
      cleaningFee,
      extrasTotal,
      subtotal,
      discountAmount,
      gstAmount,
      grandTotal,
    };
  };

  // Confirmation state
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<{
    details: BookingDetails;
    stay: Stay;
    pricing: ReturnType<typeof calculatePricing>;
  } | null>(null);

  const confirmBooking = (): string => {
    const activeStay = allStays.find((s) => s.id === bookingDetails.stayId) || allStays[0];
    const finalPricing = calculatePricing(activeStay, bookingDetails);
    const newBookingId = `CNK-${Math.floor(100000 + Math.random() * 900000)}`;

    const confirmedRecord = {
      details: {
        ...bookingDetails,
        bookingId: newBookingId,
        createdAt: new Date().toISOString(),
      },
      stay: activeStay,
      pricing: finalPricing,
    };

    setLastConfirmedBooking(confirmedRecord);

    try {
      const history = JSON.parse(localStorage.getItem('connekt_booking_history') || '[]');
      history.unshift(confirmedRecord);
      localStorage.setItem('connekt_booking_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }

    return newBookingId;
  };

  return (
    <BookingContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,
        allStays,
        addStay,
        updateStay,
        deleteStay,
        allReviews,
        addReview,
        updateReview,
        deleteReview,
        siteConfig,
        updateSiteConfig,
        exportAllData,
        importAllData,
        resetToDefaults,
        searchDestination,
        setSearchDestination,
        searchDates,
        setSearchDates,
        searchGuests,
        setSearchGuests,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        recentlyViewed,
        addRecentlyViewed,
        bookingDetails,
        updateBookingDetails,
        updateGuestInfo,
        toggleExtra,
        applyPromoCode,
        calculatePricing,
        confirmBooking,
        lastConfirmedBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Formatting utility for INR
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
