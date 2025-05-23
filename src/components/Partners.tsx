import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CoOrganizersProps {
  onCoOrganizerClick: () => void;
}

const CoOrganizers: React.FC<CoOrganizersProps> = ({ onCoOrganizerClick }) => {
  const intergovernmentalLogos = [
    '/GC25_logos/01_Intergovernmental_Organisation/european_commission.png',
    '/GC25_logos/01_Intergovernmental_Organisation/ITU.png',
    '/GC25_logos/01_Intergovernmental_Organisation/OECD.png',
    '/GC25_logos/01_Intergovernmental_Organisation/unece.png',
    '/GC25_logos/01_Intergovernmental_Organisation/UNICC.png',
    '/GC25_logos/01_Intergovernmental_Organisation/who.png',
    '/GC25_logos/01_Intergovernmental_Organisation/world_bank.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const standardsLogos = [
    '/GC25_logos/02_Standard_development_Organisations/ccc_logo_grayscale.png',
    '/GC25_logos/02_Standard_development_Organisations/csc.png',
    '/GC25_logos/02_Standard_development_Organisations/dif.png',
    '/GC25_logos/02_Standard_development_Organisations/etsi.png',
    '/GC25_logos/02_Standard_development_Organisations/fido.png',
    '/GC25_logos/02_Standard_development_Organisations/gp-logo-.jpg',
    '/GC25_logos/02_Standard_development_Organisations/iec.png',
    '/GC25_logos/02_Standard_development_Organisations/iso.png',
    '/GC25_logos/02_Standard_development_Organisations/openid_logo.jpg',
    '/GC25_logos/02_Standard_development_Organisations/w3c.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const openSourceLogos = [
    '/GC25_logos/03_Open_Source_Organisations/eclipse_foundation.png',
    '/GC25_logos/03_Open_Source_Organisations/FINOS.png',
    '/GC25_logos/03_Open_Source_Organisations/LFDT.png',
    '/GC25_logos/03_Open_Source_Organisations/openwallet_logo_color_with_descriptor.webp',
    '/GC25_logos/03_Open_Source_Organisations/tanzania_logo.png',
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
    '/GC25_logos/04_Non-Governmental_Organisations/ifrc.png',
    '/GC25_logos/04_Non-Governmental_Organisations/ispirt.png',
    '/GC25_logos/04_Non-Governmental_Organisations/Mosip.png',
    '/GC25_logos/04_Non-Governmental_Organisations/pli.png',
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const coOrganizerCategories = [
    {
      title: "Intergovernmental Organizations",
      logos: intergovernmentalLogos
    },
    {
      title: "Standards Development Organizations",
      logos: standardsLogos
    },
    {
      title: "Open Source Organizations",
      logos: openSourceLogos
    },
    {
      title: "Other Organizations",
      logos: otherLogos
    }
  ];

  return (
    <section id="co-organizers" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Co-Organizers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading organizations from across the globe working together to shape the future of digital public infrastructure, in particular in the realm of secure, interoperable wallets, credentials and trusted infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coOrganizerCategories.map((category, index) => (
            <div key={index} className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {category.logos.map((logo, logoIndex) => (
                  <div key={logoIndex} className="flex items-center justify-center h-16 p-2 bg-white rounded-lg">
                    <img
                      src={logo}
                      alt={`Logo ${logoIndex + 1}`}
                      className="max-h-full w-auto object-contain filter grayscale"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 rounded-xl p-8 md:p-12">
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary-600 mb-3">Become a Co-Organizer</h3>
              <p className="text-gray-700">
                Help shape the future of digital credentials, wallets, and infrastructure. Join our growing community of co-organizers and contribute to this groundbreaking event.
              </p>
            </div>
            <a 
              href="mailto:info@globaldigitalcollaboration.org?subject=GDC25%20Co-organizer%20Application"
              className="btn btn-secondary w-fit flex items-center"
            >
              Apply as a Co-Organizer
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoOrganizers;