import { useEffect, useState } from 'react';
import axios from 'axios';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import WebSiteBG from '../assets/BG/maskBg.png'; // Add this line

const baseURL = "http://127.0.0.1:8000/storage/";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/services')
      .then(response => {
        setServices(response.data.services);
      })
      .catch(error => {
        console.error("Failed to fetch services:", error);
      });
  }, []);

  const groupedServices = {
    A: services.filter(service => service.category === 'A'),
    B: services.filter(service => service.category === 'B'),
    C: services.filter(service => service.category === 'C')
  };

  const categoryTitles = {
    A: "A.nalyser le marché",
    B: "b.rand design",
    C: "c.réation de contenu"
  };

  return (
    <>
      <Helmet>
        <title>Services | LandMark</title>
        <meta name="description" content="Explore our services in branding, web development, marketing, photography, and more." />
      </Helmet>

      <section className="font-['Jost'] relative min-h-screen">
        {/* 🔵 Background style (same as Portfolio) */}
        <div 
          className="absolute top-0 left-0 w-full bg-cover bg-no-repeat z-0"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,1) 100%), url(${WebSiteBG})`,
            backgroundPosition: 'left 0px top -100px',
            height: '40%'
          }}
        ></div>

        <Promotion />
        <Nav />

        <section className="relative z-10 mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%] m-auto">
          <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
            <span className="text-[#445ef2]">93%</span> de nos clients se disent <br />
            pleinement satisfaits et prêts à <br />
            recommander nos services
          </h1>
          <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
            Faites comme eux, choisissez l’excellence et rejoignez une communauté <br />
            qui nous fait confiance pour transformer leurs ambitions en réussites.
          </p>
        </section>

        {/* Services */}
        <section className=" py-16 px-4 sm:px-10 text-center w-[90%] m-auto relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-left text-gray-900 uppercase mb-6" style={{ fontFamily: 'bodoni' }}>
            SERVICES
          </h2>

          <h3 className="text-sm sm:text-xl font-bold text-left text-gray-900 uppercase mb-4">
            DES SOLUTIONS COMPLÈTES POUR BOOSTER VOTRE MARQUE ET VOTRE VISIBILITÉ
          </h3>
          <p className="text-gray-600 text-sm text-left mb-12 font-bold">
            Que vous souhaitiez renforcer votre présence en ligne, bâtir une identité de marque forte ou captiver votre audience avec du contenu créatif, nous offrons des solutions complètes et adaptées.
          </p>

          {['A', 'B', 'C'].map((category, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-[#010E26] uppercase text-left text-xl sm:text-2xl md:text-4xl mt-28">
                {categoryTitles[category]}
              </h3>
              <section className="flex flex-wrap gap-5 justify-between mt-10">
                {groupedServices[category].map((service, i) => (
                  <div key={i} className="w-full sm:w-[45%] lg:w-[30%] text-left font-bold">
                    <div className="w-full">
                      <img
                        src={baseURL + service.image}
                        alt={service.title}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-[#010e26] uppercase mt-10 mb-1">{service.title}</p>
                    <p className="text-[#666666] text-sm">{service.description}</p>
                  </div>
                ))}
              </section>
            </div>
          ))}
        </section>

        <Reviews />
        <Contact />
        <Footer />
      </section>
    </>
  );
}
