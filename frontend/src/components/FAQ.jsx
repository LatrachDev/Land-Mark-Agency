import React, { useState } from 'react';

const faqData = [
  {
    title: 'ANALYSER LE MARCHÉ',
    content:
      'Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.',
    items: [
      "Se plonger dans l'étude de marché",
      'Connaître votre clientèle',
      'Évaluez vos concurrents',
      'Trouvez vos points forts et corrigez vos points faibles',
      'Identifier les lacunes du marché',
      'Se démarquer',
    ],
  },
  {
    title: 'BRANDING DESIGN',
    content:
      'Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.',
    items: [
      "Se plonger dans l'étude de marché",
      'Connaître votre clientèle',
      'Évaluez vos concurrents',
      'Trouvez vos points forts et corrigez vos points faibles',
      'Identifier les lacunes du marché',
      'Se démarquer',
    ],
  },
  {
    title: 'CRÉATION DE CONTENU',
    content:
      'Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.',
    items: [
      "Se plonger dans l'étude de marché",
      'Connaître votre clientèle',
      'Évaluez vos concurrents',
      'Trouvez vos points forts et corrigez vos points faibles',
      'Identifier les lacunes du marché',
      'Se démarquer',
    ],
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-10 py-16 bg-white">
      <div className="container w-[90%] m-auto">
        <div className="mb-12">
          <h2 className="text-sm sm:text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
            FAQ’s
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="cursor-pointer w-full text-left flex justify-between items-center py-4"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-sm sm:text-xl font-bold uppercase">
                  {faq.title}
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div className="pl-4">
                  <p className="text-sm sm:text-xl mb-4">{faq.content}</p>
                  <ul className="space-y-2 pl-5 list-disc">
                    {faq.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
