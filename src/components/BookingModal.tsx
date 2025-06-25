import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { MeetingRoom, useRoomAvailability, useCreateFreeBooking } from '../hooks/useMeetingRooms';
import { 
  generateTimeSlots, 
  getAvailableSlots, 
  formatTime, 
  calculateEndTime,
  CONFERENCE_DATES,
  DURATION_OPTIONS 
} from '../utils/timeSlots';

interface BookingModalProps {
  room: MeetingRoom | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated: (booking: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  room, 
  isOpen, 
  onClose, 
  onBookingCreated 
}) => {
  const [selectedDate, setSelectedDate] = useState('2025-07-01');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(0.5); // Default to 30 minutes
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { data: existingBookings = [], isLoading: loadingAvailability } = useRoomAvailability(
    room?.id || '', 
    selectedDate
  );
  
  const createBookingMutation = useCreateFreeBooking();

  const timeSlots = generateTimeSlots(existingBookings);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedTime('');
      setDuration(0.5); // Reset to 30 minutes
      setError(null);
    }
  }, [isOpen, room]);

  // Check if selected time and duration are available
  const isTimeSlotAvailable = selectedTime ? 
    getAvailableSlots(selectedTime, duration, existingBookings) : false;

  const handleBooking = async () => {
    if (!room || !selectedTime || !customerName || !customerEmail) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isTimeSlotAvailable) {
      setError('Selected time slot is not available');
      return;
    }

    try {
      setError(null);
      const booking = await createBookingMutation.mutateAsync({
        room_id: room.id,
        customer_email: customerEmail,
        customer_name: customerName,
        booking_date: selectedDate,
        start_time: selectedTime,
        duration_hours: duration,
      });

      onBookingCreated(booking);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    }
  };

  // Helper function to format duration for display
  const formatDuration = (hours: number): string => {
    if (hours < 1) {
      return `${hours * 60} minutes`;
    } else if (hours === 1) {
      return '1 hour';
    } else if (hours % 1 === 0) {
      return `${hours} hours`;
    } else {
      const wholeHours = Math.floor(hours);
      const minutes = (hours % 1) * 60;
      return `${wholeHours} hour${wholeHours > 1 ? 's' : ''} ${minutes} minutes`;
    }
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
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

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Book {room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{room.seating_capacity} seats</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">Free of charge</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Booking Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conference Date *
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(''); // Reset time when date changes
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {CONFERENCE_DATES.map(date => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  value={duration}
                  onChange={(e) => {
                    setDuration(Number(e.target.value));
                    setSelectedTime(''); // Reset time when duration changes
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {DURATION_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                {loadingAvailability ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                    <span className="ml-2 text-gray-600">Loading availability...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((slot) => {
                      const isAvailableForDuration = getAvailableSlots(slot.time, duration, existingBookings);
                      const isSelected = selectedTime === slot.time;
                      
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={!isAvailableForDuration}
                          className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                            isSelected
                              ? 'bg-primary-500 text-white border-primary-500'
                              : isAvailableForDuration
                                ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Booking Summary */}
              {selectedTime && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{room.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {CONFERENCE_DATES.find(d => d.value === selectedDate)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">
                        {formatTime(selectedTime)} - {formatTime(calculateEndTime(selectedTime, duration))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{formatDuration(duration)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span className="font-medium text-gray-900">Cost:</span>
                      <span className="font-bold text-green-600">Free</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Free Meeting Room</h3>
                    <p className="text-sm text-green-700 mt-1">
                      This meeting room is provided free of charge for conference attendees. 
                      You will receive a confirmation email once your booking is confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleBooking}
              disabled={
                !selectedTime || 
                !customerName || 
                !customerEmail || 
                !isTimeSlotAvailable ||
                createBookingMutation.isPending
              }
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createBookingMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;