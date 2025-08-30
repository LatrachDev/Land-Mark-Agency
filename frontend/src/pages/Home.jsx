import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Content from '../components/Content';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import PromotionalPopup from '../components/PromotionalPopup'; 
import SEOHead from '../components/SEOHead';
import Empty from '../components/Empty';
import bgImage from '../assets/BG/Web-Site-BG-black.jpg';
import logoSrc from '../assets/Logotype/White.png';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';

function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LandMark - Agence Marketing Digital au Maroc",
    "description": "Page d'accueil de LandMark, agence marketing digital au Maroc spécialisée en branding, création de contenu et stratégie digitale.",
    "url": "https://landmark.ma",
    "mainEntity": {
      "@type": "Organization",
      "name": "LandMark Agency",
      "url": "https://landmark.ma",
      "logo": `https://landmark.ma${logoSrc}`,
      "description": "Agence marketing digital au Maroc spécialisée en branding, création de contenu, développement web et stratégie digitale.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Oujda",
        "addressRegion": "Oriental",
        "postalCode": "60000",
        "addressCountry": "MA"
      },
      "areaServed": ["Oujda", "Casablanca", "Tanger", "Maroc"],
      "serviceType": [
        "Marketing Digital",
        "Branding",
        "Développement Web",
        "Création de Contenu",
        "Photographie",
        "Production Vidéo",
        "Design Graphique"
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://landmark.ma"
        }
      ]
    }
  };

  return (
    <div className="font-[Jost]">
      <SEOHead 
        title="LandMark - Agence Marketing Digital au Maroc | Branding & Stratégie Créative"
        description="LandMark, agence marketing digital au Maroc spécialisée en branding, création de contenu, développement web et stratégie digitale. Oujda, Casablanca, Tanger - Votre partenaire créatif de confiance."
        keywords="agence marketing digital maroc, branding maroc, création contenu maroc, développement web oujda, marketing digital casablanca, agence créative tanger, stratégie digitale maroc, LandMark agency, Haytham Guemmah"
        ogUrl="https://landmark.ma/"
        canonical="/"
        structuredData={structuredData}
      />
      
      {/* Add the promotional popup */}
      <PromotionalPopup />
      
      <Promotion />
      <Nav />
      <div style={{ backgroundImage: `url(${bgImage})` }} className=" sm:-mt-25 -mt-22 w-full bg-cover bg-no-repeat">
        <Empty />
        <Hero />
        <Mission className='mx-auto py-16 px-4 sm:px-10 w-[90%] m-auto text-white' />
      </div>
      <Services />
      <ImageSlider />
      <Projects />
      <Content />
      <Reviews />
      <Contact />
      <Blog />
      <FAQ />
      <Footer />

      {/* Fixed Contact Button - Mobile Only */}
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 z-10 md:hidden bg-[#263973] hover:bg-[#1e2a5c] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact us"
      >
        {/* Message Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-[#263973] animate-ping opacity-20"></div>
      </Link>
    </div>
  );
}

export default Home;