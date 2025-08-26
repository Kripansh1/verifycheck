
const PainPointSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            HR is under pressure.
          </h2>
          
          <p className="text-xl text-gray-700 mb-12 animate-fade-in">
            You need to hire fast — but stay compliant, avoid fraud, and keep candidate experience smooth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-brand-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Rising Resume Fraud</h3>
              <p className="text-gray-700">
                Resume fraud is increasing across all industries, making verification crucial.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-brand-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="6" x2="12" y2="12"></line>
                  <line x1="12" y1="12" x2="16" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Manual Checks are Slow</h3>
              <p className="text-gray-700">
                Traditional verification methods are time-consuming and prone to errors.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-brand-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M12 8v4M12 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Costly Bad Hires</h3>
              <p className="text-gray-700">
                One wrong hire can cost you time, money, and damage your reputation.
              </p>
            </div>
          </div>
          
          <p className="text-xl font-medium text-brand-700 mt-12 animate-fade-in">
            That's why top HR teams are switching to VerifyCheck.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointSection;
