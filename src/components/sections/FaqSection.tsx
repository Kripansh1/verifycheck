
import { useState } from "react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can you complete verifications?",
      answer: "Most verifications are completed within 24-48 hours. Complex checks involving international verification may take 3-5 business days."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We specialize in verification services for IT, pharma, healthcare, financial services, logistics, and infrastructure sectors. However, our platform is adaptable to any industry's compliance needs."
    },
    {
      question: "How does your pricing work?",
      answer: "We offer flexible pricing models based on verification volume and types of checks required. There are no setup fees or long-term contracts required. Contact us for a customized quote."
    },
    {
      question: "Do you integrate with existing HR systems?",
      answer: "Yes, VerifyCheck integrates seamlessly with all major HRMS and ATS platforms through our secure API. We also offer standalone verification options via our dashboard."
    },
    {
      question: "What security measures do you have in place?",
      answer: "We're ISO 27001 certified and SOC 2 Type II compliant with AES-256 encryption for all data. Our platform is GDPR and India DPDPA compliant with strict access controls."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 animate-fade-in">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg transition-all duration-200 animate-fade-in ${activeIndex === index ? 'border-brand-300 shadow-sm' : 'border-gray-200'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="font-medium text-lg text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              Still have questions? Our team is ready to help.
            </p>
            <button
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              onClick={() => {
                const formElement = document.getElementById('hero-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                  // Focus on the first input field
                  const firstInput = formElement.querySelector('input');
                  if (firstInput) setTimeout(() => firstInput.focus(), 500);
                }
              }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
