import React from 'react';
import { Code } from 'lucide-react';

const ImprintPage: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Imprint</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Legal information and technical details about the GDC25 website
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Information</h2>
            <p className="text-gray-700 mb-8">
              The Swiss Confederation as host is represented by the Federal Office of Justice FOJ.{' '}
              <a 
                href="https://www.trustsquare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Trust Square Ecosystem AG
              </a>{' '}
              acts as a service provider on behalf of the Swiss Confederation.
            </p>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-6 w-6 text-primary-500" />
                <h2 className="text-2xl font-bold text-gray-900">Technical Implementation</h2>
              </div>
              <p className="text-gray-700 mb-4">
                This website is built using modern open source technologies to ensure performance,
                accessibility, and security:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3">
                    <span className="font-semibold">React</span> - A JavaScript library for building user interfaces
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3">
                    <span className="font-semibold">Vite</span> - Next generation frontend tooling
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3">
                    <span className="font-semibold">Tailwind CSS</span> - A utility-first CSS framework
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3">
                    <span className="font-semibold">TypeScript</span> - A typed superset of JavaScript
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3">
                    <span className="font-semibold">Supabase</span> - An open source Firebase alternative
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImprintPage;