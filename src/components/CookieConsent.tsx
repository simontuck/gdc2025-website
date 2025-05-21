import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = Cookies.get(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    Cookies.set(COOKIE_CONSENT_KEY, 'all', { expires: 365 });
    setIsVisible(false);
  };

  const acceptEssential = () => {
    Cookies.set(COOKIE_CONSENT_KEY, 'essential', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Settings</h3>
            <p className="text-gray-600">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptEssential}
              className="btn btn-outline whitespace-nowrap"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="btn btn-primary whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
          <button
            onClick={acceptEssential}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}