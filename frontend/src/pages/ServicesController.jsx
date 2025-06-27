import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_CONTENT, ADMIN_BLOG, ADMIN_SERVICES } from '../config/routes';

export default function ServicesController() {
  const [services, setServices] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    currentImage: null,
    category: 'A',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
  
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/services`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Fetch error:', data.message || 'Fetching failed');
        setErrors({ general: data.message || 'Erreur lors du chargement des services' });
        return;
      }

      setServices(data);
      setErrors({});

    } catch (err) {
      console.error('Error fetching services:', err);
      setErrors({ general: 'Erreur réseau lors du chargement des services' });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/services/${serviceToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Suppression échouée !");
        setErrors({ general: data.message || "Erreur lors de la suppression" });
        return;
      }

      fetchServices();
      setShowDeleteModal(false);
      setServiceToDelete(null);
      setErrors({});
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setErrors({ general: "Erreur réseau lors de la suppression" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setServiceToDelete(null);
    setErrors({});
  };

  const handleCreateClick = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      currentImage: null,
      category: 'A',
    });
    setErrors({});
    setShowCreateForm(true);
  };

  const handleEditClick = (service) => {
    setServiceToEdit(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null,
      currentImage: service.image,
      category: service.category,
    });
    setErrors({});
    setShowUpdateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Le titre ne doit pas dépasser 255 caractères';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    // Only validate image for creation, not for update
    if (showCreateForm && !formData.image) {
      newErrors.image = "L'image est requise";
    }
    
    // If there's an image, validate its type and size
    if (formData.image) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(formData.image.type)) {
        newErrors.image = "Format d'image non supporté (seuls JPG, PNG et GIF sont acceptés)";
      }
      if (formData.image.size > 2 * 1024 * 1024) { // 2MB
        newErrors.image = "L'image ne doit pas dépasser 2MB";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/services`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          // Handle validation errors from server
          const serverErrors = {};
          Object.entries(data.errors).forEach(([field, messages]) => {
            serverErrors[field] = messages.join(' ');
          });
          setErrors(serverErrors);
        } else {
          console.error(data.message || "Création échouée !");
          setErrors({ general: data.message || "Une erreur s'est produite lors de la création." });
        }
        return;
      }

      fetchServices();
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        image: null,
        currentImage: null,
        category: 'A',
      });
      setErrors({});
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      setErrors({ general: "Une erreur réseau s'est produite." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!serviceToEdit) return;
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('_method', 'PUT');
      
      // Only append image if a new one was provided
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/services/${serviceToEdit.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          // Handle validation errors from server
          const serverErrors = {};
          Object.entries(data.errors).forEach(([field, messages]) => {
            serverErrors[field] = messages.join(' ');
          });
          setErrors(serverErrors);
        } else {
          console.error(data.message || "Mise à jour échouée !");
          setErrors({ general: data.message || "Une erreur s'est produite lors de la mise à jour." });
        }
        return;
      }

      fetchServices();
      setShowUpdateForm(false);
      setServiceToEdit(null);
      setFormData({
        title: '',
        description: '',
        image: null,
        currentImage: null,
        category: 'A',
      });
      setErrors({});
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setErrors({ general: "Une erreur réseau s'est produite." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setServiceToEdit(null);
    setFormData({
      title: '',
      description: '',
      image: null,
      currentImage: null,
      category: 'A',
    });
    setErrors({});
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const adminCards = [
    {
      title: "Gestion d'équipe",
      desc: "Ajoutez, modifiez ou supprimez les membres de l'équipe.",
      icon: '👥',
      path: ADMIN_TEAM,
    },
    {
      title: 'Gestion des projets',
      desc: "Suivez, ajoutez ou archivez les projets de l'agence.",
      icon: '📁',
      path: ADMIN_PROJECTS,
    },
    {
      title: 'Création de contenu',
      desc: 'Gérez les articles, textes, et médias publiés.',
      icon: '✍️',
      path: ADMIN_CONTENT,
    },
    {
      title: 'Gestion du blog',
      desc: 'Ajoutez ou mettez à jour vos blogs.',
      icon: '🖼️',
      path: ADMIN_BLOG,
    },
    {
      title: 'Boîte de réception',
      desc: 'Consultez les messages envoyés via le formulaire de contact.',
      icon: '📨',
      path: ADMIN_INBOX,
    },
    {
      title: 'Gestion des services',
      desc: 'Ajoutez, modifiez ou supprimez les services proposés par l\'agence.',
      icon: '🛠️',
      path: ADMIN_SERVICES,
      active: true
    },
  ];

  const getCategoryName = (category) => {
    switch(category) {
      case 'A': return 'Catégorie A';
      case 'B': return 'Catégorie B';
      case 'C': return 'Catégorie C';
      default: return category;
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Services | LandMark</title>
      </Helmet>

      <div className="font-['Jost'] bg-[#f5f7fa] min-h-screen">
        {/* Header */}
        <div className="w-[90%] m-auto pt-10 flex justify-between items-center">
          <img
            src={'/src/assets/Logotype/Main.png'} 
            alt="Landmark"
            className="h-10 md:min-w-[200px] md:h-14"
          />
          <button
            onClick={handleLogout}
            className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition"
          >
            Déconnexion
          </button>
        </div>

        {/* Welcome Section */}
        <section className="w-[90%] m-auto mt-10 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#010e26] uppercase tracking-wide mb-4">
            Gestion des Services
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Ajoutez, modifiez ou supprimez les services proposés par votre agence.
          </p>
        </section>

        {/* Admin Navigation Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] m-auto mb-10">
          {adminCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer ${card.active ? 'border-2 border-[#010e26]' : ''}`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-[#010e26] mb-2 uppercase">
                {card.title}
              </h3>
              <p className="text-sm text-[#666]">{card.desc}</p>
            </div>
          ))}
        </section>

        {/* Services Content */}
        <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#010e26]">Liste des Services</h2>
            
            <button 
              onClick={handleCreateClick} 
              className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition"
            >
              + Nouveau Service
            </button>
          </div>

          {/* Error message for general errors */}
          {errors.general && (
            <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}

          {/* Create Form */}
          {showCreateForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
              <h3 className="text-lg font-bold text-[#010e26] mb-4">Ajouter un nouveau service</h3>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Titre du service *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Entrez le titre du service"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Décrivez le service en détail..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Catégorie *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                    >
                      <option value="A">Catégorie A</option>
                      <option value="B">Catégorie B</option>
                      <option value="C">Catégorie C</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Image du service *
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                      className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    />
                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Formats acceptés: JPG, PNG, GIF. Taille max: 2MB
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#010e26] text-white px-6 py-2 rounded-lg hover:bg-[#081d45] transition disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création...
                      </>
                    ) : (
                      'Ajouter le service'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    disabled={isSubmitting}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Update Form */}
          {showUpdateForm && serviceToEdit && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-[#010e26] mb-4">
                Modifier le service: {serviceToEdit.title}
              </h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Titre du service *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Entrez le titre du service"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Décrivez le service en détail..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Catégorie *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                    >
                      <option value="A">Catégorie A</option>
                      <option value="B">Catégorie B</option>
                      <option value="C">Catégorie C</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Nouvelle image (optionnel)
                    </label>
                    
                    {/* Show current image if exists */}
                    {formData.currentImage && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Image actuelle:</p>
                        <img 
                          src={`http://127.0.0.1:8000/storage/${formData.currentImage}`} 
                          alt="Current service" 
                          className="h-20 w-auto rounded"
                        />
                      </div>
                    )}
                    
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      accept="image/*"
                      className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    />
                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Laissez vide pour garder l'image actuelle
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#445EF2] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mise à jour...
                      </>
                    ) : (
                      'Mettre à jour'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    disabled={isSubmitting}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Services Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#010e26] rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-[#666] text-lg">Chargement des services...</p>
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service) => (
                <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="h-40 bg-gray-200 rounded mb-4 overflow-hidden">
                    {service.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${service.image}`}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-500">
                        Pas d'image
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full 
                      ${service.category === 'A' ? 'bg-blue-100 text-blue-800' : 
                        service.category === 'B' ? 'bg-green-100 text-green-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                      {getCategoryName(service.category)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{service.description}</p>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditClick(service)} 
                      className="text-[#445EF2] hover:text-blue-800 px-2 py-1 rounded text-sm font-medium"
                    >
                      Éditer
                    </button>

                    <button 
                      onClick={() => handleDeleteClick(service)} 
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-[#010e26] mb-2">Aucun service trouvé</h3>
              <p className="text-[#666] text-center">
                Vous n'avez pas encore ajouté de services.<br/>
                Cliquez sur "Nouveau Service" pour commencer.
              </p>
            </div>
          )}
        </section>

        {/* Custom Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 m-4 max-w-md w-full transform transition-all">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                  <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-[#010e26] mb-3">
                  Confirmer la suppression
                </h3>
                
                <p className="text-[#666] mb-2">
                  Êtes-vous sûr de vouloir supprimer le service
                </p>
                <p className="text-[#010e26] font-semibold mb-6">
                  "{serviceToDelete?.title}" ?
                </p>
                <p className="text-sm text-red-600 mb-8">
                  Cette action est irréversible.
                </p>
                
                {errors.general && (
                  <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
                    {errors.general}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleCancelDelete}
                    disabled={isDeleting}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-[#666] bg-white hover:bg-gray-50 transition font-medium disabled:opacity-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Suppression...
                      </>
                    ) : (
                      'Supprimer'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}