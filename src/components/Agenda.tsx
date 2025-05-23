import React from 'react';
import { Calendar, Clock, MessageSquare, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAgenda } from '../hooks/useAgenda';

interface AgendaProps {
  onIdeaClick: () => void;
}

const Agenda: React.FC<AgendaProps> = ({ onIdeaClick }) => {
  const { data: agendaItems, isLoading, error } = useAgenda();

  // Filter and sort day 1 items that are highlighted and ready to publish
  const dayOneHighlights = agendaItems
    ?.filter(item => 
      item.day === '2025-07-01' && 
      item.highlight === true && 
      item.ready_to_publish === true
    )
    .slice(0, 5);

  return (
    <section id="agenda" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Agenda</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From digital driving licenses to health and education credentials, cross-border trade to organizational trust frameworks, GDC25 tackles the most pressing digital trust challenges. A detailed agenda with additional sessions, speakers, and networking opportunities will be announced soon.
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
            Note: This is a preliminary agenda and subject to change. Additional sessions, speakers, and detailed timings will be announced as they are confirmed.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/2">
            <div className="bg-primary-50 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-primary-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Day 1: Global Updates</h3>
              </div>
              <p className="text-gray-700 mb-4 italic">
                The first day focuses on global updates and real-world use cases from around the world, providing a comprehensive overview of the current state of wallets, credentials and trusted infrastructure. More sessions to be announced.
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-primary-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Day 2: Collaborative Sessions</h3>
              </div>
              <p className="text-gray-700 mb-4 italic">
                The second day features collaborative sessions on wallets, credential formats, authentication, standards, platform requirements, and interoperability challenges across various domains. Additional collaborative sessions will be announced.
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-primary-500 text-white py-4 px-6">
                <h3 className="text-xl font-semibold">Day 1 Start</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                  </div>
                ) : error ? (
                  <div className="p-4 text-red-600">Failed to load agenda items</div>
                ) : dayOneHighlights?.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Clock className="h-5 w-5 text-primary-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-primary-600">{item.time}</p>
                        <h4 className="text-base font-semibold text-gray-900 mt-1">{item.title}</h4>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        )}
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-50 rounded-xl p-8 md:p-12 mb-8">
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary-600 mb-3">Shape the Future of Digital Trust</h3>
              <p className="text-gray-700">
                The agenda is shaped collaboratively – we welcome your ideas for collaborative sessions, panels, and demos. Share your groundbreaking use case, framework, or perspective on wallets, credentials, and trusted infrastructure.
              </p>
            </div>
            <a 
              href="mailto:info@globaldigitalcollaboration.org?subject=Agenda%20idea%20for%20GDC2025"
              className="btn btn-secondary w-fit flex items-center"
            >
              Submit Your Idea
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Code of Conduct and Media</h3>
              <p className="text-gray-700 mb-4">
                The sessions of Day 1 are public. On Day 2, Chatham House rules apply unless otherwise announced.
              </p>
              <p className="text-gray-700">
                Media are welcome. Please contact{' '}
                <a 
                  href="mailto:info@globaldigitalcollaboration.org" 
                  className="text-primary-600 hover:text-primary-700"
                >
                  info@globaldigitalcollaboration.org
                </a>
                {' '}for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;