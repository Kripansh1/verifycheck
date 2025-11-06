import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { validateBusinessEmail } from "../../../lib/emailValidation";
import { trackB2BForm, initializeGTM } from "../../../lib/gtm";

const HeroSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  // Initialize GTM on component mount
  useEffect(() => {
    initializeGTM();
  }, []);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackB2BForm('start', formData);
      setFormStarted(true);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate business email on change
    if (name === 'email' && value) {
      const validation = validateBusinessEmail(value);
      if (!validation.isValid || !validation.isBusiness) {
        setEmailError(validation.message || 'Invalid business email');
      } else {
        setEmailError(null);
      }
    } else if (name === 'email' && !value) {
      setEmailError(null);
    }
  };

  type HomeLeadPayload = {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    service?: string;
    source?: string;
    pagePath?: string;
  };

  // Persist lead to backend (Home/B2B leads) with timeout
  const saveLead = async (payload: HomeLeadPayload) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const res = await fetch('/api/leads/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Lead save failed (${res.status}): ${txt}`);
      }
      return res.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission attempt
    trackB2BForm('submit', formData);

    // Validate business email before submission
    if (formData.email) {
      const validation = validateBusinessEmail(formData.email);
      if (!validation.isValid || !validation.isBusiness) {
        setEmailError(validation.message || 'Invalid business email');
        toast.error(validation.message || 'Please enter a valid business email');
        // Track validation error
        trackB2BForm('error', formData, validation.message || 'Invalid business email');
        return;
      }
    }

    setIsSubmitting(true);
    setEmailError(null);

    try {
      console.log("Form submitted with data:", formData);

      // Save lead to database (home/B2B) — server will send the email notification
      const leadResponse = await saveLead({
        ...formData,
        source: 'Home Page',
        pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
      });

      // Track successful form submission
      trackB2BForm('success', { ...formData, leadId: leadResponse?.data?._id });

      // Store in session storage that form was submitted
      sessionStorage.setItem("formSubmitted", "true");
      sessionStorage.setItem("formData", JSON.stringify(formData));



      // Track form submission conversion with Google Ads
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-11262958681/gVHVCJqRxsIYENm4zPop",
          value: 1.0,
          currency: "INR",
          transaction_id: "",
        });
        console.log("Google Ads conversion event triggered");

        // Also track in Google Analytics
        window.gtag("event", "form_submission", {
          event_category: "Forms",
          event_label: "Contact Form",
          value: 1,
        });
      }

      // Show success toast
      toast.success("Form submitted successfully!");

      // Redirect to thank you page
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form';

      // Track form submission error
      trackB2BForm('error', formData, errorMessage);

      toast.error("Failed to submit form. Please try again.");

      // Even if there's an error, we'll still redirect to the thank you page
      // since we've implemented the mailto fallback
      sessionStorage.setItem("formSubmitted", "true");
      sessionStorage.setItem("formData", JSON.stringify(formData));
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="relative min-h-[90vh] md:min-h-[80vh] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-gray-800/70 to-gray-900/75"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              <span className="text-brand-400">Bad hires are expensive.</span>{" "}
              <br />
              <span>Verifications shouldn't be.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
              VerifyCheck helps Indian enterprises verify employees in 24 hours
              — with speed, accuracy, and compliance you can trust.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in">
              <Button
                variant="outline"
                className="text-brand-400 hover:text-white hover:bg-brand-600 border-gray-700 hover:border-brand-500 px-6 py-2 text-lg transition-all duration-300"
                onClick={() => {
                  window.open("https://wa.me/919340128637", "_blank");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                WhatsApp Us
              </Button>
            </div>

            {/* Trust Proof Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-lg p-4 animate-fade-in border border-gray-700/50">
              <div className="flex flex-col items-center text-center">
                <span className="text-xl font-bold text-brand-400 mb-1">
                  3,000+
                </span>
                <span className="text-sm text-gray-300">Trusted Companies</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xl font-bold text-brand-400 mb-1">
                  24-48h
                </span>
                <span className="text-sm text-gray-300">Fast Verification</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xl font-bold text-brand-400 mb-1">
                  Pan-India
                </span>
                <span className="text-sm text-gray-300">Coverage</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xl font-bold text-brand-400 mb-1">
                  4.9/5
                </span>
                <span className="text-sm text-gray-300">Rated by HR Teams</span>
              </div>
            </div>

            {/* Target Industries */}
            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-white">
                  We Support All Industries Including
                </span>{" "}
                IT, Pharma, BFSI, Logistics, Staffing, Apparel, Education,
                Manufacturing, E-commerce, and more.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="hero-form"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in-right"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="hero-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="hero-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={handleFormStart}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="hero-company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hero-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Email Address
                </label>
                <input
                  type="email"
                  id="hero-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-brand-500 focus:border-brand-500 ${emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  placeholder="you@company.com"
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Business email required. Free email domains (Gmail, Yahoo, etc.) are not accepted.
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hero-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="hero-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hero-service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Needed
                </label>
                <select
                  id="hero-service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="background">Background Checks</option>
                  <option value="identity">Identity Verification</option>
                  <option value="education">Education Verification</option>
                  <option value="criminal">Criminal Record Checks</option>
                  <option value="employment">Employment History</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-brand-600 text-white hover:bg-brand-700 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Start Verifying Now"}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-brand-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-brand-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
