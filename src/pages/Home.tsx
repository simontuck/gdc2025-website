import React from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import CoOrganizers from '../components/Partners';
import Sponsors from '../components/Sponsors';
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
      <CoOrganizers onCoOrganizerClick={onCoOrganizerClick} />
      <Sponsors />
      <Agenda onIdeaClick={onIdeaClick} />
      <Venue />
    </>
  );
};

export default Home;