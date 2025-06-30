import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Clock, MessageSquare, ArrowRight, Users, Building2, X, MapPin, Target, Layers, Globe, Briefcase, BarChart3, UserCheck, Goal, Presentation, Printer, Table } from 'lucide-react';
import { useAgenda } from '../hooks/useAgenda';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAgendaFilters, ActiveFilters } from '../hooks/useAgendaFilters';
import AgendaFilters from '../components/AgendaFilters';

interface AgendaPageProps {
  onIdeaClick: () => void;
}

const AgendaPage: React.FC<AgendaPageProps> = ({ onIdeaClick }) => {
  const { data: agendaItems, isLoading, error } = useAgenda();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedDay, setSelectedDay] = useState<string>(searchParams.get('day') || '2025-07-01');
  
  // Initialize active filters with arrays
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    'use-cases': [],
    focus: [],
    level: [],
    goals: [],
    regions: [],
    'co-organizer': [],
    'building blocks': [],
    format: []
  });

  const days = [
    { id: '2025-07-01', label: 'Tuesday, July 1' },
    { id: '2025-07-02', label: 'Wednesday, July 2' }
  ];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDay) {
      params.set('day', selectedDay);
    }
    setSearchParams(params);
  }, [selectedDay, setSearchParams]);

  // Filter agenda items by day and published status first
  const dayFilteredItems = useMemo(() => {
    if (!agendaItems) return [];
    return agendaItems.filter(item => 
      item.day === selectedDay && 
      item.ready_to_publish === true
    );
  }, [agendaItems, selectedDay]);

  // Use the filtering hook
  const { filterOptions, filterAgendaItems } = useAgendaFilters(dayFilteredItems);

  // Apply custom filters
  const filteredAgendaItems = useMemo(() => {
    return filterAgendaItems(dayFilteredItems, activeFilters);
  }, [dayFilteredItems, activeFilters, filterAgendaItems]);

  // Handle filter changes
  const handleFilterChange = (category: keyof ActiveFilters, values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: values
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({
      'use-cases': [],
      focus: [],
      level: [],
      goals: [],
      regions: [],
      'co-organizer': [],
      'building blocks': [],
      format: []
    });
  };

  // Handle clicking on a metadata value to add it to filters
  const handleMetadataClick = (category: keyof ActiveFilters, value: string) => {
    const currentValues = activeFilters[category];
    if (!currentValues.includes(value)) {
      handleFilterChange(category, [...currentValues, value]);
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Helper function to parse comma-separated values or arrays
  const parseCommaSeparated = (value: string | string[] | null | undefined): string[] => {
    if (!value) return [];
    
    // If it's already an array, process it directly
    if (Array.isArray(value)) {
      return value.map(item => String(item).trim()).filter(Boolean);
    }
    
    // If it's a string, split by comma
    if (typeof value === 'string') {
      return value.split(',').map(item => item.trim()).filter(Boolean);
    }
    
    return [];
  };

  // Helper function to parse goals into individual items
  const parseGoals = (goals: string | null | undefined): string[] => {
    if (!goals) return [];
    
    const goalsString = typeof goals === 'string' ? goals : String(goals);
    return goalsString.split(/[,\n]/).map(g => g.trim()).filter(Boolean);
  };

  // Helper function to get organizers data (prioritize co-organizer over organizers)
  const getOrganizersData = (item: any): string | null => {
    // First check if co-organizer field has data (JSONB format)
    if (item['co-organizer']) {
      // Handle JSONB data - could be array or object
      if (Array.isArray(item['co-organizer'])) {
        return item['co-organizer'].join(', ');
      } else if (typeof item['co-organizer'] === 'object') {
        // If it's an object, try to extract meaningful values
        const values = Object.values(item['co-organizer']).filter(Boolean);
        return values.length > 0 ? values.join(', ') : null;
      } else if (typeof item['co-organizer'] === 'string') {
        return item['co-organizer'];
      }
    }
    
    // Fallback to organizers field (text format)
    if (item.organizers && typeof item.organizers === 'string') {
      return item.organizers;
    }
    
    return null;
  };

  // Helper function to render clickable metadata badges
  const renderClickableBadge = (value: string, category: keyof ActiveFilters, isActive: boolean = false) => {
    return (
      <button
        key={value}
        onClick={() => handleMetadataClick(category, value)}
        className={`inline-block px-2 py-0.5 text-xs rounded border transition-colors cursor-pointer hover:shadow-sm print:border-gray-300 print:bg-gray-100 print:cursor-default ${
          isActive 
            ? 'bg-primary-100 text-primary-800 border-primary-300 hover:bg-primary-200' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
        }`}
        title={`Click to filter by ${value}`}
      >
        {value}
      </button>
    );
  };

  // Helper function to render metadata table
  const renderMetadataTable = (item: any) => {
    const metadata = [
      {
        label: 'Format',
        icon: <Presentation className="h-4 w-4" />,
        values: parseCommaSeparated(item.format),
        category: 'format' as keyof ActiveFilters
      },
      {
        label: 'Goals',
        icon: <Goal className="h-4 w-4" />,
        values: parseGoals(item.goals),
        category: 'goals' as keyof ActiveFilters
      },
      {
        label: 'Focus Areas',
        icon: <Target className="h-4 w-4" />,
        values: parseCommaSeparated(item.focus),
        category: 'focus' as keyof ActiveFilters
      },
      {
        label: 'Building Blocks',
        icon: <Layers className="h-4 w-4" />,
        values: parseCommaSeparated(item['building blocks']),
        category: 'building blocks' as keyof ActiveFilters
      },
      {
        label: 'Use Cases',
        icon: <Briefcase className="h-4 w-4" />,
        values: parseCommaSeparated(item['use-cases']),
        category: 'use-cases' as keyof ActiveFilters
      },
      {
        label: 'Regions',
        icon: <Globe className="h-4 w-4" />,
        values: parseCommaSeparated(item.regions),
        category: 'regions' as keyof ActiveFilters
      },
      {
        label: 'Level',
        icon: <BarChart3 className="h-4 w-4" />,
        values: parseCommaSeparated(item.level),
        category: 'level' as keyof ActiveFilters
      }
    ].filter(meta => meta.values.length > 0);

    if (metadata.length === 0) return null;

    return (
      <div className="mt-4 bg-gray-50 rounded-lg p-4 print:bg-white print:border print:border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-1 print:gap-2">
          {metadata.map((meta, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="flex items-center gap-1.5 text-gray-500 min-w-0 flex-shrink-0">
                {meta.icon}
                <span className="text-sm font-medium">{meta.label}:</span>
              </div>
              <div className="flex flex-wrap gap-1 min-w-0">
                {meta.values.map((value, valueIdx) => {
                  const isActive = activeFilters[meta.category].includes(value);
                  return renderClickableBadge(value, meta.category, isActive);
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16 print:bg-white print:text-black print:py-8">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 print:text-3xl print:mb-4">Conference Agenda</h1>
          <p className="text-xl text-white/90 max-w-3xl print:text-gray-700 print:text-lg">
            Two days of intensive collaboration, knowledge sharing, and strategic planning for the future of digital public infrastructure. All sessions are conducted in English, with no simultaneous translation provided.
          </p>
        </div>
      </section>

      <section className="py-16 print:py-8">
        <div className="container">
          {/* Day Filter, Print Button, and Day 2 Timetable Button */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-6 print:hidden">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => {
                    setSelectedDay(day.id);
                    handleClearFilters(); // Clear custom filters when changing day
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
            
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Agenda
            </button>

            <button
              onClick={() => navigate('/agenda-by-room')}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white border border-primary-600 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <Table className="h-4 w-4 mr-2" />
              Day 2 Sessions Timetable
            </button>
          </div>

          {/* Print-only day header */}
          <div className="hidden print:block mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {days.find(day => day.id === selectedDay)?.label}
            </h2>
          </div>

          {/* Advanced Filters - Hidden in print */}
          <div className="print:hidden">
            <AgendaFilters
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px] print:hidden">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 print:hidden">
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
            <div className="bg-gray-50 rounded-lg p-8 text-center print:hidden">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">
                {Object.values(activeFilters).some(v => v.length > 0)
                  ? 'No events match the selected filters. Try adjusting your filter criteria.'
                  : 'There are no events scheduled for this day yet. Check back later for updates.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:rounded-none">
              {filteredAgendaItems.map((item, index) => {
                const organizersData = getOrganizersData(item);
                
                return (
                  <div key={index} className="border-b border-gray-200 last:border-0 print:break-inside-avoid print:mb-6">
                    <div className="p-6 hover:bg-gray-50 print:hover:bg-white print:p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Clock className="h-5 w-5 text-primary-400" />
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="text-sm font-medium text-primary-600 print:text-gray-700">
                            {item.time}
                          </p>
                          <h3 className="text-xl font-semibold text-gray-900 mt-1 print:text-lg">
                            {item.title}
                          </h3>
                          
                          {/* Room information */}
                          {item.room && (
                            <div className="flex items-center mt-2 text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{item.room}</span>
                            </div>
                          )}
                          
                          {item.description && (
                            <div className="mt-4">
                              <p className="text-gray-600 whitespace-pre-line print:text-sm">{item.description}</p>
                            </div>
                          )}

                          {/* Compact metadata table with clickable badges */}
                          {renderMetadataTable(item)}

                          {/* Co-organizers - using the new logic */}
                          {organizersData && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                <h4 className="text-sm font-medium text-gray-700">Co-organizers</h4>
                              </div>
                              <p className="text-sm text-gray-600">{organizersData}</p>
                            </div>
                          )}

                          {/* Speakers */}
                          {item.speakers && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <h4 className="text-sm font-medium text-gray-700">Speakers</h4>
                              </div>
                              <p className="text-sm text-gray-600">{item.speakers}</p>
                            </div>
                          )}

                          {/* Target Audience */}
                          {item.target_audience && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <h4 className="text-sm font-medium text-gray-700">Target Audience</h4>
                              </div>
                              <p className="text-sm text-gray-600">{item.target_audience}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-primary-50 rounded-xl p-8 md:p-12 mt-8 print:hidden">
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