import React from 'react';

const projects = [
  {
    title: 'BRAND DESIGN',
    subtitle: '"EXTENT MEDIA"',
    image: 'src/assets/JPG/projects/01-01.jpg',
    alt: 'Extent Media Logo',
    description: 'Project brief and all aspects of this project in short words to help understand what we worked on.',
    result: '45%',
    statLabel: 'Website views after rebranding',
  },
  {
    title: 'UI & UX DESIGN',
    subtitle: '"GROWMAX"',
    image: 'src/assets/JPG/projects/08-15.jpg',
    alt: 'GrowMax Website',
    description: 'Project brief and all aspects of this project in short words to help understand what we worked on.',
    result: '15%',
    statLabel: 'Website views after rebranding',
  },
  {
    title: 'PACKAGING DESIGN',
    subtitle: '"AL GHOSNE"',
    image: 'src/assets/JPG/projects/02-1.jpg',
    alt: 'Al Ghosne Packaging',
    description: 'Project brief and all aspects of this project in short words to help understand what we worked on.',
    result: '45%',
    statLabel: 'Website views after rebranding',
  },
];

const Projects = () => {
  return (
    <section className="mx-auto px-4 py-16 bg-white">
      <div className="container w-[90%] m-auto">
        {/* Section Title */}
        <div className="mb-12 text-left">
          <h2 className="text-2xl font-['BioRhyme_Expanded'] text-blue-900 uppercase">PROJECT HIGHLIGHTS</h2>
          <p className="text-2xl font-['BioRhyme_Expanded'] text-blue-900 mt-2">"CASE STUDIES"</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src={project.image} alt={project.alt} className="w-full" />
              </div>
              <h3 className="text-xl font-bold font-['Jost'] mb-2">
                {project.title} <span className="italic">{project.subtitle}</span>
              </h3>
              <p className="font-['Jost'] text-gray-700 mb-6">{project.description}</p>
              <div>
                <p className="text-4xl text-blue-500 font-bold font-['Jost']">{project.result}</p>
                <p className="font-['Jost']">{project.statLabel}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-left mt-12">
          <a
            href="#"
            className="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors"
          >
            View All Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
