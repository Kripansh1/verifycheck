import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6 text-gray-700">
            <p className="text-lg">
              At Verifycheck, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information, especially in relation to our advertising activities on Google Ads and LinkedIn Ads.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information you provide via forms or contact requests.</li>
                <li>Anonymous data collected via cookies and similar technologies for analytics and advertising.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide our services and respond to your inquiries.</li>
                <li>To improve our website and services.</li>
                <li>For advertising and analytics purposes, including Google Ads and LinkedIn Ads.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">Advertising & Cookies</h2>
              <p>
                We use Google Ads and LinkedIn Ads to reach relevant audiences. These services may use cookies, web beacons, and similar technologies to collect or receive information from our website and elsewhere on the internet and use that information to provide measurement services and target ads.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can opt out of Google's use of cookies by visiting <a href="https://adssettings.google.com/" className="text-brand-500 hover:text-brand-600">Google Ad Settings</a>.</li>
                <li>For LinkedIn Ads, you can manage your ad preferences at <a href="https://www.linkedin.com/psettings/advertising" className="text-brand-500 hover:text-brand-600">LinkedIn Advertising Preferences</a>.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share information with service providers who assist us in our business operations, or as required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have the right to access, correct, or delete your personal information.</li>
                <li>Contact us at <a href="mailto:info@verifycheck.dev" className="text-brand-500 hover:text-brand-600">info@verifycheck.dev</a> for any privacy-related requests.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">Policy Updates</h2>
              <p>
                This policy may be updated from time to time. Please review it periodically.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: April 25, 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
