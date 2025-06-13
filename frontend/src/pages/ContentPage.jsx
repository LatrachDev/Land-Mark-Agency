import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_PORTFOLIO, ADMIN_CONTENT } from '../config/routes';

export default function ContentPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
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
      active: true
    },
    {
      title: 'Gestion du portfolio',
      desc: 'Ajoutez ou mettez à jour vos réalisations.',
      icon: '🖼️',
      path: ADMIN_PORTFOLIO,
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
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <section className="w-[90%] m-auto mt-10 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#010e26] uppercase tracking-wide mb-4">
            Création de Contenu
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Gérez les articles, textes et médias publiés sur votre site.
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
            <h2 className="text-xl font-bold text-[#010e26]">Contenu du Site</h2>
            <div className="flex space-x-3">
              <button className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition">
                + Nouvel Article
              </button>
              <button className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition">
                + Nouvelle Page
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière modification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { title: 'À propos de nous', type: 'Page', status: 'Publié', date: '2023-05-15' },
                  { title: 'Nos services', type: 'Page', status: 'Publié', date: '2023-06-20' },
                  { title: 'Comment choisir une agence', type: 'Article', status: 'Brouillon', date: '2023-07-01' },
                  { title: 'Tendances design 2023', type: 'Article', status: 'Publié', date: '2023-04-10' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Éditer</button>
                      <button className="text-red-600 hover:text-red-900">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}