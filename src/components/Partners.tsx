import React from 'react';
import { Users, Building, Globe, ArrowRight } from 'lucide-react';

interface CoOrganizersProps {
  onCoOrganizerClick: () => void;
}

const CoOrganizers: React.FC<CoOrganizersProps> = ({ onCoOrganizerClick }) => {
  const coOrganizerCategories = [
    {
      title: "Intergovernmental Organizations",
      organizations: ["European Commission", "International Telecommunication Union", "United Nations Economic Commission for Europe", "UNICC", "The World Bank Group", "World Health Organization"]
    },
    {
      title: "Standardization Development Organizations",
      organizations: ["AAMVA", "Austroads", "eReg", "CCC", "CSC", "DIF", "ETSI", "FIDO Alliance", "ISO", "IEC", "W3C"]
    },
    {
      title: "Open Source Organizations",
      organizations: ["OWF", "Eclipse Foundation"]
    },
    {
      title: "Other Organizations",
      organizations: ["LF / FINOS", "CDPI", "DCC", "EPFL", "Fides", "MOSIP", "DIDAS"]
    }
  ];

  return (
    <section id="co-organizers" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Co-organizers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading organizations from across the globe working together to shape the future of digital public infrastructure.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 gap-y-10 items-center">
            {/* Intergovernmental Organizations */}
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/OECD.png" alt="OECD" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/ITU.png" alt="ITU" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/EC LOGO.png" alt="European Commission" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/UNECE.png" alt="UNECE" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/UNICC.png" alt="UNICC" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/World Bank.png" alt="World Bank Group" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/WHO.png" alt="WHO" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            
            {/* Standards Organizations */}
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/ISO.png" alt="ISO" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/IEC.png" alt="IEC" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/ETSI Logo No Tagline BLACK.png" alt="ETSI" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/CCC-logo-grayscale.png" alt="CCC" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/CSC.png" alt="CSC" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/DIF.png" alt="DIF" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/W3C.png" alt="W3C" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Fido.png" alt="FIDO Alliance" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/IETF.png" alt="IETF" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Austroads.png" alt="Austroads" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            
            {/* Open Source & Industry */}
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/OpenWallet_Logo_Color-with-descriptor (1).webp" alt="Open Wallet Foundation" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Eclipse Foundation.png" alt="Eclipse Foundation" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/LFDT.png" alt="Linux Foundation Digital Trust" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/FINOS.png" alt="FINOS" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/GLEIF.png" alt="GLEIF" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Global platform.png" alt="Global Platform" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/EWC.png" alt="EWC" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Ispirt.png" alt="iSPIRT" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            
            {/* Other Organizations */}
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Mosip.png" alt="MOSIP" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/DCPI.png" alt="DCPI" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/DCC.png" alt="DCC" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/C4DT.png" alt="C4DT" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/FIDES.png" alt="FIDES" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/Didas.png" alt="DIDAS" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/ayra.png" alt="AYRA" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
            <div className="flex items-center justify-center h-16 px-4">
              <img src="/logos/PLI_logo_outline_black.png" alt="PLI" className="max-h-full w-auto object-contain filter grayscale" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coOrganizerCategories.map((category, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center mb-4">
                {index === 0 && <Globe className="h-6 w-6 text-primary-500 mr-3" />}
                {index === 1 && <Building className="h-6 w-6 text-primary-500 mr-3" />}
                {(index === 2 || index === 3) && <Users className="h-6 w-6 text-primary-500 mr-3" />}
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>
              <ul className="space-y-2 mb-6">
                {category.organizations.map((org, idx) => (
                  <li key={idx} className="text-gray-700">{org}</li>
                ))}
                <li className="text-gray-500 italic">and many more...</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 rounded-xl p-8 md:p-12">
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary-600 mb-3">Become a Co-organizer</h3>
              <p className="text-gray-700">
                Help shape the future of digital credentials, wallets, and infrastructure. Join our growing community of co-organizers and contribute to this groundbreaking event.
              </p>
            </div>
            <a 
              href="mailto:info@globaldigitalcollaboration.org?subject=GDC25%20Co-organizer%20Application"
              className="btn btn-primary w-fit flex items-center"
            >
              Apply as a Co-organizer
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoOrganizers;