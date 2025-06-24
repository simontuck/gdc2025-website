import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { products } from '../stripe-config';
import ProductCard from '../components/ProductCard';

const PaymentPage: React.FC = () => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePaymentSuccess = () => {
    setSuccess('Payment initiated successfully! You will be redirected to complete the payment.');
    setError(null);
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess(null);
  };

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Services</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Enhance your conference experience with our premium services and facilities.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Customer Information Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-5 w-5 text-green-400">✓</div>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                    <p className="text-sm text-green-700 mt-1">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.priceId}
                  product={product}
                  customerEmail={customerEmail}
                  customerName={customerName}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              ))}
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Secure Payments</h4>
                  <p>All payments are processed securely through Stripe. We never store your payment information.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Accepted Payment Methods</h4>
                  <p>We accept all major credit cards, debit cards, and digital wallets.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Refund Policy</h4>
                  <p>Refunds are available up to 7 days before the conference start date.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Support</h4>
                  <p>
                    Need help? Contact us at{' '}
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
      </section>
    </div>
  );
};

export default PaymentPage;