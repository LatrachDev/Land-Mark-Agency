import { useEffect } from 'react';
import heroImageSrc from '../assets/BG/Web-Site-BG-black.jpg';
import logoSrc from '../assets/Logotype/White.png';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      fontLink.onload = function() { this.rel = 'stylesheet'; };
      document.head.appendChild(fontLink);

      // Preload hero image
      const heroImage = new Image();
      heroImage.src = heroImageSrc;
      
      // Preload logo
      const logo = new Image();
      logo.src = logoSrc;
    };

    // Lazy load non-critical images
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Delay Google Analytics loading
      setTimeout(() => {
        if (window.gtag) {
          window.gtag('config', 'G-HTXEP3YFW0', {
            page_title: document.title,
            page_location: window.location.href
          });
        }
      }, 3000);
    };

    // Run optimizations
    preloadCriticalResources();
    lazyLoadImages();
    optimizeThirdPartyScripts();

    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
