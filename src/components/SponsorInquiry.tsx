import React from 'react';
import { ArrowRight } from 'lucide-react';

const SponsorInquiry: React.FC = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Sponsor
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Would you like to become a sponsor of GDC26? Please find out more here.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Sponsorship Information
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorInquiry;
