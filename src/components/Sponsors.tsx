import React from 'react';

const Sponsors: React.FC = () => {
  const sponsorLogos = [
    { src: '/Sponsors/google_logo.png', alt: 'Google' },
    { src: '/Sponsors/huawei_logo.png', alt: 'Huawei' },
    { src: '/Sponsors/ma_symbol_opt_73_3x.png', alt: 'Mastercard' },
    { src: '/Sponsors/visa_logo.png', alt: 'Visa' },
  ].sort((a, b) => a.alt.toLowerCase().localeCompare(b.alt.toLowerCase()));

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading organizations supporting the advancement of wallets, credentials and trusted of digital public infrastructure in a manner and global collaboration.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 max-w-5xl mx-auto">
          {sponsorLogos.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;