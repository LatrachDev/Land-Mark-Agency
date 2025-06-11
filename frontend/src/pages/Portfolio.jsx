import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Services from '../components/Services';
import { Helmet } from "react-helmet";

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

export default function PortfolioPage() {
  return (
    <>

      <Helmet>
        <title>Portfolio | LandMark</title>
        <meta name="description" content="Discover our creative work and successful projects in branding, web development, and marketing at LandMark." />
      </Helmet>
      
      <body className="font-['Jost']">
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
            Faites comme eux, choisissez l’excellence et rejoignez une communauté <br />
            qui nous fait confiance pour transformer leurs ambitions en réussites.
          </p>
        </section>

        {/* Services Section */}
        <Services />
        
        {/* Projects Grid */}
        <section className="mx-auto px-4 sm:px-10 py-16 bg-white">
          <div className="container w-[90%] m-auto">
            {/* Section Title */}
            <div className="text-xl text-left text-[#263973] uppercase mb-6" style={{ fontFamily: 'BioRhyme_Expanded' }}>
              <h2 className="">PROJECT HIGHLIGHTS</h2>
              <p className="">"CASE STUDIES"</p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col mb-10">
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={project.image} alt={project.alt} className="w-full" />
                  </div>
                  <h3 className="text-xl font-bold font-['Jost'] mb-2">
                    {project.title} <span className="italic">{project.subtitle}</span>
                  </h3>
                  <p className="font-['Jost'] font-normal text-[#010E26] mb-6">{project.description}</p>
                  <div>
                    <p className="text-4xl text-blue-500 font-bold font-['Jost']">{project.result}</p>
                    <p className="font-['Jost'] w-4/12">{project.statLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Content */}
        <section className="px-4 sm:px-10 py-16 bg-white">
        <div className="container w-[90%] mx-auto">
          <div className="mb-12">
            <h2 className="text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
              CONTENT CREATION
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div key={project} className="flex flex-col mb-10">
                <div className="mb-8">
                  <img
                    src="src/assets/content/content1.jpg"
                    alt="Content Creator"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold font-['Jost'] mb-8">PROJECT NAME</h3>
                <div>
                  <p className="text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                  <p className="font-['Jost']">
                    Website views
                    <br />
                    after rebranding
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
        </section>

        <Contact />
        <Footer />
      </body>
    </>
  );
}