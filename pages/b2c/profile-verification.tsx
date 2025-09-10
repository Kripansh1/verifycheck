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

      <div className="min-h-screen flex flex-col bg-white">
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
