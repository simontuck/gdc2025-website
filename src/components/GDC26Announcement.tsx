import React from 'react';
import { Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

const GDC26Announcement: React.FC = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium">🎉 Save the Date</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Global Digital Collaboration Conference 2026
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us for the second edition of the Global Digital Collaboration Conference as we continue advancing digital trust infrastructure worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">When</h3>
              <p className="text-lg">June 24-26, 2026</p>
              <p className="text-sm text-white/80 mt-1">Three days of collaboration</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Where</h3>
              <p className="text-lg">SwissTech Convention Center</p>
              <p className="text-sm text-white/80 mt-1">Lausanne, Switzerland</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.linkedin.com/posts/global-digital-collaboration-event_save-the-date-for-the-second-edition-of-the-activity-7351273343783698432-sHQf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABK7-MBVTSv3amtqMYggyWZ7qIAygJkU3I"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Read the Announcement
            </a>
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
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors font-medium"
            >
              Get Updates
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/80">
              More details about registration, speakers, and agenda will be announced soon. 
              Subscribe to our newsletter to be the first to know!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GDC26Announcement;