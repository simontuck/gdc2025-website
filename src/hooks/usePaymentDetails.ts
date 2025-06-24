import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PaymentDetails {
  sessionId: string;
  bookingId?: string;
  orderNumber: string;
  productName: string;
  amount: string;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  paymentDate: string;
  paymentMethod?: string;
  status: string;
  roomDetails?: {
    name: string;
    date: string;
    time: string;
    duration: string;
  };
}

export function usePaymentDetails(sessionId: string | null, bookingId: string | null) {
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId && !bookingId) {
      setIsLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First, try to get order details from stripe_orders
        let orderData = null;
        if (sessionId) {
          const { data: order, error: orderError } = await supabase
            .from('stripe_orders')
            .select('*')
            .eq('checkout_session_id', sessionId)
            .single();

          if (!orderError && order) {
            orderData = order;
          }
        }

        // If we have a booking ID, get room booking details
        let bookingData = null;
        if (bookingId) {
          const { data: booking, error: bookingError } = await supabase
            .from('room_bookings')
            .select(`
              *,
              room:meeting_rooms(name)
            `)
            .eq('id', bookingId)
            .single();

          if (!bookingError && booking) {
            bookingData = booking;
          }
        }

        // If we don't have order data but have booking data, try to find the order by session ID from booking
        if (!orderData && bookingData?.stripe_session_id) {
          const { data: order, error: orderError } = await supabase
            .from('stripe_orders')
            .select('*')
            .eq('checkout_session_id', bookingData.stripe_session_id)
            .single();

          if (!orderError && order) {
            orderData = order;
          }
        }

        if (!orderData && !bookingData) {
          throw new Error('Payment details not found');
        }

        // Format the payment details
        const paymentDetails: PaymentDetails = {
          sessionId: sessionId || bookingData?.stripe_session_id || '',
          bookingId: bookingId || undefined,
          orderNumber: `GDC25-${(orderData?.created_at || bookingData?.created_at || new Date().toISOString()).slice(0, 10).replace(/-/g, '')}-${(orderData?.id || bookingData?.id || '').slice(-6).toUpperCase()}`,
          productName: bookingData ? `Meeting Room: ${bookingData.room?.name || 'Conference Room'}` : 'GC25 Conference Service',
          amount: orderData ? 
            new Intl.NumberFormat('en-CH', {
              style: 'currency',
              currency: orderData.currency?.toUpperCase() || 'CHF',
            }).format((orderData.amount_total || 0) / 100) :
            new Intl.NumberFormat('en-CH', {
              style: 'currency',
              currency: 'CHF',
            }).format((bookingData?.total_amount || 0) / 100),
          currency: orderData?.currency?.toUpperCase() || 'CHF',
          customerName: bookingData?.customer_name || undefined,
          customerEmail: bookingData?.customer_email || undefined,
          paymentDate: new Date(orderData?.created_at || bookingData?.created_at || new Date()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: orderData?.status || bookingData?.status || 'completed',
          roomDetails: bookingData ? {
            name: bookingData.room?.name || 'Conference Room',
            date: new Date(bookingData.booking_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            time: `${bookingData.start_time} - ${bookingData.end_time}`,
            duration: `${bookingData.duration_hours} hour${bookingData.duration_hours > 1 ? 's' : ''}`
          } : undefined
        };

        setDetails(paymentDetails);
      } catch (err: any) {
        console.error('Error fetching payment details:', err);
        setError(err.message || 'Failed to fetch payment details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId, bookingId]);

  return { details, isLoading, error };
}