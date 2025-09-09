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
        <title>VerifyCheck - Professional Background Verification Services</title>
        <meta name="description" content="Comprehensive background verification services for businesses and individuals. Fast, reliable, and secure verification solutions." />
      </Head>

      <div className="min-h-screen flex flex-col">
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
