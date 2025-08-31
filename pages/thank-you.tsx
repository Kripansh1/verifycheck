import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
}

const ThankYou = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);

  // If no form data was submitted, redirect to home page
  useEffect(() => {
    const formSubmitted = sessionStorage.getItem("formSubmitted");
    if (!formSubmitted) {
      router.push("/");
      return;
    }

    // Get form data from session storage
    const storedFormData = sessionStorage.getItem("formData");
    if (storedFormData) {
      try {
        setFormData(JSON.parse(storedFormData));
      } catch (error) {
        console.error("Error parsing form data:", error);
      }
    }
    
    // Track form submission conversion with Google Ads on thank you page
    if (typeof window !== 'undefined' && window.gtag) {
      // Google Ads conversion tracking
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11262958681/gVHVCJqRxsIYENm4zPop',
        'value': 1.0,
        'currency': 'INR',
        'transaction_id': ''
      });
      
      // Google Analytics event tracking
      window.gtag('event', 'form_success', {
        'event_category': 'Forms',
        'event_label': 'Form Submission Success',
        'value': 1
      });
      
      console.log('Thank you page conversion events triggered');
    }
  }, [router]);

  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>

            <p className="text-xl text-gray-700 mb-6">
              Your information has been successfully submitted. Our team will get back to you shortly.
            </p>

            {formData && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-700 mb-2">Submitted Information:</h3>
                <p><span className="font-medium">Name:</span> {formData.name}</p>
                {formData.company && <p><span className="font-medium">Company:</span> {formData.company}</p>}
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                {formData.service && <p><span className="font-medium">Service:</span> {formData.service}</p>}
              </div>
            )}

            <div className="bg-brand-50 border border-brand-100 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-brand-800 mb-3">What Happens Next?</h2>
              <ul className="text-left text-gray-700 space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-brand-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>A verification specialist will contact you within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-brand-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>We'll discuss your specific verification needs and requirements</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-brand-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>You'll receive your 5 free verifications to get started</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-brand-600 hover:bg-brand-700 text-white"
                onClick={() => router.push("/")}
              >
                Return to Home
              </Button>

              <Button
                variant="outline"
                className="border-brand-200 text-brand-700 hover:bg-brand-50"
                onClick={() => {
                  window.open('https://wa.me/919340128637', '_blank');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Contact Us on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;
