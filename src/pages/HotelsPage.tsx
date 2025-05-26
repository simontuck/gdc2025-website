import React from 'react';
import { Building, Star, ExternalLink, Mail, Clock, Car, Train, Walk } from 'lucide-react';
import { useHotels } from '../hooks/useHotels';

const HotelsPage: React.FC = () => {
  const { data: hotels, isLoading, error } = useHotels();

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Accommodation</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Find the perfect place to stay during the conference, with options for every preference and budget.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recommended Hotels</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've partnered with Geneva's finest hotels for your stay. When booking, mention "GDC25" to check for special conference rates. All hotels are within easy reach of the venue by public transport or walking.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading hotels</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the hotel information. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotels?.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-300 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{hotel.hotel}</h3>
                          <div className="flex">
                            {Array.from({ length: parseInt(hotel.stars) }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{hotel.notes}</p>
                      </div>
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-1 rounded">
                        {hotel.rate_offer}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-gray-400" />
                        <span>By taxi: {hotel.taxi_min} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Train className="h-4 w-4 text-gray-400" />
                        <span>By tram: {hotel.tram_min} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Walk className="h-4 w-4 text-gray-400" />
                        <span>Walking: {hotel.walk_min} minutes</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {hotel.url && (
                        <a 
                          href={hotel.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700 text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Book Online
                        </a>
                      )}
                      
                      {hotel.contact && (
                        <a 
                          href={`mailto:${hotel.contact}?subject=GDC25%20Hotel%20Booking`} 
                          className="flex items-center text-primary-600 hover:text-primary-700 text-sm"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {hotel.contact}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-gray-100 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-primary-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Need More Options?</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Geneva offers a wide range of accommodation options to suit all preferences and budgets. The city's excellent public transport system makes it easy to reach the venue from any location.
            </p>
            <a 
              href="https://www.geneve.ch/en/accommodations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View more hotels in Geneva
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelsPage;