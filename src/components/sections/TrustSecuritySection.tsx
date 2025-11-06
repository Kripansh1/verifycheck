
const TrustSecuritySection = () => {
  // Security features
  const securityFeatures = [
    {
      title: "ISO 27001 Certified",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      )
    },
    {
      title: "SOC 2 Type II Compliant",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <path d="M7 12h10"></path>
          <path d="M12 7v10"></path>
        </svg>
      )
    },
    {
      title: "GDPR + India DPDPA Ready",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" x2="6" y1="1" y2="4"></line>
          <line x1="10" x2="10" y1="1" y2="4"></line>
          <line x1="14" x2="14" y1="1" y2="4"></line>
        </svg>
      )
    },
    {
      title: "AES-256 Encrypted Data",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      title: "Full Consent-Based System",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H5a2 2 0 0 0-2 2v4"></path>
          <path d="M9 21H5a2 2 0 0 1-2-2v-4"></path>
          <path d="M15 3h4a2 2 0 0 1 2 2v4"></path>
          <path d="M15 21h4a2 2 0 0 0 2-2v-4"></path>
          <path d="M9 9h6v6H9z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            Trust & Security
          </h2>
          <p className="text-xl text-gray-700 animate-fade-in">
            Your data and candidate information are protected by industry-leading security measures
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Security Image / Illustration Side */}
            <div className="bg-brand-600 p-10 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="flex justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
                <p className="text-brand-100">
                  Our platform meets the highest security standards with end-to-end encryption and robust data protection.
                </p>
              </div>
            </div>

            {/* Security Features Side */}
            <div className="p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Security Features</h3>
              
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="text-brand-600 flex-shrink-0 mr-4">
                      {feature.icon}
                    </div>
                    <span className="font-medium text-gray-900">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecuritySection;
