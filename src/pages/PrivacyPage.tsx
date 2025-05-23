import React from 'react';
import { Shield, Mail } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Statement</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            How we handle and protect your data at Global Digital Collaboration
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-primary-500" />
              <p className="text-sm text-gray-600">Last updated: 23 May 2025</p>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Who we are</h2>
              <p className="text-gray-700 mb-8">
                The <strong>Global Digital Collaboration</strong> is a unique public-private partnership uniting 30-plus inter-governmental, non-governmental, standards-development and open-source organisations. Its mission is to convene public and private stakeholders to foster digital infrastructure that benefits everyone.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Scope</h2>
              <p className="text-gray-700 mb-8">
                This statement covers only:
                <ul className="list-disc pl-6 mt-2">
                  <li>Technical data that our hosting provider (Netlify) records when you browse the site; and</li>
                  <li>Personal data you voluntarily send to us when you click an <strong>email link</strong> (mailto) displayed on any page.</li>
                </ul>
                It <strong>does not</strong> cover third-party channels such as social-media platforms or GC25's event page on <strong>lu.ma</strong>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. No cookies, no trackers</h2>
              <p className="text-gray-700 mb-8">
                The site sets <strong>no cookies, analytics pixels, fingerprinting scripts or similar tracking technologies</strong>. Simply browsing the site places nothing on your device.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. What we collect—and why</h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Legal basis (GDPR)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        <strong>Server logs</strong> (handled by Netlify): IP address, user-agent, timestamp
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Automatic, server-side</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Error diagnostics and security</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Art. 6 (1)(f) legitimate interests</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        <strong>Email correspondence</strong>: your email address, headers and any information you include in the message
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Voluntary user action via mailto link</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Respond to enquiries; maintain a record of correspondence</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">Art. 6 (1)(a) consent (you choose to email us)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mb-8">
                We neither profile visitors nor make automated decisions. Data is retained only as long as operational or legal obligations require.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your rights (EU / Swiss data subjects)</h2>
              <p className="text-gray-700 mb-8">
                You may at any time <strong>access</strong>, <strong>rectify</strong>, <strong>erase</strong>, <strong>restrict</strong> or <strong>object</strong> to processing, <strong>port</strong> your data, and <strong>withdraw consent</strong> (without affecting prior processing). You can also lodge a complaint with the FDPIC (Switzerland) or your national supervisory authority. We respond within one month.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to this statement</h2>
              <p className="text-gray-700 mb-8">
                Material updates will be sign-posted on the homepage and the "Last updated" date will change accordingly.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-gray-700">
                  GC25<br />
                  <a 
                    href="mailto:privacy@globaldigitalcollaboration.org"
                    className="text-primary-600 hover:text-primary-700 inline-flex items-center mt-2"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    privacy@globaldigitalcollaboration.org
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Please include "GDPR request" in the subject line for any data-rights enquiry.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <p className="text-gray-700 font-medium">
                  <strong>Plain-language synopsis:</strong> We log basic technical data for security and receive whatever you choose to send us by email. No cookies, no trackers—you stay in control of your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;