import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentCancelledPage: React.FC = () => {
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
              Your payment was cancelled. No charges have been made to your account.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800">
                <strong>Need help?</strong> If you experienced any issues during checkout, 
                please don't hesitate to contact our support team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </button>
              
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

export default PaymentCancelledPage;