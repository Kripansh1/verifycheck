
const IndustriesSection = () => {
  // Industry data with icons
  const industries = [
    {
      name: "Information Technology & BPO",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="2" width="6" height="6"></rect>
          <rect x="16" y="16" width="6" height="6"></rect>
          <rect x="2" y="16" width="6" height="6"></rect>
          <path d="M5 16v-4h14v4"></path>
          <path d="M12 12V8"></path>
        </svg>
      )
    },
    {
      name: "Pharma, Life Sciences & Healthcare",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 2 4 10 3-5.5 2.5 3L22 5C18 5 13 2 8 2Z"></path>
          <path d="M4.3 7.2c-.9 2.4-1.1 5-.6 7.5.4 2.5 1.7 4.8 3.6 6.5"></path>
          <path d="m7.9 20.6 4.1 1.4c1.7 0 3.4-.4 4.7-1.4 1.1-.8 1.9-2.1 1.9-3.5s-.8-2.7-1.9-3.5c-1.3-1-3-1.4-4.7-1.4"></path>
        </svg>
      )
    },
    {
      name: "Banking, Fintech, NBFCs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
          <line x1="2" x2="22" y1="10" y2="10"></line>
          <line x1="7" x2="7" y1="15" y2="15.01"></line>
          <line x1="11" x2="11" y1="15" y2="15.01"></line>
          <line x1="15" x2="15" y1="15" y2="15.01"></line>
        </svg>
      )
    },
    {
      name: "Logistics, Supply Chain & Staffing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 11h4l-4 4"></path>
          <rect width="7" height="7" x="2" y="7" rx="1"></rect>
          <rect width="7" height="7" x="15" y="15" rx="1"></rect>
        </svg>
      )
    },
    {
      name: "Infrastructure & Construction",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22h20"></path>
          <path d="M18 11v11"></path>
          <path d="M14 10v12"></path>
          <path d="M10 13v9"></path>
          <path d="M6 16v6"></path>
          <rect width="16" height="6" x="4" y="2" rx="2"></rect>
        </svg>
      )
    }
  ];

  return (
    <section id="industries" className="py-16 md:py-24 bg-brand-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            Industries Served
          </h2>
          <p className="text-xl text-gray-700 animate-fade-in">
            Specialized verification solutions for your industry's unique compliance needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-brand-600 mb-5">
                {industry.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
