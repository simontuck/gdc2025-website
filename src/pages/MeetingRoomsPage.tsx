import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import { useMeetingRooms, MeetingRoom, useRoomAvailability } from '../hooks/useMeetingRooms';
import { useMeetingRoomFilters } from '../hooks/useMeetingRoomFilters';
import MeetingRoomCard from '../components/MeetingRoomCard';
import MeetingRoomFilters, { RoomFilters } from '../components/MeetingRoomFilters';
import BookingModal from '../components/BookingModal';

const MeetingRoomsPage: React.FC = () => {
  // Filter state
  const [filters, setFilters] = useState<RoomFilters>({
    day: '',
    startTime: '',
    duration: 0,
    minCapacity: 0
  });

  const { data: rooms, isLoading, error } = useMeetingRooms(filters.day);
  const [selectedRoom, setSelectedRoom] = useState<MeetingRoom | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  
  // Fetch availability data for all rooms when filters include day
  const [roomAvailability, setRoomAvailability] = useState<Record<string, Array<{ start_time: string; end_time: string }>>>({});

  // Fetch availability data when day filter changes
  useEffect(() => {
    if (!filters.day || !rooms) {
      setRoomAvailability({});
      return;
    }

    const fetchAvailability = async () => {
      const availabilityPromises = rooms.map(async (room) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/room_bookings?room_id=eq.${room.id}&booking_date=eq.${filters.day}&status=eq.confirmed&select=start_time,end_time`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            }
          });
          
          if (response.ok) {
            const bookings = await response.json();
            return { roomId: room.id, bookings };
          }
          return { roomId: room.id, bookings: [] };
        } catch (error) {
          console.error(`Error fetching availability for room ${room.id}:`, error);
          return { roomId: room.id, bookings: [] };
        }
      });

      const results = await Promise.all(availabilityPromises);
      const availabilityMap: Record<string, Array<{ start_time: string; end_time: string }>> = {};
      
      results.forEach(({ roomId, bookings }) => {
        availabilityMap[roomId] = bookings;
      });
      
      setRoomAvailability(availabilityMap);
    };

    fetchAvailability();
  }, [filters.day, rooms]);

  // Apply filters
  const { filteredRooms, totalRooms, availableRooms } = useMeetingRoomFilters(
    rooms,
    filters,
    roomAvailability
  );

  const handleBookNow = (room: MeetingRoom) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
    setBookingError(null);
  };

  const handleBookingCreated = async (booking: any) => {
    setIsBookingModalOpen(false);
    setBookingSuccess(booking);
    setBookingError(null);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedRoom(null);
  };

  const handleClearFilters = () => {
    setFilters({
      day: '',
      startTime: '',
      duration: 0,
      minCapacity: 0
    });
  };

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Meeting Room Booking</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Book meeting rooms during the Global Digital Collaboration Conference. 
            Available July 1-2, 2025 in Geneva, Switzerland - completely free of charge!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {/* Free Booking Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <h2 className="text-lg font-semibold text-green-900">Free Meeting Rooms</h2>
                <p className="text-green-800">
                  All meeting rooms are available free of charge for conference attendees. 
                  Simply book your preferred time slot and receive instant confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Day 2 Availability Notice */}
          {filters.day === '2025-07-02' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-500" />
                <div>
                  <h2 className="text-lg font-semibold text-blue-900">Day 2 Availability</h2>
                  <p className="text-blue-800">
                    Some meeting rooms may not be available on day 2 of the conference. 
                    Only rooms available on July 2nd are shown below.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Booking Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-800">
                <Calendar className="h-4 w-4" />
                <span>Available: July 1-2, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <Clock className="h-4 w-4" />
                <span>Hours: 9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <Users className="h-4 w-4" />
                <span>Duration: 30 min - 2 hours</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <MeetingRoomFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            rooms={rooms}
          />

          {/* Results Summary */}
          {rooms && (
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">
                    Showing {availableRooms} of {totalRooms} rooms
                    {filters.day === '2025-07-02' && totalRooms > 0 && (
                      <span className="text-blue-600 ml-1">(Day 2 available only)</span>
                    )}
                  </span>
                </div>
                {filters.day && filters.startTime && filters.duration > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Filtered for availability
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success Message */}
          {bookingSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Booking Confirmed!</h3>
                  <p className="text-green-800">
                    Your booking for {selectedRoom?.name} has been confirmed. 
                    A confirmation email has been sent to your email address.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {bookingError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900">Booking Error</h3>
                  <p className="text-red-800">{bookingError}</p>
                  <button
                    onClick={() => setBookingError(null)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Room Listings */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading rooms</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the meeting rooms. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Available</h3>
              <p className="text-gray-600">
                {rooms && rooms.length > 0
                  ? filters.day === '2025-07-02'
                    ? 'No rooms are available on day 2 with your current filter criteria. Some rooms may not be available on the second day of the conference.'
                    : 'No rooms match your current filter criteria. Try adjusting your filters or selecting different times.'
                  : 'There are no meeting rooms available at this time.'}
              </p>
              {rooms && rooms.length > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="mt-4 btn btn-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <MeetingRoomCard
                  key={room.id}
                  room={room}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Terms & Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Booking Requirements</h4>
                <ul className="space-y-1">
                  <li>• Minimum booking: 30 minutes</li>
                  <li>• Maximum booking: 2 hours</li>
                  <li>• Available during conference dates only</li>
                  <li>• Free of charge for all attendees</li>
                  <li>• Instant confirmation via email</li>
                  <li>• Some rooms may not be available on day 2</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Support</h4>
                <p className="mb-4">
                  For questions or special requests, contact{' '}
                  <a 
                    href="mailto:rooms@globaldigitalcollaboration.org" 
                    className="text-primary-600 hover:text-primary-700"
                  >
                    rooms@globaldigitalcollaboration.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        room={selectedRoom}
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        onBookingCreated={handleBookingCreated}
      />
    </div>
  );
};

export default MeetingRoomsPage;