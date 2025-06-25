import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface MeetingRoom {
  id: string;
  name: string;
  description: string;
  hourly_rate: number;
  seating_capacity: number;
  amenities: string[];
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomBooking {
  id: string;
  room_id: string;
  customer_email: string;
  customer_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_amount: number;
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
  room?: MeetingRoom;
}

export interface BookingRequest {
  room_id: string;
  customer_email: string;
  customer_name: string;
  booking_date: string;
  start_time: string;
  duration_hours: number;
}

export function useMeetingRooms() {
  return useQuery({
    queryKey: ['meeting-rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meeting_rooms')
        .select('*')
        .eq('is_active', true)
        .order('hourly_rate', { ascending: true });

      if (error) throw error;
      return data as MeetingRoom[];
    },
  });
}

export function useRoomAvailability(roomId: string, date: string) {
  return useQuery({
    queryKey: ['room-availability', roomId, date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_bookings')
        .select('start_time, end_time, duration_hours')
        .eq('room_id', roomId)
        .eq('booking_date', date)
        .eq('status', 'confirmed'); // Only consider confirmed bookings for availability

      if (error) throw error;
      return data;
    },
    enabled: !!roomId && !!date,
  });
}

export function useCreateFreeBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: BookingRequest) => {
      // Calculate end time based on duration in hours (including 30-minute increments)
      const startMinutes = parseInt(booking.start_time.split(':')[0]) * 60 + parseInt(booking.start_time.split(':')[1]);
      const endMinutes = startMinutes + (booking.duration_hours * 60);
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      const end_time = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

      // Get room details for total calculation (keeping for compatibility)
      const { data: room, error: roomError } = await supabase
        .from('meeting_rooms')
        .select('hourly_rate')
        .eq('id', booking.room_id)
        .single();

      if (roomError) throw roomError;

      // Calculate total amount (set to 0 for free bookings)
      const total_amount = 0;

      // Create booking with 'confirmed' status since no payment is required
      const { data, error } = await supabase
        .from('room_bookings')
        .insert({
          ...booking,
          end_time,
          total_amount,
          status: 'confirmed', // Immediately confirmed since it's free
        })
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
      try {
        const emailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            bookingId: data.id,
            customerEmail: booking.customer_email,
            customerName: booking.customer_name,
          }),
        });

        if (!emailResponse.ok) {
          console.warn('Failed to send confirmation email, but booking was created successfully');
        }
      } catch (emailError) {
        console.warn('Error sending confirmation email:', emailError);
        // Don't fail the booking if email fails
      }

      return data as RoomBooking;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['room-availability', data.room_id, data.booking_date] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
    },
  });
}

export function useUpdateBookingPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      bookingId, 
      stripeSessionId, 
      status 
    }: { 
      bookingId: string; 
      stripeSessionId: string; 
      status: 'confirmed' | 'cancelled' 
    }) => {
      const { data, error } = await supabase
        .from('room_bookings')
        .update({
          stripe_session_id: stripeSessionId,
          status,
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data as RoomBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-availability'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
    },
  });
}

export function useUserBookings(email: string) {
  return useQuery({
    queryKey: ['user-bookings', email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_bookings')
        .select(`
          *,
          room:meeting_rooms(*)
        `)
        .eq('customer_email', email)
        .order('booking_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data as RoomBooking[];
    },
    enabled: !!email,
  });
}

// Hook to clean up expired pending bookings (optional - could be run periodically)
export function useCleanupExpiredBookings() {
  return useMutation({
    mutationFn: async () => {
      // Delete pending bookings older than 30 minutes
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      
      const { error } = await supabase
        .from('room_bookings')
        .delete()
        .eq('status', 'pending')
        .lt('created_at', thirtyMinutesAgo);

      if (error) throw error;
    },
  });
}