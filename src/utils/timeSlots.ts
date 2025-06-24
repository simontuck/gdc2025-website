export interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

export function generateTimeSlots(
  existingBookings: Array<{ start_time: string; end_time: string }> = []
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  
  // Conference hours: 8:00 AM to 6:00 PM, in 30-minute increments
  for (let hour = 8; hour < 18; hour++) {
    // Add hour slots (e.g., 8:00, 9:00, etc.)
    const hourTime = `${hour.toString().padStart(2, '0')}:00`;
    const hourLabel = formatTime(hourTime);
    
    const hourAvailable = !existingBookings.some(booking => {
      const bookingStart = timeToMinutes(booking.start_time);
      const bookingEnd = timeToMinutes(booking.end_time);
      const slotTime = timeToMinutes(hourTime);
      
      return slotTime >= bookingStart && slotTime < bookingEnd;
    });
    
    slots.push({ time: hourTime, label: hourLabel, available: hourAvailable });
    
    // Add half-hour slots (e.g., 8:30, 9:30, etc.) - but not for the last hour
    if (hour < 17) {
      const halfHourTime = `${hour.toString().padStart(2, '0')}:30`;
      const halfHourLabel = formatTime(halfHourTime);
      
      const halfHourAvailable = !existingBookings.some(booking => {
        const bookingStart = timeToMinutes(booking.start_time);
        const bookingEnd = timeToMinutes(booking.end_time);
        const slotTime = timeToMinutes(halfHourTime);
        
        return slotTime >= bookingStart && slotTime < bookingEnd;
      });
      
      slots.push({ time: halfHourTime, label: halfHourLabel, available: halfHourAvailable });
    }
  }
  
  return slots;
}

export function getAvailableSlots(
  selectedTime: string,
  duration: number,
  existingBookings: Array<{ start_time: string; end_time: string }> = []
): boolean {
  const startMinutes = timeToMinutes(selectedTime);
  const endMinutes = startMinutes + (duration * 60);
  
  // Check if the booking would extend beyond conference hours (6:00 PM = 18:00)
  if (endMinutes > timeToMinutes('18:00')) {
    return false;
  }
  
  // Check for conflicts with existing bookings
  return !existingBookings.some(booking => {
    const bookingStart = timeToMinutes(booking.start_time);
    const bookingEnd = timeToMinutes(booking.end_time);
    
    // Check if there's any overlap
    return (startMinutes < bookingEnd && endMinutes > bookingStart);
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatPrice(amount: number, currency: string = 'CHF'): string {
  return new Intl.NumberFormat('en-CH', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function calculateEndTime(startTime: string, durationHours: number): string {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + (durationHours * 60);
  const endHours = Math.floor(endMinutes / 60);
  const endMins = endMinutes % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
}

export const CONFERENCE_DATES = [
  { value: '2025-07-01', label: 'Tuesday, July 1, 2025' },
  { value: '2025-07-02', label: 'Wednesday, July 2, 2025' }
];

export const DURATION_OPTIONS = [
  { value: 0.5, label: '30 minutes' },
  { value: 1, label: '1 hour' },
  { value: 1.5, label: '1.5 hours' },
  { value: 2, label: '2 hours' },
  { value: 2.5, label: '2.5 hours' },
  { value: 3, label: '3 hours' },
  { value: 3.5, label: '3.5 hours' },
  { value: 4, label: '4 hours' }
];