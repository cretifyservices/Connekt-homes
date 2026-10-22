import React from 'react';
import { HeroThrillhikers } from '../sections/HeroThrillhikers';
import { PressMarquee } from '../sections/PressMarquee';
import { EnclavesCarousel } from '../sections/EnclavesCarousel';
import { OffersCarousel } from '../sections/OffersCarousel';
import { PolaroidStories } from '../sections/PolaroidStories';
import { SignatureStays } from '../sections/SignatureStays';
import { RealReviewsMarquee } from '../sections/RealReviewsMarquee';
import { WhyStayWithUs } from '../sections/WhyStayWithUs';
import { ReelsGallery } from '../sections/ReelsGallery';
import { SplitFaq } from '../sections/SplitFaq';
import { InstagramCreatorCards } from '../sections/InstagramCreatorCards';
import { ActionCtaBanner } from '../sections/ActionCtaBanner';

interface HomePageProps {
  onOpenBookModal: (locationName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBookModal }) => {
  return (
    <div className="space-y-0 overflow-hidden bg-[#FAF6F0]">
      {/* 1. HERO WITH AESTHETIC WAVE ANIMATION, REAL FLAT IMAGES & BOOK MODAL TRIGGER */}
      <HeroThrillhikers onOpenBookModal={() => onOpenBookModal()} />

      {/* 2. BODY LIFT OVER HERO */}
      <div className="relative z-20 -mt-8 sm:-mt-14 rounded-t-[36px] sm:rounded-t-[54px] bg-[#FAF6F0] shadow-[0_-20px_50px_rgba(20,33,61,0.06)] overflow-hidden">
        {/* Continuous Editorial Press Marquee */}
        <PressMarquee />

        {/* 3. CURATED RESIDENCES / ENCLAVES CAROUSEL */}
        <EnclavesCarousel />

        {/* 4. EXCLUSIVE OFFERS & PROMOS PANORAMIC CAROUSEL */}
        <OffersCarousel onOpenBookModal={() => onOpenBookModal()} />

        {/* 5. SIGNATURE RESIDENCES GRID WITH REAL DETAILS & IMAGES */}
        <SignatureStays onOpenBookModal={onOpenBookModal} />

        {/* 6. REAL AIRBNB REVIEWS HORIZONTAL AUTO-LOOP SCROLLING */}
        <RealReviewsMarquee />

        {/* 7. TILTED POLAROID STORIES ON COLORFUL BLOCKS */}
        <PolaroidStories />

        {/* 8. WHY STAY WITH US: STAT BAND & 3 VALUE PILLARS */}
        <WhyStayWithUs />

        {/* 9. VERTICAL REELS / AESTHETIC MOMENTS GALLERY */}
        <ReelsGallery />

        {/* 10. SPLIT FAQ WITH WHATSAPP BUTTON & ROUND ACCORDION */}
        <SplitFaq />

        {/* 11. INSTAGRAM CREATORS & VERIFIED GUEST CARDS */}
        <InstagramCreatorCards />

        {/* 12. PUNCHY CORAL CTA BANNER */}
        <ActionCtaBanner onOpenBookModal={() => onOpenBookModal()} />
      </div>
    </div>
  );
};
