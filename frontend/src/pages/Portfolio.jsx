import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Services from '../components/Services';
import { Helmet } from "react-helmet";
import { useEffect, useState, useRef } from 'react';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [contents, setContents] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/portfolio')
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
    // Pause the currently playing video if there is one
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      videoRefs.current[currentlyPlaying]?.pause();
    }
    // Set the new currently playing video
    setCurrentlyPlaying(index);
  };

  const handlePause = (index) => {
    // If the paused video was the currently playing one, clear the state
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | LandMark</title>
        <meta name="description" content="Discover our creative work and successful projects in branding, web development, and marketing at LandMark." />
      </Helmet>
      
      <section className="font-['Jost']">
        {/* Banner Promotion */}
        <Promotion />

        {/* Navbar */}
        <Nav />

        {/* Main Section */}
        <section className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%] m-auto">
          <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
            <span className="text-[#445ef2]">93%</span> de nos clients se disent <br />
            pleinement satisfaits et prêts à <br />
            recommander nos services
          </h1>
          <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
            Faites comme eux, choisissez l'excellence et rejoignez une communauté <br />
            qui nous fait confiance pour transformer leurs ambitions en réussites.
          </p>
        </section>

        {/* Services Section */}
        <Services />
        
        {/* Projects Grid */}
        <section className="mx-auto px-4 sm:px-10 py-16 bg-white">
          <div className="container w-[90%] m-auto">
            {/* Section Title */}
            <div className="text-sm sm:text-xl text-left text-[#263973] uppercase mb-6" style={{ fontFamily: 'BioRhyme_Expanded' }}>
              <h2 className="">PROJECT HIGHLIGHTS</h2>
              <p className="">"CASE STUDIES"</p>
            </div>

            {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const imageUrl = `http://127.0.0.1:8000/storage/${project.image}`;

              return (
                <div key={index} className="flex flex-col mb-10">
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={imageUrl} alt="Project image" className="w-full" />
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold font-['Jost'] mb-2">
                    {project.title}
                  </h3>
                  <p className="font-['Jost'] text-sm sm:text-base font-normal text-[#010E26] mb-3">
                    {project.description}
                  </p>
                  <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost']">
                    {project.view_percent} <span className='text-sm'>views</span>
                  </p>
                </div>
              );
            })}
          </div>

          </div>
        </section>
        
        {/* Content */}
        <section className="px-4 sm:px-10 py-16 bg-white">
          <div className="container w-[90%] mx-auto">
            <div className="mb-12">
              <h2 className="text-sm sm:text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
                CONTENT CREATION
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contents.map((item, index) => {
                const videoUrl = `http://127.0.0.1:8000/storage/${item.video}`;
                const thumbnailUrl = `http://127.0.0.1:8000/storage/${item.thumbnail}`;

                const formatViews = (num) => {
                  const n = Number(num);
                  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
                  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
                  return n.toString();
                };

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

                      {/* Thumbnail overlay - only shown when video is not playing */}
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

                          {/* Play Icon */}
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
                      {formatViews(item.views)} <span className='text-sm'>views</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </section>
    </>
  );
}