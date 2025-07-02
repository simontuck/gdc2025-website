import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Linkedin, Table } from 'lucide-react';

const Footer: React.FC = () => {
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
              <li><Link to="/#co-organizers" className="text-gray-300 hover:text-white transition-colors">Co-organizers</Link></li>
              <li><Link to="/agenda" className="text-gray-300 hover:text-white transition-colors">Conference Agenda</Link></li>
              <li><Link to="/speakers" className="text-gray-300 hover:text-white transition-colors">Speakers</Link></li>
              <li><Link to="/barcode" className="text-gray-300 hover:text-white transition-colors">Attending Visual</Link></li>              
              <li><Link to="/#code-of-conduct" className="text-gray-300 hover:text-white transition-colors">Code of Conduct</Link></li>
              <li><Link to="/#venue" className="text-gray-300 hover:text-white transition-colors">Venue</Link></li>
              <li><Link to="/hotels" className="text-gray-300 hover:text-white transition-colors">Hotels</Link></li>
              <li><Link to="/meeting-rooms" className="text-gray-300 hover:text-white transition-colors">Meeting Rooms</Link></li>
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
              Secure your seat at the most inclusive, multi stakeholder event shaping the future of wallets, credentials and trusted infrastructure.
            </p>
            <a 
              href="https://lu.ma/gc25?utm_source=gdc-website"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md transition-colors"
            >
              Register
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
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