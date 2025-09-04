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
        {/* Google Tag Manager for B2C */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NHX8V7V2');
            `,
          }}
        />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17513233006" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17513233006');
            `,
          }}
        />
      </Head>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Google Tag Manager (noscript) for B2C */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHX8V7V2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
