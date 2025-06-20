import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_BLOG, ADMIN_CONTENT } from '../config/routes';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    view_percent: 0,
    image: null,
    landing: null
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/projects', {
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
        return;
      }

      setProjects(data);
      console.log('Fetched projects:', data);

    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/projects/${projectToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Suppression échouée !");
        return;
      }

      fetchProjects();
      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleCreateClick = () => {
    setFormData({
      title: '',
      description: '',
      view_percent: 0,
      image: null,
      landing: null
    });
    setShowCreateForm(true);
  };

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setFormData({
      title: project.title,
      description: project.description,
      view_percent: project.view_percent,
      image: null,
      landing: null
    });
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
        [name]: type === 'number' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('view_percent', formData.view_percent);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      if (formData.landing) {
        formDataToSend.append('landing', formData.landing);
      }

      console.log('Image file:', formData.image);

      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Création échouée !");
        return;
      }

      fetchProjects();
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        view_percent: 0,
        image: null
      });
    } catch (err) {
      console.error("Erreur lors de la création :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!projectToEdit) return;
    
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('view_percent', formData.view_percent);
      formDataToSend.append('_method', 'PUT');
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (formData.landing) {
        formDataToSend.append('landing', formData.landing);
      }

      const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/projects/${projectToEdit.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || "Mise à jour échouée !");
        return;
      }

      fetchProjects();
      setShowUpdateForm(false);
      setProjectToEdit(null);
      setFormData({
        title: '',
        description: '',
        view_percent: 0,
        image: null
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setProjectToEdit(null);
    setFormData({
      title: '',
      description: '',
      view_percent: 0,
      image: null
    });
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
      active: true
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
  ];

  return (
    <>
      <Helmet>
        <title>Gestion des Projets | LandMark</title>
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
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <section className="w-[90%] m-auto mt-10 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#010e26] uppercase tracking-wide mb-4">
            Gestion des Projets
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Suivez, ajoutez ou archivez les projets de l'agence.
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

        {/* Projects Content */}
        <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#010e26]">Liste des Projets</h2>
            
            <button 
              onClick={handleCreateClick} 
              className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition"
            >
              + Nouveau Projet
            </button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
              <h3 className="text-lg font-bold text-[#010e26] mb-4">Créer un nouveau projet</h3>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Titre du projet *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                      placeholder="Entrez le titre du projet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Pourcentage de vues ({formData.view_percent}%)
                    </label>
                    <input
                      type="range"
                      name="view_percent"
                      min="0"
                      max="100"
                      value={formData.view_percent}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                    placeholder="Décrivez le projet..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Image du projet *
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Image Landing *
                  </label>
                  <input
                    type="file"
                    name="landing"
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                  />
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
                      'Créer le projet'
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
          {showUpdateForm && projectToEdit && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-[#010e26] mb-4">
                Modifier le projet: {projectToEdit.title}
              </h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Titre du projet *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                      placeholder="Entrez le titre du projet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Pourcentage de vues ({formData.view_percent}%)
                    </label>
                    <input
                      type="range"
                      name="view_percent"
                      min="0"
                      max="100"
                      value={formData.view_percent}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                    placeholder="Décrivez le projet..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Nouvelle image (optionnel)
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Laissez vide pour garder l'image actuelle
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Nouvelle image Landing (optionnel)
                  </label>
                  <input
                    type="file"
                    name="landing"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Laissez vide pour garder l'image actuelle
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
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

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#010e26] rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-[#666] text-lg">Chargement des projets...</p>
            </div>
          ) : projects.data && projects.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.data?.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="h-40 bg-gray-200 rounded mb-4 overflow-hidden">
                    <img
                      src={`http://127.0.0.1:8000/storage/${project.image}`}
                      alt={`Projet ${project.id}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {project.view_percent}%
                      </span>
                      <span className="text-xs ml-2 text-gray-500">Website views</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClick(project)} 
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded text-sm font-medium"
                      >
                        Éditer
                      </button>

                      <button 
                        onClick={() => handleDeleteClick(project)} 
                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded text-sm font-medium"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-bold text-[#010e26] mb-2">Aucun projet trouvé</h3>
              <p className="text-[#666] text-center">
                Vous n'avez pas encore créé de projets.<br/>
                Cliquez sur "Nouveau Projet" pour commencer.
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
                  Êtes-vous sûr de vouloir supprimer le projet
                </p>
                <p className="text-[#010e26] font-semibold mb-6">
                  "{projectToDelete?.title}" ?
                </p>
                <p className="text-sm text-red-600 mb-8">
                  Cette action est irréversible.
                </p>
                
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