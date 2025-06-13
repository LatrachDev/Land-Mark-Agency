import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_PORTFOLIO, ADMIN_CONTENT } from '../config/routes';

export default function PortfolioPage() {
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
    },
    {
      title: 'Gestion du portfolio',
      desc: 'Ajoutez ou mettez à jour vos réalisations.',
      icon: '🖼️',
      path: ADMIN_PORTFOLIO,
      active: true
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
        <title>Gestion du Portfolio | LandMark</title>
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
            Gestion du Portfolio
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Ajoutez ou mettez à jour vos réalisations.
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

        {/* Portfolio Content */}
        <section className="w-[90%] m-auto bg-white rounded-2xl shadow-md p-6 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#010e26]">Projets du Portfolio</h2>
            <button className="bg-[#010e26] text-white px-4 py-2 rounded-lg hover:bg-[#081d45] transition">
              + Ajouter un Projet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image du projet</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Projet {item}</h3>
                  <p className="text-sm text-gray-600 mb-3">Catégorie: Branding</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item % 2 === 0 ? 'Publié' : 'En attente'}
                    </span>
                    <div>
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Éditer</button>
                      <button className="text-red-600 hover:text-red-800">Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}