import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const HEADER_OFFSET = 80;

export function useHashScroll() {
  const location = useLocation();

  const scrollToElement = useCallback((element: HTMLElement) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  const scrollToHash = useCallback(() => {
    const hash = location.hash;
    if (!hash) return;
    
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (!element) return;

    // Wait for any dynamic content to render
    requestAnimationFrame(() => {
      scrollToElement(element);
    });
  }, [location.hash, scrollToElement]);

  useEffect(() => {
    // Handle initial page load with hash
    if (location.hash) {
      // Add a small delay to ensure the page has fully rendered
      setTimeout(scrollToHash, 100);
    }
  }, [location.hash, scrollToHash]);

  // Handle navigation changes
  useEffect(() => {
    if (location.hash) {
      setTimeout(scrollToHash, 100);
    }
  }, [location.pathname, scrollToHash]);
}