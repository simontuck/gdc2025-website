import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    setIsScrolled(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashClick = (hash: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${hash}`);
    }
  };

  const handleSubscribeClick = () => {
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      const element = document.getElementById('newsletter');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/#newsletter');
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Decorative background */}
      <div 
        className="h-5 w-full bg-repeat-x"
        style={{ backgroundImage: "url('/ow-global-barcode-header.png')" }}
      />
      
      {/* Header content */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="block">
            <img 
              src="/GC25_logo.svg" 
              alt="GDC25 Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/session-slides" className="text-gray-700 hover:text-primary-500 transition-colors">Slides & Videos</Link>
            <Link to="/speakers" className="text-gray-700 hover:text-primary-500 transition-colors">Speakers 2025</Link>
            <button
              onClick={() => handleHashClick('book-of-proceedings')}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              Book of Proceedings
            </button>
            <Link to="/faq" className="text-gray-700 hover:text-primary-500 transition-colors">FAQ</Link>
            <button
              onClick={handleSubscribeClick}
              className="btn btn-primary"
            >
              Subscribe for Updates
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                to="/session-slides" 
                className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Slides & Videos
              </Link>
              <Link 
                to="/speakers" 
                className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Speakers 2025
              </Link>
              <button
                onClick={() => handleHashClick('book-of-proceedings')}
                className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100 text-left"
              >
                Book of Proceedings
              </button>
              <Link to="/faq" className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100">FAQ</Link>
              <button
                onClick={handleSubscribeClick}
                className="btn btn-primary w-full"
              >
                Subscribe for Updates
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;