import React from 'react';
import Hero from '../components/Hero';
import ConferencePhoto from '../components/ConferencePhoto';
import NewsletterSubscription from '../components/NewsletterSubscription';
import Sponsors from '../components/Sponsors';
import ResourcesGrid from '../components/ResourcesGrid';
import BookOfProceedings from '../components/BookOfProceedings';
import CoOrganizersSection from '../components/CoOrganizersSection';

interface HomeProps {
  onRegisterClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick }) => {
  return (
    <>
      <Hero onRegisterClick={onRegisterClick} />
      <ConferencePhoto />
      <ResourcesGrid />
      <BookOfProceedings />
      <NewsletterSubscription />
      <CoOrganizersSection />
      <Sponsors />
    </>
  );
};

export default Home;