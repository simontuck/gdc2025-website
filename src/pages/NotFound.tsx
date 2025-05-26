import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Users, MapPin, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            Here are some helpful links to get you back on track:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link 
              to="/" 
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-primary-50 group"
            >
              <Home className="h-5 w-5 text-primary-500 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900">Home</span>
            </Link>

            <Link 
              to="/agenda" 
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-primary-50 group"
            >
              <Calendar className="h-5 w-5 text-primary-500 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900">Conference Agenda</span>
            </Link>

            <Link 
              to="/#co-organizers" 
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-primary-50 group"
            >
              <Users className="h-5 w-5 text-primary-500 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900">Co-organizers</span>
            </Link>

            <Link 
              to="/hotels" 
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-primary-50 group"
            >
              <MapPin className="h-5 w-5 text-primary-500 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900">Accommodation</span>
            </Link>
          </div>

          <Link 
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;