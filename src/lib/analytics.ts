// Analytics utility - no-op implementation for easy integration later
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // No-op for now - can easily integrate with GA4, Mixpanel, etc.
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('Analytics:', event, properties);
    }
  },

  page: (name: string, properties?: Record<string, any>) => {
    // Track page views
    analytics.track('page_view', { page: name, ...properties });
  },

  identify: (userId: string, traits?: Record<string, any>) => {
    // Identify users
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('Analytics identify:', userId, traits);
    }
  }
};

// Hook for tracking route changes
export const useAnalytics = () => {
  return analytics;
};