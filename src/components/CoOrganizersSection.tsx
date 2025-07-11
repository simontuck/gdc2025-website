import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CoOrganizersSection: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Co-organized by 46 Leading Global Organizations
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            Including WHO, World Bank, UNDP, W3C, ISO, Linux Foundation, OpenWallet Foundation, and many more
          </p>
          
          <Link 
            to="/co-organizers-2025"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-lg"
          >
            View All Co-Organizers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoOrganizersSection;