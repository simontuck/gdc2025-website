import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoOrganizersPage: React.FC = () => {
  const intergovernmentalLogos = [
    '/GC25_logos/01_Intergovernmental_Organisation/european_commission.png',
    '/GC25_logos/01_Intergovernmental_Organisation/ITU.png',
    '/GC25_logos/01_Intergovernmental_Organisation/OECD.png',
    '/GC25_logos/01_Intergovernmental_Organisation/unctad.jpeg',
    '/GC25_logos/01_Intergovernmental_Organisation/unece.png',
    '/GC25_logos/01_Intergovernmental_Organisation/unhcr_logo_black_and_white_1.png',
    '/GC25_logos/01_Intergovernmental_Organisation/UNICC.png',
    '/GC25_logos/01_Intergovernmental_Organisation/who.png',
    '/GC25_logos/01_Intergovernmental_Organisation/world_bank.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const standardsLogos = [
    '/GC25_logos/02_Standard_development_Organisations/ccc_logo_grayscale.png',
    '/GC25_logos/02_Standard_development_Organisations/cen_541c_no_background_black.png',
    '/GC25_logos/02_Standard_development_Organisations/cenelec_logo_simple_cmjn_grey_1_resized.png',
    '/GC25_logos/02_Standard_development_Organisations/csc.png',
    '/GC25_logos/02_Standard_development_Organisations/dif.png',
    '/GC25_logos/02_Standard_development_Organisations/etsi.png',
    '/GC25_logos/02_Standard_development_Organisations/fido.png',
    '/GC25_logos/02_Standard_development_Organisations/gp-logo-.jpg',
    '/GC25_logos/02_Standard_development_Organisations/openid_logo.jpg',
    '/GC25_logos/02_Standard_development_Organisations/w3c.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const openSourceLogos = [
    '/GC25_logos/03_Open_Source_Organisations/eclipse_foundation.png',
    '/GC25_logos/03_Open_Source_Organisations/FINOS.png',
    '/GC25_logos/03_Open_Source_Organisations/LFDT.png',
    '/GC25_logos/03_Open_Source_Organisations/openmobilehub_horizontal_black.svg',
    '/GC25_logos/03_Open_Source_Organisations/openwallet_logo_color_with_descriptor.webp',
    '/GC25_logos/03_Open_Source_Organisations/tanzania_logo.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const internationalLogos = [
    '/GC25_logos/05_International_Organizations/iec.png',
    '/GC25_logos/05_International_Organizations/ifrc.png',
    '/GC25_logos/05_International_Organizations/iso.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const otherLogos = [
    '/GC25_logos/04_Non-Governmental_Organisations/Aamva.png',
    '/GC25_logos/04_Non-Governmental_Organisations/Austroads.png',
    '/GC25_logos/04_Non-Governmental_Organisations/ayra.png',
    '/GC25_logos/04_Non-Governmental_Organisations/bgin_logomark_black.png',
    '/GC25_logos/04_Non-Governmental_Organisations/c4dt.png',
    '/GC25_logos/04_Non-Governmental_Organisations/dcc.png',
    '/GC25_logos/04_Non-Governmental_Organisations/dcpi.png',
    '/GC25_logos/04_Non-Governmental_Organisations/dial_logo.png',
    '/GC25_logos/04_Non-Governmental_Organisations/didas.png',
    '/GC25_logos/04_Non-Governmental_Organisations/DigitalSociety_black_rgb.jpg',
    '/GC25_logos/04_Non-Governmental_Organisations/EReg.png',
    '/GC25_logos/04_Non-Governmental_Organisations/fides.png',
    '/GC25_logos/04_Non-Governmental_Organisations/gleif.png',
    '/GC25_logos/04_Non-Governmental_Organisations/gtf_logo_hi_res.png',
    '/GC25_logos/04_Non-Governmental_Organisations/ispirt.png',
    '/GC25_logos/04_Non-Governmental_Organisations/Mosip.png',
    '/GC25_logos/04_Non-Governmental_Organisations/pli.png',
    '/GC25_logos/04_Non-Governmental_Organisations/verifiable.trade.svg',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const coOrganizerCategories = [
    {
      title: "Intergovernmental Organizations",
      description: "Leading international bodies shaping global digital policy and infrastructure",
      logos: intergovernmentalLogos
    },
    {
      title: "International Organizations",
      description: "Global organizations contributing to international collaboration and standardization",
      logos: internationalLogos
    },
    {
      title: "Standard Development Organizations",
      description: "Organizations developing technical standards for digital infrastructure",
      logos: standardsLogos
    },
    {
      title: "Open Source Organizations",
      description: "Communities building open source solutions for digital public infrastructure",
      logos: openSourceLogos
    },
    {
      title: "Other Organizations",
      description: "Additional partners contributing to digital collaboration",
      logos: otherLogos
    }
  ];

  return (
    <div className="pt-20">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Co-Organizers 2025</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Leading organizations from across the globe that came together to shape the future of digital identity, in particular in the realm of secure, interoperable wallets, credentials and trusted infrastructure.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="space-y-16">
            {coOrganizerCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {category.logos.map((logo, logoIndex) => (
                    <div 
                      key={logoIndex} 
                      className="flex items-center justify-center h-24 p-4"
                    >
                      <img
                        src={logo}
                        alt={`Logo ${logoIndex + 1}`}
                        className="max-h-full max-w-full w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        style={{ 
                          minHeight: '40px',
                          minWidth: '60px'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sponsors Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Sponsors</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Leading organizations supporting the advancement of wallets, credentials and trusted infrastructure in a manner of global collaboration.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 max-w-5xl mx-auto">
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <img
                  src="/Sponsors/google_logo.png"
                  alt="Google"
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <img
                  src="/Sponsors/huawei_logo.png"
                  alt="Huawei"
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <img
                  src="/Sponsors/ma_symbol_opt_73_3x.png"
                  alt="Mastercard"
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <img
                  src="/Sponsors/visa_logo.png"
                  alt="Visa"
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoOrganizersPage;