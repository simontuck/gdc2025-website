import React, { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSubscription: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initialized.current) return;
    initialized.current = true;

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://api.mailxpert.ch/forms.js"]');

    if (existingScript) {
      // Script already loaded, just initialize the form
      if ((window as any).mailxpert) {
        const formElement = document.getElementById('formContentId');
        if (formElement) {
          (window as any).mailxpert.forms.include({
            src: 'https://web.swissnewsletter.ch/e/86bdf89f9e770cbb/de/form/ae408211-d111-4c21-8554-89793b23257d.html?render=container',
            element: formElement,
          });
        }
      }
    } else {
      // Load the Mailxpert forms script
      const script = document.createElement('script');
      script.src = 'https://api.mailxpert.ch/forms.js';
      script.async = true;
      document.body.appendChild(script);

      // Initialize the form after script loads
      script.onload = () => {
        const formElement = document.getElementById('formContentId');
        if (formElement && (window as any).mailxpert) {
          (window as any).mailxpert.forms.include({
            src: 'https://web.swissnewsletter.ch/e/86bdf89f9e770cbb/de/form/ae408211-d111-4c21-8554-89793b23257d.html?render=container',
            element: formElement,
          });
        }
      };
    }
  }, []);

  return (
    <section id="newsletter" className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-primary-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Stay Up to Date</h2>
          </div>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get notified about important updates:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-primary-500 mb-3">
                <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book of Proceedings</h3>
              <p className="text-sm text-gray-600">Release in September 2025</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-primary-500 mb-3">
                <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">GDC 2026 Announcements</h3>
              <p className="text-sm text-gray-600">Early bird registration and updates</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-primary-500 mb-3">
                <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Conference News</h3>
              <p className="text-sm text-gray-600">Digital collaboration updates</p>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div id="formContentId"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;