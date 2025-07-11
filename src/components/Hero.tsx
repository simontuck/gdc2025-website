import React from 'react';
import { Calendar, MapPin, Users, Building2, Cross } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            Thank You for Making GDC25 a Success!
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow">
            Together, we shaped the future of digital trust infrastructure
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => {
                const element = document.getElementById('newsletter');
                if (element) {
                  const headerOffset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              Subscribe for Updates
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('.section'); // This will target the first section which is ResourcesGrid
                if (element) {
                  const headerOffset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="btn bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              View Resources
            </button>
          </div>
          
          <div className="flex flex-col gap-4 text-white/90 drop-shadow">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Organized by 46 Intergovernmental, Standard Development, and Open Source Organizations</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>1,000 In-person participants from the public and private sector</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>2 Days of innovation</span>
            </div>
            <div className="flex items-center">
              <Cross className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Hosted by the Swiss Confederation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;