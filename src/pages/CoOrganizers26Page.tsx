import React from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const coOrganizers = [
  'Advocacy Group: BGIN, Blockchain Commons, CDPI, PolicyLab Africa, IFED',
  'Car Connectivity Consortium',
  'Cloud Signature Consortium',
  'DAMA',
  'Decentralized Identity Foundation',
  'EMVCo',
  'ETSI',
  'EUDIW Group: Aptitude, We Build',
  'FIDO Alliance',
  'FIRST',
  'GLEIF',
  'GlobalPlatform',
  'GSMA',
  'IATA',
  'ID Associations Group: APDI, DIACC, DIDAS, FIDES, TeleTrusT',
  'IEC',
  'IEEE',
  'ISO',
  'ISOC',
  'Linux Foundation: LFDT, OWF',
  'mDL Group: AAMVA, Austroads, EReg',
  'OpenID Foundation',
  'Research Organizations Group: TNO, GEANT',
  'UNECE',
  'UNESCO',
  'United Nations Environment Programme',
  'United Nations International Computing Centre',
  'W3C',
  'World Bank Group',
  'World Health Organization',
];

const CoOrganizersPage: React.FC = () => {
  return (
    <div className="pt-20">
      
      {/* HEADER BLEIBT UNVERÄNDERT */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Co-Organizers
          </h1>

          <p className="text-xl text-white/90 max-w-3xl">
            Co-Organizers are the main drivers of the Global Digital Collaboration Conference.
            They convene their communities and provide their expertise. Intergovernmental Organizations and Non-Governmental

          </p>
        </div>
      </section>

      {/* NEUER CONTENT (Liste statt Logos) */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coOrganizers.map((name) => (
                <div
                  key={name}
                  className="bg-white rounded-lg p-4 border border-gray-200 text-center flex items-center justify-center min-h-[120px] shadow-sm"
                >
                  <span className="text-gray-800 font-medium">
                    {name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default CoOrganizersPage;