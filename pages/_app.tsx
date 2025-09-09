import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import GTMListener from "@/components/GTMListener";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Google Tag Manager (init in _app with Next.js Script) */}
      <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NV86HSCC');
        `,
      }} />

      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Listens to router changes and pushes pageview events */}
        <GTMListener />
        <Component {...pageProps} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
