import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useHashScroll } from './hooks/useHashScroll';
import Header from './components/Header';
import Home from './pages/Home';
import AgendaPage from './pages/AgendaPage';
import SessionsOverviewPage from './pages/SessionsOverviewPage';
import SpeakersPage from './pages/SpeakersPage';
import SessionSlidesPage from './pages/SessionSlidesPage';
import FAQPage from './pages/FAQPage';
import NotFound from './pages/NotFound';
import CoOrganizersPage from './pages/CoOrganizersPage';
import CouncilPage from './pages/CouncilPage';
import CouncilMeetingsPage from './pages/CouncilMeetingsPage';
import CallForCoOrganizersPage from './pages/CallForCoOrganizersPage';
import HotelsPage from './pages/HotelsPage';
import ImprintPage from './pages/ImprintPage';
import PrivacyPage from './pages/PrivacyPage';
import EventRegistrationTermsPage from './pages/EventRegistrationTermsPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelledPage from './pages/PaymentCancelledPage';
import MeetingRoomsPage from './pages/MeetingRoomsPage';
import NameTagGeneratorPage from './pages/NameTagGeneratorPage';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import AgendaIdeaModal from './components/AgendaIdeaModal';

const AppContent = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isAgendaIdeaModalOpen, setIsAgendaIdeaModalOpen] = useState(false);
  const location = useLocation();
  useHashScroll();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onRegisterClick={() => setIsRegistrationModalOpen(true)} />
      
      <Routes>
        <Route path="/" element={
          <Home 
            onRegisterClick={() => setIsRegistrationModalOpen(true)}
          />
        } />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/sessions-overview" element={
          <SessionsOverviewPage onIdeaClick={() => setIsAgendaIdeaModalOpen(true)} />
        } />
        <Route path="/session-slides" element={<SessionSlidesPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/council" element={<CouncilPage />} />
        <Route path="/council/meetings" element={<CouncilMeetingsPage />} />
        <Route path="/co-organizers" element={<CallForCoOrganizersPage />} />
        <Route path="/co-organizers-2025" element={<CoOrganizersPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
        <Route path="/meeting-rooms" element={<MeetingRoomsPage />} />
        <Route path="/visual-generator" element={<NameTagGeneratorPage />} />
        <Route path="/imprint" element={<ImprintPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/event-registration-terms" element={<EventRegistrationTermsPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>

      <Footer />
      
      <RegistrationModal 
        isOpen={isRegistrationModalOpen} 
        onClose={() => setIsRegistrationModalOpen(false)} 
      />
      
      <AgendaIdeaModal 
        isOpen={isAgendaIdeaModalOpen} 
        onClose={() => setIsAgendaIdeaModalOpen(false)} 
      />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;