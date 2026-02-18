import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Play, Users, FileText, Presentation } from 'lucide-react';
import ConferencePhoto from '../components/ConferencePhoto';
import ResourcesGrid from '../components/ResourcesGrid';
import BookOfProceedings from '../components/BookOfProceedings';
import Sponsors from '../components/Sponsors';

const navCards = [
  {
    icon: <Presentation className="h-8 w-8 text-primary-500" />,
    title: 'Slides & Videos',
    description: 'Access all presentations and recorded sessions from GDC25.',
    to: '/session-slides',
  },
  {
    icon: <Users className="h-8 w-8 text-primary-500" />,
    title: 'Speakers',
    description: 'Browse profiles of all GDC25 speakers and panelists.',
    to: '/speakers',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary-500" />,
    title: 'Agenda',
    description: 'View the full two-day conference program.',
    to: '/agenda',
  },
  {
    icon: <Play className="h-8 w-8 text-primary-500" />,
    title: 'Sessions Overview',
    description: 'Explore all conference sessions and their outcomes.',
    to: '/sessions-overview',
  },
  {
    icon: <Users className="h-8 w-8 text-primary-500" />,
    title: 'Co-Organizers 2025',
    description: 'Organizations that co-organized GDC25.',
    to: '/co-organizers-2025',
  },
];

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

      {/* Navigation Cards */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">GDC25 Archive</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access all materials from the Global Digital Collaboration Conference 2025.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navCards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <ResourcesGrid />

      {/* Book of Proceedings */}
      <BookOfProceedings />

      {/* Sponsors */}
      <Sponsors />
    </div>
  );
};

export default GDC25Page;
