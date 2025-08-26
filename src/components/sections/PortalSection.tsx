import { Button } from "@/components/ui/button";

const PortalSection = () => {
  return (
    <section id="portal" className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            One Powerful Portal for All Your Verification Needs
          </h2>
          <p className="text-xl text-gray-300 animate-fade-in mb-6">
            At Verify Check, we simplify employee background verification with our user-friendly, feature-rich portal—designed to save your HR team time, effort, and cost.
          </p>
          <div className="bg-brand-600/20 border border-brand-500/50 rounded-lg p-6 inline-block mx-auto animate-pulse">
            <h3 className="text-2xl font-bold text-brand-400 mb-2">Verify Any 5 Candidates For FREE</h3>
            <p className="text-white mb-4">No credit card required. No commitments. Start today!</p>
            <Button
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                // Scroll to contact form
                const contactSection = document.getElementById('hero-form');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Your 5 Free Verifications
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Feature 1 - Highlighted */}
          <div className="bg-gradient-to-br from-brand-900 to-gray-800 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl border border-brand-500/50 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="h-12 w-12 rounded-full bg-brand-500/30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300">
                <path d="M5 7 3 5"></path>
                <path d="M9 5 5 1"></path>
                <path d="M13 5h-4"></path>
                <path d="M17 7v.01"></path>
                <path d="m14 17 6 4"></path>
                <path d="M10 21v-4a2 2 0 0 1 2-2h2"></path>
                <rect width="7" height="5" x="7" y="3" rx="1"></rect>
                <path d="M10 12v4"></path>
                <path d="M6 12h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Verify Any 5 Candidates For FREE</h3>
            <p className="text-gray-300 mb-4">
              Start immediately with 5 free verifications—absolutely no hidden charges, no commitments required.
            </p>
            <Button
              className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              onClick={() => {
                // Scroll to contact form
                const contactSection = document.getElementById('hero-form');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Claim Your Free Verifications
            </Button>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl border border-gray-700 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-900/30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <path d="M13 2v7h7"></path>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Fast & Efficient</h3>
            <p className="text-gray-300">
              Upload candidate documents in seconds and get real-time updates on the verification process.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl border border-gray-700 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-900/30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No Upfront Fees</h3>
            <p className="text-gray-300">
              Start using our portal with zero investment. Pay only after 30 days of receiving the invoice.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl border border-gray-700 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-900/30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                <path d="M3 3v18h18"></path>
                <path d="m7 17 4-4 4 4 6-6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Complete Transparency</h3>
            <p className="text-gray-300">
              Track progress of every verification—status, turnaround time, and reports—all in one dashboard.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl border border-gray-700 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-900/30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <path d="M7 12h10"></path>
                <path d="M12 7v10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Secure & Confidential</h3>
            <p className="text-gray-300">
              Industry-grade encryption ensures complete data protection of your candidates' information.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl border border-gray-700 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-brand-900/30 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Custom Reports</h3>
            <p className="text-gray-300">
              Download detailed reports tailored to your needs—experience letters, education, criminal records, address checks, and more.
            </p>
          </div>
        </div>

        {/* Additional Feature */}
        <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-16 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-brand-900/30 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Bulk Uploads</h3>
              <p className="text-gray-300 text-lg">
                Need to verify multiple candidates? Upload in bulk and let our system handle the rest.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-4">Trusted by Industry Leaders</h3>
          <p className="text-xl text-gray-300 mb-8">
            With 10 million verifications completed, and clients like TCS, Apollo Group, Nokia, NTPC, and 3,000+ more, our platform is built for scale, speed, and reliability.
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
            <h4 className="text-xl font-bold text-brand-400 mb-4">Ready to experience the difference?</h4>
            <p className="text-white mb-6">Verify any 5 candidates completely free of cost, with no strings attached.</p>
            <Button
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                // Scroll to contact form
                const contactSection = document.getElementById('hero-form');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Your 5 Free Verifications Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
