import { useEffect } from 'react';

const MobilePerformanceOptimizer = () => {
  useEffect(() => {
    // Only run on mobile devices
    if (window.innerWidth > 768) return;

    // 1. Optimize Critical Rendering Path
    const optimizeCriticalPath = () => {
      // Preconnect to external domains
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://api.landmark.ma'
      ];
      
      domains.forEach(domain => {
        const existingLink = document.querySelector(`link[href="${domain}"]`);
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          if (domain.includes('gstatic')) link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    };

    // 2. Optimize Images for Better Performance
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        // Add loading lazy for images below the fold
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight && !img.hasAttribute('loading')) {
          img.loading = 'lazy';
        }
        
        // Optimize image decoding
        img.decoding = 'async';
        
        // Add intersection observer for better lazy loading
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            });
          }, { threshold: 0.1 });
          
          imageObserver.observe(img);
        }
      });
    };

    // 3. Optimize Touch Interactions
    const optimizeTouchTargets = () => {
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 768px) {
          button, a, [role="button"], input, select, textarea {
            min-height: 44px !important;
            min-width: 44px !important;
            touch-action: manipulation;
          }
        }
      `;
      document.head.appendChild(style);
    };

    // 4. Optimize Viewport for Mobile
    const optimizeViewport = () => {
      // Handle viewport height changes (for mobile keyboards)
      if ('visualViewport' in window) {
        const viewport = window.visualViewport;
        const updateViewport = () => {
          document.documentElement.style.setProperty('--vh', `${viewport.height * 0.01}px`);
        };
        viewport.addEventListener('resize', updateViewport);
        updateViewport();
      }
      
      // Prevent zoom on input focus
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        if (input.style.fontSize === '' || parseInt(input.style.fontSize) < 16) {
          input.style.fontSize = '16px';
        }
      });
    };

    // 5. Optimize Scrolling Performance
    const optimizeScrolling = () => {
      // Add passive scroll listeners
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            ticking = false;
          });
          ticking = true;
        }
      };
      
      // Remove existing scroll listeners and add passive ones
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Add will-change for elements that will transform
      const animatedElements = document.querySelectorAll('.swiper, .transition-transform, .hover\\:scale-105');
      animatedElements.forEach(element => {
        element.style.willChange = 'transform';
      });
    };

    // 6. Optimize Forms for Mobile
    const optimizeForms = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          // Add appropriate autocomplete
          if (input.name.includes('name') || input.name.includes('nom')) {
            input.autocomplete = 'name';
          }
          if (input.name.includes('phone') || input.name.includes('tel')) {
            input.autocomplete = 'tel';
            input.inputMode = 'tel';
          }
          if (input.name.includes('email')) {
            input.autocomplete = 'email';
            input.inputMode = 'email';
          }
          if (input.name.includes('company') || input.name.includes('entreprise')) {
            input.autocomplete = 'organization';
          }
        });
      });
    };

    // 7. Battery and Performance Mode Detection
    const respectPerformancePreferences = () => {
      // Reduce motion for users who prefer it
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

      // Check for low-power mode (limited detection)
      if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.saveData || connection.effectiveType === 'slow-2g') {
          // Disable non-essential animations
          const style = document.createElement('style');
          style.textContent = `
            .transition-transform, .hover\\:scale-105 {
              transition: none !important;
              transform: none !important;
            }
          `;
          document.head.appendChild(style);
        }
      }
    };

    // 8. Memory Management
    const optimizeMemory = () => {
      // Clean up unused DOM elements
      const cleanupInterval = setInterval(() => {
        // Remove hidden swiper slides from memory
        const hiddenSlides = document.querySelectorAll('.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev)');
        hiddenSlides.forEach(slide => {
          if (!slide.classList.contains('swiper-slide-active')) {
            const images = slide.querySelectorAll('img');
            images.forEach(img => {
              if (img.src && !img.src.includes('data:')) {
                img.removeAttribute('src');
              }
            });
          }
        });
      }, 5000);

      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        clearInterval(cleanupInterval);
      });
    };

    // Run optimizations
    optimizeCriticalPath();
    optimizeTouchTargets();
    optimizeViewport();
    respectPerformancePreferences();

    // Run after DOM is ready
    const runAfterLoad = () => {
      setTimeout(() => {
        optimizeImages();
        optimizeScrolling();
        optimizeForms();
        optimizeMemory();
      }, 100);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAfterLoad);
    } else {
      runAfterLoad();
    }

    // Web Vitals monitoring (if available)
    if (import.meta.env.MODE === 'development') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      }).catch(() => {
        // Silently handle if web-vitals is not available
      });
    }

    // Cleanup function
    return () => {
      // Remove any event listeners if needed
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default MobilePerformanceOptimizer;
