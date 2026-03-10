import React from 'react';
import { Users } from 'lucide-react';

const coOrganizers = [
  'Car Connectivity Consortium',
  'Cloud Signature Consortium',
  'Decentralized Identity Foundation',
  'EMVCo',
  'EUDIW Group: We Build, Aptitude',
  'FIDO Alliance',
  'GLEIF',
  'GlobalPlatform',
  'IATA',
  'IEC',
  'ISO',
  'ISOC',
  'mDL Group: AAMVA, Austroads, EReg, STA',
  'OpenID Foundation',
  'OpenWallet Foundation',
  'United Nations Environment Programme',
  'United Nations International Computing Centre',
  'W3C',
  'World Bank Group',
];

const GDC26CoOrganizers: React.FC = () => {
  return (
    <section id="gdc26" className="section bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Co-Organizers
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The following organizations are confirmed as co-organizers for GDC CON in 2026. Up to 50 co-organizers will be admitted. The list will be updated continuously.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coOrganizers.map((name) => (
              <div
                key={name}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center flex items-center justify-center min-h-[80px]"
              >
                <span className="text-gray-800 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GDC26CoOrganizers;