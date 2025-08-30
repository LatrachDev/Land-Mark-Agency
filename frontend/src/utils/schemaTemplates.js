// Schema.org structured data templates for LandMark Agency
import { seoConfig } from './seoConfig';

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": seoConfig.company.name,
  "alternateName": seoConfig.company.legalName,
  "url": seoConfig.baseUrl,
  "logo": seoConfig.defaultImage,
  "description": seoConfig.defaultDescription,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": seoConfig.company.address.street,
    "addressLocality": seoConfig.company.address.city,
    "addressRegion": seoConfig.company.address.region,
    "postalCode": seoConfig.company.address.postalCode,
    "addressCountry": seoConfig.company.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": seoConfig.company.coordinates.latitude,
    "longitude": seoConfig.company.coordinates.longitude
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": seoConfig.company.contact.phone,
    "email": seoConfig.company.contact.email,
    "contactType": "customer service",
    "availableLanguage": seoConfig.languages,
    "areaServed": seoConfig.areasServed
  },
  "sameAs": Object.values(seoConfig.company.social),
  "founder": {
    "@type": "Person",
    "name": seoConfig.company.founder
  },
  "areaServed": seoConfig.areasServed.map(area => ({
    "@type": area === "Maroc" ? "Country" : "City",
    "name": area
  })),
  "serviceType": seoConfig.services,
  "knowsAbout": [
    "Digital Marketing",
    "Brand Strategy",
    "Web Development",
    "Content Creation",
    "Social Media Marketing",
    "Graphic Design",
    "Photography",
    "Video Production"
  ]
});

export const createWebPageSchema = (pageData) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": pageData.title,
  "description": pageData.description,
  "url": `${seoConfig.baseUrl}${pageData.path}`,
  "inLanguage": "fr-MA",
  "isPartOf": {
    "@type": "WebSite",
    "name": seoConfig.company.name,
    "url": seoConfig.baseUrl
  },
  "about": {
    "@type": "Organization",
    "name": seoConfig.company.name
  },
  "breadcrumb": pageData.breadcrumb || {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": seoConfig.baseUrl
      }
    ]
  }
});

export const createServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": createOrganizationSchema(),
  "areaServed": seoConfig.areasServed,
  "serviceType": service.category,
  "url": `${seoConfig.baseUrl}/services/${service.id}`,
  "image": service.image ? `https://api.landmark.ma/public/storage/${service.image}` : seoConfig.defaultImage,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "MAD",
    "seller": {
      "@type": "Organization",
      "name": seoConfig.company.name
    }
  }
});

export const createArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image ? `https://api.landmark.ma/public/storage/${article.image}` : seoConfig.defaultImage,
  "author": {
    "@type": "Person",
    "name": seoConfig.company.founder
  },
  "publisher": createOrganizationSchema(),
  "datePublished": article.created_at,
  "dateModified": article.updated_at,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${seoConfig.baseUrl}/blog/${article.id}`
  },
  "url": `${seoConfig.baseUrl}/blog/${article.id}`,
  "inLanguage": "fr-MA",
  "about": {
    "@type": "Thing",
    "name": article.category
  }
});

export const createBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": `${seoConfig.baseUrl}${crumb.path}`
  }))
});

export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": seoConfig.company.name,
  "image": seoConfig.defaultImage,
  "telephone": seoConfig.company.contact.phone,
  "email": seoConfig.company.contact.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": seoConfig.company.address.street,
    "addressLocality": seoConfig.company.address.city,
    "addressRegion": seoConfig.company.address.region,
    "postalCode": seoConfig.company.address.postalCode,
    "addressCountry": seoConfig.company.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": seoConfig.company.coordinates.latitude,
    "longitude": seoConfig.company.coordinates.longitude
  },
  "url": seoConfig.baseUrl,
  "sameAs": Object.values(seoConfig.company.social),
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "description": seoConfig.defaultDescription
});

export const createFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export default {
  createOrganizationSchema,
  createWebPageSchema,
  createServiceSchema,
  createArticleSchema,
  createBreadcrumbSchema,
  createLocalBusinessSchema,
  createFAQSchema
};
