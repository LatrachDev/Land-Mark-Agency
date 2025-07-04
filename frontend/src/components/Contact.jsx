import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import haythamImage from '../assets/JPG/haytham.jpg';

function Contact() {
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
  const [errors, setErrors] = useState({});

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
    setErrors({});
    setSubmitStatus(null);
    
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
        if (response.status === 422 && data.errors) {
          setErrors(data.errors);
        } else {
          setSubmitStatus({ success: false, message: data.message || "Erreur lors de l'envoi." });
        }
        return;
      }

      setShowSuccess(true);
      setFormData({
        full_name: '',
        phone_number: '',
        company_name: '',
        message: '',
        interests: []
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus({ success: false, message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-[Jost]">


      <section className="px-4 sm:px-10 py-8 bg-[#eeeeee]">
        <div className="container w-[90%] m-auto">
          <div className="mb-12">
            <h2 style={{ fontFamily: 'bodoni' }} className="text-xl sm:text-2xl font-bold text-[#263973] uppercase text-left">
              Contactez-nous
            </h2>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-8/12">
              {!showSuccess ? (
                <>
                  <h3 className="text-xl font-bold text-left text-[#010E26] uppercase mb-4">
                    remplissez le formulaire, et nous vous contacterons.
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
                        <h4 className="font-medium uppercase text-[#010E26] mb-2">
                          je suis intéressé par :
                        </h4>
                        <div className="flex flex-wrap gap-2 uppercase mb-4">
                          {["BRANDING", "développement de sites Web", "Création de contenu", "Étude de marche", "OTHER"].map(
                            (item) => (
                              <label key={item} className="relative">
                                <input
                                  type="checkbox"
                                  checked={formData.interests.includes(item)}
                                  onChange={() => handleInterestChange(item)}
                                  className="absolute opacity-0 w-full h-full cursor-pointer peer"
                                />
                                <span className={`inline-block border-1 border-black px-4 py-1 text-sm transition-all duration-200 ${
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
                        {/* Full Name */}
                        <div>
                          <input
                            name="full_name"
                            placeholder="Nom et Prénom"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            className={`w-full p-3 border-b-2 ${errors.full_name ? 'border-red-500' : 'border-gray-400'} bg-transparent focus:outline-none transition-colors duration-200`}
                            
                          />
                          {errors.full_name && <p className="text-sm text-red-600 mt-1">{errors.full_name[0]}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                          <input
                            name="phone_number"
                            placeholder="Numéro De Téléphone"
                            type="tel"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className={`w-full p-3 border-b-2 ${errors.phone_number ? 'border-red-500' : 'border-gray-400'} bg-transparent focus:outline-none transition-colors duration-200`}
                          />
                          {errors.phone_number && <p className="text-sm text-red-600 mt-1">{errors.phone_number[0]}</p>}
                        </div>

                        {/* Company Name */}
                        <div>
                          <input
                            name="company_name"
                            placeholder="Nom de l'Entreprise (Optionnel)*"
                            type="text"
                            value={formData.company_name}
                            onChange={handleChange}
                            className={`w-full p-3 border-b-2 ${errors.company_name ? 'border-red-500' : 'border-gray-400'} bg-transparent focus:outline-none transition-colors duration-200`}
                          />
                          {errors.company_name && <p className="text-sm text-red-600 mt-1">{errors.company_name[0]}</p>}
                        </div>

                        {/* Message */}
                        <div>
                          <textarea
                            name="message"
                            placeholder="Parlez-Nous De Votre Entreprise"
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full p-3 border-b-2 ${errors.message ? 'border-red-500' : 'border-gray-400'} bg-transparent h-24 focus:outline-none transition-colors duration-200`}
                            
                          ></textarea>
                          {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message[0]}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#010E26] text-white px-8 py-3 uppercase font-medium hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                          {isSubmitting ? 'Envoi en cours...' : 'ENVOYER'}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                // Success Message
                <div className="lg:w-7/12 animate-fade-in">
                  <div className="text-center py-12">
                    <div className="mx-auto mb-6 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
                      <svg className="w-12 h-12 text-white animate-check-draw" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-[#010E26] uppercase mb-4 animate-slide-up">
                      Message Envoyé!
                    </h3>
                    <p className="text-lg text-[#666666] mb-8 animate-slide-up-delay">
                      Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
                    </p>
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

            {/* Image Section */}
            <div className="lg:w-4/12">
              <div className="mb-6">
                <img src={haythamImage} alt="Haytham" className="w-full h-auto rounded-lg shadow-md" />
              </div>
              <p className="italic text-justify text-xl text-[#666666] mb-4">
                Saviez-vous que 4 clients sur 5 changent de marque à cause d'une mauvaise expérience ou d'un design médiocre ? <br />
                Chez Landmark, nous sommes spécialisés dans la création de visuels innovants et tendance qui captivent et rendent vos projets inoubliables.
              </p>
              <h4 className="font-bold text-xl uppercase">HAYTHAM GUERMAH</h4>
              <p className="font-medium italic text-xs uppercase">Founder & CEO of @LANDMARK</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkDraw {
          0% { stroke-dasharray: 0 20; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 20 0; stroke-dashoffset: -20; }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s ease-out 0.3s both; }
        .animate-slide-up-delay { animation: slideUp 0.6s ease-out 0.5s both; }
        .animate-slide-up-delay-2 { animation: slideUp 0.6s ease-out 0.7s both; }
        .animate-check-draw { animation: checkDraw 0.6s ease-out 0.4s both; stroke-dasharray: 20; stroke-dashoffset: 20; }
      `}</style>
    </div>
  );
}

export default Contact;
