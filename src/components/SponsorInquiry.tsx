import React from 'react';

const SponsorInquiry: React.FC = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Sponsor
          </h2>
          <p className="text-xl text-white/90">
            Would you like to become a sponsor of the GDC CON in 2026? You will find more information{' '}
            <a
              href="/documents/GC26_sponsors_v3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsorInquiry;
