import { useEffect, useCallback } from 'react';

const useMobilePerformance = () => {
  // Optimize images for mobile
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" for images not above the fold
      if (!img.hasAttribute('loading')) {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.loading = 'lazy';
        }
      }
      
      // Optimize image decoding
      img.decoding = 'async';
      
      // Add error handling
      if (!img.onerror) {
        img.onerror = () => {
          img.style.display = 'none';
        };
      }
    });
  }, []);

  // Optimize touch targets for mobile
  const optimizeTouchTargets = useCallback(() => {
    if (window.innerWidth <= 768) {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select, textarea');
      interactiveElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const minSize = 44; // Apple/Google recommended minimum touch target size
        
        if (parseInt(styles.height) < minSize || parseInt(styles.width) < minSize) {
          element.style.minHeight = `${minSize}px`;
          element.style.minWidth = `${minSize}px`;
          element.style.display = element.style.display || 'inline-flex';
          element.style.alignItems = 'center';
          element.style.justifyContent = 'center';
        }
      });
    }
  }, []);

  // Optimize viewport for mobile
  const optimizeViewport = useCallback(() => {
    // Prevent zoom on input focus
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport && window.innerWidth <= 768) {
      metaViewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
    
    // Handle viewport height changes (mobile keyboard)
    if ('visualViewport' in window) {
      const viewport = window.visualViewport;
      const updateViewport = () => {
        document.documentElement.style.setProperty('--vh', `${viewport.height * 0.01}px`);
      };
      viewport.addEventListener('resize', updateViewport);
      updateViewport();
    }
  }, []);

  // Optimize fonts for mobile
  const optimizeFonts = useCallback(() => {
    // For production, fonts will be in the assets folder
    // Remove font preloading for now as it can cause issues
    // The fonts are already loaded via CSS
    
    // Add font-display: swap to existing font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Jost';
        font-display: swap;
      }
      @font-face {
        font-family: 'Bodoni';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Optimize scrolling performance
  const optimizeScrolling = useCallback(() => {
    // Add will-change for elements that will animate
    const animatedElements = document.querySelectorAll('.swiper, .transition-transform, .hover\\:scale-105');
    animatedElements.forEach(element => {
      element.style.willChange = 'transform';
    });
    
    // Passive scroll listeners
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Optimize scroll-based animations
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimize form performance
  const optimizeForms = useCallback(() => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        // Add autocomplete attributes for better mobile experience
        if (input.name === 'full_name') input.autocomplete = 'name';
        if (input.name === 'phone_number') input.autocomplete = 'tel';
        if (input.name === 'company_name') input.autocomplete = 'organization';
        if (input.type === 'email') input.autocomplete = 'email';
        
        // Optimize input mode for mobile keyboards
        if (input.type === 'tel') input.inputMode = 'tel';
        if (input.type === 'email') input.inputMode = 'email';
        if (input.type === 'number') input.inputMode = 'numeric';
      });
    });
  }, []);

  // Reduce motion for users who prefer it
  const respectMotionPreferences = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Optimize critical rendering path
  const optimizeCriticalPath = useCallback(() => {
    // Defer non-critical CSS
    const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalStyles.forEach(link => {
      link.media = 'print';
      link.onload = () => { link.media = 'all'; };
    });
    
    // Preconnect to external domains
    const domains = ['https://fonts.googleapis.com', 'https://api.landmark.ma'];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    // Run optimizations only on mobile devices
    if (window.innerWidth <= 768) {
      optimizeViewport();
      optimizeTouchTargets();
      optimizeFonts();
      respectMotionPreferences();
      optimizeCriticalPath();
      
      // Run after DOM is fully loaded
      const runDelayedOptimizations = () => {
        setTimeout(() => {
          optimizeImages();
          optimizeForms();
          optimizeScrolling();
        }, 1000);
      };
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runDelayedOptimizations);
      } else {
        runDelayedOptimizations();
      }
    }
  }, [optimizeImages, optimizeTouchTargets, optimizeViewport, optimizeFonts, optimizeForms, optimizeScrolling, respectMotionPreferences, optimizeCriticalPath]);

  return {
    optimizeImages,
    optimizeTouchTargets,
    optimizeViewport,
    optimizeFonts,
    optimizeForms,
    optimizeScrolling
  };
};

export default useMobilePerformance;
