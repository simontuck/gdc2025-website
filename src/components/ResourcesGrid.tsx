import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Presentation, FileText, Calendar, Play, Shirt, BookOpen } from 'lucide-react';

const ResourcesGrid: React.FC = () => {
  const resources = [
    {
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      title: "Conference Photos",
      description: "Relive the moments from GDC25. Browse through our gallery of keynotes, networking sessions, and memorable interactions.",
      buttonText: "View Photo Gallery",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      href: "https://share.dma.swiss/s/XCx7CadWobSs9WR?dir=undefined&openfile=29024709",
      external: true
    },
    {
      icon: <Presentation className="h-8 w-8 text-blue-600" />,
      title: "Day 1 Presentations",
      description: "Access all slides and presentations from the first day's keynotes and sessions on digital identity systems and use cases.",
      buttonText: "Download Slides",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      href: "/session-slides",
      external: false
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Beat Jans Keynote Speech",
      description: "Read the full text of the opening keynote address by Swiss Federal Councillor Beat Jans on digital collaboration and Switzerland's digital future.",
      buttonText: "Read Full Speech",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      href: "https://www.eid.admin.ch/de/global-digital-collaboration-conference",
      external: true
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Book of Proceedings",
      description: "The complete conference proceedings including all presentations, papers, and workshop outcomes will be released in September 2025.",
      buttonText: null,
      buttonColor: "",
      href: "",
      external: false,
      badge: "(September 2025)",
      note: "Subscribe below to get notified when available"
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Program & Speakers",
      description: "Review the complete 2-day program featuring keynotes on digital identity systems, workshops, and presentations from global leaders.",
      buttonText: "View Full Program",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      href: "/agenda",
      external: false
    },
    {
      icon: <Play className="h-8 w-8 text-red-600" />,
      title: "GDC YouTube Channel",
      description: "Watch recorded sessions, keynote speeches, and highlights from the conference on our official YouTube channel.",
      buttonText: "Watch Videos",
      buttonColor: "bg-red-600 hover:bg-red-700",
      href: "https://www.youtube.com/playlist?list=PL_X6UOh6MHSdluNDc9xcU86wBhsN4aIjz",
      external: true
    },
    {
      icon: <Shirt className="h-8 w-8 text-red-600" />,
      title: "Conference T-Shirts",
      description: "Take home a piece of GDC25! Get your official conference t-shirt as a memento of this landmark event.",
      buttonText: "Order Your T-Shirt",
      buttonColor: "bg-red-600 hover:bg-red-700",
      href: "https://globaldigitalcollaboration.org/t-shirt",
      external: true
    }
  ];

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
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {resource.icon}
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  {resource.badge && (
                    <span className="text-sm text-red-600 font-medium">{resource.badge}</span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {resource.description}
              </p>

              {resource.note && (
                <p className="text-gray-500 text-sm italic mb-4">
                  {resource.note}
                </p>
              )}

              {resource.buttonText && (
                <div className="mt-auto">
                  {resource.external ? (
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block w-full text-center px-4 py-2 text-white rounded-md transition-colors text-sm font-medium ${resource.buttonColor}`}
                    >
                      {resource.buttonText}
                    </a>
                  ) : (
                    <Link
                      to={resource.href}
                      className={`inline-block w-full text-center px-4 py-2 text-white rounded-md transition-colors text-sm font-medium ${resource.buttonColor}`}
                    >
                      {resource.buttonText}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesGrid;