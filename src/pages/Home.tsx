import React from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import Sponsors from '../components/Sponsors';
import CoOrganizers from '../components/Partners';
import Agenda from '../components/Agenda';
import Venue from '../components/Venue';

interface HomeProps {
  onRegisterClick: () => void;
  onCoOrganizerClick: () => void;
  onIdeaClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick, onCoOrganizerClick, onIdeaClick }) => {
  return (
    <>
      <Hero onRegisterClick={onRegisterClick} />
      <Countdown />
      <Sponsors />
      <CoOrganizers onCoOrganizerClick={onCoOrganizerClick} />
      <Agenda onIdeaClick={onIdeaClick} />
      <Venue />
    </>
  );
};

export default Home;