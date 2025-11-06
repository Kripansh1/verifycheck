import { useState } from "react";

// Define logo paths for Next.js public directory
const logoImages = {
  tcs: '/images/tcs.png',
  apollo: '/images/apollo.png',
  laxmi: '/images/laxmi.png',
  nokia: '/images/nokia.png',
  bajaj: '/images/bajaj.png',
  fullerton: '/images/fullerton.png',
  belora: '/images/belora.png',
  crux: '/images/crux.png',
  dy: '/images/dy.png',
  miratech: '/images/miratech.png',
  netcare: '/images/netcare.png',
  trival: '/images/trival.png',
  whiteboard: '/images/whiteboard.png',
  xy: '/images/xy.png',
  zauba: '/images/zauba.png',
  liveblack: '/images/liveblack.png'
};

// Client logos array
const clientLogos = [
  { name: "TCS", logo: logoImages.tcs },
  { name: "Apollo", logo: logoImages.apollo },
  { name: "Laxmi India Finance", logo: logoImages.laxmi },
  { name: "Nokia", logo: logoImages.nokia },
  { name: "Bajaj", logo: logoImages.bajaj },
  { name: "Fullerton", logo: logoImages.fullerton },
  { name: "Belora", logo: logoImages.belora },
  { name: "Crux", logo: logoImages.crux },
  { name: "DY", logo: logoImages.dy },
  { name: "Miratech", logo: logoImages.miratech },
  { name: "Netcare", logo: logoImages.netcare },
  { name: "Trival", logo: logoImages.trival },
  { name: "Whiteboard", logo: logoImages.whiteboard },
  { name: "XY", logo: logoImages.xy },
  { name: "Zauba", logo: logoImages.zauba },
  { name: "LiveBlack", logo: logoImages.liveblack }
];

// Client testimonials array
const testimonials = [
  {
    category: "🟦 Healthcare",
    quote: "We used to wait weeks for background checks, constantly chasing updates. With VerifyCheck, it's done in just 2 days smooth, reliable, and completely stress-free. It's been a major win for our team.",
    author: "HR Manager",
    company: "Apollo Group"
  },
  {
    category: "🟨 Finance",
    quote: "Audit season used to bring chaos. With VerifyCheck, every verification is timestamped, documented, and audit-ready. Our compliance team finally feels ahead of the curve.",
    author: "CHRO",
    company: "Laxmi India Finance Pvt Ltd"
  },
  {
    category: "🟩 Logistics",
    quote: "We verified 500+ drivers and field staff in under 30 days. The integration with our HRMS was quick, and the dashboard gave us real-time visibility at every step.",
    author: "HR Operations Lead",
    company: "Ateka Logistics"
  },
  {
    category: "🟪 Retail",
    quote: "In retail, speed is everything. VerifyCheck helped us onboard employees faster without compromising accuracy. Their support team made the transition effortless.",
    author: "HR Manager",
    company: "Snitch Apparels Pvt Ltd"
  }
];

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Client Logos */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in">
              Join these leading companies who trust VerifyCheck for their verification needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center max-w-6xl mx-auto">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-24 bg-white rounded-lg px-4 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in border border-gray-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-16 max-w-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Client Love Testimonials - Redesigned */}
        <div className="mt-24 mb-16 bg-gradient-to-r from-gray-50 to-white py-16 rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Client Love
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
              See what our clients have to say about their experience with VerifyCheck
            </p>
          </div>

          {/* Desktop Testimonial Slider */}
          <div className="hidden md:block max-w-7xl mx-auto px-8 relative">
            <div className="flex overflow-x-auto pb-8 hide-scrollbar gap-6 snap-x snap-mandatory">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fade-in snap-center"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="p-6">
                    {/* Company and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-1 h-10 bg-brand-600 mr-3"></div>
                        <div>
                          <p className="font-bold text-gray-900">{testimonial.company}</p>
                          <p className="text-sm text-gray-500">{testimonial.category}</p>
                        </div>
                      </div>
                      <div className="text-brand-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9999 14.4999H6.99992C6.59769 14.4999 6.24992 14.1522 6.24992 13.7499V9.74994C6.24992 9.34771 6.59769 8.99994 6.99992 8.99994H10.4999C10.9021 8.99994 11.2499 8.65217 11.2499 8.24994V4.74994C11.2499 4.34771 10.9021 3.99994 10.4999 3.99994H6.99992C4.79077 3.99994 2.99992 5.7908 2.99992 7.99994V13.7499C2.99992 15.9591 4.79077 17.7499 6.99992 17.7499H10.4999C12.7091 17.7499 14.4999 15.9591 14.4999 13.7499V9.74994C14.4999 9.34771 14.1521 8.99994 13.7499 8.99994H11.9999C11.5977 8.99994 11.2499 9.34771 11.2499 9.74994V13.2499C11.2499 13.6522 11.5977 13.9999 11.9999 13.9999V14.4999V14.4999ZM11.9999 14.4999V13.9999C12.4021 13.9999 12.7499 13.6522 12.7499 13.2499V9.74994C12.7499 9.34771 12.4021 8.99994 11.9999 8.99994H11.7499V13.7499C11.7499 14.1522 11.4021 14.4999 10.9999 14.4999H11.9999ZM21.9999 9.74994V13.7499C21.9999 15.9591 20.2091 17.7499 17.9999 17.7499H14.4999C12.2908 17.7499 10.4999 15.9591 10.4999 13.7499V9.74994C10.4999 9.34771 10.8477 8.99994 11.2499 8.99994H12.9999C13.4021 8.99994 13.7499 9.34771 13.7499 9.74994V13.2499C13.7499 13.6522 14.0977 13.9999 14.4999 13.9999V14.4999H17.9999C18.4021 14.4999 18.7499 14.1522 18.7499 13.7499V9.74994C18.7499 9.34771 18.4021 8.99994 17.9999 8.99994H14.4999C14.0977 8.99994 13.7499 8.65217 13.7499 8.24994V4.74994C13.7499 4.34771 14.0977 3.99994 14.4999 3.99994H17.9999C20.2091 3.99994 21.9999 5.7908 21.9999 7.99994V9.74994Z"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Quote Content */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                        <span className="text-brand-600 font-bold">{testimonial.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-brand-600 text-xs">Verified Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-brand-600' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Testimonial Carousel */}
          <div className="md:hidden px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-fade-in">
              <div className="p-6">
                {/* Company and Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-1 h-10 bg-brand-600 mr-3"></div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonials[activeTestimonial].company}</p>
                      <p className="text-sm text-gray-500">{testimonials[activeTestimonial].category}</p>
                    </div>
                  </div>
                  <div className="text-brand-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9999 14.4999H6.99992C6.59769 14.4999 6.24992 14.1522 6.24992 13.7499V9.74994C6.24992 9.34771 6.59769 8.99994 6.99992 8.99994H10.4999C10.9021 8.99994 11.2499 8.65217 11.2499 8.24994V4.74994C11.2499 4.34771 10.9021 3.99994 10.4999 3.99994H6.99992C4.79077 3.99994 2.99992 5.7908 2.99992 7.99994V13.7499C2.99992 15.9591 4.79077 17.7499 6.99992 17.7499H10.4999C12.7091 17.7499 14.4999 15.9591 14.4999 13.7499V9.74994C14.4999 9.34771 14.1521 8.99994 13.7499 8.99994H11.9999C11.5977 8.99994 11.2499 9.34771 11.2499 9.74994V13.2499C11.2499 13.6522 11.5977 13.9999 11.9999 13.9999V14.4999V14.4999ZM11.9999 14.4999V13.9999C12.4021 13.9999 12.7499 13.6522 12.7499 13.2499V9.74994C12.7499 9.34771 12.4021 8.99994 11.9999 8.99994H11.7499V13.7499C11.7499 14.1522 11.4021 14.4999 10.9999 14.4999H11.9999ZM21.9999 9.74994V13.7499C21.9999 15.9591 20.2091 17.7499 17.9999 17.7499H14.4999C12.2908 17.7499 10.4999 15.9591 10.4999 13.7499V9.74994C10.4999 9.34771 10.8477 8.99994 11.2499 8.99994H12.9999C13.4021 8.99994 13.7499 9.34771 13.7499 9.74994V13.2499C13.7499 13.6522 14.0977 13.9999 14.4999 13.9999V14.4999H17.9999C18.4021 14.4999 18.7499 14.1522 18.7499 13.7499V9.74994C18.7499 9.34771 18.4021 8.99994 17.9999 8.99994H14.4999C14.0977 8.99994 13.7499 8.65217 13.7499 8.24994V4.74994C13.7499 4.34771 14.0977 3.99994 14.4999 3.99994H17.9999C20.2091 3.99994 21.9999 5.7908 21.9999 7.99994V9.74994Z"></path>
                    </svg>
                  </div>
                </div>

                {/* Quote Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[activeTestimonial].quote}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <span className="text-brand-600 font-bold">{testimonials[activeTestimonial].author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[activeTestimonial].author}</p>
                    <p className="text-brand-600 text-xs">Verified Client</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-brand-50 border border-gray-200"
                  aria-label="Previous testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full ${index === activeTestimonial ? 'bg-brand-600' : 'bg-gray-300'}`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-brand-50 border border-gray-200"
                  aria-label="Next testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
