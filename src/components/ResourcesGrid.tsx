import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Presentation, FileText, Calendar, Play, Users, BookOpen } from 'lucide-react';

type Resource = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  external: boolean;
};

const resources: Resource[] = [
  // Row 1 — navigation
  {
    icon: <Calendar className="h-8 w-8 text-gray-500" />,
    title: 'Agenda',
    description: 'View the full two-day conference program featuring keynotes, workshops, and presentations.',
    buttonText: 'View Agenda',
    href: '/agenda',
    external: false,
  },
  {
    icon: <Users className="h-8 w-8 text-gray-500" />,
    title: 'Speakers',
    description: 'Browse profiles of all GDC25 speakers and panelists.',
    buttonText: 'View Speakers',
    href: '/speakers',
    external: false,
  },
  {
    icon: <Users className="h-8 w-8 text-gray-500" />,
    title: 'Co-Organizers',
    description: 'Organizations that co-organized GDC25.',
    buttonText: 'View Co-Organizers',
    href: '/co-organizers-2025',
    external: false,
  },
  // Row 2 — resources
  {
    icon: <Presentation className="h-8 w-8 text-gray-500" />,
    title: 'Day 1, Slides and Videos',
    description: 'Access all slides and presentations from the first day\'s keynotes and sessions on digital identity systems and use cases.',
    buttonText: 'View Slides & Videos',
    href: '/session-slides',
    external: false,
  },
  {
    icon: <FileText className="h-8 w-8 text-gray-500" />,
    title: 'Beat Jans Keynote',
    description: 'Read the full text of the opening keynote address by Swiss Federal Councillor Beat Jans on digital collaboration and Switzerland\'s digital future.',
    buttonText: 'Read Full Speech',
    href: 'https://www.eid.admin.ch/de/global-digital-collaboration-conference',
    external: true,
  },
  {
    icon: <BookOpen className="h-8 w-8 text-gray-500" />,
    title: 'Book of Proceedings',
    description: 'The complete conference proceedings including presentations, papers, and workshop outcomes from GDC25.',
    buttonText: 'Download Book of Proceedings',
    href: '/documents/book-of-proceedings.pdf',
    external: true,
  },
  // Row 3 — photos
  {
    icon: <Camera className="h-8 w-8 text-gray-500" />,
    title: 'Conference Photos',
    description: 'Relive the moments from GDC25. Browse through our gallery of keynotes, networking sessions, and memorable interactions.',
    buttonText: 'View Photo Gallery',
    href: 'https://share.dma.swiss/s/XCx7CadWobSs9WR',
    external: true,
  },
];

const ResourcesGrid: React.FC = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access presentations, photos, videos, and other materials from the Global Digital Collaboration Conference 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex items-center mb-4">
                {resource.icon}
                <h3 className="ml-3 text-lg font-semibold text-gray-900">{resource.title}</h3>
              </div>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                {resource.description}
              </p>

              <div className="mt-auto pt-4">
                {resource.external ? (
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center btn btn-primary"
                  >
                    {resource.buttonText}
                  </a>
                ) : (
                  <Link
                    to={resource.href}
                    className="inline-block w-full text-center btn btn-primary"
                  >
                    {resource.buttonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesGrid;
