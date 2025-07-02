import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [threeProjects, setThreeProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = selectedProject?.description?.length > 150;


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/home`)
      .then(res => res.json())
      .then(data => {
        if (data.threeProjects) {
          setThreeProjects(data.threeProjects);
        }
      });
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="mx-auto px-4 sm:px-10 py-16 bg-white">
      <div className="container w-[90%] m-auto">
        {/* Section Title */}
        <div className="mb-12 font-bold text-left" style={{ fontFamily: 'bodoni' }}>
          <h2 className="text-xl sm:text-2xl text-[#263973] uppercase">Brand Design</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {threeProjects.map((project) => (
            <div key={project.id} className="flex flex-col group">
    
              <div className="mb-4 rounded-lg overflow-hidden aspect-square bg-gray-100 relative cursor-pointer" onClick={() => openProjectModal(project)}>
                <img
                  src={`https://api.landmark.ma/public/storage/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover absolute inset-0 transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg">
                    Click to view details
                  </span>
                </div>
              </div>


              <h3 className="text-xl font-bold font-['Jost'] mb-2">{project.title}</h3>
              <p className="font-['Jost'] font-normal text-[#010E26] mb-3 line-clamp-2">
                {project.description}
              </p>
              <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost'] mb-4">
                {project.view_percent}% <br /> <span className='text-[#010E26] text-xs font-light w-[30%]'>Website views after rebranding</span>
              </p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-left text-xs sm:text-sm lg:text-xl mt-12">
          <Link
            to="/portfolio"
            className="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors"
          >
            voir tous les projets
          </Link>
        </div>

        {/* Project Modal */}

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
                  className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl ml-4"
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
                {/* You can add more details here */}
              </div>
            </div>
          </div>
        )}


      </div>
    </section>
  );
};

export default Projects;
