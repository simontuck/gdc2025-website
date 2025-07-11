import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "What is the goal of the conference?",
      answer: "The goal of the conference is to initiate collaboration on specific topics that require the involvement of more than one actor or organistion to be succesful. Sessions may inspire continued collaboration beyond the conference."
    },
    {
      question: "How can I become a co-organizer?",
      answer: "Organizations interested in becoming co-organizers can apply by sending an email to "
    },
    {
      question: "Can I submit an idea for the agenda?",
      answer: "Yes! We welcome ideas for collaborative sessions. You can submit your proposal through the 'Submit Your Idea' button on the Agenda page. Ideally, your proposal would involve other co-organizers, since the aim is to initiate concrete collaboration."
    },
    {
      question: "What topics will be covered at the conference?",
      answer: "The conference covers a wide range of topics related to digital identity, including wallets, verifiable credentials, trust frameworks, technical standards, and regulatory issues. Key areas include health credentials, educational credentials, and cross-border interoperability."
    },
    {
      question: "Who are the speakers?",
      answer: "Speakers include leaders from major international organizations, government agencies, standards bodies, and open-source communities. The conference features representatives from WHO, ITU, OECD, World Bank Group, European Commission, and many other prominent organizations. Check our Speakers 2025 page for detailed speaker profiles and our Agenda page for the latest speaker lineup."
    },
    {
      question: "What does the barcode image in the hero section represent?",
      answer: "The distinctive barcode pattern visualizes the top 40 countries leading the global open source movement, arranged from west to east. Each bar represents a country's contribution to open source development, with its width corresponding to the relative impact. This unique visualization demonstrates how digital collaboration transcends geographical boundaries and highlights the truly global nature of open source innovation.\n\nIf you'd like to create your own barcode visualization, you can use this tool: "
    },
    {
      question: "Will there be a second conference?",
      answer: "Yes, the conference will be held annually. Conference co-organizers may change from year to year."
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Find answers to common questions about the Global Digital Collaboration Conference.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 open:shadow-md transition-all duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p className="whitespace-pre-line">
                    {faq.question === "How can I register for the conference?" ? (
                      <>
                        {faq.answer}
                        <a 
                          href="https://lu.ma/gc25" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          lu.ma/gc25
                        </a>
                        . Register with the co-organizer of your choice which will approve your entry. Early registration is recommended as space is limited.
                      </>
                    ) : faq.question === "How can I become a co-organizer?" ? (
                      <>
                        Organizations interested in becoming co-organizers can apply by sending an email to{' '}
                        <a 
                          href="mailto:info@globaldigitalcollaboration.org"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          info@globaldigitalcollaboration.org
                        </a>
                        {' '}with the subject 'GDC26 Co-organizer Application'. We welcome organizations from intergovernmental, standards development, open source, and other relevant sectors who want to engage in collaboration with other co-organizers.
                      </>
                    ) : faq.question === "What does the barcode image in the hero section represent?" ? (
                      <>
                        {faq.answer}
                        <a 
                          href="https://shaheeilyas.com/ow-barcode/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          shaheeilyas.com/ow-barcode/
                        </a>
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;