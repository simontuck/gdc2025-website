import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CouncilPage: React.FC = () => {
  const memberGroups = [
    {
      title: "Group of UN-Member States",
      members: [
        { name: "1 (Chair)", placeholder: true },
        { name: "2", placeholder: true },
        { name: "3", placeholder: true },
        { name: "4", placeholder: true },
        { name: "5", placeholder: true },
        { name: "6", placeholder: true },
        { name: "7", placeholder: true },
        { name: "8", placeholder: true },
        { name: "9", placeholder: true },
        { name: "10", placeholder: true }
      ]
    },
    {
      title: "Group of International Organizations",
      members: [
        { name: "1 (Chair)", placeholder: true },
        { name: "2", placeholder: true },
        { name: "3", placeholder: true },
        { name: "4", placeholder: true },
        { name: "5", placeholder: true },
        { name: "6", placeholder: true },
        { name: "7", placeholder: true },
        { name: "8", placeholder: true },
        { name: "9", placeholder: true },
        { name: "10", placeholder: true }
      ]
    },
    {
      title: "Group of Companies",
      members: [
        { name: "1 (Chair)", placeholder: true },
        { name: "2", placeholder: true },
        { name: "3", placeholder: true },
        { name: "4", placeholder: true },
        { name: "5", placeholder: true },
        { name: "6", placeholder: true },
        { name: "7", placeholder: true },
        { name: "8", placeholder: true },
        { name: "9", placeholder: true },
        { name: "10", placeholder: true }
      ]
    },
    {
      title: "Group of Nongovernmental Organizations",
      members: [
        { name: "1 (Chair)", placeholder: true },
        { name: "2", placeholder: true },
        { name: "3", placeholder: true },
        { name: "4", placeholder: true },
        { name: "5", placeholder: true },
        { name: "6", placeholder: true },
        { name: "7", placeholder: true },
        { name: "8", placeholder: true },
        { name: "9", placeholder: true },
        { name: "10", placeholder: true }
      ]
    }
  ];

  const secretariat = [
    { name: "Daniel Goldscheider", role: "Secretary" },
    { name: "Ruth Puente", role: "Senior Advisor" },
    { name: "Rolf Rauschenbach", role: "Liaison Swiss Confederation" }
  ];

  const responsibilities = [
    "Overall strategy, priorities, and guidance",
    "Nominating co-organizers for the GDC Conference",
    "Proposing agenda items for the GDC Conference and the High-Level Meeting",
    "Discussing the annual budget and fundraising opportunities",
    "Facilitating special projects"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Council</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            The GDC Council advances dialogue to support trusted and interoperable digital
            infrastructure worldwide.
          </p>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Council Purpose</h2>
            <p className="text-gray-700 mb-6">
              The GDC Council advances dialogue to support trusted and interoperable digital
              infrastructure—including wallets, credentials, payment systems, and the use of cybersecurity
              and AI in these contexts—by bringing together UN Member States, companies,
              Intergovernmental Organizations (IGOs), and Non-Governmental Organizations (NGOs).
            </p>
            <p className="text-gray-700 mb-6">
              Council members are expected to provide independent, non-binding advice to the GDC on
              the following matters:
            </p>

            <ul className="space-y-3 mb-6">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-500 mr-3">•</span>
                  <span className="text-gray-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chatham House Rule Note */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <p className="text-gray-700">
              Meetings follow the{' '}
              <a
                href="https://www.chathamhouse.org/about-us/chatham-house-rule"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Chatham House Rule
              </a>
              , unless the Council agrees otherwise in advance, in accordance with its{' '}
              <a
                href="/documents/terms-of-reference.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium"
              >
                Terms of Reference
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              .
            </p>
          </div>

          {/* Link to Meeting Summaries */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-700 mb-4">
              Summaries of the Council Meetings are published here:
            </p>
            <Link
              to="/council/meetings"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              <Users className="h-5 w-5 mr-2" />
              View Council Meeting Summaries
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Council Members Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Council Members</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The Members of the Council are as follows:
          </p>

          <div className="space-y-12">
            {memberGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{group.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.members.map((member, memberIndex) => (
                    <div
                      key={memberIndex}
                      className={`p-4 rounded-lg border ${
                        member.placeholder
                          ? 'border-dashed border-gray-300 bg-gray-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <p className={`text-center ${
                        member.placeholder ? 'text-gray-400 italic' : 'text-gray-900 font-medium'
                      }`}>
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Secretariat Section */}
            <div className="bg-primary-50 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Secretariat</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {secretariat.map((member, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="w-20 h-20 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary-600" />
                    </div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CouncilPage;
