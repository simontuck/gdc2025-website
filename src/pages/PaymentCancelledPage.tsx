import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

const PaymentCancelledPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Calendar className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Looking for Meeting Rooms?
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Great news! Meeting room bookings are now completely free of charge for all conference attendees.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-green-800">
                <strong>No payment required!</strong> Simply book your preferred meeting room and receive instant confirmation. 
                All rooms are available free of charge during the conference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/meeting-rooms"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Free Meeting Room
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
                If you have any questions about meeting room bookings, please contact{' '}
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