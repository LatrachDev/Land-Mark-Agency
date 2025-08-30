import { useEffect } from 'react';

const SEOAudit = ({ enabled = false }) => {
  useEffect(() => {
    if (!enabled || process.env.NODE_ENV !== 'development') return;

    const auditSEO = () => {
      const issues = [];
      
      // Check title
      const title = document.title;
      if (!title) issues.push('❌ Missing page title');
      else if (title.length < 30) issues.push('⚠️ Title too short (< 30 chars)');
      else if (title.length > 60) issues.push('⚠️ Title too long (> 60 chars)');
      else issues.push('✅ Title length is good');

      // Check meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) issues.push('❌ Missing meta description');
      else {
        const descLength = metaDesc.content.length;
        if (descLength < 120) issues.push('⚠️ Description too short (< 120 chars)');
        else if (descLength > 160) issues.push('⚠️ Description too long (> 160 chars)');
        else issues.push('✅ Description length is good');
      }

      // Check canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) issues.push('❌ Missing canonical URL');
      else issues.push('✅ Canonical URL present');

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      
      if (!ogTitle) issues.push('❌ Missing og:title');
      if (!ogDesc) issues.push('❌ Missing og:description');
      if (!ogImage) issues.push('❌ Missing og:image');
      if (!ogUrl) issues.push('❌ Missing og:url');
      
      if (ogTitle && ogDesc && ogImage && ogUrl) {
        issues.push('✅ All Open Graph tags present');
      }

      // Check structured data
      const structuredData = document.querySelector('script[type="application/ld+json"]');
      if (!structuredData) issues.push('❌ Missing structured data');
      else {
        try {
          JSON.parse(structuredData.textContent);
          issues.push('✅ Valid structured data found');
        } catch (e) {
          issues.push('❌ Invalid structured data JSON');
        }
      }

      // Check images
      const images = document.querySelectorAll('img');
      let imagesWithoutAlt = 0;
      images.forEach(img => {
        if (!img.alt) imagesWithoutAlt++;
      });
      
      if (imagesWithoutAlt > 0) {
        issues.push(`⚠️ ${imagesWithoutAlt} images missing alt text`);
      } else if (images.length > 0) {
        issues.push('✅ All images have alt text');
      }

      // Check headings hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const h1Count = document.querySelectorAll('h1').length;
      
      if (h1Count === 0) issues.push('❌ Missing H1 tag');
      else if (h1Count > 1) issues.push('⚠️ Multiple H1 tags found');
      else issues.push('✅ Single H1 tag found');

      // Check page loading speed (basic check)
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      if (loadTime > 3000) issues.push('⚠️ Page load time > 3 seconds');
      else issues.push('✅ Good page load time');

      // Check robots meta
      const robots = document.querySelector('meta[name="robots"]');
      if (!robots) issues.push('⚠️ Missing robots meta tag');
      else issues.push('✅ Robots meta tag present');

      // Check viewport meta
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) issues.push('❌ Missing viewport meta tag');
      else issues.push('✅ Viewport meta tag present');

      // Display results
      console.group('🔍 SEO Audit Results');
      issues.forEach(issue => console.log(issue));
      console.groupEnd();

      // Count issues by type
      const errors = issues.filter(i => i.startsWith('❌')).length;
      const warnings = issues.filter(i => i.startsWith('⚠️')).length;
      const successes = issues.filter(i => i.startsWith('✅')).length;

      console.log(`📊 Summary: ${successes} good, ${warnings} warnings, ${errors} errors`);
    };

    // Run audit after page loads
    setTimeout(auditSEO, 2000);
  }, [enabled]);

  return null;
};

export default SEOAudit;
