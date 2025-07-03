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
  const videoRefs = useRef([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = selectedProject?.description?.length > 150;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/portfolio`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.allProjects);
        setContents(data.contents);
      })
      .catch(error => {
        console.error('Failed to fetch portfolio data:', error);
      });
  }, []);

  const handlePlay = (index) => {
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      videoRefs.current[currentlyPlaying]?.pause();
    }
    setCurrentlyPlaying(index);
  };

  const handlePause = (index) => {
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null);
    }
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const formatViewCount = (count) => {
    if (!count) return '0';
    
    if (count >= 1000000000) {
      return `+${(count / 1000000000).toFixed(1)}b`;
    }
    if (count >= 1000000) {
      return `+${(count / 1000000).toFixed(1)}m`;
    }
    if (count >= 1000) {
      return `+${(count / 1000).toFixed(1)}k`;
    }
    return `+${count}`;
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
      {/* Background with gradient overlay */}
      <div 
        className="absolute top-0 left-0 w-full bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,1) 100%), url(${WebSiteBG})`,
          backgroundPosition: 'left 0px top -100px',
          height: '40%'
        }}
      ></div>
      
      <Helmet>
        <title>Portfolio | LandMark</title>
        <meta name="description" content="Discover our creative work and successful projects in branding, web development, and marketing at LandMark." />
      </Helmet>
      
      <Promotion />
      <Nav />

      <div className="relative z-10">
        {/* Main Section */}
        <section className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%] m-auto">
          <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
            Découvrez ce qu'on a réalisé pour eux… et ce qu'on peut faire pour vous
          </h1>
          <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-sm tracking-normal">
            Faites comme eux, choisissez l'excellence et rejoignez une communauté qui nous fait confiance pour transformer leurs ambitions en réussites.
          </p>
        </section>
    
        {/* Projects Grid */}
        <section className="mx-auto px-4 sm:px-10 py-16 ">
          <div className="container w-[90%] m-auto">
            {/* Section Title */}
            <div className="text-xl sm:text-2xl font-bold text-left text-[#263973] uppercase mb-6" style={{ fontFamily: 'bodoni' }}>
              <h2 className="">BRAND design</h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const imageUrl = `https://api.landmark.ma/public/storage/${project.image}`;

                return (
                  <div key={index} className="flex flex-col mb-10 group">
                    {/* Image with hover effect */}
                    <div 
                      className="mb-4 rounded-lg overflow-hidden aspect-square bg-gray-100 relative cursor-pointer"
                      onClick={() => openProjectModal(project)}
                    >
                      <img 
                        src={imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover absolute inset-0 transition-all duration-300" 
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg">
                          Voir les détails
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm sm:text-xl font-bold font-['Jost'] mb-2">
                      {project.title}
                    </h3>
                    <p className="font-['Jost'] text-sm sm:text-base font-normal text-[#010E26] mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost'] mb-4">
                      {project.view_percent}% <br /> <span className='text-[#010E26] text-xs font-light w-[30%]'>Website views after rebranding</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <Services />
        
        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-start justify-center z-50 pt-10 pb-10 overflow-y-auto">
            <div className="bg-white rounded-lg w-[90%] max-w-6xl relative max-h-screen overflow-hidden">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-white px-6 py-2 border-b flex justify-between items-start z-10">
                <div className="w-full">
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>

                  {/* Description with "Lire la suite" */}
                  <div className="mt-2 text-gray-600">
                    <p className={`transition-all ${!isExpanded && isLongDescription ? 'line-clamp-3 sm:line-clamp-none' : ''}`}>
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
                  className="text-gray-500 hover:text-gray-700 text-2xl ml-4"
                >
                  &times;
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-160px)]">
                <img
                  src={`https://api.landmark.ma/public/storage/${selectedProject.landing}`}
                  alt={selectedProject.title}
                  className="w-full h-auto mb-6 rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <section className="px-4 sm:px-10 py-16 bg-white">
          <div className="container w-[90%] mx-auto">
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl text-[#263973] uppercase font-bold text-left" style={{ fontFamily: 'bodoni' }}>
                CONTENT CREATION
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contents.map((item, index) => {
                const videoUrl = `https://api.landmark.ma/public/storage/${item.video}`;
                const thumbnailUrl = `https://api.landmark.ma/public/storage/${item.thumbnail}`;

                return (
                  <div key={index} className="flex flex-col mb-5">
                    <div className="mb-6 relative w-full aspect-video">
                      <video
                        ref={el => videoRefs.current[index] = el}
                        id={`video-${index}`}
                        className="w-full h-full object-cover rounded-lg"
                        poster={thumbnailUrl}
                        controls
                        onPlay={() => handlePlay(index)}
                        onPause={() => handlePause(index)}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {currentlyPlaying !== index && (
                        <>
                          <img
                            id={`thumb-${index}`}
                            src={thumbnailUrl}
                            alt="Content Thumbnail"
                            className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer rounded-lg"
                            onClick={() => {
                              videoRefs.current[index].play();
                            }}
                          />

                          <div
                            id={`icon-${index}`}
                            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                            onClick={() => {
                              videoRefs.current[index].play();
                            }}
                          >
                            <svg
                              className="w-16 h-16 text-white opacity-80 hover:scale-110 transition-transform drop-shadow-lg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-xl font-bold font-['Jost'] mb-3">{item.title}</h3>
                    <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost']">
                      {formatVideoViews(item.views)} <span className='text-sm'>views</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </div>
  );
}