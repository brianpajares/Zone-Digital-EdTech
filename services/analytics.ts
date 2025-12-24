import { AnalyticsEvent } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const analytics = {
  track: (event: AnalyticsEvent) => {
    // In production, this pushes to GTM/GA4/Meta Pixel
    if (typeof window !== 'undefined') {
      console.log(`[Analytics] ${event.event}`, event.data);
      
      // Simulating GTM push
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: event.event,
        ...event.data
      });
    }
  }
};