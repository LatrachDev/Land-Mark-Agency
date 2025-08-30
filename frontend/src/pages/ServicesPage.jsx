import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import WebSiteBG from '../assets/BG/maskBg.png';

const baseURL = "https://api.landmark.ma/public/storage/";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}api/services`)
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
        <meta name="description" content="La vidéo UGC (User-Generated Content) est aujourd’hui le format le plus crédible et efficace pour engager ton audience. Découvre pourquoi et comment l’intégrer à ta stratégie de contenu." />
      </Helmet>

      <section className="font-['Jost'] relative min-h-screen">
        {/* 🔵 Background style */}
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
        
        {/* Services */}
        
      
        <section className="text-left py-16 px-4 sm:px-10 w-[90%] m-auto relative z-10">
            <h1 className="sm:mt-24 mt-5 text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
              DES SOLUTIONS COMPLÈTES POUR BOOSTER VOTRE MARQUE ET VOTRE VISIBILITÉ
            </h1>
            <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-sm md:text-xl tracking-normal">
              Que vous souhaitiez renforcer votre présence en ligne, bâtir une identité de marque forte ou captiver votre audience avec du contenu créatif, nous offrons des solutions complètes et adaptées.
            </p>

          <h2 className="text-xl sm:text-2xl font-bold text-left text-[#263973] uppercase mb-6 mt-32" style={{ fontFamily: 'bodoni' }}>
            SERVICES
          </h2>
         
          {['A', 'B', 'C'].map((category, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-[#010E26] uppercase text-left text-xl sm:text-2xl md:text-4xl">
                {categoryTitles[category]}
              </h3>
              <section className="flex flex-wrap gap-5 justify-between mt-10">
                {groupedServices[category].map((service, i) => (
                  <div
                    key={i} onClick={() => navigate(`/services/${service.id}`)}
                    className="text-[#010e26] w-full sm:w-[45%] lg:w-[30%] text-left font-bold group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.01] bg-white cursor-pointer hover:text-[#445EF2]"
                  >
                    <img
                      src={baseURL + service.image}
                      alt={service.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                      <p className=" uppercase mb-1">{service.title}</p>
                      <p className="text-[#666666] text-sm">{service.description.slice(0, 100)}...</p>
                    </div>
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
