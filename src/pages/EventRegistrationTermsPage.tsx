import React from 'react';
import { Shield } from 'lucide-react';

const EventRegistrationTermsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms and Conditions for Data Collection</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Global Collaboration on Wallets and Credentials (GC25)
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-primary-500" />
              <div className="text-sm text-gray-600">
                <span className="mr-4">Effective Date: 1 April 2025</span>
                <span>Last Updated: 4 June 2025</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-8">
                These Terms and Conditions ("Terms") govern the collection, processing, and use of personal data in connection with registration for and participation in the Global Collaboration on Wallets and Credentials conference ("GC25" or "Conference") via the lu.ma platform.
              </p>
              <p className="text-gray-700 mb-8">
                By registering for GC25, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, please do not proceed with registration.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Controller</h2>
              <p className="text-gray-700 mb-8">
                The data controller responsible for the processing of your personal data is the Federal Data Protection and Information Commissioner (FDPIC). For any inquiries, please use the contact form at:{' '}
                <a href="https://www.edoeb.admin.ch/de/kontakt" className="text-primary-600 hover:text-primary-700">
                  https://www.edoeb.admin.ch/de/kontakt
                </a>
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Categories of Personal Data Collected</h2>
              <h3 className="text-xl font-bold text-gray-800 mb-3">3.1 Registration Data</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Full name</li>
                <li>Email address</li>
                <li>Organisation/Company name</li>
                <li>Professional title/position</li>
                <li>Country of residence</li>
                <li>Registration channel (WHO, UNICC, ITU, etc.)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">3.2 Optional Information</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Dietary requirements or restrictions</li>
                <li>Accessibility needs</li>
                <li>Areas of professional interest</li>
                <li>LinkedIn profile or other professional social media</li>
                <li>Any other potential co-organizer registration questions</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">3.3 Technical Data</h3>
              <p className="text-gray-700 mb-4">
                The following technical data is collected through the lu.ma platform. For more information about how lu.ma processes this data, please refer to their privacy policy at{' '}
                <a href="https://lu.ma/privacy-policy" className="text-primary-600 hover:text-primary-700">
                  https://lu.ma/privacy-policy
                </a>:
              </p>
              <ul className="list-disc pl-6 mb-8 text-gray-700">
                <li>IP address during registration</li>
                <li>Browser type and version</li>
                <li>Registration timestamp</li>
                <li>Ticket ID and QR code data</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Recipients</h2>
              <h3 className="text-xl font-bold text-gray-800 mb-3">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>lu.ma</strong> (event registration platform)</li>
                <li><strong>Authorised event support staff</strong> (registration desk, technical support)</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 mb-8">
                Trust Square Ecosystem AG will delete all personal data after the event. However, the host (Swiss Confederation) will retain the data in accordance with their privacy policy, which can be found at:{' '}
                <a href="https://www.edoeb.admin.ch/en/privacy-policy-terms-and-conditions" className="text-primary-600 hover:text-primary-700">
                  https://www.edoeb.admin.ch/en/privacy-policy-terms-and-conditions
                </a>
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Under applicable data protection law, you have the following rights:
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.1 Right of Access</h3>
              <p className="text-gray-700 mb-4">
                You may request information about the personal data we process about you.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.2 Right to Rectification</h3>
              <p className="text-gray-700 mb-4">
                You may request correction of inaccurate or incomplete personal data.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.3 Right to Erasure</h3>
              <p className="text-gray-700 mb-4">
                You may request deletion of your personal data, subject to legal retention requirements.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.4 Right to Restriction</h3>
              <p className="text-gray-700 mb-4">
                You may request restriction of processing under certain circumstances.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.5 Right to Data Portability</h3>
              <p className="text-gray-700 mb-4">
                You may request to receive your data in a structured, commonly used format.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.6 Right to Object</h3>
              <p className="text-gray-700 mb-4">
                You may object to processing based on legitimate interests.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">6.7 Right to Withdraw Consent</h3>
              <p className="text-gray-700 mb-8">
                Where processing is based on consent, you may withdraw it at any time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Analytics</h2>
              <p className="text-gray-700 mb-8">
                The lu.ma platform uses cookies for essential functionality and basic analytics. You can manage cookie preferences through your browser settings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to These Terms</h2>
              <p className="text-gray-700 mb-8">
                We reserve the right to update these Terms. Significant changes will be communicated via email to registered participants. The latest version will always be available on the registration page.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 mb-8">
                These Terms are governed by Swiss law. The exclusive place of jurisdiction is Bern, Switzerland.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mt-12 mb-8">
                <p className="text-gray-700 font-medium">
                  By clicking "Register" on the lu.ma platform, you confirm that you have read, understood, and agree to these Terms and Conditions for Data Collection.
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p>Version: 1.0</p>
                <p>Document ID: GC25-TC-2025-EN</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventRegistrationTermsPage;