import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = "LandMark - Agence Marketing Digital au Maroc | Branding & Stratégie Créative",
  description = "LandMark, agence marketing digital au Maroc spécialisée en branding, création de contenu, développement web et stratégie digitale. Oujda, Casablanca, Tanger - Votre partenaire créatif de confiance.",
  keywords = "agence marketing digital maroc, branding maroc, création contenu maroc, développement web oujda, marketing digital casablanca, agence créative tanger, stratégie digitale maroc, LandMark agency",
  ogImage = "https://landmark.ma/src/assets/Logotype/White.png",
  ogUrl = "https://landmark.ma/",
  structuredData = null,
  canonical = null,
  noindex = false
}) => {
  const baseUrl = "https://landmark.ma";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : ogUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LandMark Agency" />
      <meta property="og:locale" content="fr_MA" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@LandMarkAgency" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="LandMark Agency - Haytham Guemmah" />
      <meta name="language" content="French" />
      <meta name="geo.region" content="MA" />
      <meta name="geo.position" content="34.6814;-1.9086" />
      <meta name="geo.placename" content="Oujda, Morocco" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
