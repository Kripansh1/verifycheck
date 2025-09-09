import Script from 'next/script';

interface GTMProps {
  gtmId: string;
}

const GTM: React.FC<GTMProps> = ({ gtmId }) => {
  return (
    <>
      {/* Google Tag Manager - DataLayer Initialization */}
      <Script
        id={`gtm-init-${gtmId}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);

              // Debug function
              w.debugGTM = function() {
                console.log('=== GTM Debug Info ===');
                console.log('Container ID: ${gtmId}');
                console.log('DataLayer exists:', !!w.dataLayer);
                console.log('DataLayer length:', w.dataLayer ? w.dataLayer.length : 0);
                console.log('GTM loaded:', !!w.google_tag_manager);
                if (w.dataLayer) {
                  console.log('Recent DataLayer events:', w.dataLayer.slice(-5));
                }
                console.log('======================');
              };

              console.log('GTM initialized for container: ${gtmId}');
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Tag Manager - NoScript Fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
};

export default GTM;
