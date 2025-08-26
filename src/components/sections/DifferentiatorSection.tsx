
const DifferentiatorSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            What Makes VerifyCheck Different
          </h2>
          <p className="text-xl text-gray-700 animate-fade-in">
            Built for India's hiring ecosystem. Trusted by serious recruiters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Differentiator 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Database Access</h3>
            <p className="text-gray-700">
              1,000+ verified college, employer, and legal databases for thorough background checks.
            </p>
          </div>
          
          {/* Differentiator 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M7 7h.01"></path>
                <path d="M7 13h.01"></path>
                <path d="M10.1 7h6.8"></path>
                <path d="M10.1 13h6.8"></path>
                <path d="M7 19h.01"></path>
                <path d="M10.1 19h6.8"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Verification</h3>
            <p className="text-gray-700">
              PAN, Aadhaar, UAN, criminal, address, and education checks for complete candidate profiles.
            </p>
          </div>
          
          {/* Differentiator 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-7"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M10.4 19.6a2 2 0 1 1-2.8-2.8"></path>
                <path d="m5 14-1 1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Industry-Specific Checks</h3>
            <p className="text-gray-700">
              Specialized verification for pharma, IT, BFSI, logistics, and other regulated sectors.
            </p>
          </div>
          
          {/* Differentiator 4 */}
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                <path d="M7 7h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Fraud Detection</h3>
            <p className="text-gray-700">
              Advanced AI trained on local fraud patterns to detect document manipulation and forgery.
            </p>
          </div>
          
          {/* Differentiator 5 */}
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Dashboard</h3>
            <p className="text-gray-700">
              Live monitoring dashboards to track verification status and generate instant reports.
            </p>
          </div>
          
          {/* Differentiator 6 */}
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.31 6.34 2.34"></path>
                <path d="M21 3v6h-6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">SLA-Backed Support</h3>
            <p className="text-gray-700">
              Guaranteed response times with a dedicated support team for all your verification needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
