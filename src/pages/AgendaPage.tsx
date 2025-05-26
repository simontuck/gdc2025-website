import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Clock, MessageSquare, ArrowRight, Users, Building2, X, MapPin } from 'lucide-react';
import { useAgenda } from '../hooks/useAgenda';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface AgendaPageProps {
  onIdeaClick: () => void;
}

const AgendaPage: React.FC<AgendaPageProps> = ({ onIdeaClick }) => {
  const { data: agendaItems, isLoading, error } = useAgenda();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedDay, setSelectedDay] = useState<string>(searchParams.get('day') || '2025-07-01');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');

  const days = [
    { id: '2025-07-01', label: 'Tuesday, July 1' },
    { id: '2025-07-02', label: 'Wednesday, July 2' }
  ];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    if (selectedDay) {
      params.set('day', selectedDay);
    }
    setSearchParams(params);
  }, [selectedCategory, selectedDay, setSearchParams]);

  // Filter agenda items by day and published status first
  const dayFilteredItems = useMemo(() => {
    if (!agendaItems) return [];
    return agendaItems.filter(item => 
      item.day === selectedDay && 
      item.ready_to_publish === true
    );
  }, [agendaItems, selectedDay]);

  // Get unique categories from the day-filtered items
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        dayFilteredItems
          .map(item => item.category)
          .filter(Boolean)
      )
    );
    return uniqueCategories.sort();
  }, [dayFilteredItems]);

  // Filter items by selected category
  const filteredAgendaItems = useMemo(() => {
    if (!dayFilteredItems) return [];
    return dayFilteredItems.filter(item => 
      !selectedCategory || item.category === selectedCategory
    );
  }, [dayFilteredItems, selectedCategory]);

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Agenda</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Two days of intensive collaboration, knowledge sharing, and strategic planning for the future of digital public infrastructure.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {/* Filters */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-6">
            {/* Day Filter */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => {
                    setSelectedDay(day.id);
                    setSelectedCategory(''); // Reset category when changing day
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedDay === day.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      category === selectedCategory
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                    {category === selectedCategory && (
                      <X className="h-4 w-4 ml-1.5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading agenda</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the agenda. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : filteredAgendaItems.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">
                {selectedCategory 
                  ? `No ${selectedCategory} events scheduled for this day.`
                  : 'There are no events scheduled for this day yet. Check back later for updates.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {filteredAgendaItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0">
                  <div className="p-6 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Clock className="h-5 w-5 text-primary-400" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className="text-sm font-medium text-primary-600">
                          {item.time}
                        </p>
                        <h3 className="text-xl font-semibold text-gray-900 mt-1">
                          {item.title}
                        </h3>
                        
                        {/* Room information */}
                        {item.room && (
                          <div className="flex items-center mt-2 text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{item.room}</span>
                          </div>
                        )}
                        
                        {item.category && (
                          <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">
                            {item.category}
                          </span>
                        )}
                        
                        {item.description && (
                          <div className="mt-4">
                            <p className="text-gray-600 whitespace-pre-line">{item.description}</p>
                          </div>
                        )}

                        {item.organizers && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <h4 className="text-sm font-medium text-gray-700">Organizers</h4>
                            </div>
                            <p className="text-sm text-gray-600">{item.organizers}</p>
                          </div>
                        )}

                        {item.speakers && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <h4 className="text-sm font-medium text-gray-700">Speakers</h4>
                            </div>
                            <p className="text-sm text-gray-600">{item.speakers}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-primary-50 rounded-xl p-8 md:p-12 mt-8">
            <div className="flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-600 mb-3">Have an idea for the agenda?</h3>
                <p className="text-gray-700">
                  The agenda is shaped collaboratively – we welcome your ideas for deep dives, panels, and demos. Share your groundbreaking use case, framework, or perspective.
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
        </div>
      </section>
    </div>
  );
};

export default AgendaPage;