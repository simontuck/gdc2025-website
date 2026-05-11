import React from 'react';
import Hero from '../components/Hero';
import CoOrganizersSection from '../components/CoOrganizersSection';
import SponsorInquiry from '../components/SponsorInquiry';
import NewsletterSubscription from '../components/NewsletterSubscription';

interface HomeProps {
  onRegisterClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick }) => {
  return (
    <>
      <Hero onRegisterClick={onRegisterClick} />
      <CoOrganizersSection />
      <SponsorInquiry />
      <NewsletterSubscription />
    </>
  );
};

export default Home;
