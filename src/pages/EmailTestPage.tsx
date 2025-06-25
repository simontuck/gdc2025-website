import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const EmailTestPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestEmail = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          to: email,
          subject: 'GDC25 Email System Test'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to send test email');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestBookingConfirmation = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // First, let's try to find a confirmed booking to test with
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          bookingId: 'test-booking-id',
          customerEmail: email,
          customerName: 'Test User'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to send booking confirmation');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Email System Test</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Test the email confirmation system for meeting room bookings.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900">Test Email System</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Test Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleTestEmail}
                  disabled={isLoading || !email}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send Test Email
                </button>

                <button
                  onClick={handleTestBookingConfirmation}
                  disabled={isLoading || !email}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4 mr-2" />
                  )}
                  Test Booking Email
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                  </div>
                  <div className="text-sm text-green-700">
                    <p className="mb-2">{result.message}</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium">View Details</summary>
                      <pre className="mt-2 p-2 bg-green-100 rounded text-xs overflow-auto">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">How to Use</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Send Test Email:</strong> Sends a simple test email to verify the email system is working</li>
                  <li>• <strong>Test Booking Email:</strong> Tests the booking confirmation email template</li>
                  <li>• Check your email inbox (and spam folder) for the test emails</li>
                  <li>• If emails don't arrive, check the error messages for troubleshooting</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Troubleshooting</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Ensure RESEND_API_KEY is configured in Supabase Edge Functions</li>
                  <li>• Verify the domain is configured in Resend</li>
                  <li>• Check Supabase function logs for detailed error messages</li>
                  <li>• Make sure the email address is valid and can receive emails</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailTestPage;