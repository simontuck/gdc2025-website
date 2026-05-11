import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Users } from 'lucide-react';
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
];

const GDC26CoOrganizers: React.FC = () => {
  

  return (
    <div className="pt-20">
      {/* Hero Section */}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Council</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            The GDC Council advances dialogue to support trusted and interoperable digital
            infrastructure worldwide.
          </p>
        </div>
      </section>

    </div>
  );
};

export default GDC26CoOrganizers;
