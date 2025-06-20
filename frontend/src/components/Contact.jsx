import { useState } from 'react';
import { Helmet } from "react-helmet";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    company_name: '',
    message: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
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

      setSubmitStatus({ success: true, message: 'Message envoyé avec succès!' });
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        company_name: '',
        message: '',
        interests: []
      });
    } catch (error) {
      setSubmitStatus({ success: false, message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-[Jost]">
      <Helmet>
        <title>Contact | LandMark</title>
        <meta name="description" content="Contactez LandMark, une agence de marketing à service complet appartenant à Haytham Guemmah." />
      </Helmet>

      <section className="px-4 sm:px-10 py-8 bg-[#eeeeee]">
        <div className="container w-[90%] m-auto">
          <div className="mb-12">
            <h2 style={{ fontFamily: 'BioRhyme_Expanded' }} className="text-xl font-['BioRhyme_Expanded'] text-[#263973] uppercase text-left">
              Contactez-nous
            </h2>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-8/12">
              <h3 className="text-xl font-bold text-left text-[#010E26] uppercase mb-4">
                Remplissez le formulaire et nous vous contacterons.
              </h3>

              <div className="lg:w-7/12">
                {submitStatus && (
                  <div className={`mb-4 p-4 rounded ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Interests */}
                  <div className="mb-6">
                    <h4 className="font-medium text-[#010E26] mb-2">
                      JE SUIS INTÉRESSÉ PAR :
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["BRANDING", "WEBSITE DESIGN", "CONTENT CREATION", "PACKAGING", "OTHER"].map(
                        (item) => (
                          <label key={item} className="relative">
                            <input
                              type="checkbox"
                              checked={formData.interests.includes(item)}
                              onChange={() => handleInterestChange(item)}
                              className="absolute opacity-0 w-full h-full cursor-pointer peer"
                            />
                            <span className={`inline-block border-1 border-black px-4 py-1 text-sm ${
                              formData.interests.includes(item) ? 'bg-[#445EF2] text-white' : ''
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
                        placeholder="Nom complet"
                        type="text"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full p-3 border-b-2 border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border-b-2 border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="phone_number"
                        placeholder="Numéro de téléphone"
                        type="tel"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full p-3 border-b-2 border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        name="company_name"
                        placeholder="Nom de l'entreprise"
                        type="text"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="w-full p-3 border-b-2 border-gray-400 bg-transparent focus:border-[#010E26] focus:outline-none"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder="Parlez-nous de votre entreprise"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 border-b-2 border-gray-400 bg-transparent h-24 focus:border-[#010E26] focus:outline-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#010E26] text-white px-8 py-3 uppercase font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'ENVOYER'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Image & Info Section */}
            <div className="lg:w-4/12">
              <div className="mb-6">
                <img src="src/assets/JPG/haytham.jpg" alt="Haytham" className="w-full h-auto rounded-lg shadow-md" />
              </div>
              <p className="italic text-justify text-xl text-[#666666] mb-4">
                Saviez-vous que 4 clients sur 5 changent de marque en raison d'une mauvaise expérience client et d'un mauvais design ? <br />
                Chez Landmark, nous nous spécialisons dans la création de visuels innovants et tendance qui captivent et rendent vos produits et projets inoubliables.
              </p>
              <h4 className="font-bold text-xl uppercase">HAYTHAM GUERMAH</h4>
              <p className="font-medium italic text-xs">FONDATEUR & PDG DE @LANDMARK</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;