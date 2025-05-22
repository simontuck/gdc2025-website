import React from 'react';

const Sponsors: React.FC = () => {
  const sponsorLogos = [
    { src: '/Sponsors/futurewei_logo.webp', alt: 'Futurewei' },
    { src: '/Sponsors/google_logo.png', alt: 'Google' },
    { src: '/Sponsors/huawei_logo.png', alt: 'Huawei' },
    { src: '/Sponsors/mastercard_logo..png', alt: 'Mastercard' },
    { src: '/Sponsors/visa_logo.png', alt: 'Visa' },
  ].sort((a, b) => a.alt.toLowerCase().localeCompare(b.alt.toLowerCase()));

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading organizations supporting the advancement of digital public infrastructure and global collaboration.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center max-w-5xl mx-auto">
          {sponsorLogos.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;