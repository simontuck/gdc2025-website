import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Calendar, Loader2 } from 'lucide-react';
import { usePaymentDetails } from '../hooks/usePaymentDetails';
import { downloadReceipt, ReceiptData } from '../utils/receiptGenerator';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const bookingId = searchParams.get('booking_id');
  
  const { details, isLoading, error } = usePaymentDetails(sessionId, bookingId);

  const handleDownloadReceipt = () => {
    if (!details) return;

    const receiptData: ReceiptData = {
      orderNumber: details.orderNumber,
      sessionId: details.sessionId,
      bookingId: details.bookingId,
      productName: details.productName,
      amount: details.amount,
      currency: details.currency,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      paymentDate: details.paymentDate,
      paymentMethod: 'Credit Card',
      conferenceDate: 'July 1-2, 2025',
      roomDetails: details.roomDetails
    };

    downloadReceipt(receiptData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
            <p className="text-gray-600">Confirming your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-red-500 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Payment Details</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Return to Conference
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>

            {details && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receipt Number:</span>
                    <span className="font-medium">{details.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product/Service:</span>
                    <span className="font-medium">{details.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{details.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-medium">{details.paymentDate}</span>
                  </div>
                  {details.customerName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium">{details.customerName}</span>
                    </div>
                  )}
                  {sessionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm">{sessionId}</span>
                    </div>
                  )}
                  {bookingId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-mono text-sm">{bookingId}</span>
                    </div>
                  )}
                </div>

                {details.roomDetails && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-md font-semibold text-gray-900 mb-3">Room Booking Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room:</span>
                        <span className="font-medium">{details.roomDetails.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{details.roomDetails.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{details.roomDetails.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{details.roomDetails.duration}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900">
                      Conference Details
                    </p>
                    <p className="text-sm text-blue-700">
                      July 1-2, 2025 • Geneva, Switzerland
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleDownloadReceipt}
                  disabled={!details}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Receipt
                </button>
                
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Return to Conference
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your email address with all the details.
                If you have any questions, please contact{' '}
                <a 
                  href="mailto:info@globaldigitalcollaboration.org" 
                  className="text-primary-600 hover:text-primary-700"
                >
                  info@globaldigitalcollaboration.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;