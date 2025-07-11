import React from 'react';
import Hero from '../components/Hero';
import NewsletterSubscription from '../components/NewsletterSubscription';
import CoOrganizers from '../components/Partners';
import Sponsors from '../components/Sponsors';
import ResourcesGrid from '../components/ResourcesGrid';
import BookOfProceedings from '../components/BookOfProceedings';

interface HomeProps {
  onRegisterClick: () => void;
  onCoOrganizerClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick, onCoOrganizerClick }) => {
  return (
    <>
      <Hero onRegisterClick={onRegisterClick} />
      <ResourcesGrid />
      <BookOfProceedings />
      <NewsletterSubscription />
      <CoOrganizers onCoOrganizerClick={onCoOrganizerClick} />
      <Sponsors />
    </>
  );
};

export default Home;