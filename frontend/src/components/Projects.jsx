import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [threeProjects, setThreeProjects] = useState([]);

  // Function to format view count
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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/home', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data.threeProjects) {
          setThreeProjects(data.threeProjects);
        }
      })
      .catch(error => {
        console.error('Failed to fetch projects:', error);
      });
  }, []);

  return (
    <section className="mx-auto px-4 sm:px-10 py-16 bg-white">
      <div className="container w-[90%] m-auto">
        {/* Section Title */}
        <div className="mb-12 text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
          <h2 className="text-sm sm:text-xl text-[#263973] uppercase">PROJECT HIGHLIGHTS</h2>
          <p className="text-sm sm:text-xl text-[#263973] mt-2">"CASE STUDIES"</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {threeProjects.map((project) => (
            <div key={project.id} className="flex flex-col group">
              {/* Square image container */}
              <div className="mb-4 rounded-lg overflow-hidden aspect-square bg-gray-100 relative">
                <img 
                  src={`http://127.0.0.1:8000/storage/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <h3 className="text-xl font-bold font-['Jost'] mb-2">
                {project.title}
              </h3>
              <p className="font-['Jost'] font-normal text-[#010E26] mb-3 line-clamp-2">
                {project.description}
              </p>
    
              <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost']">
                {formatViewCount(project.view_percent)} <span className='text-sm'>views</span>
              </p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-left text-xs sm:text-sm lg:text-xl mt-12">
          <Link to="/portfolio" className="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors">
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;