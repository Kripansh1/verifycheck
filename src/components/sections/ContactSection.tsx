
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fade-in">
            Protect your company.<br />Simplify your hiring.
          </h2>
          <p className="text-xl text-brand-100 mb-12 animate-fade-in">
            Join 3,000+ recruiters who trust VerifyCheck for their verification needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-brand-500/30 rounded-xl p-6 flex flex-col items-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-brand-100">+91 9340128637</p>
              <a href="tel:+919340128637" className="mt-4 text-white hover:text-brand-200 underline">Call us</a>
            </div>

            <div className="bg-brand-500/30 rounded-xl p-6 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-brand-100">info@verifycheck.in</p>
              <a href="mailto:info@verifycheck.in" className="mt-4 text-white hover:text-brand-200 underline">Email us</a>
            </div>

            <div className="bg-brand-500/30 rounded-xl p-6 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-brand-100">Instant support</p>
              <a href="https://wa.me/919340128637" className="mt-4 text-white hover:text-brand-200 underline">Message us</a>
            </div>
          </div>

          <div className="mt-16 animate-fade-in">
            <a
              href="#"
              className="inline-flex items-center justify-center bg-white text-brand-600 hover:bg-brand-50 font-medium py-3 px-8 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const formElement = document.getElementById('hero-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                  // Focus on the first input field
                  const firstInput = formElement.querySelector('input');
                  if (firstInput) setTimeout(() => firstInput.focus(), 500);
                }
              }}
            >
              Fill the form above
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="m18 15-6-6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
