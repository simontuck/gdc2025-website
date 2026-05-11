import React from 'react';

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
              The following organizations are confirmed as co-organizers for GDC conference in 2026. Up to 50 co-organizers will be admitted. The list will be updated continuously.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GDC26CoOrganizersHome;

