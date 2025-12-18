import React from 'react';
import { BookOpen, Download } from 'lucide-react';

const BookOfProceedings: React.FC = () => {
  return (
    <section id="book-of-proceedings" className="section bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-12 w-12 text-primary-500 mr-4" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Book of Proceedings</h2>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                The complete conference proceedings including presentations, papers, and workshop outcomes from the Global Digital Collaboration Conference 2025 is now available.
              </p>
            </div>

            <div className="text-center">
              <a
                href="/documents/book-of-proceedings.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Book of Proceedings
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOfProceedings;