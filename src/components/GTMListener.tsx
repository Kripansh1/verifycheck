import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Listens to React Router navigation and pushes a virtual pageview to GTM.
 * Requires GTM snippet to be present globally in index.html (already added).
 */
export default function GTMListener() {
  const location = useLocation();

  useEffect(() => {
    // Ensure dataLayer exists
    (window as any).dataLayer = (window as any).dataLayer || [];

    (window as any).dataLayer.push({
      event: "pageview",
      page: {
        path: location.pathname + location.search + location.hash,
        url: window.location.href,
        title: document.title,
      },
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
