import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// ---------------------------
// Typdefinitionen
// ---------------------------
type Chair = {
  name: string;
  group?: string;
};

type KeyOutcome =
  | { title: string; description: string; chairs?: Chair[] }
  | { title: string; description: string; linkLabel: string; linkUrl: string };

type ConclusionItem = {
  text: string;
  linkLabel?: string;
  linkUrl?: string;
};

type Meeting = {
  date: string;
  title: string;
  summary: string | string[];
  keyOutcomes: KeyOutcome[];
  conclusion?: ConclusionItem[];
};

// ---------------------------
// Meetings-Daten
// ---------------------------
const meetings: Meeting[] = [
  {
    date: "January 27, 2026 (online virtual meeting)",
    title: "Council Q1 Meeting",
    summary: "The Global Digital Collaboration Council held its Q1 2026 virtual meeting to confirm operational milestones, expand membership, and advance preparations for the 2026 GDC Conference in Geneva.",
    keyOutcomes: [
      {
        title: "",
        description: "Membership: The Global System for Mobile Communications Association (GSMA) and the Internet Society (ISOC) have formally joined the Council; the updated membership list is available ",
        linkLabel: "here",
        linkUrl: "https://globaldigitalcollaboration.org/council"
      },
      {
        title: "",
        description: "Approved co-organizers (from the first batch of applications received):",
        chairs: [
          { name: "United Nations International Computing Centre;" },
          { name: "UN Environment Programme;" },
          { name: "Car Connectivity Consortium;" },
          { name: "Cloud Signature Consortium;" },
          { name: "Decentralized Identity Foundation;" },
          { name: "GLEIF;" },
          { name: "GlobalPlatform;" },
          { name: "OpenID Foundation;" },
          { name: "EMVCo." },
          { name: "Additionally, two specific collaborative groups were confirmed: EC Large Scale Pilots We Build, and Aptitude will focus on the EUDI Wallet, while AAMVA and Austroads will work together on specific areas such as mDL." },
          { name: "All other applications remain under consideration. Additional applications are encouraged and can be submitted until May 8, 2026." }
        ]
      },
      {
        title: "",
        description: "Governance: Terms of Reference were discussed. An ad hoc session will finalize the suggested amendments to improve and clarify operational procedures."
      },
      {
        title: "",
        description: "Priorities and roadmap for 2026: Each Council group will refine strategic priorities via dedicated ad hoc sessions."
      },
      {
        title: "",
        description: "Historic milestone: Agreement nearing completion to make ISO/IEC 18013 (mobile driving license) freely available, a concrete outcome from a unique public - private partnership."
      },
      {
        title: "",
        description: "The next Council meetings will be held in Q2 (virtual), Q3 (in-person in Geneva), and Q4 (virtual)."
      }
    ]
  },
  {
    date: "January 20, 2026 (in-person meeting at the House of Switzerland, Davos, Switzerland)",
    title: "Council High-Level Meeting",
    summary: [
      "The Global Digital Collaboration Council convened ministers, CEOs, and technical leaders for its High-Level Meeting at the House of Switzerland in Davos, hosted by the Swiss Federal Department of Foreign Affairs (FDFA) and the Federal Office of Justice (FOJ).",
      "The meeting emphasized that interoperability is not a technical afterthought but a vehicle for scalable impact, cost efficiency, risk reduction, and seamless digital public infrastructure.",
      "Council members and invited leaders from governments, international organizations, standards bodies, and industry engaged in focused discussions to build consensus on the foundations of a secure and interoperable digital ecosystem. Discussions underscored the complementary roles of the public sector in establishing trust and the private sector in driving adoption through services and wallets."
    ],
    keyOutcomes: [
      {
        title: "",
        description: "The effectiveness of public–private partnerships in advancing interoperable digital wallets, with concrete progress on making ISO/IEC 18013 (mDL) freely available and discussions on browser–wallet interaction."
      },
      {
        title: "",
        description: "The central role of open standards, open-source components, and trusted digital credentials in supporting inclusion, resilience, and sustainable growth."
      },
      {
        title: "",
        description: "Practical cross-border use cases in health, payments, travel, public services, and commerce, highlighting opportunities to reduce fragmentation."
      },
      {
        title: "",
        description: "Examples of interoperable, verifiable credentials for specific sectors and vulnerable populations, alongside the importance of large-scale cross-border wallet pilots."
      }
    ],
    conclusion: [
      {
        text: "The Council looks ahead to an active year of collaboration, culminating in the Global Digital Collaboration Conference in Geneva in September."
      },
      {
        text: "Event photos are available",
        linkLabel: "here",
        linkUrl: "https://share.dma.swiss/s/ktzSaXfq6P2m4sM?dir=/&editing=false&openfile=true"
      }
    ]
  },
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
          { group: "Member States:", name: "Federative Republic of Brazil" },
          { group: "IGOs:", name: "World Bank Group" },
          { group: "Companies:", name: "Google LLC" },
          { group: "NGOs:", name: "International Air Transport Association" }
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

// ---------------------------
// Component
// ---------------------------
const CouncilMeetingsPage: React.FC = () => {
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
                  {/* Summary */}
                  <div className="mb-8 space-y-4">
                    {Array.isArray(meeting.summary)
                      ? meeting.summary.map((paragraph, i) => (
                          <p key={i} className="text-gray-700">
                            {paragraph}
                          </p>
                        ))
                      : <p className="text-gray-700">{meeting.summary}</p>
                    }
                  </div>

                  {/* Key Outcomes */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Outcomes</h3>
                  <div className="space-y-6">
                    {meeting.keyOutcomes.map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex} className="border-l-4 border-primary-500 pl-6">
                        {outcome.title && (
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {outcomeIndex + 1}. {outcome.title}
                          </h4>
                        )}
                        <p className="text-gray-600">
                          {outcome.description}
                          {"linkUrl" in outcome && outcome.linkUrl && outcome.linkLabel && (
                            <a
                              href={outcome.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 underline ml-1"
                            >
                              {outcome.linkLabel}
                            </a>
                          )}
                        </p>

                        { "chairs" in outcome && outcome.chairs && (
                          <ul className="mt-3 space-y-1">
                            {outcome.chairs.map((chair, chairIndex) => (
                              <li key={chairIndex} className="text-gray-600 flex items-start">
                                <span className="text-primary-500 mr-2">•</span>
                                {chair.group && <span className="font-medium">{chair.group}</span>}
                                <span className={`ml-2 ${chair.group ? '' : 'ml-0'}`}>{chair.name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Conclusion */}
                  {meeting.conclusion && (
                    <div className="mt-8 space-y-4">
                      {meeting.conclusion.map((item, i) => (
                        <p key={i} className="text-gray-700">
                          {item.text}{" "}
                          {item.linkUrl && item.linkLabel && (
                            <a
                              href={item.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 underline hover:text-primary-800"
                            >
                              {item.linkLabel}
                            </a>
                          )}
                        </p>
                      ))}
                    </div>
                  )}
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
