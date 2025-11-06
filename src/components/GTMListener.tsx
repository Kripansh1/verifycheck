import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Listens to Next.js router navigation and pushes a virtual pageview to GTM.
 * Requires GTM snippet to be present globally in _document.tsx (already added).
 */
export default function GTMListener() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Ensure dataLayer exists
      (window as any).dataLayer = (window as any).dataLayer || [];

      (window as any).dataLayer.push({
        event: "pageview",
        page: {
          path: url,
          url: window.location.href,
          title: document.title,
        },
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Initial page load
    handleRouteChange(router.asPath);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);

  return null;
}
