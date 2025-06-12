import React from 'react';

const Content = () => {
  return (
    <section className="px-4 sm:px-10 py-16 bg-white">
      <div className="container w-[90%] mx-auto">
        <div className="mb-12">
          <h2 className="text-sm sm:text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
            CONTENT CREATION
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((project) => (
            <div key={project} className="flex flex-col">
              <div className="mb-8">
                <img
                  src="src/assets/content/content1.jpg"
                  alt="Content Creator"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-bold font-['Jost'] mb-8">PROJECT NAME</h3>
              <div>
                <p className="text-2xl sm:text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                <p className="font-['Jost'] mt-2">
                  Website views
                  <br />
                  after rebranding
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-left mt-16">
          <a
            href="/portfolio"
            className="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors"
          >
            VIEW ALL WORKS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Content;
