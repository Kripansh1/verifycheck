import Script from 'next/script';

interface GTMProps {
  gtmId: string;
}

const GTM: React.FC<GTMProps> = ({ gtmId }) => {
  return (
    <>
      {/* Google Tag Manager - DataLayer Initialization */}
      <Script
        id="gtm-datalayer"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />

      {/* Google Tag Manager - Main Script */}
      <Script
        id="gtm-main"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('GTM loaded successfully for container:', gtmId);
          // Initialize dataLayer if not exists
          if (typeof window !== 'undefined') {
            (window as any).dataLayer = (window as any).dataLayer || [];

            // Push initial page view
            (window as any).dataLayer.push({
              event: 'gtm.load',
              'gtm.uniqueEventId': Date.now(),
              'gtm.container': gtmId,
              'page_url': window.location.href,
              'page_path': window.location.pathname,
            });

            // Debug info
            console.log('DataLayer initialized with events:', (window as any).dataLayer.length);

            // Make GTM debug function available globally for testing
            (window as any).debugGTM = () => {
              console.log('=== GTM Debug Info ===');
              console.log('Container ID:', gtmId);
              console.log('DataLayer exists:', !!(window as any).dataLayer);
              console.log('DataLayer length:', (window as any).dataLayer?.length || 0);
              console.log('GTM object exists:', !!(window as any).google_tag_manager);
              console.log('Recent DataLayer events:', (window as any).dataLayer?.slice(-5));
              console.log('======================');
            };
          }
        }}
        onError={(e) => {
          console.error('GTM failed to load:', e);
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
