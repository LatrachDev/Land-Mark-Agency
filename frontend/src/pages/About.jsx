import React, { useEffect, useState } from 'react';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Mission from '../components/Mission';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { LinkedinFilled, InstagramOutlined }from "@ant-design/icons" ;
import { data } from 'react-router-dom';

// const teamMembers = [
//   {
//     name: 'Haytham GUEMMAH',
//     role: 'Fondateur et Directeur Artistique de Landmark',
//     description: 'Je suis là pour vous garantir des résultats de qualité et un impact mesurable sur le succès de votre projet.',
//     imgSrc: './src/assets/Team/team1.jpg',
//     linkedin: 'https://www.linkedin.com/company/landmark-agency-official/posts/?feedView=all',
//     instagram: 'https://www.instagram.com/haythamark/',
//   },
//   {
//     name: 'Mohammed LATRACH',
//     role: 'Développeur web',
//     description: 'Je suis là pour vous aider à renforcer votre présence en ligne grâce à la création de sites web responsives, conçus pour augmenter vos ventes en ligne.',
//     imgSrc: './src/assets/Team/team2.png',
//     linkedin: 'https://www.linkedin.com/in/latrachdev1',
//     instagram: 'https://www.instagram.com/mohammed_latrach',
//   },
//   {
//     name: 'HAJAR HAJAR',
//     role: 'Créatrice de contenu',
//     description: 'Créatrice de contenu adaptée à vos besoins. Ensemble, nous créerons des vidéos virales pour élargir votre audience.',
//     imgSrc: './src/assets/Team/team3.png',
//     linkedin: 'https://www.linkedin.com/in/hajar-hajar',
//     instagram: 'https://www.instagram.com/hajarhajar',
//   },
//   {
//     name: 'Imad Boushaba',
//     role: 'Fondateur et Directeur Artistique de Landmark',
//     description: 'Je suis là pour vous garantir des résultats de qualité et un impact mesurable sur le succès de votre projet.',
//     imgSrc: './src/assets/Team/team4.png',
//     linkedin: 'https://www.linkedin.com/in/haytham-guemmah',
//     instagram: 'https://www.instagram.com/haythamguemmah',
//   },
//   {
//     name: 'SOUFIAN SOUFIAN',
//     role: 'Imprimeur',
//     description: "Votre imprimeur, je vous propose une large gamme de supports et d'outils d’impression pour vous aider à faire forte impression auprès de vos clients.",
//     imgSrc: './src/assets/Team/team5.png',
//     linkedin: 'https://www.linkedin.com/in/soufian-soufian',
//     instagram: 'https://www.instagram.com/soufiansoufian',
//   },
//   {
//     name: 'MBAREK MBAREK',
//     role: 'Stratégiste marketing',
//     description: 'Je vous guide et vous propose des stratégies de marketing efficaces pour vous aider à positionner et dominer votre marché cible.',
//     imgSrc: './src/assets/Team/team6.png',
//     linkedin: 'https://www.linkedin.com/in/mbarek-mbarek', 
//     instagram: 'https://www.instagram.com/mbarekmbarek',  
//   },
// ];

export default function AboutPage() {

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/about', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setTeamMembers(data.teamMembers);
      console.log('Fetched team members:', data.teamMembers);
    })
    .catch(error => console.error('Error fetching team members:', error));
  }, []);

  return (
    <>
    
      <Helmet>
        <title>About Us | LandMark</title>
        <meta name="description" content="Learn about LandMark's story, our team, and our mission to deliver exceptional marketing and creative solutions." />
      </Helmet>

      <section className="font-['Jost']">
        {/* Banner Promotion */}
        <Promotion />

        {/* Navbar */}
        <Nav />

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%] m-auto">
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

        <Mission className="text-[#263973] mx-auto py-16 px-4 sm:px-10 w-[90%] m-auto font-medium" />

        <section className="mx-auto py-16 px-4 sm:px-10 w-[90%] m-auto">
          <h2 className="text-sm font-bold sm:text-xl tracking-[0.2em] mb-6 uppercase pl-0 text-[#263973]" style={{ fontFamily: 'bodoni' }}>
            Équipe landmark
          </h2>

          {/* Team Members */}
          <section className="flex flex-wrap gap-4 md:gap-1 justify-between pt-16">
            {teamMembers.map(({ id, name, post, description, image, linkedin, instagram }) => (

            <article key={id} className="w-full sm:w-[48%] lg:w-[30%] text-left">
              <div className="w-full relative overflow-hidden rounded-lg group">
                <img
                  src={`http://127.0.0.1:8000/storage/${image}`}
                  alt={`Photo de ${name}`}
                  className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-2">
                  
                  {/* Post at top, underlined with extra offset */}
                  <p className="text-white text-center text-base font-medium underline decoration-white decoration-1.5 underline-offset-5 mb-2">
                    {post}
                  </p>

                  {/* Name below, slightly smaller */}
                  <p className="text-white text-center text-xs font-light uppercase">
                    {name}
                  </p>

                </div>
              </div>

              <p className="text-[#010e26] uppercase mt-10 mb-1 font-bold">{name}</p>
              <p className="text-[#666666] text-sm">{description}</p>

              <div className="flex gap-4 mt-4">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0e76a8]">
                    <LinkedinFilled className="hover:opacity-70 transition-opacity cursor-pointer" />
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-[#E1306C]">
                    <InstagramOutlined className="hover:opacity-70 transition-opacity cursor-pointer" />
                  </a>
                )}
              </div>
            </article>

            ))}
          </section>
        </section>

        <Footer />
      </section>
    </>
  );
}
