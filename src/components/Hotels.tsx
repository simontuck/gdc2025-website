import React from 'react';
import { Building, Star, ExternalLink, Mail } from 'lucide-react';

const Hotels: React.FC = () => {
  const hotels = [
    {
      name: "Hotel Intercontinental Geneva",
      stars: 5,
      description: "Closest to venue (5 min walk)",
      price: "From CHF 305",
      bookUrl: "https://www.ihg.com",
      emailContact: "Yann.PUNSOLA@ihg.com",
    },
    {
      name: "Hotel President Wilson",
      stars: 5,
      description: "Luxury lakeside hotel",
      price: "From CHF 350",
      bookUrl: "https://www.hotelpwilson.com",
      emailContact: "reservation.geneva@hotelpwilson.com",
    },
    {
      name: "Four Seasons Hotel des Bergues",
      stars: 5,
      description: "Historic luxury hotel with lake views",
      price: "From CHF 750",
      emailContact: "res.geneva@fourseasons.com",
    },
    {
      name: "Hotel d'Angleterre",
      stars: 5,
      description: "Boutique luxury hotel on the lake",
      price: "From CHF 690",
      emailContact: "reservations@dangleterrehotel.com",
    },
    {
      name: "Hotel N'vY",
      stars: 4,
      description: "Modern design hotel",
      price: "From CHF 280",
      bookUrl: "https://www.hotelnvygeneva.com",
      emailContact: "nvy@manotel.com",
    },
    {
      name: "Hotel Royal",
      stars: 4,
      description: "Central location near the lake",
      price: "From CHF 290",
      bookUrl: "https://www.hotelroyalgeneva.com",
      emailContact: "royal@manotel.com",
    },
    {
      name: "Hotel Jade",
      stars: 4,
      description: "Boutique hotel with zen atmosphere",
      price: "From CHF 260",
      bookUrl: "https://www.hoteljade.com",
      emailContact: "jade@manotel.com",
    },
    {
      name: "Hotel Auteuil",
      stars: 4,
      description: "Contemporary business hotel",
      price: "From CHF 270",
      bookUrl: "https://www.hotelauteuil.com",
      emailContact: "auteuil@manotel.com",
    }
  ];

  return (
    <section id="hotels" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recommended Hotels</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've partnered with Geneva's finest hotels for your stay. When booking, mention "GDC25" to check for special conference rates. All hotels are within easy reach of the venue by public transport or walking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-300 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                      <div className="flex">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{hotel.description}</p>
                  </div>
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-1 rounded">
                    {hotel.price}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  {hotel.bookUrl && (
                    <a 
                      href={hotel.bookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700 text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Book Online
                    </a>
                  )}
                  
                  {hotel.emailContact && (
                    <a 
                      href={`mailto:${hotel.emailContact}?subject=GDC25%20Hotel%20Booking`} 
                      className="flex items-center text-primary-600 hover:text-primary-700 text-sm"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {hotel.emailContact}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

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
  );
};

export default Hotels;