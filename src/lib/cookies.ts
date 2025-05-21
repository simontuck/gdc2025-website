import Cookies from 'js-cookie';

export const COOKIE_CONSENT_KEY = 'cookie-consent';

export function hasConsent(): boolean {
  return !!Cookies.get(COOKIE_CONSENT_KEY);
}

export function getConsentType(): 'all' | 'essential' | null {
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  if (consent === 'all' || consent === 'essential') {
    return consent;
  }
  return null;
}

export function setAnalyticsCookie(name: string, value: string) {
  if (getConsentType() === 'all') {
    Cookies.set(name, value, { expires: 365 });
  }
}

export function setEssentialCookie(name: string, value: string) {
  Cookies.set(name, value, { expires: 365 });
}