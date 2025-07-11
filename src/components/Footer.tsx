import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight, Linkedin, Table } from 'lucide-react';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
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
    <footer className="bg-primary-500 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col">
            <div className="mb-4">
              <Link to="/">
                <img 
                  src="/GC25_logo_white.svg" 
                  alt="GDC25 Logo" 
                  className="h-12 w-auto mb-2"
                />
              </Link>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-gray-300">
                Hosted by the Swiss Confederation
              </p>
              <img 
                src="/logos/Logo_der_Schweizerischen_Eidgenossenschaft.png" 
                alt="Swiss Confederation" 
                className="h-25 mt-2 p-2 rounded"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-primary-400 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/session-slides" className="text-gray-300 hover:text-white transition-colors">Slides & Videos</Link></li>
              <li>
                <a 
                  href="https://share.dma.swiss/s/XCx7CadWobSs9WR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Conference Photos
                </a>
              </li>
              <li><Link to="/session-slides" className="text-gray-300 hover:text-white transition-colors">Day 1 Presentations</Link></li>
              <li>
                <a 
                  href="https://www.eid.admin.ch/de/global-digital-collaboration-conference" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Beat Jans Keynote Speech
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/playlist?list=PL_X6UOh6MHSdluNDc9xcU86wBhsN4aIjz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GDC YouTube Channel
                </a>
              </li>
              <li>
                <a 
                  href="https://globaldigitalcollaboration.org/t-shirt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Conference T-Shirts
                </a>
              </li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-primary-400 pb-2">Contact</h3>
            <ul className="space-y-3">
              <li>
                <div>
                  <p className="text-sm text-gray-300">General Inquiries:</p>
                  <a href="mailto:info@globaldigitalcollaboration.org" className="text-white hover:underline">
                    info@globaldigitalcollaboration.org
                  </a>
                </div>
              </li>
              <li>
                <div>
                  <p className="text-sm text-gray-300">Agenda Submissions:</p>
                  <a href="mailto:agenda@globaldigitalcollaboration.org" className="text-white hover:underline">
                    agenda@globaldigitalcollaboration.org
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <a 
                  href="https://www.linkedin.com/company/global-digital-collaboration-event/" 
                  className="text-gray-300 hover:text-white transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-primary-400 pb-2">Register Now</h3>
            <p className="text-gray-300 mb-4">
              Stay updated on the next Global Digital Collaboration Conference and related developments in wallets, credentials and trusted infrastructure.
            </p>
            <button
              onClick={handleSubscribeClick}
              className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md transition-colors"
            >
              Subscribe for Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-primary-400 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © Global Digital Collaboration Conference. All rights reserved. | 
            <Link to="/imprint" className="text-gray-400 hover:text-white ml-2 transition-colors">
              Imprint
            </Link> |
            <Link to="/privacy" className="text-gray-400 hover:text-white ml-2 transition-colors">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;