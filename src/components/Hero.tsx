import React from 'react';
import { Calendar, MapPin, Users, Building2 } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative pt-32 md:pt-44 pb-32 md:pb-48 bg-primary-700">
      <div className="container relative z-10 mx-auto px-4 text-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">1–2 July 2025 | Geneva, Switzerland</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Global Digital Collaboration Conference
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow">
            To foster wallets, credentials and trusted infrastructure for the benefit of all humans
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://lu.ma/gc25?utm_source=gdc-website"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              Register
            </a>
            <a 
              href="#agenda" 
              className="btn bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              View Agenda
            </a>
          </div>
          
          <div className="flex flex-col gap-4 text-white/90 drop-shadow">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Hosted by the Swiss Confederation</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Up to 2,000 representatives from the public and private sector</span>
            </div>
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Organized by leading Intergovernmental, Standards Development and Open Source Organizations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;