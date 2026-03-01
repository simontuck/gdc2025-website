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
            type: 'subscription_form',
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
            type: 'subscription_form',
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
            Get notified about important updates.
          </p>

          <div className="max-w-md mx-auto">
            <div id="formContentId"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;