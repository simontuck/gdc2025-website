import React from 'react';
import { Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { useAgenda } from '../hooks/useAgenda';

interface AgendaDay1PageProps {
  onIdeaClick: () => void;
}

const AgendaDay1Page: React.FC<AgendaDay1PageProps> = ({ onIdeaClick }) => {
  const { data: agendaItems, isLoading, error } = useAgenda(1); // Fetch day 1 agenda items

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Agenda - Day 1</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Global updates and real-world use cases from around the world.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading agenda</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the agenda. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {agendaItems?.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-0">
                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Clock className="h-5 w-5 text-primary-400" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className="text-sm font-medium text-primary-600">
                          {item.start_time} - {item.end_time}
                        </p>
                        <h3 className="text-xl font-semibold text-gray-900 mt-1">
                          {item.title}
                        </h3>
                        
                        {item.agenda_speakers?.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Speakers:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                              {item.agenda_speakers.map((speaker) => (
                                <li key={speaker.speaker.id} className="text-sm">
                                  {speaker.speaker.name}
                                  {speaker.speaker.organization && ` (${speaker.speaker.organization})`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.description && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
                            <p className="text-gray-600 whitespace-pre-line">{item.description}</p>
                          </div>
                        )}

                        {item.goals?.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Goals:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                              {item.goals.map((goal, idx) => (
                                <li key={idx} className="text-sm">{goal}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.labels?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.labels.map((label, idx) => (
                              <span key={idx} className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                                {label}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary-100 text-secondary-800 rounded-full">
                            {item.format}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-secondary-50 rounded-xl p-8 md:p-12 mt-16">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center mb-3">
                  <MessageSquare className="h-6 w-6 text-secondary-500 mr-3" />
                  <h3 className="text-2xl font-bold text-secondary-700">
                    Have an idea for the agenda?
                  </h3>
                </div>
                <p className="text-gray-700">
                  The agenda is shaped collaboratively – we welcome your ideas for deep dives, panels, and demos. Share your groundbreaking use case, framework, or perspective.
                </p>
              </div>
              <button 
                onClick={onIdeaClick}
                className="btn bg-secondary-500 text-white hover:bg-secondary-600 whitespace-nowrap flex items-center"
              >
                Submit Your Idea
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgendaDay1Page;