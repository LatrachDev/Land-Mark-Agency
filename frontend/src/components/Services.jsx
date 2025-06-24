import React from 'react';

const servicesData = [
  {
    icon: 'src/assets/Services/marketingIcon.svg',
    alt: 'Marketing Icon',
    title: 'ANALYSER LE MARCHÉ',
    description: 'Une voie claire & ciblée pour lancer votre entreprise.',
  },
  {
    icon: 'src/assets/Services/designIcon.svg',
    alt: 'Branding Icon',
    title: 'BRANDING DESIGN',
    description: 'Créez & lancez une marque qui se démarque sur le marché.',
  },
  {
    icon: 'src/assets/Services/creation.svg',
    alt: 'Content Creation Icon',
    title: 'CRÉATION DE CONTENU',
    description: 'Grandissez & évoluez avec du contenu qui augmente les interactions.',
  },
  {
    icon: 'src/assets/Services/seo.svg',
    alt: 'SEO Icon',
    title: 'SEO & SEA',
    description: 'Booster & Optimiser le classement de votre Site Web',
  },
  {
    icon: 'src/assets/Services/ux.svg',
    alt: 'UI UX Icon',
    title: 'UI & UX DESIGN',
    description: 'Créez & Développez une interface qui capte vos utilisateurs.',
  },
  {
    icon: 'src/assets/Services/photography.svg',
    alt: 'Photography Icon',
    title: 'PHOTOGRAPHIE',
    description: 'Capturez & présentez des visuels qui inspirent et engagent.',
  },
];

const Services = () => {
  return (
    <section id="services-section" className="bg-white py-16 px-4 sm:px-10 text-center w-[90%] m-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-left text-[#263973] uppercase mb-6" style={{ fontFamily: 'bodoni' }}>
        SERVICES
      </h2>

      <h3 className="text-sm sm:text-xl font-bold text-left text-gray-900 uppercase mb-4">
        Des Solutions Complètes pour Booster Votre Marque et Votre Visibilité
      </h3>

      <p className="text-[#666666] text-sm sm:text-xl font-bold text-left w-full mb-12">
        Que vous souhaitiez renforcer votre présence en ligne, bâtir une identité de marque forte ou captiver votre audience avec du contenu créatif, nous offrons des solutions complètes et adaptées.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-12 mx-auto">
        {servicesData.map(({ icon, alt, title, description }, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img src={icon} alt={alt} className="h-14 mb-2" />
            <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
            <p className="font-semibold text-sm w-52 text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
