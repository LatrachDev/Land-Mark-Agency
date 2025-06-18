import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_BLOG, ADMIN_CONTENT } from '../config/routes';
import { useEffect, useState, useRef } from 'react';

export default function ContentPage() {
  const [contents, setContents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);
  const [contentToEdit, setContentToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const videoRefs = useRef({});
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    views: '',
    video: null,
    thumbnail: null
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/contents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erreur de récupération:', data.message || 'Échec de la récupération');
        return;
      }

      setContents(data);
      console.log('Contenus récupérés:', data);

    } catch (err) {
      console.error('Erreur lors de la récupération des contenus:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const formatViews = (views) => {
    if (!views) return '0 vues';
    const num = parseInt(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}m vues`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k vues`;
    }
    return `${num} vues`;
  };

  const handleDeleteClick = (content) => {
    setContentToDelete(content);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!contentToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/contents/${contentToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || { message: data.message || "Échec de la suppression !" });
        return;
      }

      fetchContents();
      setShowDeleteModal(false);
      setContentToDelete(null);
      setErrors({});
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setErrors({ message: "Erreur lors de la suppression" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setContentToDelete(null);
    setErrors({});
  };

  const handleCreateClick = () => {
    setFormData({
      title: '',
      views: '',
      video: null,
      thumbnail: null
    });
    setShowCreateForm(true);
    setErrors({});
  };

  const handleEditClick = (content) => {
    setContentToEdit(content);
    setFormData({
      title: content.title,
      views: content.views,
      video: null,
      thumbnail: null
    });
    setShowUpdateForm(true);
    setErrors({});
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
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('views', formData.views);
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      } else {
        setErrors(prev => ({ ...prev, video: 'Veuillez sélectionner une vidéo' }));
        return;
      }
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      } else {
        setErrors(prev => ({ ...prev, thumbnail: 'Veuillez sélectionner une miniature' }));
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/contents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { message: data.message || "Échec de la création !" });
        return;
      }

      fetchContents();
      setShowCreateForm(false);
      setFormData({
        title: '',
        views: '',
        video: null,
        thumbnail: null
      });
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      setErrors({ message: "Erreur lors de la création" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!contentToEdit) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('views', formData.views);
      formDataToSend.append('_method', 'PUT');
      
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      }
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }

      const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/contents/${contentToEdit.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { message: data.message || "Échec de la mise à jour !" });
        return;
      }

      fetchContents();
      setShowUpdateForm(false);
      setContentToEdit(null);
      setFormData({
        title: '',
        views: '',
        video: null,
        thumbnail: null
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setErrors({ message: "Erreur lors de la mise à jour" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setContentToEdit(null);
    setFormData({
      title: '',
      views: '',
      video: null,
      thumbnail: null
    });
    setErrors({});
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const togglePlayVideo = (contentId) => {
    if (playingVideoId === contentId) {
      // Pause the currently playing video
      if (videoRefs.current[contentId]) {
        videoRefs.current[contentId].pause();
      }
      setPlayingVideoId(null);
    } else {
      // Pause any currently playing video
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        videoRefs.current[playingVideoId].pause();
      }
      
      // Play the new video
      if (videoRefs.current[contentId]) {
        videoRefs.current[contentId].play()
          .then(() => setPlayingVideoId(contentId))
          .catch(err => console.error("Error playing video:", err));
      }
    }
  };

  const handleVideoEnded = (contentId) => {
    setPlayingVideoId(null);
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
      desc: 'Gérez les vidéos et reels publiés.',
      icon: '✍️',
      path: ADMIN_CONTENT,
      active: true
    },
    {
      title: 'Gestion du portfolio',
      desc: 'Ajoutez ou mettez à jour vos réalisations.',
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
        <title>Création de Contenu | LandMark</title>
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
            Gestion des Reels
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Gérez les vidéos et reels publiés sur votre site.
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

        {/* Content Management */}
        <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#010e26]">Liste des Reels</h2>
            
            <button 
              onClick={handleCreateClick} 
              className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition"
            >
              + Nouveau Reel
            </button>
          </div>

          {/* Error Message */}
          {errors.message && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.message}
            </div>
          )}

          {/* Create Form */}
          {showCreateForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
              <h3 className="text-lg font-bold text-[#010e26] mb-4">Ajouter un nouveau reel</h3>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Entrez le titre du reel"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Nombre de vues *
                  </label>
                  <input
                    type="number"
                    name="views"
                    value={formData.views}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border ${errors.views ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Entrez le nombre de vues"
                  />
                  {errors.views && <p className="mt-1 text-sm text-red-600">{errors.views}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Vidéo *
                    </label>
                    <input
                      type="file"
                      name="video"
                      onChange={handleInputChange}
                      accept="video/*"
                      required
                      className={`w-full px-3 py-2 border ${errors.video ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    />
                    {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Miniature *
                    </label>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleInputChange}
                      accept="image/*"
                      required
                      className={`w-full px-3 py-2 border ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    />
                    {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
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
                      'Créer le reel'
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
          {showUpdateForm && contentToEdit && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-[#010e26] mb-4">
                Modifier le reel: {contentToEdit.title}
              </h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Entrez le titre du reel"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#010e26] mb-2">
                    Nombre de vues *
                  </label>
                  <input
                    type="number"
                    name="views"
                    value={formData.views}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border ${errors.views ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
                    placeholder="Entrez le nombre de vues"
                  />
                  {errors.views && <p className="mt-1 text-sm text-red-600">{errors.views}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Nouvelle vidéo (optionnel)
                    </label>
                    <input
                      type="file"
                      name="video"
                      onChange={handleInputChange}
                      accept="video/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Laissez vide pour garder la vidéo actuelle
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#010e26] mb-2">
                      Nouvelle miniature (optionnel)
                    </label>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Laissez vide pour garder la miniature actuelle
                    </p>
                  </div>
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

          {/* Contents Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#010e26] rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-[#666] text-lg">Chargement des reels...</p>
            </div>
          ) : contents.data && contents.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.data?.map((content) => (
                <div key={content.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="relative pb-[125%] bg-black rounded mb-4 overflow-hidden">
                    {/* Video Element (hidden when not playing) */}
                    <video
                      ref={el => videoRefs.current[content.id] = el}
                      src={content.video ? `http://127.0.0.1:8000/storage/${content.video}` : ''}
                      className={`absolute h-full w-full object-contain bg-black ${playingVideoId === content.id ? 'block' : 'hidden'}`}
                      onClick={() => togglePlayVideo(content.id)}
                      onEnded={() => handleVideoEnded(content.id)}
                      controls={playingVideoId === content.id}
                    />
                    
                    {/* Thumbnail (hidden when video is playing) */}
                    {playingVideoId !== content.id && (
                      <>
                        {content.thumbnail ? (
                          <img
                            src={`http://127.0.0.1:8000/storage/${content.thumbnail}`}
                            alt={content.title}
                            className="absolute h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute h-full w-full flex items-center justify-center text-gray-300">
                            Pas de miniature
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={() => togglePlayVideo(content.id)}
                            className="bg-black bg-opacity-50 rounded-full p-3 text-white hover:bg-opacity-70 transition"
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{content.title}</h3>
                      <p className="text-sm text-gray-600">{formatViews(content.views)}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClick(content)} 
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded text-sm font-medium"
                      >
                        Éditer
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(content)} 
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
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-bold text-[#010e26] mb-2">Aucun reel trouvé</h3>
              <p className="text-[#666] text-center">
                Vous n'avez pas encore ajouté de reels.<br/>
                Cliquez sur "Nouveau Reel" pour commencer.
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
                  Êtes-vous sûr de vouloir supprimer le reel
                </p>
                <p className="text-[#010e26] font-semibold mb-6">
                  "{contentToDelete?.title}" ?
                </p>
                <p className="text-sm text-red-600 mb-8">
                  Cette action est irréversible.
                </p>
                
                {errors.message && (
                  <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {errors.message}
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