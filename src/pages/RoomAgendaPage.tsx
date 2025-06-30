import React, { useMemo, useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowLeft, X, Building2, Filter, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAgenda } from '../hooks/useAgenda';
import { useAgendaFilters } from '../hooks/useAgendaFilters';
import RoomAgendaFilters, { RoomActiveFilters } from '../components/RoomAgendaFilters';

interface SessionModalProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ session, isOpen, onClose }) => {
  if (!isOpen || !session) return null;

  // Helper function to parse comma-separated values or arrays
  const parseCommaSeparated = (value: string | string[] | null | undefined): string[] => {
    if (!value) return [];
    
    if (Array.isArray(value)) {
      return value.map(item => String(item).trim()).filter(Boolean);
    }
    
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

  // Helper function to get organizers data
  const getOrganizersData = (item: any): string | null => {
    if (item['co-organizer']) {
      if (Array.isArray(item['co-organizer'])) {
        return item['co-organizer'].join(', ');
      } else if (typeof item['co-organizer'] === 'object') {
        const values = Object.values(item['co-organizer']).filter(Boolean);
        return values.length > 0 ? values.join(', ') : null;
      } else if (typeof item['co-organizer'] === 'string') {
        return item['co-organizer'];
      }
    }
    
    if (item.organizers && typeof item.organizers === 'string') {
      return item.organizers;
    }
    
    return null;
  };

  const organizersData = getOrganizersData(session);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto print:hidden">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-6 pt-6 pb-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium text-primary-600">{session.time}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{session.title}</h3>
              
              {session.room && (
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{session.room}</span>
                </div>
              )}
            </div>

            {session.description && (
              <div className="mb-6">
                <p className="text-gray-700 whitespace-pre-line">{session.description}</p>
              </div>
            )}

            {/* Format */}
            {session.format && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                  {String(session.format)}
                </span>
              </div>
            )}

            {/* Metadata */}
            <div className="space-y-4">
              {/* Goals */}
              {session.goals && parseGoals(session.goals).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Goals</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {parseGoals(session.goals).map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Focus Areas */}
              {session.focus && parseCommaSeparated(session.focus).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-1">
                    {parseCommaSeparated(session.focus).map((focus, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {session['use-cases'] && parseCommaSeparated(session['use-cases']).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Use Cases</h4>
                  <div className="flex flex-wrap gap-1">
                    {parseCommaSeparated(session['use-cases']).map((useCase, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Co-organizers */}
              {organizersData && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <h4 className="text-sm font-medium text-gray-700">Co-organizers</h4>
                  </div>
                  <p className="text-sm text-gray-600">{organizersData}</p>
                </div>
              )}

              {/* Speakers */}
              {session.speakers && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <h4 className="text-sm font-medium text-gray-700">Speakers</h4>
                  </div>
                  <p className="text-sm text-gray-600">{session.speakers}</p>
                </div>
              )}

              {/* Target Audience */}
              {session.target_audience && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <h4 className="text-sm font-medium text-gray-700">Target Audience</h4>
                  </div>
                  <p className="text-sm text-gray-600">{session.target_audience}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomAgendaPage: React.FC = () => {
  const { data: agendaItems, isLoading, error } = useAgenda();
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize active filters with arrays
  const [activeFilters, setActiveFilters] = useState<RoomActiveFilters>({
    'use-cases': [],
    focus: [],
    level: [],
    goals: [],
    regions: [],
    'co-organizer': [],
    'building blocks': [],
    format: [],
    selectedRooms: []
  });

  // Helper function to clean room names
  const cleanRoomName = (roomName: string): string => {
    if (!roomName) return '';
    
    // Trim whitespace and remove "Room " prefix (case insensitive)
    return roomName.trim().replace(/^Room\s+/i, '');
  };

  // Filter and process agenda items for Day 2
  const dayFilteredItems = useMemo(() => {
    if (!agendaItems) return [];
    return agendaItems.filter(item => 
      item.day === '2025-07-02' && 
      item.ready_to_publish === true &&
      item.room // Only include items that have a room assigned
    );
  }, [agendaItems]);

  // Use the filtering hook
  const { filterOptions, filterAgendaItems } = useAgendaFilters(dayFilteredItems);

  // Apply custom filters including room filter
  const filteredAgendaItems = useMemo(() => {
    let filtered = filterAgendaItems(dayFilteredItems, activeFilters);
    
    // Apply room filter
    if (activeFilters.selectedRooms.length > 0) {
      filtered = filtered.filter(item => {
        const cleanedRoom = cleanRoomName(item.room);
        return activeFilters.selectedRooms.includes(cleanedRoom);
      });
    }
    
    return filtered;
  }, [dayFilteredItems, activeFilters, filterAgendaItems]);

  // Generate room schedule from filtered items
  const { roomSchedule, timeSlots, rooms } = useMemo(() => {
    // Extract unique rooms and time slots, cleaning room names
    const cleanedRooms = filteredAgendaItems.map(item => cleanRoomName(item.room));
    const uniqueRooms = [...new Set(cleanedRooms)].filter(Boolean).sort();
    const uniqueTimeSlots = [...new Set(filteredAgendaItems.map(item => item.time))].sort();

    // Create schedule object: { timeSlot: { cleanedRoom: item } }
    const schedule: Record<string, Record<string, any>> = {};
    
    filteredAgendaItems.forEach(item => {
      const cleanedRoom = cleanRoomName(item.room);
      if (!cleanedRoom) return; // Skip items without valid room names
      
      if (!schedule[item.time]) {
        schedule[item.time] = {};
      }
      schedule[item.time][cleanedRoom] = item;
    });

    return {
      roomSchedule: schedule,
      timeSlots: uniqueTimeSlots,
      rooms: uniqueRooms
    };
  }, [filteredAgendaItems]);

  // Get all available rooms for filter options
  const allAvailableRooms = useMemo(() => {
    if (!dayFilteredItems) return [];
    const cleanedRooms = dayFilteredItems.map(item => cleanRoomName(item.room));
    return [...new Set(cleanedRooms)].filter(Boolean).sort();
  }, [dayFilteredItems]);

  // Handle filter changes
  const handleFilterChange = (category: keyof RoomActiveFilters, values: string[]) => {
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
      format: [],
      selectedRooms: []
    });
  };

  // Helper function to format time
  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const handleSessionClick = (session: any) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
    setIsModalOpen(false);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="pt-20">
        <section className="bg-primary-700 text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Agenda by Room</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Day 2 schedule organized by meeting rooms
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container">
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <section className="bg-primary-700 text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Agenda by Room</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Day 2 schedule organized by meeting rooms
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading agenda</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the room schedule. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20 print:pt-0">
      <section className="bg-primary-700 text-white py-16 print:bg-white print:text-black print:py-4">
        <div className="container">
          <div className="flex items-center gap-4 mb-6 print:hidden">
            <Link 
              to="/agenda" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Full Agenda
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 print:text-2xl print:mb-2">Agenda by Room</h1>
          <p className="text-xl text-white/90 max-w-3xl print:text-gray-700 print:text-base">
            Day 2 (Wednesday, July 2, 2025) schedule organized by meeting rooms
          </p>
        </div>
      </section>

      <section className="py-16 print:py-4">
        <div className="container">
          {/* Print Button and Filters - Hidden in print */}
          <div className="print:hidden">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Schedule
              </button>
            </div>

            {/* Filters */}
            <RoomAgendaFilters
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              availableRooms={allAvailableRooms}
            />

            {/* Results Summary */}
            {dayFilteredItems && (
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">
                      Showing {rooms.length} room{rooms.length !== 1 ? 's' : ''} with {filteredAgendaItems.length} session{filteredAgendaItems.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {rooms.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center print:hidden">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {allAvailableRooms.length === 0 ? 'No Room Assignments Yet' : 'No Sessions Match Filters'}
              </h3>
              <p className="text-gray-600">
                {allAvailableRooms.length === 0 
                  ? 'Room assignments for Day 2 sessions are still being finalized. Check back later for updates.'
                  : 'No sessions match your current filter criteria. Try adjusting your filters or clearing them to see more results.'
                }
              </p>
              {allAvailableRooms.length > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 btn btn-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:rounded-none">
              {/* Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full print:text-xs">
                  <thead className="bg-gray-50 print:bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 min-w-[120px] print:px-2 print:py-2 print:text-xs print:min-w-[80px]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 print:h-3 print:w-3" />
                          Time
                        </div>
                      </th>
                      {rooms.map((room) => (
                        <th 
                          key={room} 
                          className="px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 last:border-r-0 min-w-[250px] print:px-2 print:py-2 print:text-xs print:min-w-[120px]"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary-500 print:h-3 print:w-3" />
                            {room}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timeSlots.map((timeSlot) => (
                      <tr key={timeSlot} className="hover:bg-gray-50 print:hover:bg-white">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50 align-top print:px-2 print:py-2 print:text-xs print:bg-gray-100">
                          {formatTime(timeSlot)}
                        </td>
                        {rooms.map((room) => {
                          const session = roomSchedule[timeSlot]?.[room];
                          return (
                            <td 
                              key={`${timeSlot}-${room}`} 
                              className="px-4 py-4 border-r border-gray-200 last:border-r-0 align-top print:px-2 print:py-2"
                            >
                              {session ? (
                                <div 
                                  className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer hover:border-primary-300 print:p-1 print:border-gray-300 print:rounded-none print:cursor-default print:hover:shadow-none print:hover:border-gray-300"
                                  onClick={() => !window.matchMedia('print').matches && handleSessionClick(session)}
                                >
                                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 print:text-xs print:mb-1 print:font-medium">
                                    {session.title}
                                  </h4>
                                  {/* Hide details in print view */}
                                  <div className="print:hidden">
                                    {session.format && (
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded border">
                                          {String(session.format)}
                                        </span>
                                      </div>
                                    )}
                                    {session.speakers && (
                                      <div className="flex items-center gap-1 text-xs text-gray-600">
                                        <Users className="h-3 w-3" />
                                        <span className="line-clamp-1">{session.speakers}</span>
                                      </div>
                                    )}
                                    {session.description && (
                                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                        {session.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-16 flex items-center justify-center text-gray-400 text-sm print:h-8 print:text-xs">
                                  —
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Back to Full Agenda - Hidden in print */}
          <div className="mt-8 text-center print:hidden">
            <Link 
              to="/agenda" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              View Full Conference Agenda
            </Link>
          </div>
        </div>
      </section>

      {/* Session Details Modal */}
      <SessionModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RoomAgendaPage;