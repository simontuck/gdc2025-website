import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Calendar } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // In a real application, you might want to verify the session
    // and fetch order details from your backend
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock order details - in reality, fetch from your API
      setOrderDetails({
        sessionId,
        productName: 'GC25 Meeting Room',
        amount: '50.00 CHF',
        orderNumber: `GDC25-${Date.now()}`,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Confirming your payment...</p>
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

            {orderDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{orderDetails.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">{orderDetails.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{orderDetails.amount}</span>
                  </div>
                  {sessionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session ID:</span>
                      <span className="font-mono text-sm">{sessionId}</span>
                    </div>
                  )}
                </div>
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
                <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
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