import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PainPointSection from "@/components/sections/PainPointSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import DifferentiatorSection from "@/components/sections/DifferentiatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PortalSection from "@/components/sections/PortalSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustSecuritySection from "@/components/sections/TrustSecuritySection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NV86HSCC');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NV86HSCC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <PainPointSection />
          <BenefitsSection />
          <DifferentiatorSection />
          <TestimonialsSection />
          <PortalSection />
          <IndustriesSection />
          <HowItWorksSection />
          <TrustSecuritySection />
          <FaqSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
