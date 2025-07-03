import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Services from '../components/Services';
import { Helmet } from "react-helmet";
import { useEffect, useState, useRef } from 'react';
import WebSiteBG from '../assets/BG/maskBg.png';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [contents, setContents] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const videoRefs = useRef([]);
  const modalRef = useRef(null);

  const isLongDescription = selectedProject?.description?.length > 150;

  // Handle viewport height (mobile safe zone)
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    const handleVisualViewportChange = () => {
      if (window.visualViewport) setViewportHeight(window.visualViewport.height);
    };

    window.addEventListener('resize', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      }
    };
  }, []);

  // Fetch project and content data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/portfolio`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.allProjects);
        setContents(data.contents);
      })
      .catch(console.error);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    };
  }, [selectedProject]);

  const openProjectModal = (project) => setSelectedProject(project);
  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsExpanded(false);
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeProjectModal();
    }
  };

  const handlePlay = (index) => {
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      videoRefs.current[currentlyPlaying]?.pause();
    }
    setCurrentlyPlaying(index);
  };

  const handlePause = (index) => {
    if (currentlyPlaying === index) setCurrentlyPlaying(null);
  };

  const formatVideoViews = (num) => {
    const n = Number(num);
    if (n >= 1000000000) return `+${(n / 1000000000).toFixed(1)}b`;
    if (n >= 1000000) return `+${(n / 1000000).toFixed(1)}m`;
    if (n >= 1000) return `+${(n / 1000).toFixed(1)}k`;
    return `+${n}`;
  };

  return (
    <div className="font-['Jost'] relative min-h-screen">
      <Helmet>
        <title>Projets | LandMark</title>
        <meta name="description" content="Discover our creative work and successful projects in branding, web development, and marketing at LandMark." />
      </Helmet>

      {!selectedProject && (
        <>
          {/* Background */}
          <div
            className="absolute top-0 left-0 w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,1) 100%), url(${WebSiteBG})`,
              backgroundPosition: 'left 0px top -100px',
              height: '40%'
            }}
          ></div>

          <Promotion />
          <Nav />

          <div className="relative z-10">
            {/* Brand Design Section */}
            <section className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%] m-auto">
              <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
                Découvrez ce qu'on a réalisé pour eux… et ce qu'on peut faire pour vous
              </h1>
              <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-sm tracking-normal">
                Faites comme eux, choisissez l'excellence...
              </p>
            </section>

            <section className="mx-auto px-4 sm:px-10 py-16">
              <div className="container w-[90%] m-auto">
                <div className="text-xl sm:text-2xl font-bold text-left text-[#263973] uppercase mb-6" style={{ fontFamily: 'bodoni' }}>
                  <h2>BRAND design</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <div key={index} className="flex flex-col mb-10 group">
                      <div
                        className="mb-4 rounded-lg overflow-hidden aspect-square bg-gray-100 relative cursor-pointer"
                        onClick={() => openProjectModal(project)}
                      >
                        <img
                          src={`https://api.landmark.ma/public/storage/${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover absolute inset-0 transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg">
                            Voir les détails
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-xl font-bold font-['Jost'] mb-2">{project.title}</h3>
                      <p className="font-['Jost'] text-sm sm:text-base text-[#010E26] mb-3 line-clamp-2">{project.description}</p>
                      <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost'] mb-4">
                        {project.view_percent}% <br />
                        <span className='text-[#010E26] text-xs font-light'>Website views after rebranding</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Services />
            <Contact />
            <Footer />
          </div>
        </>
      )}

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
          style={{
            height: `${viewportHeight}px`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 'auto',
            padding: '1rem',
            boxSizing: 'border-box'
          }}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-6xl relative overflow-hidden flex flex-col"
            style={{
              maxHeight: `${viewportHeight - 32}px`,
              height: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-start z-10 flex-shrink-0">
              <div className="flex-1 pr-4">
                <h2 className="text-xl sm:text-2xl font-bold">{selectedProject.title}</h2>
                <div className="mt-2 text-gray-600">
                  <p className={`text-sm sm:text-base transition-all ${!isExpanded && isLongDescription ? 'line-clamp-3 sm:line-clamp-none' : ''}`}>
                    {selectedProject.description}
                  </p>
                  {isLongDescription && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-[#445EF2] text-sm mt-1 sm:hidden"
                    >
                      {isExpanded ? 'Show less' : 'Lire la suite'}
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={closeProjectModal}
                className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl flex-shrink-0"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              <img
                src={`https://api.landmark.ma/public/storage/${selectedProject.landing}`}
                alt={selectedProject.title}
                className="w-full h-auto mb-6 rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
