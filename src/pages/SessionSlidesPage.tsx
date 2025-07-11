import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Play, Calendar, Clock, Users, Building2, Search, Filter, X, ExternalLink } from 'lucide-react';
import { useAgenda } from '../hooks/useAgenda';

const SessionSlidesPage: React.FC = () => {
  const { data: agendaItems, isLoading, error } = useAgenda();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>(searchParams.get('day') || '');

  const days = [
    { id: '', label: 'All Days' },
    { id: '2025-07-01', label: 'Tuesday, July 1' },
    { id: '2025-07-02', label: 'Wednesday, July 2' }
  ];

  // Filter sessions that have slides or videos
  const sessionsWithContent = useMemo(() => {
    if (!agendaItems) return [];
    
    return agendaItems.filter(item => 
      item.ready_to_publish === true && 
      (item.presentation || item.youtube)
    );
  }, [agendaItems]);

  // Apply filters
  const filteredSessions = useMemo(() => {
    let filtered = sessionsWithContent;

    // Filter by day
    if (selectedDay) {
      filtered = filtered.filter(item => item.day === selectedDay);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(search) ||
        item.speakers?.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search)
      );
    }

    return filtered.sort((a, b) => {
      // Sort by day first, then by time
      if (a.day !== b.day) {
        return a.day.localeCompare(b.day);
      }
      return a.time.localeCompare(b.time);
    });
  }, [sessionsWithContent, selectedDay, searchTerm]);

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

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  // Helper function to format time
  const formatTime = (timeString: string): string => {
    if (!timeString || typeof timeString !== 'string') {
      return '';
    }

    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!timeMatch) {
      return timeString;
    }

    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return timeString;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleClearFilters = () => {
    setSelectedDay('');
    setSearchTerm('');
    setSearchParams({});
  };

  if (isLoading) {
    return (
      <div className="pt-20">
        <section className="bg-primary-700 text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Session Slides & Videos</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Access presentation slides and video recordings from conference sessions
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Session Slides & Videos</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Access presentation slides and video recordings from conference sessions
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading sessions</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the session content. Please try again later.</p>
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
              Back to Agenda
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Session Slides & Videos</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Access presentation slides and video recordings from conference sessions. Download slides for offline viewing or watch session recordings on YouTube.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filter Sessions</h3>
              {(selectedDay || searchTerm) && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sessions, speakers, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Day Filter */}
              <div>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {days.map(day => (
                    <option key={day.id} value={day.id}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="h-4 w-4" />
              <span className="text-sm">
                {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} with slides or videos
              </span>
            </div>
          </div>

          {/* Sessions Grid */}
          {filteredSessions.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Play className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Sessions Found</h3>
              <p className="text-gray-600">
                {sessionsWithContent.length === 0 
                  ? 'No sessions with slides or videos are available yet. Check back later for updates.'
                  : 'No sessions match your current filters. Try adjusting your search criteria.'
                }
              </p>
              {(selectedDay || searchTerm) && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 btn btn-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSessions.map((session, index) => {
                const organizersData = getOrganizersData(session);
                const youtubeVideoId = session.youtube ? getYouTubeVideoId(session.youtube) : null;
                
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    {/* YouTube Thumbnail */}
                    {youtubeVideoId && (
                      <div className="relative aspect-video bg-gray-100">
                        <img
                          src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                          alt={`${session.title} video thumbnail`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to default thumbnail if maxres doesn't exist
                            e.currentTarget.src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
                            <Play className="h-8 w-8 text-white fill-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Session Info */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.day === '2025-07-01' ? 'Day 1' : 'Day 2'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(session.time)}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {session.title}
                      </h3>

                      {session.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {session.description}
                        </p>
                      )}

                      {/* Speakers */}
                      {session.speakers && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Speakers</span>
                          </div>
                          <p className="text-sm text-gray-600">{session.speakers}</p>
                        </div>
                      )}

                      {/* Co-organizers */}
                      {organizersData && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Co-organizers</span>
                          </div>
                          <p className="text-sm text-gray-600">{organizersData}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-6">
                        {session.presentation && (
                          <a
                            href={session.presentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Slides
                          </a>
                        )}

                        {session.youtube && (
                          <a
                            href={session.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Watch on YouTube
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">About Session Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Presentation Slides</h4>
                <ul className="space-y-1 text-blue-800">
                  <li>• Download slides in PDF format</li>
                  <li>• Available for offline viewing</li>
                  <li>• Includes speaker notes where available</li>
                  <li>• Copyright belongs to respective speakers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Video Recordings</h4>
                <ul className="space-y-1 text-blue-800">
                  <li>• Full session recordings on YouTube</li>
                  <li>• Includes Q&A sessions where recorded</li>
                  <li>• Available with closed captions</li>
                  <li>• Can be shared and embedded</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SessionSlidesPage;