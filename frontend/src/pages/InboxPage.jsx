import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_BLOG, ADMIN_CONTENT, ADMIN_SERVICES } from '../config/routes';
import { useEffect, useState } from 'react';
import MessageModal from '../components/MessageModal';

export default function InboxPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [modalMessage, setModalMessage] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
    }
  }, [navigate]);


  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessages(data.data || []);
        // console.log("hahia data dyal contact: ", data.data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleSelectMessage = (id) => {
    setSelectedMessages(prev => 
      prev.includes(id) 
        ? prev.filter(msgId => msgId !== id) 
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map(msg => msg.id));
    }
  };

  const handleViewMessage = async (message) => {
    setModalMessage(message);
    setSelectedMessages([]); // Deselect on view

    // Mark as read only if it's unread
    if (!message.read_at) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/contacts/mark-as-read/`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: [message.id] })
        });
        fetchMessages(); // Refresh list to update read status
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
  }
  };


  const markAsRead = async (ids) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/contacts/mark-as-read/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      });
      fetchMessages();
      setSelectedMessages([]); // Clear selection after marking as read
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteMessages = async (ids) => {
  try {
    const token = localStorage.getItem("token");

    if (ids.length === 1) {
      // DELETE a single message using destroy()
    
      await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/contacts/${ids[0]}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } else {
      // DELETE multiple messages
      await fetch(`${import.meta.env.VITE_API_BASE_URL_V1}/admin/contacts/delete-multiple`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      });
    }

    fetchMessages();
    setSelectedMessages([]);
  } catch (error) {
    console.error('Error deleting messages:', error);
  }
  };

  const adminCards = [
    {
      title: 'Gestion d’équipe',
      desc: 'Ajoutez, modifiez ou supprimez les membres de l’équipe.',
      icon: '👥',
      path: ADMIN_TEAM,
    },
    {
      title: 'Gestion des projets',
      desc: 'Suivez, ajoutez ou archivez les projets de l’agence.',
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
      active: true
    },
    {
      title: 'Gestion des services',
      desc: 'Ajoutez, modifiez ou supprimez les services proposés par l\'agence.',
      icon: '🛠️',
      path: ADMIN_SERVICES,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Boîte de Réception | LandMark</title>
      </Helmet>

      <div className="font-['Jost'] bg-[#f5f7fa] min-h-screen">

        {/* Modal popup */}
        {modalMessage && (
          <MessageModal 
            message={modalMessage} 
            onClose={() => setModalMessage(null)} 
          />
        )}

        {/* Header */}
        <div className="w-[90%] m-auto pt-10 flex justify-between items-center">
          <img
            src={'/assets/Main-DSltj7B2.png'} 
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
            Boîte de Réception
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Consultez les messages envoyés via le formulaire de contact.
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

        {/* Inbox Content */}
        <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#010e26]">Messages Reçus</h2>
            <div className="flex space-x-3">
              <button 
                onClick={() => markAsRead(selectedMessages)}
                disabled={selectedMessages.length === 0}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
              >
                Marquer comme lu
              </button>
              <button 
                onClick={() => deleteMessages(selectedMessages)}
                disabled={selectedMessages.length === 0}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
              >
                Supprimer sélection
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#010e26]"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucun message trouvé
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input 
                        type="checkbox" 
                        checked={selectedMessages.length === messages.length && messages.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intérêts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message) => (
                    <tr key={message.id} className={message.read_at ? '' : 'bg-blue-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedMessages.includes(message.id)}
                          onChange={() => toggleSelectMessage(message.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{message.full_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{message.phone_number || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{message.company_name || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 truncate max-w-xs">{message.message}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Array.isArray(message.interests)
                          ? message.interests.map((interest, i) => (
                              <span
                                key={i}
                                className="inline-block bg-[#445EF2] text-white text-xs font-medium mr-2 px-2 py-1 rounded"
                              >
                                {interest}
                              </span>
                            ))
                          : '-'}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        
                        <button onClick={() => handleViewMessage(message)} className="text-[#445EF2] hover:text-blue-900 mr-3">
                          Voir
                        </button>

                        <button 
                          onClick={() => deleteMessages([message.id])}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
