// Sitemap generator for LandMark Agency
const generateSitemap = () => {
  const baseUrl = 'https://landmark.ma';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
    { url: '/services', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/portfolio', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { url: '/blog', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
    { url: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add dynamic blog posts (these would be fetched from API in real implementation)
  // Example: 
  // blogPosts.forEach(post => {
  //   sitemap += `
  //   <url>
  //     <loc>${baseUrl}/blog/${post.id}</loc>
  //     <lastmod>${post.updatedAt}</lastmod>
  //     <changefreq>monthly</changefreq>
  //     <priority>0.6</priority>
  //   </url>`;
  // });

  // Add dynamic service pages
  // services.forEach(service => {
  //   sitemap += `
  //   <url>
  //     <loc>${baseUrl}/services/${service.id}</loc>
  //     <lastmod>${service.updatedAt}</lastmod>
  //     <changefreq>monthly</changefreq>
  //     <priority>0.7</priority>
  //   </url>`;
  // });

  sitemap += `
</urlset>`;

  return sitemap;
};

export default generateSitemap;
