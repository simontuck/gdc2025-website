import React from 'react';
import { BookOpen, Calendar, Download, Bell } from 'lucide-react';

const BookOfProceedings: React.FC = () => {
  return (
    <section className="section bg-white">
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
                The complete conference proceedings including all presentations, papers, and workshop outcomes from the Global Digital Collaboration Conference 2025 will be released soon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="text-primary-500 mb-3">
                  <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Complete Presentations</h3>
                <p className="text-sm text-gray-600 text-center">All keynote speeches, session presentations, and workshop materials</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="text-primary-500 mb-3">
                  <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Research Papers</h3>
                <p className="text-sm text-gray-600 text-center">Academic papers and research findings presented at the conference</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="text-primary-500 mb-3">
                  <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Workshop Outcomes</h3>
                <p className="text-sm text-gray-600 text-center">Collaborative session results and action items for future work</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 inline-block">
                <div className="flex items-center justify-center mb-2">
                  <Bell className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-blue-900">Get Notified</span>
                </div>
                <p className="text-sm text-blue-800">
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
  )
}