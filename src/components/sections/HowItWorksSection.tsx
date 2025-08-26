
const HowItWorksSection = () => {
  // Process steps with icons
  const steps = [
    {
      number: "01",
      title: "Upload Candidates",
      description: "Via file upload, form submission, or secure API integration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
          <path d="M12 12v9"></path>
          <path d="m16 16-4-4-4 4"></path>
        </svg>
      )
    },
    {
      number: "02",
      title: "Run Smart Verifications",
      description: "ID, Employment, Education, Address, and Criminal checks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
          <circle cx="12" cy="13" r="3"></circle>
        </svg>
      )
    },
    {
      number: "03",
      title: "Get Reports in 24-48 Hours",
      description: "Dashboard access, downloadable PDFs, and complete audit logs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            How It Works
          </h2>
          <p className="text-xl text-gray-700 animate-fade-in">
            Our simple, streamlined verification process gets you results fast
          </p>
        </div>

        {/* Process Timeline (Desktop) */}
        <div className="hidden md:block relative max-w-5xl mx-auto mb-12">
          {/* Horizontal line connector */}
          <div className="absolute top-24 left-0 w-full h-1 bg-gray-200 -z-10"></div>

          <div className="flex justify-between items-start">
            {steps.map((step, index) => (
              <div key={index} className="w-1/3 px-4 flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Icon Circle */}
                <div className="bg-white mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center p-3 shadow-sm">
                    <div className="text-brand-600">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <span className="text-sm font-bold text-brand-600 mb-2">{step.number}</span>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                <p className="text-gray-700 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps (Mobile) */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute top-2 bottom-2 left-4 w-1 bg-gray-200 -z-10"></div>

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shadow-sm mr-4">
                    <span className="text-brand-600 font-bold text-sm">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="text-brand-600 mb-3">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            className="inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
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
            Start Your Verification Process
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
