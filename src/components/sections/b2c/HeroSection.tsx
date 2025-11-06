import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { trackB2CForm, initializeGTM } from "../../../../lib/gtm";

const B2CHeroSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);
  const [formStarted, setFormStarted] = useState(false);
  const router = useRouter();

  // Initialize GTM on component mount
  useEffect(() => {
    initializeGTM();
  }, []);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackB2CForm('start', formData);
      setFormStarted(true);
    }
  };

  // Smooth-scroll to the enquiry form container
  const scrollToForm = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // Persist B2C lead to backend with timeout
  const saveLead = async (payload: { name: string; phone: string; email?: string; service?: string; source?: string; pagePath?: string }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const res = await fetch('/api/leads/b2c', {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Track form submission attempt
    trackB2CForm('submit', formData);

    try {
      console.log("Form submitted with data:", formData);

      // Save lead to database (B2C) — server will send the email notification
      const leadResponse = await saveLead({
        ...formData,
        source: 'Employee Verification',
        pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined
      });

      // Track successful form submission
      trackB2CForm('success', { ...formData, leadId: leadResponse?.data?._id });

      try {
        sessionStorage.setItem("formSubmitted", "true");
        sessionStorage.setItem("formData", JSON.stringify(formData));
      } catch (err) {
        console.warn('Failed to persist session data:', err);
      }



      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-11262958681/gVHVCJqRxsIYENm4zPop",
          value: 1.0,
          currency: "INR",
          transaction_id: "",
        });
        (window as any).gtag("event", "form_submission", {
          event_category: "Forms",
          event_label: "Contact Form (B2C)",
          value: 1,
        });
      }

      toast.success("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "" });
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form';

      // Track form submission error
      trackB2CForm('error', formData, errorMessage);

      toast.error("Failed to submit form. Please try again.");
      // keep same fallback behavior as home page
      try {
        sessionStorage.setItem("formSubmitted", "true");
        sessionStorage.setItem("formData", JSON.stringify(formData));
      } catch { }
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.08),transparent_60%)] pt-14 md:pt-20"
    >
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/20 via-sky-400/20 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl" />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-up order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight space-y-1 md:space-y-2">
                <span className="block">Trusted Profile</span>
                <span className="block">Verification for</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">
                  Global Opportunities
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl">
                Mandatory verification certificates for foreign job applications. Ensure your
                credentials are verified by trusted professionals and stand out in the global
                marketplace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl group hubspot-embed ring-1 ring-primary/30 hover:ring-primary/50 transition-all hover:shadow-2xl"
                onClick={scrollToForm}
              >
                Get Verified Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-5 pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Native React Enquiry Form */}
          <div className="relative animate-fade-up order-1 lg:order-2">
            {/* Switched to light theme card */}
            <Card className="border border-border/60 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 text-foreground shadow-xl overflow-hidden ring-1 ring-border/50">
              {/* Top color bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-sky-400 via-indigo-400 to-fuchsia-400" />
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Enquiry Now</CardTitle>
                <div className="w-20 h-[3px] bg-primary mt-2 rounded" />
              </CardHeader>
              <CardContent>
                <form id="enquiry-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFormStart}
                      placeholder="Your full name"
                      className="w-full bg-card text-foreground border border-border rounded-md px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email (optional)</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-card text-foreground border border-border rounded-md px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-full bg-card text-foreground border border-border rounded-md px-3 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {status && (
                    <p className={`${status.ok ? "text-green-600" : "text-red-600"} text-sm`}>
                      {status.message}
                    </p>
                  )}

                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary text-primary-foreground">
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2CHeroSection;
