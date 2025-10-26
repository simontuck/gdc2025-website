import React from 'react';

const ConferencePhoto: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/images/1536-1024.jpg" 
              alt="Global Digital Collaboration Conference 2025 - Participants and speakers gathered in Geneva"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  A Historic Gathering in Geneva
                </h2>
                <p className="text-lg text-white/90 max-w-3xl">
                  On July 1 and 2, 2025, representatives from 46 leading organizations came together to advance digital trust infrastructure for the benefit of all humanity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferencePhoto;