import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const Venue: React.FC = () => {
  // CICG Geneva coordinates
  const position: [number, number] = [46.219756, 6.137516];

  return (
    <section id="venue" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Venue</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Global Digital Collaboration Conference will be held at the Centre International de Conférences Genève (CICG), a world-class venue in the heart of international Geneva.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">CICG Geneva</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Centre International de Conférences Genève<br />
                17 Rue de Varembé<br />
                1211 Genève, Switzerland
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.cicg.ch/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit venue website
                </a>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Get directions
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Venue Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">Central location in the heart of International Geneva</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">State-of-the-art conference facilities</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">Multiple session rooms for parallel tracks</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">Networking areas and exhibition space</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-xs">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">Close to hotels, restaurants, and public transport</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer 
              center={position} 
              zoom={15} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <b>CICG Geneva</b><br />
                  Centre International de Conférences Genève<br />
                  17 Rue de Varembé, 1211 Genève
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;