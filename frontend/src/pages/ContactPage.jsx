import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import haythamImage from '../assets/JPG/haythamContact.jpg';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';
import icon1 from '../assets/icones/1.png';
import icon2 from '../assets/icones/2.png';
import icon3 from '../assets/icones/3.png';

function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    company_name: '',
    message: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      const index = interests.indexOf(interest);
      
      if (index === -1) {
        interests.push(interest);
      } else {
        interests.splice(index, 1);
      }
      
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi');
      }

      // Show success animation
      setShowSuccess(true);
      
      // Reset form data
      setFormData({
        full_name: '',
        phone_number: '',
        company_name: '',
        message: '',
        interests: []
      });
      
      console.log("Submitting form data:", formData);
    } catch (error) {
      setSubmitStatus({ success: false, message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setSubmitStatus(null);
  };

  return (
    <div className="font-[Jost]">
      
      <Helmet>
        <title>Contact | LandMark</title>
        <meta name="description" content="Contactez LandMark, une agence de marketing à service complet appartenant à Haytham Guemmah." />
      </Helmet>

      <Nav />
      <section className="px-4 sm:px-10 py-8 bg-[#010E26] text-[#f2f2f2]">
        <div className="container w-[90%] m-auto">
          <div className="mb-12">
            <h2 style={{ fontFamily: 'bodoni' }} className="text-xl sm:text-2xl font-bold text-[#f2f2f2] uppercase text-left">
              Contactez-nous
            </h2>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-8/12">
              {!showSuccess ? (
                <div className="transition-all duration-500 ease-in-out">
                  <h3 className="text-xl font-bold text-left text-[#f2f2f2] uppercase mb-4">
                    remplissez le formulaire,
                    et nous vous contacterons.
                  </h3>

                  <div className="lg:w-7/12">
                    {submitStatus && !submitStatus.success && (
                      <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
                        {submitStatus.message}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Interests */}
                      <div className="mb-6">
                        <h4 className="font-medium uppercase text-[#f2f2f2] mb-2">
                          je suis intéressé par :
                        </h4>
                        <div className="flex flex-wrap gap-2 uppercase mb-4">
                          {["BRANDING", "développement de sites Web", "Création de contenu", "Étude de marche", "AUTRES"].map(
                            (item) => (
                              <label key={item} className="relative">
                                <input
                                  type="checkbox"
                                  checked={formData.interests.includes(item)}
                                  onChange={() => handleInterestChange(item)}
                                  className="absolute opacity-0 w-full h-full cursor-pointer peer"
                                />
                                <span className={`inline-block border-1 border-white px-4 py-1 text-sm transition-all duration-200 ${
                                  formData.interests.includes(item) ? 'bg-[#445EF2] text-white' : 'hover:bg-gray-100'
                                }`}>
                                  {item}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="space-y-4">
                        <div>
                          <input
                            name="full_name"
                            placeholder="Nom et Prénom"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full p-3 border-b-2 placeholder-[#f2f2f2] border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <input
                            name="phone_number"
                            placeholder="Numéro De Téléphone"
                            type="tel"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full p-3 border-b-2 placeholder-[#f2f2f2] border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <input
                            name="company_name"
                            placeholder="Nom de l'Entreprise (Optionnel)*"
                            type="text"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="w-full p-3 border-b-2 placeholder-[#f2f2f2] border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <textarea
                            name="message"
                            placeholder="Parlez-Nous De Votre Entreprise"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border-b-2 placeholder-[#f2f2f2] border-gray-400 bg-transparent h-24 focus:border-[#010E26] focus:outline-none transition-colors duration-200"
                            required
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#f2f2f2] text-[#010E26] px-8 py-3 uppercase font-medium hover:bg-[#445EF2] hover:text-[#f2f2f2] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                          {isSubmitting ? 'Envoi en cours...' : 'ENVOYER'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                // Success Message
                <div className="lg:w-7/12 animate-fade-in">
                  <div className="text-center py-12">
                    {/* Animated Success Icon */}
                    <div className="mx-auto mb-6 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in relative">
                      {/* Success Icon with Checkmark */}
                      <div className="relative">
                        <svg 
                          className="w-12 h-12 text-white animate-check-draw" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {/* Animated checkmark overlay */}
                        <svg 
                          className="absolute inset-0 w-12 h-12 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M9 12l2 2 4-4"
                            className="animate-check-path"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Success Text */}
                    <h3 className="text-3xl font-bold text-[#010E26] uppercase mb-4 animate-slide-up">
                      Message Envoyé!
                    </h3>
                    <p className="text-lg text-[#666666] mb-8 animate-slide-up-delay">
                      Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
                    </p>
                    
                    {/* Home Button */}
                    <button
                      onClick={() => window.location.href = '/'}
                      className="bg-[#445EF2] text-white px-8 py-3 uppercase font-medium hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 animate-slide-up-delay-2"
                    >
                      Retour à l'accueil
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Image & Info Section */}
            <div className="lg:w-4/12 hidden lg:block">
              <div className="mb-6">
                <img src={haythamImage} alt="Haytham" className="w-full h-auto shadow-md" />
              </div>
              <p className="italic text-justify text-xl mb-4">
                Saviez-vous que 4 clients sur 5 changent de marque a cause d'une mauvaise expérience ou d'un design médiocres ? <br />
                Chez Landmark, nous sommes spécialisés dans la création de visuels innovants et tendance qui non seulement captivent, mais rendent également vos produits et projets inoubliables.
              </p>
              <h4 className="font-bold text-xl uppercase">HAYTHAM GUERMAH</h4>
              <p className="font-medium italic text-xs">FONDATEUR & PDG DE @LANDMARK</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto px-4 sm:px-10 pt-16">
        <div className="container w-[90%] m-auto">
          <div className="mb-12">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 text-[#263973] uppercase text-left" style={{ fontFamily: 'bodoni' }}>
              Profitez de l’offre en <span className='text-[#445EF2]'>3 étapes.</span>
            </h2>

             <h3 className="text-sm sm:text-xl font-bold text-left text-gray-900 uppercase mb-4">
              Des Solutions Complètes pour Booster Votre Marque et Votre Visibilité
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
            <div className="text-center">
              <img className="w-20 sm:w-28 md:w-36 mx-auto" src={icon1} alt="Remplissez le formulaire" />
              <h3 className="text-[#010E26] text-sm sm:text-xl mt-5 mb-2 font-bold uppercase" style={{ fontFamily: 'Jost' }}>
                Remplissez le formulaire
              </h3>
              <p className="text-[#666] font-bold text-xs" style={{ fontFamily: 'Jost' }}>
                Nom et Prénom <br /> Contact ...
              </p>
            </div>

            <div className="text-center">
              <img className="w-20 sm:w-28 md:w-36 mx-auto" src={icon2} alt="Recevez l’appel d’un agent" />
              <h3 className="text-[#010E26] text-sm sm:text-xl mt-5 mb-2 font-bold uppercase" style={{ fontFamily: 'Jost' }}>
                Recevez l’appel d’un agent
              </h3>
              <p className="text-[#666] font-bold text-xs" style={{ fontFamily: 'Jost' }}>
                Un Appel de 10 min <br /> pour en parler
              </p>
            </div>

            <div className="text-center">
              <img className="w-20 sm:w-28 md:w-36 mx-auto" src={icon3} alt="Confirmez Votre devis" />
              <h3 className="text-[#010E26] text-sm sm:text-xl mt-5 mb-2 font-bold uppercase" style={{ fontFamily: 'Jost' }}>
                Confirmez Votre devis
              </h3>
              <p className="text-[#666] font-bold text-xs" style={{ fontFamily: 'Jost' }}>
                Confirmez Votre <br /> Commande
              </p>
            </div>
          </div>

        </div>
      </section>

      <Reviews />
      <Footer />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes checkDraw {
          0% {
            stroke-dasharray: 0 20;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 20 0;
            stroke-dashoffset: -20;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out 0.3s both;
        }
        
        .animate-slide-up-delay {
          animation: slideUp 0.6s ease-out 0.5s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slideUp 0.6s ease-out 0.7s both;
        }
        
        .animate-check-draw {
          animation: checkDraw 0.6s ease-out 0.4s both;
        }
        
        .animate-check-path {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
        }
      `}</style>
    </div>
  );
}

export default ContactPage;