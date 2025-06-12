import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const cards = [
    {
      title: 'Gestion d’équipe',
      desc: 'Ajoutez, modifiez ou supprimez les membres de l’équipe.',
      icon: '👥',
      path: '/admin/team',
    },
    {
      title: 'Gestion des projets',
      desc: 'Suivez, ajoutez ou archivez les projets de l’agence.',
      icon: '📁',
      path: '/admin/projects',
    },
    {
      title: 'Création de contenu',
      desc: 'Gérez les articles, textes, et médias publiés.',
      icon: '✍️',
      path: '/admin/content',
    },
    {
      title: 'Gestion du portfolio',
      desc: 'Ajoutez ou mettez à jour vos réalisations.',
      icon: '🖼️',
      path: '/admin/portfolio',
    },
    {
      title: 'Boîte de réception',
      desc: 'Consultez les messages envoyés via le formulaire de contact.',
      icon: '📨',
      path: '/admin/inbox',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | LandMark</title>
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
        <section className="w-[90%] m-auto mt-20 mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-[#010e26] uppercase tracking-wide mb-4">
            Welcome back Haytham !
          </h1>
          <p className="text-[#666] text-base md:text-lg">
            Gérez facilement votre contenu, votre équipe, vos projets et plus encore.
          </p>
        </section>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] m-auto mb-20">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-[#010e26] mb-2 uppercase">
                {card.title}
              </h3>
              <p className="text-sm text-[#666]">{card.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
