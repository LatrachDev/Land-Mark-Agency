import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Services from '../components/Services';
import SEOHead from '../components/SEOHead';
import { useEffect, useState, useRef } from 'react';
import WebSiteBG from '../assets/BG/maskBg.png';

// VideoCard Component
const VideoCard = ({ videoUrl, onVideoPlay, thumbnailUrl, title, views }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const showControls = () => {
      video.controls = true;
      setIsPlaying(true);
    };

    const hideControls = () => {
      video.controls = false;
      setIsPlaying(false);
    };

    const handleFullscreenChange = () => {
      if (video) {
        if (document.fullscreenElement) {
          video.style.objectFit = 'contain';
          video.style.backgroundColor = 'black';
        } else {
          video.style.objectFit = 'contain';
          video.style.backgroundColor = 'transparent';
        }
      }
    };

    if (video) {
      video.controls = false;
      video.addEventListener('play', showControls);
      video.addEventListener('pause', hideControls);
      video.addEventListener('ended', hideControls);
      video.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    return () => {
      if (video) {
        video.removeEventListener('play', showControls);
        video.removeEventListener('pause', hideControls);
        video.removeEventListener('ended', hideControls);
        video.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const handleVideoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const video = videoRef.current;
    
    if (video && video.paused) {
      onVideoPlay(videoRef);
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    } else if (video && isPlaying) {
      video.pause();
    }
  };

  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleVideoClick(e);
  };

  const pauseVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pauseVideo = pauseVideo;
    }
  }, []);

  const formatViews = (num) => {
    const n = Number(num);
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return n.toString();
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8 relative group">
        {!isPlaying && thumbnailUrl && (
          <div className="absolute inset-0 z-10">
            <img 
              src={thumbnailUrl} 
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-auto object-contain cursor-pointer"
          onClick={handleVideoClick}
          playsInline
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          poster={thumbnailUrl}
        >
          Your browser does not support the video tag.
        </video>
        
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ display: isPlaying ? 'none' : 'flex' }}
        >
          <div 
            className="pointer-events-auto cursor-pointer p-4"
            onClick={handlePlayButtonClick}
          >
            <svg
              className="w-16 h-16 text-white opacity-80 hover:scale-110 transition-transform drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold font-['Jost'] mb-3">{title}</h3>
      <div>
        <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost']">
          {formatViews(views)} <span className='text-sm'>views</span>
        </p>
      </div>
    </div>
  );
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [contents, setContents] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const videoRefs = useRef([]);
  const modalRef = useRef(null);
  const activeVideoRef = useRef(null);

  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio LandMark Agency",
    "description": "Découvrez notre portfolio de projets marketing digital et créations visuelles réalisés au Maroc",
    "url": "https://landmark.ma/portfolio",
    "mainEntity": {
      "@type": "ItemList", 
      "name": "Projets Portfolio",
      "numberOfItems": projects.length,
      "itemListElement": projects.map((project, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": project.title,
        "description": project.description,
        "image": `https://api.landmark.ma/public/storage/${project.image}`,
        "creator": {
          "@type": "Organization",
          "name": "LandMark Agency"
        },
        "url": `https://landmark.ma/portfolio#project-${project.id}`
      }))
    }
  };

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

  const handleVideoPlay = (newVideoRef) => {
    if (activeVideoRef.current && activeVideoRef.current !== newVideoRef.current) {
      activeVideoRef.current.pause();
    }
    activeVideoRef.current = newVideoRef.current;
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
      <SEOHead 
        title="Portfolio LandMark - Projets Marketing Digital & Branding Maroc"
        description="Découvrez notre portfolio de projets marketing digital et branding au Maroc. Réalisations créatives pour des marques ambitieuses à Oujda, Casablanca, Tanger : sites web, identités visuelles, contenus créatifs."
        keywords="portfolio marketing digital maroc, projets branding maroc, réalisations créatives, portfolio agence web maroc, projets LandMark, créations visuelles maroc, design graphique portfolio"
        ogUrl="https://landmark.ma/portfolio"
        canonical="/portfolio"
        structuredData={portfolioStructuredData}
      />

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
              <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-sm md:text-xl tracking-normal">
                Faites comme eux, choisissez l’excellence et rejoignez une communauté qui nous fait confiance pour transformer leurs ambitions en réussites.
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

            {/* Content Section */}
            <section className="px-4 sm:px-10 py-16 bg-white">
              <div className="container w-[90%] mx-auto">
                <div className="mb-12">
                  <h2
                    className="text-xl sm:text-2xl text-[#263973] font-bold uppercase text-left"
                    style={{ fontFamily: 'bodoni' }}
                  >
                    Création de contenu
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {contents.map((content, index) => (
                    <VideoCard 
                      key={content.id}
                      videoUrl={`https://api.landmark.ma/public/storage/${content.video}`}
                      thumbnailUrl={`https://api.landmark.ma/public/storage/${content.thumbnail}`}
                      title={content.title}
                      views={content.views}
                      onVideoPlay={handleVideoPlay}
                    />
                  ))}
                </div>
              </div>
            </section>
           
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