import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

const CouncilSummary: React.FC = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Council Members</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            The GDC Council advances dialogue to support trusted and interoperable digital infrastructure worldwide, bringing together UN Member States, companies, Intergovernmental Organizations, and Non-Governmental Organizations.
          </p>
          <Link
            to="/council"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            View Council Members
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CouncilSummary;
