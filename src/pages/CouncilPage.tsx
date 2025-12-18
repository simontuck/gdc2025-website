import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CouncilPage: React.FC = () => {
  const memberGroups = [
    {
      title: "Group of UN-Member States",
      members: [
        { name: "Brazil", representation: "Ministry of Management and Innovation in Public Services", isChair: true },
        { name: "Canada", representation: "Canadian Digital Service / Employment and Social Development Canada / Government of Canada" },
        { name: "China", representation: "State Information Center" },
        { name: "France", representation: "Agence Nationale des Titres Sécurisés, Ministry of the Interior" },
        { name: "Germany", representation: "Federal Ministry of Digital and State Modernization" },
        { name: "Singapore", representation: "Government Technology Agency" },
        { name: "Switzerland", representation: "Federal Office of Justice" }
      ]
    },
    {
      title: "Group of Intergovernmental Organizations",
      members: [
        { name: "European Union" },
        { name: "United Nations High Commissioner for Refugees (UNHCR)" },
        { name: "United Nations Educational, Scientific and Cultural Organization (UNESCO)" },
        { name: "World Bank Group", isChair: true },
        { name: "World Health Organization (WHO)" }
      ]
    },
    {
      title: "Group of Companies",
      members: [
        { name: "Ant Group Co. Ltd." },
        { name: "Apple Inc." },
        { name: "Consensys Software Inc." },
        { name: "Google LLC", isChair: true },
        { name: "Huawei Corporation" },
        { name: "Mastercard Inc." },
        { name: "Microsoft Corporation" },
        { name: "Samsung Electronics Co., Ltd." },
        { name: "Visa Inc." },
        { name: "Yubico Inc." }
      ]
    },
    {
      title: "Group of Nongovernmental Organizations",
      members: [
        { name: "FIDO Alliance" },
        { name: "Gates Foundation" },
        { name: "Institute of International Finance" },
        { name: "International Federation of Pharmaceutical Manufacturers and Associations" },
        { name: "International Air Transport Association", isChair: true },
        { name: "Linux Foundation/Open Wallet" },
        { name: "Mozilla Foundation" },
        { name: "World Wide Web Consortium" }
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
      <section className="py-16" style={{ backgroundColor: '#f4f8fc' }}>
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Council Purpose</h2>
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

          <ul className="space-y-3 mb-8">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span className="text-gray-700">{responsibility}</span>
              </li>
            ))}
          </ul>

          {/* Chatham House Rule Note */}
          <div className="bg-primary-50 border-l-4 border-primary-400 p-6 mb-8">
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
      </section>

      {/* Council Members Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Council Members</h2>
          <p className="text-gray-600 text-center mb-2">
            The Members of the Council are as follows:
          </p>
          <p className="text-gray-500 text-center text-sm italic mb-12">
            The remaining seats are in the process of being finalized.
          </p>

          <div className="space-y-12">
            {memberGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.members.map((member, memberIndex) => (
                    <li
                      key={memberIndex}
                      className="flex items-start"
                    >
                      <span className="text-primary-500 mr-3">•</span>
                      <span className="text-gray-700">
                        <span className="font-medium">{member.name}</span>
                        {member.isChair && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                            Chair
                          </span>
                        )}
                        {member.representation && (
                          <span className="text-gray-500">, represented by {member.representation}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Secretariat */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secretariat</h3>
              <ul className="space-y-2">
                {secretariat.map((member, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-3">•</span>
                    <span className="text-gray-700">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-gray-500">, {member.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CouncilPage;
