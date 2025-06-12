import React from 'react';

const Mission = (props) => {
  return (
    <div className="container" {...props}>
      
      <h2 style={{ fontFamily: 'BioRhyme_Expanded' }} className="text-sm sm:text-xl tracking-[0.2em] mb-6 uppercase pl-0">
        Notre Mission
      </h2>

      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src="src/assets/JPG/mevideo.png"
          alt="Notre Mission"
          className="w-full h-full object-cover"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/40 transition-all">
            <img
              src="src/assets/Services/videoIcon2.svg"
              alt="Play video"
              className="w-12 h-12 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mission;
