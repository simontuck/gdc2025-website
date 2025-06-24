import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PaymentCancelledPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id');

  useEffect(() => {
    // Clean up the pending booking if payment was cancelled
    const cleanupBooking = async () => {
      if (bookingId) {
        try {
          // Delete the pending booking since payment was cancelled
          await supabase
            .from('room_bookings')
            .delete()
            .eq('id', bookingId)
            .eq('status', 'pending');
        } catch (error) {
          console.error('Error cleaning up cancelled booking:', error);
        }
      }
    };

    cleanupBooking();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Cancelled
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your payment was cancelled and no charges have been made to your account. 
              {bookingId && ' The room booking has been cancelled and is now available for others to book.'}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>What happened?</strong> When you cancel payment, the room reservation is automatically released 
                to ensure availability for other conference attendees. You can try booking again at any time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/meeting-rooms"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Booking Again
              </Link>
              
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Return to Conference
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If you continue to experience issues, please contact{' '}
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
    </div>
  );
};

export default PaymentCancelledPage;