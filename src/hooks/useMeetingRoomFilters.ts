import { useMemo } from 'react';
import { MeetingRoom } from './useMeetingRooms';
import { RoomFilters } from '../components/MeetingRoomFilters';
import { getAvailableSlots } from '../utils/timeSlots';

export interface FilteredRoomsResult {
  filteredRooms: MeetingRoom[];
  totalRooms: number;
  availableRooms: number;
}

export function useMeetingRoomFilters(
  rooms: MeetingRoom[] | undefined,
  filters: RoomFilters,
  existingBookings: Record<string, Array<{ start_time: string; end_time: string }>> = {}
): FilteredRoomsResult {
  return useMemo(() => {
    if (!rooms) {
      return {
        filteredRooms: [],
        totalRooms: 0,
        availableRooms: 0
      };
    }

    let filteredRooms = [...rooms];

    // Filter by day availability (this is now handled in the query, but we keep this for safety)
    if (filters.day === '2025-07-02') {
      filteredRooms = filteredRooms.filter(room => room.available_day2);
    }

    // Filter by exact capacity match (not minimum capacity)
    if (filters.minCapacity > 0) {
      filteredRooms = filteredRooms.filter(room => 
        room.seating_capacity === filters.minCapacity
      );
    }

    // Filter by availability if day, time, and duration are specified
    if (filters.day && filters.startTime && filters.duration > 0) {
      filteredRooms = filteredRooms.filter(room => {
        const roomBookings = existingBookings[room.id] || [];
        return getAvailableSlots(filters.startTime, filters.duration, roomBookings);
      });
    }

    return {
      filteredRooms,
      totalRooms: rooms.length,
      availableRooms: filteredRooms.length
    };
  }, [rooms, filters, existingBookings]);
}