import React from 'react';
// import Head from './Head';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Mission from '../components/Mission';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Haytham GUEMMAH',
    role: 'Fondateur et Directeur Artistique de Landmark',
    description: 'Je suis là pour vous garantir des résultats de qualité et un impact mesurable sur le succès de votre projet.',
    imgSrc: '../../LM/Team/team.jpg',
    linkedin: 'https://www.linkedin.com/in/haytham-guemmah',
    instagram: 'https://www.instagram.com/haythamguemmah',
  },
  {
    name: 'MBAREK MBAREK',
    role: 'Stratégiste marketing',
    description: 'Je vous guide et vous propose des stratégies de marketing efficaces pour vous aider à positionner et dominer votre marché cible.',
    imgSrc: '../../LM/Team/team2.jpg',
    linkedin: 'https://www.linkedin.com/in/mbarek-mbarek',  // example link, update as needed
    instagram: 'https://www.instagram.com/mbarekmbarek',   // example link, update as needed
  },
  {
    name: 'HAJAR HAJAR',
    role: 'Créatrice de contenu',
    description: 'Créatrice de contenu adaptée à vos besoins. Ensemble, nous créerons des vidéos virales pour élargir votre audience.',
    imgSrc: '../../LM/Team/team3.jpg',
    linkedin: 'https://www.linkedin.com/in/hajar-hajar',
    instagram: 'https://www.instagram.com/hajarhajar',
  },
  {
    name: 'Haytham Guemmah',
    role: 'Fondateur et Directeur Artistique de Landmark',
    description: 'Je suis là pour vous garantir des résultats de qualité et un impact mesurable sur le succès de votre projet.',
    imgSrc: '../../LM/Team/team4.jpg',
    linkedin: 'https://www.linkedin.com/in/haytham-guemmah',
    instagram: 'https://www.instagram.com/haythamguemmah',
  },
  {
    name: 'SOUFIAN SOUFIAN',
    role: 'Imprimeur',
    description: "Votre imprimeur, je vous propose une large gamme de supports et d'outils d’impression pour vous aider à faire forte impression auprès de vos clients.",
    imgSrc: '../../LM/Team/team5.jpg',
    linkedin: 'https://www.linkedin.com/in/soufian-soufian',
    instagram: 'https://www.instagram.com/soufiansoufian',
  },
  {
    name: 'Mohammed LATRACH',
    role: 'Développeur web',
    description: 'Je suis là pour vous aider à renforcer votre présence en ligne grâce à la création de sites web responsives, conçus pour augmenter vos ventes en ligne.',
    imgSrc: '../../LM/Team/team6.jpg',
    linkedin: 'https://www.linkedin.com/in/mohammed-latrach',
    instagram: 'https://www.instagram.com/mohammedlatrach',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* <Head title="Landmark - Services" /> */}

      <body className="font-['Jost']">
        {/* Banner Promotion */}
        <Promotion />

        {/* Navbar */}
        <Nav />

        {/* Main Content */}
        <main className="mx-auto px-6 mt-20 md:mt-40 w-[90%] m-auto">
          <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
            <span className="text-[#445ef2]">93%</span> de nos clients se disent <br />
            pleinement satisfaits et prêts à <br />
            recommander nos services
          </h1>
          <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
            Faites comme eux, choisissez l’excellence et rejoignez une communauté <br />
            qui nous fait confiance pour transformer leurs ambitions en réussites.
          </p>
        </main>

        <Mission className="text-[#263973] w-[90%] mx-auto " />

        <section className="mx-auto py-16 px-4 sm:px-10 w-[90%] m-auto">
          <h2 className="text-xl tracking-[0.2em] font-['BioRhyme_Expanded'] mb-6 uppercase pl-0 text-[#263973]">
            Équipe landmark
          </h2>

          {/* Team Members */}
          <section className="flex flex-wrap gap-6 justify-between pt-16">
            {teamMembers.map(({ name, role, description, imgSrc, linkedin, instagram }) => (
              <article key={name} className="w-full sm:w-[48%] lg:w-[25%] text-left">
                <div className="w-full">
                  <img src={imgSrc} alt={`Photo de ${name}`} className="w-full h-auto" />
                </div>
                <p className="text-[#010e26] uppercase mt-10 mb-1 font-bold">{name}</p>
                <p className="text-[#666666] text-sm">{description}</p>
                <div className="flex gap-4 mt-4">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0e76a8]">
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-[#E1306C]">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </div>
              </article>
            ))}
          </section>
        </section>

        <Footer />
      </body>
    </>
  );
}
