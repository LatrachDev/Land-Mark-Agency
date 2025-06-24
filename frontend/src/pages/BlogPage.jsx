import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_TEAM,
  ADMIN_PROJECTS,
  ADMIN_BLOG,
  ADMIN_CONTENT,
  ADMIN_INBOX,
} from '../config/routes';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'MARKETING',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();

  const adminCards = [
    {
      title: 'Gestion d\'équipe',
      desc: 'Ajoutez, modifiez ou supprimez les membres de l\'équipe.',
      icon: '👥',
      path: ADMIN_TEAM,
    },
    {
      title: 'Gestion des projets',
      desc: 'Suivez, ajoutez ou archivez les projets de l\'agence.',
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
      title: 'Gestion du Blog',
      desc: 'Ajoutez ou mettez à jour vos blogs.',
      icon: '🖼️',
      path: ADMIN_BLOG,
      active: true
    },
    {
      title: 'Boîte de réception',
      desc: 'Consultez les messages envoyés via le formulaire de contact.',
      icon: '📨',
      path: ADMIN_INBOX,
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
  

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      console.log('rahna hna db');
      const token = localStorage.getItem("token");
      console.log('jbna token');
      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('dzna 3la fetch db');
      
      const data = await response.json();
      
      console.log('hada data dyalna chno fiha', data);

      if (!response.ok) {
        console.error('Erreur de récupération:', data.message || 'Échec de la récupération');
        return;
      }

      setBlogs(data);
    } catch (err) {
      console.error('Erreur lors de la récupération des blogs:', err);
      setErrors({ message: "Erreur lors de la récupération des blogs" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (form.image) formData.append('image', form.image);

    try {
      const token = localStorage.getItem("token");
      let url = 'http://127.0.0.1:8000/api/v1/admin/blogs';
      let method = 'POST';

      if (editingId) {
        url = `http://127.0.0.1:8000/api/v1/admin/blogs/${editingId}`;
        formData.append('_method', 'PUT');
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { message: data.message || "Échec de l'opération" });
        return;
      }

      setForm({ title: '', description: '', category: 'MARKETING', image: null });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Erreur lors de l'opération:", err);
      setErrors({ message: "Erreur lors de l'opération" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      image: null,
    });
    setEditingId(blog.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/blogs/${blogToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { message: data.message || "Échec de la suppression !" });
        return;
      }

      fetchBlogs();
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setErrors({ message: "Erreur lors de la suppression" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
    setErrors({});
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
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
          Gestion des Blogs
        </h1>
        <p className="text-[#666] text-base md:text-lg">
          Gérez les articles et publications de votre blog.
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

      {/* Blog Form */}
      <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-bold text-[#010e26] mb-6">
          {editingId ? 'Modifier un Blog' : 'Ajouter un nouveau Blog'}
        </h2>

        {/* Error Message */}
        {errors.message && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#010e26] mb-2">
              Titre *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Titre"
              value={form.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
              required
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#010e26] mb-2">
              Catégorie *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
            >
              <option value="MARKETING">MARKETING</option>
              <option value="BRANDING">BRANDING</option>
              <option value="CONTENT">CONTENT</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#010e26] mb-2">
              Description *
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
              required
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#010e26] mb-2">
              {editingId ? 'Nouvelle Image (optionnel)' : 'Image *'}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#010e26]`}
              required={!editingId}
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            {editingId && (
              <p className="text-xs text-gray-500 mt-1">
                Laissez vide pour garder l'image actuelle
              </p>
            )}
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
                  {editingId ? 'Mise à jour...' : 'Création...'}
                </>
              ) : (
                editingId ? 'Mettre à jour' : 'Créer le Blog'
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ title: '', description: '', category: 'MARKETING', image: null });
                  setErrors({});
                }}
                disabled={isSubmitting}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Blogs List */}
      <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#010e26]">Liste des Blogs</h2>
        </div>

        {isLoading ? (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-[#010e26] rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-[#666] text-lg">Chargement des blogs...</p>
  </div>
) : blogs && blogs.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {blogs.map((blog) => (
      <div key={blog.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
        <div className="relative pb-[56.25%] bg-gray-100">
          {blog.image && (
            <img
              src={`http://127.0.0.1:8000/storage/${blog.image}`}
              alt={blog.title}
              className="absolute h-full w-full object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{blog.description}</p>
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mb-4">
            {blog.category}
          </span>
          <div className="flex justify-between pt-2 border-t">
            <button
              onClick={() => handleEdit(blog)}
              className="text-[#445EF2] hover:text-blue-800 px-2 py-1 rounded text-sm font-medium"
            >
              Éditer
            </button>
            <button
              onClick={() => handleDeleteClick(blog)}
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
    <div className="text-6xl mb-4">📝</div>
    <h3 className="text-xl font-bold text-[#010e26] mb-2">Aucun blog trouvé</h3>
    <p className="text-[#666] text-center">
      Vous n'avez pas encore ajouté de blogs.<br/>
      Remplissez le formulaire ci-dessus pour commencer.
    </p>
  </div>
)}
      </section>

      {/* Delete Confirmation Modal */}
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
                Êtes-vous sûr de vouloir supprimer le blog
              </p>
              <p className="text-[#010e26] font-semibold mb-6">
                "{blogToDelete?.title}" ?
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
  );
}