// Enhanced Google Analytics tracking for LandMark Agency
import ReactGA from 'react-ga4';

// Initialize GA4 with enhanced configuration
export const initializeGA = () => {
  ReactGA.initialize('G-HTXEP3YFW0', {
    debug: process.env.NODE_ENV === 'development',
    trackingOptions: {
      cookieFlags: 'SameSite=None;Secure',
    },
    gaOptions: {
      // Enhanced ecommerce and custom parameters
      custom_map: {
        custom_parameter_1: 'page_category',
        custom_parameter_2: 'user_type'
      },
      // Site speed sample rate
      siteSpeedSampleRate: 100,
      // Anonymize IP
      anonymize_ip: true
    }
  });
};

// Track page views with enhanced data
export const trackPageView = (path, title, category = 'general') => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title,
    custom_parameter_1: category
  });
};

// Track custom events
export const trackEvent = (action, category, label = null, value = null) => {
  ReactGA.event({
    action: action,
    category: category,
    label: label,
    value: value
  });
};

// Track business-specific events
export const trackBusinessEvent = {
  // Contact form submission
  contactFormSubmit: (formType = 'general') => {
    trackEvent('form_submit', 'contact', formType);
  },

  // Service page visits
  serviceView: (serviceName) => {
    trackEvent('service_view', 'services', serviceName);
  },

  // Portfolio project views
  portfolioView: (projectName) => {
    trackEvent('portfolio_view', 'portfolio', projectName);
  },

  // Blog article reads
  blogRead: (articleTitle, category) => {
    trackEvent('blog_read', 'content', articleTitle);
  },

  // Phone number clicks
  phoneClick: () => {
    trackEvent('phone_click', 'contact', 'header_phone');
  },

  // Email clicks
  emailClick: () => {
    trackEvent('email_click', 'contact', 'footer_email');
  },

  // Social media clicks
  socialClick: (platform) => {
    trackEvent('social_click', 'social_media', platform);
  },

  // Download actions
  downloadClick: (fileName) => {
    trackEvent('download', 'resources', fileName);
  },

  // Video plays
  videoPlay: (videoName) => {
    trackEvent('video_play', 'media', videoName);
  },

  // Scroll depth tracking
  scrollDepth: (percentage) => {
    trackEvent('scroll_depth', 'engagement', `${percentage}%`);
  },

  // Time on page milestones
  timeOnPage: (timeInSeconds) => {
    if (timeInSeconds >= 30 && timeInSeconds % 30 === 0) {
      trackEvent('time_on_page', 'engagement', `${timeInSeconds}s`);
    }
  }
};

// Track user engagement
export const trackEngagement = () => {
  let startTime = Date.now();
  let scrollDepthTracked = [];

  // Track scroll depth
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    // Track at 25%, 50%, 75%, 100%
    [25, 50, 75, 100].forEach(threshold => {
      if (scrollPercent >= threshold && !scrollDepthTracked.includes(threshold)) {
        trackBusinessEvent.scrollDepth(threshold);
        scrollDepthTracked.push(threshold);
      }
    });
  };

  // Track time on page
  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackBusinessEvent.timeOnPage(timeSpent);
  };

  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Track time every 30 seconds
  const timeInterval = setInterval(trackTimeOnPage, 30000);

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearInterval(timeInterval);
  };
};

export default {
  initializeGA,
  trackPageView,
  trackEvent,
  trackBusinessEvent,
  trackEngagement
};
