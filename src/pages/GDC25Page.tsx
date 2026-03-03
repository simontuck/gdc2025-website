import React from 'react';
import { Calendar } from 'lucide-react';
import ConferencePhoto from '../components/ConferencePhoto';
import ResourcesGrid from '../components/ResourcesGrid';
import Sponsors from '../components/Sponsors';

const GDC25Page: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary-700 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">July 1–2, 2025 | Geneva, Switzerland</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Global Digital Collaboration Conference 2025
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow">
              Explore the archive of presentations, speakers, and resources from the inaugural GDC conference.
            </p>
          </div>
        </div>
      </section>

      {/* Conference Photo */}
      <ConferencePhoto />

      {/* Conference Resources */}
      <ResourcesGrid />

      {/* Sponsors */}
      <Sponsors />
    </div>
  );
};

export default GDC25Page;
