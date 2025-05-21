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
        const headerOffset = 100; // Increased to account for taller header
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
          <div>
            <Link to="/" className="ml-2">
              <h1 className="text-lg md:text-xl font-bold text-primary-500">GDC25</h1>
              <p className="text-xs text-gray-600 hidden md:block">Global Digital Collaboration</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {location.pathname === '/' ? (
              <button
                onClick={() => handleHashClick('co-organizers')}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Co-organizers
              </button>
            ) : (
              <Link to="/#co-organizers" className="text-gray-700 hover:text-primary-500 transition-colors">Co-organizers</Link>
            )}
            <Link to="/agenda" className="text-gray-700 hover:text-primary-500 transition-colors">Agenda</Link>
            {location.pathname === '/' ? (
              <button
                onClick={() => handleHashClick('venue')}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >Venue</button>
            ) : (
              <Link to="/#venue" className="text-gray-700 hover:text-primary-500 transition-colors">Venue</Link>
            )}
            {location.pathname === '/' ? (
              <button
                onClick={() => navigate('/hotels')}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >Hotels</button>
            ) : (
              <Link to="/hotels" className="text-gray-700 hover:text-primary-500 transition-colors">Hotels</Link>
            )}
            <Link to="/faq" className="text-gray-700 hover:text-primary-500 transition-colors">FAQ</Link>
            <a
              href="https://lu.ma/gc25?utm_source=gdc-website"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Register Now
            </a>
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
              {location.pathname === '/' ? (
                <button
                  onClick={() => handleHashClick('co-organizers')}
                  className="text-left text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                >
                  Co-organizers
                </button>
              ) : (
                <Link to="/#co-organizers" className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100">Co-organizers</Link>
              )}
              <Link 
                to="/agenda" 
                className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Agenda
              </Link>
              {location.pathname === '/' ? (
                <button
                  onClick={() => handleHashClick('venue')}
                  className="text-left text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                >
                  Venue
                </button>
              ) : (
                <Link to="/#venue" className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100">Venue</Link>
              )}
              {location.pathname === '/' ? (
                <button
                  onClick={() => navigate('/hotels')}
                  className="text-left text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                >Hotels</button>
              ) : (
                <Link 
                to="/hotels"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Hotels
              </Link>
              )}
              <Link to="/faq" className="text-gray-700 hover:text-primary-500 transition-colors py-2 border-b border-gray-100">FAQ</Link>
              <a
                href="https://lu.ma/gc25?utm_source=gdc-website"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Register Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;