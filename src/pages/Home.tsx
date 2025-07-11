import React from 'react';
import Hero from '../components/Hero';
import NewsletterSubscription from '../components/NewsletterSubscription';
import CoOrganizers from '../components/Partners';
import Sponsors from '../components/Sponsors';
import Agenda from '../components/Agenda';
import ResourcesGrid from '../components/ResourcesGrid';

interface HomeProps {
  onRegisterClick: () => void;
  onCoOrganizerClick: () => void;
  onIdeaClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick, onCoOrganizerClick, onIdeaClick }) => {
  return (
    <>
      <Hero onRegisterClick={onRegisterClick} />
      <NewsletterSubscription />
      <CoOrganizers onCoOrganizerClick={onCoOrganizerClick} />
      <Sponsors />
      <ResourcesGrid />
      <Agenda onIdeaClick={onIdeaClick} />
    </>
  );
};

export default Home;