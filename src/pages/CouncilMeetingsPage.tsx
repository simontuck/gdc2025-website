import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const CouncilMeetingsPage: React.FC = () => {
  const meetings = [
    {
      date: "December 2, 2025 (online virtual meeting)",
      title: "Inaugural Council Meeting",
      summary: "The inaugural Global Digital Collaboration Council meeting successfully established the Council, comprising four distinct groups: Member States, Intergovernmental Organizations, Non-Governmental Organizations, and Companies. The meeting addressed several strategic themes, laying the groundwork for future initiatives.",
      keyOutcomes: [
        {
          title: "Adoption of Terms of Reference",
          description: "The draft Terms of Reference, dated November 17, 2025, outlining the Council's operational framework, was reviewed and agreed upon."
        },
        {
          title: "Recognition of Chairs",
          description: "The procedure for electing Group Chairs was outlined and endorsed. Voluntary expressions of interest for Group Chair positions were noted and accepted, with chairs confirmed by acclamation.",
          chairs: [
            { group: "Member States", name: "Federative Republic of Brazil" },
            { group: "IGOs", name: "World Bank Group" },
            { group: "Companies", name: "Google LLC" },
            { group: "NGOs", name: "International Air Transport Association" }
          ]
        },
        {
          title: "High-Level Meeting in Davos",
          description: "Plans for a high-level meeting in Davos were confirmed for January 20, 2026, from 14:00 - 18:00 CET, to be held at the House of Switzerland. The primary purpose of this gathering, which includes ministers and senior representatives, is to focus on public-private partnerships for digital wallets and credentials across borders and use cases. All Council Members are encouraged to participate."
        },
        {
          title: "Conference in Geneva",
          description: "Preparations for the GDC Conference in Geneva are underway, scheduled for September 1st-3rd, 2026, at Palexpo, Geneva. This conference aims to bring together over 2,000 representatives from the public and private sectors. A call for co-organizers will be published. Efforts are also being made to secure travel funding to ensure representation from Least Developed Countries."
        }
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/council"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Council
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Summaries of Council Meetings</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Summaries of GDC Council meetings, presented in chronological order with the most recent first.
          </p>
        </div>
      </section>

      {/* Meetings List */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {meetings.map((meeting, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Meeting Header */}
                <div className="bg-primary-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center text-primary-600 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{meeting.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{meeting.title}</h2>
                </div>

                {/* Meeting Content */}
                <div className="p-8">
                  <p className="text-gray-700 mb-8">{meeting.summary}</p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Outcomes</h3>
                  <div className="space-y-6">
                    {meeting.keyOutcomes.map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex} className="border-l-4 border-primary-500 pl-6">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {outcomeIndex + 1}. {outcome.title}
                        </h4>
                        <p className="text-gray-600">{outcome.description}</p>
                        {outcome.chairs && (
                          <ul className="mt-3 space-y-1">
                            {outcome.chairs.map((chair, chairIndex) => (
                              <li key={chairIndex} className="text-gray-600 flex items-center">
                                <span className="text-primary-500 mr-2">•</span>
                                <span className="font-medium">{chair.group}:</span>
                                <span className="ml-2">{chair.name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CouncilMeetingsPage;
