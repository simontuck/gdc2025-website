import React from 'react';
import Hero from '../components/Hero';
import ConferencePhoto from '../components/ConferencePhoto';
import GDC26Announcement from '../components/GDC26Announcement';
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
      <GDC26Announcement />
      <ResourcesGrid />
      <BookOfProceedings />
      <NewsletterSubscription />
      <CoOrganizersSection />
      <Sponsors />
    </>
  );
};

export default Home;