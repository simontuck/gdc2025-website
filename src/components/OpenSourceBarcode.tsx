import React from 'react';
import { Globe } from 'lucide-react';

const OpenSourceBarcode: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-primary-500" />
            <h2 className="text-3xl font-bold text-gray-900">Global Open Source Leadership</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A unique visualization of the top 20 countries leading the global open source movement, 
            represented from west to east in this distinctive barcode pattern.
          </p>
        </div>
        
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img 
            src="/GDC - Barcode - Top20 Open Source.jpg" 
            alt="Top 20 Countries in Open Source - Barcode Visualization"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm">
              This visualization represents the geographical distribution of open source contributions, 
              highlighting the collaborative nature of digital innovation across borders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceBarcode;