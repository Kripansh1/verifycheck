import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import B2CHeroSection from "@/components/sections/b2c/HeroSection";
import WhatsAppVerificationSection from "@/components/sections/b2c/WhatsAppVerificationSection";
import ServicesOverview from "@/components/sections/b2c/ServicesOverview";
import ProfileVerificationSection from "@/components/sections/b2c/ProfileVerificationSection";
import WhyItMattersSection from "@/components/sections/b2c/WhyItMattersSection";
import VerificationComponents from "@/components/sections/b2c/VerificationComponents";
import ProcessSection from "@/components/sections/b2c/ProcessSection";
import WhyChooseSection from "@/components/sections/b2c/WhyChooseSection";
import FloatingWhatsAppButton from "@/components/sections/b2c/FloatingWhatsAppButton";

const B2CProfileVerification = () => {
  return (
    <>
      <Head>
        <title>Profile Verification - VerifyCheck B2C Services</title>
        <meta name="description" content="Professional profile and employee verification services for individuals. Quick, secure, and reliable background checks." />
      </Head>

      <div className="min-h-screen flex flex-col bg-white">

        <Header />
        <main className="flex-grow">
          <B2CHeroSection />
          <WhatsAppVerificationSection />
          <ServicesOverview />
          <ProfileVerificationSection />
          <WhyItMattersSection />
          <VerificationComponents />
          <ProcessSection />
          <WhyChooseSection />
        </main>
        <FloatingWhatsAppButton />
        <Footer />
      </div>
    </>
  );
};

export default B2CProfileVerification;
