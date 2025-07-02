import React, { useMemo, useState } from 'react';
import { Calendar, Clock, MapPin, Users, X, Building2, Printer, MessageSquare, ArrowRight, Target, Layers, Globe, Briefcase, BarChart3, Goal, Presentation, Search, UserSearch } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAgenda } from '../hooks/useAgenda';
import { useAgendaFilters, ActiveFilters } from '../hooks/useAgendaFilters';
import AgendaFilters from '../components/AgendaFilters';

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

const AgendaPage: React.FC = () => {
  const { data: agendaItems, isLoading, error } = useAgenda();
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'timetable'>('list');
  const [speakerSearch, setSpeakerSearch] = useState('');
  
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

  // Update URL when day changes
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDay) {
      params.set('day', selectedDay);
    }
    setSearchParams(params);
  }, [selectedDay, setSearchParams]);

  // Reset view mode when changing days
  React.useEffect(() => {
    if (selectedDay === '2025-07-01') {
      setViewMode('list');
    }
  }, [selectedDay]);

  // Helper function to clean room names
  const cleanRoomName = (roomName: string): string => {
    if (!roomName) return '';
    
    // Trim whitespace and remove "Room " prefix (case insensitive)
    return roomName.trim().replace(/^Room\s+/i, '');
  };

  // Helper function for natural/numeric sorting
  const naturalSort = (a: string, b: string): number => {
    // Split strings into parts (text and numbers)
    const aParts = a.match(/(\d+|\D+)/g) || [];
    const bParts = b.match(/(\d+|\D+)/g) || [];
    
    const maxLength = Math.max(aParts.length, bParts.length);
    
    for (let i = 0; i < maxLength; i++) {
      const aPart = aParts[i] || '';
      const bPart = bParts[i] || '';
      
      // Check if both parts are numbers
      const aNum = parseInt(aPart, 10);
      const bNum = parseInt(bPart, 10);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        // Both are numbers, compare numerically
        if (aNum !== bNum) {
          return aNum - bNum;
        }
      } else {
        // At least one is text, compare as strings
        const comparison = aPart.localeCompare(bPart, undefined, { numeric: true, sensitivity: 'base' });
        if (comparison !== 0) {
          return comparison;
        }
      }
    }
    
    return 0;
  };

  // Helper function to truncate title for print view
  const truncateTitle = (title: string, maxLength: number = 40): string => {
    if (!title) return '';
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + '...';
  };

  // Helper function to format time properly
  const formatTime = (timeString: string): string => {
    if (!timeString || typeof timeString !== 'string') {
      return '';
    }

    // Handle different time formats
    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!timeMatch) {
      return timeString; // Return original if it doesn't match expected format
    }

    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);

    // Validate hours and minutes
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return timeString; // Return original if invalid
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Helper function to calculate end time and format time range
  const formatTimeRange = (startTime: string): string => {
    if (!startTime || typeof startTime !== 'string') {
      return '';
    }
    
    // Parse the start time
    const timeMatch = startTime.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!timeMatch) {
      return startTime; // Return original if it doesn't match expected format
    }

    const startHours = parseInt(timeMatch[1], 10);
    const startMinutes = parseInt(timeMatch[2], 10);

    // Validate the parsed time
    if (isNaN(startHours) || isNaN(startMinutes) || startHours < 0 || startHours > 23 || startMinutes < 0 || startMinutes > 59) {
      return startTime; // Return original if invalid
    }

    // Calculate end time (assume 1 hour duration)
    let endHours = startHours + 1;
    let endMinutes = startMinutes;

    // Handle hour overflow
    if (endHours > 23) {
      endHours = 23;
      endMinutes = 59;
    }

    // Format both times
    const formatSingleTime = (hours: number, minutes: number) => {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const startFormatted = formatSingleTime(startHours, startMinutes);
    const endFormatted = formatSingleTime(endHours, endMinutes);
    
    // If both times have the same period, only show period once
    const startPeriod = startHours >= 12 ? 'PM' : 'AM';
    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
    
    if (startPeriod === endPeriod) {
      const startWithoutPeriod = startFormatted.replace(/ (AM|PM)$/, '');
      return `${startWithoutPeriod} - ${endFormatted}`;
    }
    
    return `${startFormatted} - ${endFormatted}`;
  };

  // Filter and process agenda items by selected day
  const dayFilteredItems = useMemo(() => {
    if (!agendaItems) return [];
    return agendaItems.filter(item => 
      item.day === selectedDay && 
      item.ready_to_publish === true
    );
  }, [agendaItems, selectedDay]);

  // Use the filtering hook for Day 1 (list view)
  const { filterOptions, filterAgendaItems } = useAgendaFilters(dayFilteredItems);

  // Apply custom filters and speaker search for Day 1
  const filteredAgendaItems = useMemo(() => {
    let filtered = filterAgendaItems(dayFilteredItems, activeFilters);
    
    // Apply speaker search if there are at least 3 characters
    if (speakerSearch.trim().length >= 3) {
      const searchTerm = speakerSearch.toLowerCase().trim();
      filtered = filtered.filter(item => {
        if (!item.speakers) return false;
        return item.speakers.toLowerCase().includes(searchTerm);
      });
    }
    
    return filtered;
  }, [dayFilteredItems, activeFilters, filterAgendaItems, speakerSearch]);

  // Generate room schedule for Day 2 (timetable view)
  const { roomSchedule, timeSlots, rooms } = useMemo(() => {
    if (selectedDay !== '2025-07-02') {
      return { roomSchedule: {}, timeSlots: [], rooms: [] };
    }

    // Filter items that have rooms assigned for Day 2
    const roomFilteredItems = dayFilteredItems.filter(item => item.room);

    // Apply room filter if any rooms are selected
    const finalFilteredItems = selectedRooms.length === 0 
      ? roomFilteredItems 
      : roomFilteredItems.filter(item => {
          const cleanedRoom = cleanRoomName(item.room);
          return selectedRooms.includes(cleanedRoom);
        });

    // Extract unique rooms and time slots, cleaning room names
    const cleanedRooms = finalFilteredItems.map(item => cleanRoomName(item.room));
    const uniqueRooms = [...new Set(cleanedRooms)].filter(Boolean).sort(naturalSort);
    const uniqueTimeSlots = [...new Set(finalFilteredItems.map(item => item.time))].sort();

    // Create schedule object: { cleanedRoom: { timeSlot: item } }
    const schedule: Record<string, Record<string, any>> = {};
    
    finalFilteredItems.forEach(item => {
      const cleanedRoom = cleanRoomName(item.room);
      if (!cleanedRoom) return; // Skip items without valid room names
      
      if (!schedule[cleanedRoom]) {
        schedule[cleanedRoom] = {};
      }
      schedule[cleanedRoom][item.time] = item;
    });

    return {
      roomSchedule: schedule,
      timeSlots: uniqueTimeSlots,
      rooms: uniqueRooms
    };
  }, [dayFilteredItems, selectedDay, selectedRooms]);

  // Get all available rooms for filter options (Day 2 only)
  const allAvailableRooms = useMemo(() => {
    if (selectedDay !== '2025-07-02' || !dayFilteredItems) return [];
    const cleanedRooms = dayFilteredItems.filter(item => item.room).map(item => cleanRoomName(item.room));
    return [...new Set(cleanedRooms)].filter(Boolean).sort(naturalSort);
  }, [dayFilteredItems, selectedDay]);

  // Handle filter changes for Day 1
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
    setSpeakerSearch('');
  };

  // Handle room filter for Day 2
  const handleRoomToggle = (room: string) => {
    setSelectedRooms(prev => 
      prev.includes(room)
        ? prev.filter(r => r !== room)
        : [...prev, room]
    );
  };

  const clearRoomFilters = () => {
    setSelectedRooms([]);
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

  // Helper functions for Day 1 list view
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

  const parseGoals = (goals: string | null | undefined): string[] => {
    if (!goals) return [];
    
    const goalsString = typeof goals === 'string' ? goals : String(goals);
    return goalsString.split(/[,\n]/).map(g => g.trim()).filter(Boolean);
  };

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

  const handleMetadataClick = (category: keyof ActiveFilters, value: string) => {
    const currentValues = activeFilters[category];
    if (!currentValues.includes(value)) {
      handleFilterChange(category, [...currentValues, value]);
    }
  };

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

  if (isLoading) {
    return (
      <div className="pt-20">
        <section className="bg-primary-700 text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Agenda</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Two days of intensive collaboration, knowledge sharing, and strategic planning for the future of digital public infrastructure. All sessions are conducted in English, with no simultaneous translation provided.
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Agenda</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Two days of intensive collaboration, knowledge sharing, and strategic planning for the future of digital public infrastructure. All sessions are conducted in English, with no simultaneous translation provided.
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
                    <p>There was an error loading the agenda. Please try again later.</p>
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
      <section className="bg-primary-700 text-white py-16 print:bg-white print:text-black print:py-2">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 print:text-lg print:mb-1 print:text-black print:font-bold">
            Conference Agenda
          </h1>
          <p className="text-xl text-white/90 max-w-3xl print:text-gray-700 print:text-2xs print:mb-2">
            Two days of intensive collaboration, knowledge sharing, and strategic planning for the future of digital public infrastructure. All sessions are conducted in English, with no simultaneous translation provided.
          </p>
        </div>
      </section>

      <section className="py-16 print:py-2">
        <div className="container">
          {/* Day Filter, View Toggle, Speaker Search, and Print Button - Hidden in print */}
          <div className="mb-8 space-y-4 print:hidden">
            {/* Day Filter */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => {
                    setSelectedDay(day.id);
                    handleClearFilters(); // Clear filters when changing day
                    clearRoomFilters(); // Clear room filters when changing day
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

            {/* View Toggle for Day 2 and Speaker Search */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                {/* View Toggle for Day 2 */}
                {selectedDay === '2025-07-02' && (
                  <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      List View
                    </button>
                    <button
                      onClick={() => setViewMode('timetable')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewMode === 'timetable'
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Timetable View
                    </button>
                  </div>
                )}

                {/* Speaker Search - Only show in list view */}
                {(selectedDay === '2025-07-01' || (selectedDay === '2025-07-02' && viewMode === 'list')) && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserSearch className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search speakers (min. 3 characters)..."
                      value={speakerSearch}
                      onChange={(e) => setSpeakerSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-80"
                    />
                    {speakerSearch && (
                      <button
                        onClick={() => setSpeakerSearch('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Schedule
              </button>
            </div>

            {/* Speaker Search Results Info */}
            {speakerSearch.trim().length >= 3 && (selectedDay === '2025-07-01' || (selectedDay === '2025-07-02' && viewMode === 'list')) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-800">
                    {filteredAgendaItems.length === 0 
                      ? `No sessions found with speakers matching "${speakerSearch}"`
                      : `Found ${filteredAgendaItems.length} session${filteredAgendaItems.length !== 1 ? 's' : ''} with speakers matching "${speakerSearch}"`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Print-only day header */}
          <div className="hidden print:block mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {days.find(day => day.id === selectedDay)?.label}
            </h2>
          </div>

          {/* Day 1: List View OR Day 2: List View */}
          {(selectedDay === '2025-07-01' || (selectedDay === '2025-07-02' && viewMode === 'list')) && (
            <>
              {/* Advanced Filters - Hidden in print */}
              <div className="print:hidden">
                <AgendaFilters
                  filterOptions={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {filteredAgendaItems.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center print:hidden">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Sessions Found</h3>
                  <p className="text-gray-600">
                    {speakerSearch.trim().length >= 3 
                      ? `No sessions found with speakers matching "${speakerSearch}". Try a different search term or clear the search.`
                      : Object.values(activeFilters).some(v => v.length > 0)
                        ? 'No sessions match the selected filters. Try adjusting your filter criteria.'
                        : 'There are no sessions scheduled for this day yet. Check back later for updates.'}
                  </p>
                  {(speakerSearch.trim().length >= 3 || Object.values(activeFilters).some(v => v.length > 0)) && (
                    <button
                      onClick={handleClearFilters}
                      className="mt-4 btn btn-secondary"
                    >
                      Clear All Filters
                    </button>
                  )}
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

                              {/* Co-organizers */}
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
                                  <p className="text-sm text-gray-600">
                                    {/* Highlight search term in speakers if searching */}
                                    {speakerSearch.trim().length >= 3 ? (
                                      <span dangerouslySetInnerHTML={{
                                        __html: item.speakers.replace(
                                          new RegExp(`(${speakerSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                                          '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
                                        )
                                      }} />
                                    ) : (
                                      item.speakers
                                    )}
                                  </p>
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
            </>
          )}

          {/* Day 2: Timetable View */}
          {selectedDay === '2025-07-02' && viewMode === 'timetable' && (
            <>
              {/* Room Filter Pills - Hidden in print */}
              {allAvailableRooms.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 print:hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary-500" />
                      <h3 className="text-lg font-semibold text-gray-900">Filter by Room</h3>
                    </div>
                    {selectedRooms.length > 0 && (
                      <button
                        onClick={clearRoomFilters}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear Rooms
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {allAvailableRooms.map((room) => {
                      const isSelected = selectedRooms.includes(room);
                      return (
                        <button
                          key={room}
                          onClick={() => handleRoomToggle(room)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'bg-primary-500 text-white shadow-md hover:bg-primary-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          {room}
                        </button>
                      );
                    })}
                  </div>
                  
                  {selectedRooms.length > 0 && (
                    <div className="mt-3 text-sm text-gray-600">
                      Showing {selectedRooms.length} of {allAvailableRooms.length} rooms
                    </div>
                  )}
                </div>
              )}

              {/* Results Summary - Hidden in print */}
              {dayFilteredItems && (
                <div className="mb-6 flex items-center justify-between print:hidden">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm">
                        Showing {rooms.length} room{rooms.length !== 1 ? 's' : ''} with {dayFilteredItems.filter(item => item.room && (selectedRooms.length === 0 || selectedRooms.includes(cleanRoomName(item.room)))).length} session{dayFilteredItems.filter(item => item.room && (selectedRooms.length === 0 || selectedRooms.includes(cleanRoomName(item.room)))).length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {rooms.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center print:hidden">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {allAvailableRooms.length === 0 ? 'No Room Assignments Yet' : 'No Sessions Match Filters'}
                  </h3>
                  <p className="text-gray-600">
                    {allAvailableRooms.length === 0 
                      ? 'Room assignments for Day 2 sessions are still being finalized. Check back later for updates.'
                      : 'No sessions match your current room selection. Try selecting different rooms or clearing the filter to see more results.'
                    }
                  </p>
                  {allAvailableRooms.length > 0 && selectedRooms.length > 0 && (
                    <button
                      onClick={clearRoomFilters}
                      className="mt-4 btn btn-secondary"
                    >
                      Clear Room Filter
                    </button>
                  )}
                </div>
              ) : (
                <div className="print-table-wrapper">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:rounded-none print-table-container">
                    {/* FLIPPED TABLE: Time slots as columns, rooms as rows */}
                    <div className="overflow-x-auto relative">
                      <table className="w-full print:text-2xs">
                        <thead className="bg-gray-50 print:bg-gray-100 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 min-w-[150px] print:px-1 print:py-1 print:text-2xs print:min-w-[80px] print:font-bold print:text-black sticky left-0 bg-gray-50 print:bg-gray-100 z-20">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 print:h-3 print:w-3" />
                                <span className="print:text-2xs">Room</span>
                              </div>
                            </th>
                            {timeSlots.map((timeSlot) => (
                              <th 
                                key={timeSlot} 
                                className="px-4 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 last:border-r-0 min-w-[200px] print:px-1 print:py-1 print:text-2xs print:font-bold print:text-black print:min-w-[120px]"
                              >
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-primary-500 print:h-3 print:w-3" />
                                  <span className="print:text-2xs">{formatTimeRange(timeSlot)}</span>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {rooms.map((room) => (
                            <tr key={room} className="hover:bg-gray-50 print:hover:bg-white">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50 align-top print:px-1 print:py-1 print:text-2xs print:bg-gray-50 print:font-bold print:text-black sticky left-0 z-10">
                                <div className="print:text-2xs">
                                  {room}
                                </div>
                              </td>
                              {timeSlots.map((timeSlot) => {
                                const session = roomSchedule[room]?.[timeSlot];
                                return (
                                  <td 
                                    key={`${room}-${timeSlot}`} 
                                    className="px-4 py-4 border-r border-gray-200 last:border-r-0 align-top print:px-1 print:py-1"
                                  >
                                    {session ? (
                                      <div 
                                        className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer hover:border-primary-300 print:p-1 print:border-gray-300 print:rounded-none print:cursor-default print:hover:shadow-none print:hover:border-gray-300 print-session-content"
                                        onClick={() => !window.matchMedia('print').matches && handleSessionClick(session)}
                                      >
                                        {/* Title - smaller font size and truncated in print view */}
                                        <div className="text-sm font-semibold text-gray-900 mb-2 line-clamp-3 print:text-xs print:font-medium print:text-black print:mb-0 print:leading-tight">
                                          <span className="hidden print:inline print-title-truncated">
                                            {truncateTitle(session.title, 40)}
                                          </span>
                                          <span className="print:hidden">
                                            {session.title}
                                          </span>
                                        </div>
                                        
                                        {/* Format badge - hidden in print for space */}
                                        {session.format && (
                                          <div className="print:hidden">
                                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                              {String(session.format)}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="h-16 flex items-center justify-center text-gray-400 text-sm print:h-4 print:text-2xs">
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
                </div>
              )}
            </>
          )}

          {/* Idea Submission Section - Hidden in print */}
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

      {/* Session Details Modal */}
      <SessionModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AgendaPage;