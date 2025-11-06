// Type definitions for Google Analytics gtag
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

declare function gtag(...args: any[]): void;

// Type definitions for MongoDB connection cache
declare global {
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  } | undefined;
}
