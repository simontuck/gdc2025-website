import React from 'react';
import Hero from '../components/Hero';
import GDC26CoOrganizers from '../components/GDC26CoOrganizers';
import SponsorInquiry from '../components/SponsorInquiry';
import NewsletterSubscription from '../components/NewsletterSubscription';

interface HomeProps {
  onRegisterClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick }) => {
  return (
    <>
      <Hero onRegisterClick={onRegisterClick} />
      <GDC26CoOrganizers />
      <SponsorInquiry />
      <NewsletterSubscription />
    </>
  );
};

export default Home;
