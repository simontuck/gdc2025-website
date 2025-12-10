import React from 'react';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallForCoOrganizersPage: React.FC = () => {
  const eligibilityCriteria = [
    {
      number: 1,
      title: "Organizational Type",
      points: [
        "Intergovernmental, Non-Governmental, Standardization or Open Source Organization"
      ]
    },
    {
      number: 2,
      title: "Alignment with GDC",
      points: [
        "Meaningful contributor to the GDC agenda or",
        "Meaningful convener of a community/industry relevant to the GDC"
      ]
    },
    {
      number: 3,
      title: "Strategic Contribution",
      points: [
        "Capacity for substantial contributions (technical expertise, research, policy insights) aligning with GDC objectives",
        "Ability to offer support (including in-kind resources) for conference success",
        "Proven track record in developing or adopting global, inclusive and open standards"
      ]
    },
    {
      number: 4,
      title: "Commitment to co-create the Agenda",
      points: [
        "Best effort to attend Co-Organizer meetings"
      ]
    },
    {
      number: 5,
      title: "Community Mobilization and Representativeness",
      points: [
        "Global reach or strong sectoral representativeness, ensuring diverse perspectives and attracting the target audience"
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
              to="/"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Call for Co-Organizers</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Join us in shaping GDC 2026 as a co-organizing partner
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Call</h2>
            <p className="text-gray-700 mb-6">
              For GDC26, the Council invites potential Co-Organizers to express their interest to
              co-organize. The Council will assess eligibility and propose co-organizers to GDC,
              represented by the Swiss Confederation.
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">GDC Co-Organizer Eligibility Criteria</h2>
            <div className="space-y-8">
              {eligibilityCriteria.map((criterion) => (
                <div key={criterion.number} className="border-l-4 border-primary-500 pl-6">
                  <div className="flex items-center mb-3">
                    <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-bold">{criterion.number}</span>
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">{criterion.title}</h3>
                  </div>
                  <ul className="space-y-2 ml-11">
                    {criterion.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Apply CTA */}
          <div className="bg-primary-50 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
            <p className="text-gray-700 mb-6">
              Submit your organization's application to become a GDC26 co-organizer.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-6"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Apply as Co-Organizer
            </a>
            <p className="text-gray-600 text-sm mb-2">
              For questions, please contact:
            </p>
            <a
              href="mailto:secretariat@globaldigitalcollaboration.org"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <Mail className="h-5 w-5 mr-2" />
              secretariat@globaldigitalcollaboration.org
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallForCoOrganizersPage;
