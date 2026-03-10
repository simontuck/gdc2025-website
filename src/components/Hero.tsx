import React from 'react';
import { Calendar, Users, Building2, Cross, Ticket } from 'lucide-react';
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
            <span className="text-sm font-medium">1–3 September 2026 | Geneva, Switzerland</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Global Digital Collaboration Conference 2026
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow">
            Join us for the next edition as we continue advancing digital trust infrastructure worldwide
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
             <a
              href="https://luma.com/gdccon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-white text-white hover:text-zinc-700"
            >
              Attend
            </a>
            <Link
              to="/co-organizers"
              className="btn btn-outline border-white text-white hover:text-zinc-700"
            >
              Co-organize
            </Link>
           
            <a
              href="/documents/GC26_sponsors_v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-white text-white hover:text-zinc-700"
            >
              Sponsor
            </a>           
          </div>
          
          <div className="flex flex-col gap-4 text-white/90 drop-shadow">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Organized by Intergovernmental and Non-governmental Organizations, in particular Standard Development, and Open Source Organizations</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Join 2,000 sector leaders by invitation only via Co-Organizers</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>The global pulse of cross-sector innovation: 3 days to bridge gaps and solve for interoperability</span>
            </div>
            <div className="flex items-center">
              <Cross className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>
                Hosted by the Swiss Confederation at{" "}
                <a href="https://www.palexpo.ch/en/home/" target="_blank" rel="noopener noreferrer"  className="underline text-primary-500 hover:text-primary-500">
                  Palexpo
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;