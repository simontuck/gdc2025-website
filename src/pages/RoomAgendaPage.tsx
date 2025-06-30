import React, { useMemo } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAgenda } from '../hooks/useAgenda';

const RoomAgendaPage: React.FC = () => {
  const { data: agendaItems, isLoading, error } = useAgenda();

  // Filter and process agenda items for Day 2
  const { roomSchedule, timeSlots, rooms } = useMemo(() => {
    if (!agendaItems) {
      return { roomSchedule: {}, timeSlots: [], rooms: [] };
    }

    // Filter for Day 2 and published items
    const day2Items = agendaItems.filter(item => 
      item.day === '2025-07-02' && 
      item.ready_to_publish === true &&
      item.room // Only include items that have a room assigned
    );

    // Extract unique rooms and time slots
    const uniqueRooms = [...new Set(day2Items.map(item => item.room))].sort();
    const uniqueTimeSlots = [...new Set(day2Items.map(item => item.time))].sort();

    // Create schedule object: { timeSlot: { room: item } }
    const schedule: Record<string, Record<string, any>> = {};
    
    day2Items.forEach(item => {
      if (!schedule[item.time]) {
        schedule[item.time] = {};
      }
      schedule[item.time][item.room] = item;
    });

    return {
      roomSchedule: schedule,
      timeSlots: uniqueTimeSlots,
      rooms: uniqueRooms
    };
  }, [agendaItems]);

  // Helper function to format time
  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  // Helper function to get session duration class for visual indication
  const getSessionClass = (item: any) => {
    if (!item) return '';
    
    // You could add logic here to determine session length and apply different styles
    const baseClass = 'p-3 rounded-lg border-l-4 hover:shadow-md transition-shadow cursor-pointer';
    
    // Color coding by format or category - safely convert format to string
    const formatString = String(item.format || '').toLowerCase();
    
    if (formatString.includes('keynote')) {
      return `${baseClass} bg-purple-50 border-purple-400 hover:bg-purple-100`;
    } else if (formatString.includes('workshop')) {
      return `${baseClass} bg-blue-50 border-blue-400 hover:bg-blue-100`;
    } else if (formatString.includes('panel')) {
      return `${baseClass} bg-green-50 border-green-400 hover:bg-green-100`;
    } else {
      return `${baseClass} bg-gray-50 border-gray-400 hover:bg-gray-100`;
    }
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
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/agenda" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Full Agenda
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Agenda by Room</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Day 2 (Wednesday, July 2, 2025) schedule organized by meeting rooms for easier navigation
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-500" />
              <div>
                <h2 className="text-lg font-semibold text-blue-900">Day 2 Room Schedule</h2>
                <p className="text-blue-800">
                  This view shows all Day 2 sessions organized by room. Click on any session for more details.
                </p>
              </div>
            </div>
          </div>

          {rooms.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Room Assignments Yet</h3>
              <p className="text-gray-600">
                Room assignments for Day 2 sessions are still being finalized. Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time
                        </div>
                      </th>
                      {rooms.map((room) => (
                        <th 
                          key={room} 
                          className="px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 last:border-r-0 min-w-[250px]"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary-500" />
                            {room}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timeSlots.map((timeSlot) => (
                      <tr key={timeSlot} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50 align-top">
                          {formatTime(timeSlot)}
                        </td>
                        {rooms.map((room) => {
                          const session = roomSchedule[timeSlot]?.[room];
                          return (
                            <td 
                              key={`${timeSlot}-${room}`} 
                              className="px-4 py-4 border-r border-gray-200 last:border-r-0 align-top"
                            >
                              {session ? (
                                <div className={getSessionClass(session)}>
                                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {session.title}
                                  </h4>
                                  {session.format && (
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="inline-block px-2 py-1 text-xs font-medium bg-white rounded border">
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
                              ) : (
                                <div className="h-16 flex items-center justify-center text-gray-400 text-sm">
                                  No session
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

          {/* Legend */}
          {rooms.length > 0 && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-50 border-l-4 border-purple-400 rounded"></div>
                  <span className="text-sm text-gray-700">Keynote</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-50 border-l-4 border-blue-400 rounded"></div>
                  <span className="text-sm text-gray-700">Workshop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-50 border-l-4 border-green-400 rounded"></div>
                  <span className="text-sm text-gray-700">Panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-50 border-l-4 border-gray-400 rounded"></div>
                  <span className="text-sm text-gray-700">Other</span>
                </div>
              </div>
            </div>
          )}

          {/* Back to Full Agenda */}
          <div className="mt-8 text-center">
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
    </div>
  );
};

export default RoomAgendaPage;