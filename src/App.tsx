import React, { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CompareModal } from './components/CompareModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookStayModal } from './components/BookStayModal';

import { HomePage } from './pages/Home';
import { StaysPage } from './pages/Stays';
import { StayDetailPage } from './pages/StayDetail';
import { CheckoutPage } from './pages/Checkout';
import { ConfirmationPage } from './pages/Confirmation';
import { ExperiencesPage } from './pages/Experiences';
import { CorporatePage } from './pages/Corporate';
import { ListPropertyPage } from './pages/ListProperty';
import { AboutPage } from './pages/About';
import { CareersPage } from './pages/Careers';
import { ContactPage } from './pages/Contact';
import { PoliciesPage } from './pages/Policies';
import { AdminPortalPage } from './pages/AdminPortal';
import { NotFoundPage } from './pages/NotFound';

const AppContent: React.FC = () => {
  const { currentRoute } = useBooking();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [preselectedLocation, setPreselectedLocation] = useState('');

  const handleOpenBookModal = (locationName?: string) => {
    setPreselectedLocation(locationName || '');
    setBookModalOpen(true);
  };

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const cleanRoute = (pathname && pathname !== '/' && pathname !== '/index.html' ? pathname : currentRoute)
    .split('?')[0]
    .replace(/\/$/, '');
  const isAdminRoute =
    cleanRoute === '/admin' ||
    cleanRoute === 'admin' ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) ||
    (typeof window !== 'undefined' && window.location.hash.startsWith('#/admin'));

  // Router Dispatch
  const renderRoute = () => {
    if (isAdminRoute) {
      return <AdminPortalPage />;
    }
    if (cleanRoute === '' || cleanRoute === '/') {
      return <HomePage onOpenBookModal={handleOpenBookModal} />;
    }
    if (cleanRoute === '/stays') {
      return <StaysPage />;
    }
    if (cleanRoute.startsWith('/stay/')) {
      return <StayDetailPage />;
    }
    if (cleanRoute === '/checkout') {
      return <CheckoutPage />;
    }
    if (cleanRoute === '/confirmed') {
      return <ConfirmationPage />;
    }
    if (cleanRoute === '/experiences') {
      return <ExperiencesPage />;
    }
    if (cleanRoute === '/corporate') {
      return <CorporatePage />;
    }
    if (cleanRoute === '/list') {
      return <ListPropertyPage />;
    }
    if (cleanRoute === '/about') {
      return <AboutPage />;
    }
    if (cleanRoute === '/careers') {
      return <CareersPage />;
    }
    if (cleanRoute === '/contact') {
      return <ContactPage />;
    }
    if (cleanRoute === '/policies') {
      return <PoliciesPage />;
    }

    return <NotFoundPage />;
  };

  // If viewing admin portal, provide clean dedicated management canvas
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#2B2F3A] selection:bg-[#F8E1E8] selection:text-[#D93A6B]">
        <AdminPortalPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] selection:bg-[#F8E1E8] selection:text-[#D93A6B]">
      {/* Session Preloader */}
      <Preloader />

      {/* Top Floating Navbar */}
      <Header
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCompare={() => setCompareOpen(true)}
        onOpenBookModal={() => handleOpenBookModal()}
      />

      {/* Active Page View */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Global Interactive Book A Stay Multi-Step Modal */}
      <BookStayModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        preselectedLocation={preselectedLocation}
      />

      {/* Global Modals & Overlays */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />

      <CompareModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
      />

      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
