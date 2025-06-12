import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

export default function ServicesPage() {
  return (
    <>

      <Helmet>
        <title>Services | LandMark</title>
        <meta name="description" content="Explore our services in branding, web development, marketing, photography, and more." />
      </Helmet>

      <section className="font-['Jost']">
        {/* Banner Promotion */}
        <Promotion />

        {/* Navbar */}
        <Nav />

        {/* Main Section */}
        <section className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%] m-auto">
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

        {/* Services Section */}
        <section className="bg-white py-16 px-4 sm:px-10 text-center w-[90%] m-auto">
          <h2 className="text-sm sm:text-xl font-normal text-left text-gray-900 uppercase mb-6 " style={{ fontFamily: 'BioRhyme_Expanded' }}>
            SERVICES
          </h2>

          <h3 className="text-sm sm:text-xl font-bold text-left text-gray-900 uppercase mb-4">
            DES SOLUTIONS COMPLÈTES POUR BOOSTER VOTRE MARQUE ET VOTRE VISIBILITÉ
          </h3>
          <p className="text-gray-600 text-sm text-left mb-12 font-bold">
            Que vous souhaitiez renforcer votre présence en ligne, bâtir une identité de marque forte ou captiver votre audience avec du contenu créatif, nous offrons des solutions complètes et adaptées.
          </p>

          {/* Section Blocks */}
          {[
            { title: "A.nalyser le marche" },
            { title: "b.rand design" },
            { title: "c.reation de contenu" },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold uppercase text-left text-xl sm:text-2xl md:text-4xl mt-28">
                {section.title}
              </h3>
              <section className="flex flex-wrap gap-6 justify-between mt-10">
                {[
                  {
                    title: "étude de marché",
                    desc: "Une voie claire & ciblée pour lancer votre entreprise.",
                    img: "src/assets/JPG/ABC/A1.png",
                  },
                  {
                    title: "Connaître votre clientèle",
                    desc: "Create & Launch a Brand that Lasts in the Market.",
                    img: "src/assets/JPG/ABC/A2.png",
                  },
                  {
                    title: "Évaluez vos concurrents",
                    desc: "Create & Launch a Brand that Lasts in the Market.",
                    img: "src/assets/JPG/ABC/A1.png",
                  },
                ].map((card, i) => (
                  <div key={i} className="w-full sm:w-[48%] lg:w-[25%] text-left font-bold">
                    <div className="w-full">
                      <img src={card.img} alt="marcher" className="w-full h-auto" />
                    </div>
                    <p className="text-[#010e26] uppercase mt-10 mb-1">{card.title}</p>
                    <p className="text-[#666666] text-sm">{card.desc}</p>
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