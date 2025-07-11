import React from 'react';
import { Calendar, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgendaProps {
  onIdeaClick: () => void;
}

const Agenda: React.FC<AgendaProps> = ({ onIdeaClick }) => {
  return (
    <section id="agenda" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Agenda</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From digital driving licenses to health and education credentials, cross-border trade to organizational trust frameworks, GDC25 tackles the most pressing digital trust challenges.
          </p>
          <div className="mt-8">
            <Link 
              to="/agenda" 
              className="btn btn-primary inline-flex items-center justify-center w-full md:w-auto md:min-w-[300px]"
            >
              View Conference Agenda
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            Note: This is a preliminary agenda and subject to change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-primary-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-primary-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Day 1: Global Updates</h3>
            </div>
            <p className="text-gray-700 italic">
              The first day focuses on global updates and real-world use cases from around the world, providing a comprehensive overview of the current state of wallets, credentials and trusted infrastructure. More sessions to be announced.
            </p>
          </div>

          <div className="bg-primary-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-primary-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Day 2: Collaborative Sessions</h3>
            </div>
            <p className="text-gray-700 italic mb-4">
              The second day features collaborative sessions on wallets, credential formats, authentication, standards, platform requirements, and interoperability challenges across various domains. Additional collaborative sessions will be announced.
            </p>
            <p className="text-gray-700 font-medium">
              The Federal Councillor Beat Jans will close the conference.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Agenda;