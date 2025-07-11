import React from 'react';
import { BookOpen, Calendar, Download, Bell } from 'lucide-react';

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
                The complete conference proceedings including presentations, papers, and workshop outcomes from the Global Digital Collaboration Conference 2025 will be released soon.
              </p>
            </div>


            <div className="text-center">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 inline-block">
                <div className="flex items-center justify-center mb-2">
                  <Bell className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Get Notified</span>
                </div>
                <p className="text-sm text-gray-700">
                  Subscribe to our newsletter below to receive notification when the Book of Proceedings is available for download.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOfProceedings;