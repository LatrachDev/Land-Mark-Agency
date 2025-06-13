import React, { useRef, useState } from 'react';

const Mission = (props) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="container" {...props}>
      
      <h2 style={{ fontFamily: 'BioRhyme_Expanded' }} className="text-sm sm:text-xl tracking-[0.2em] mb-6 uppercase pl-0">
        Notre Mission
      </h2>

      <div className="relative w-full aspect-video overflow-hidden">
        {/* Video Element */}
        <video
          ref={videoRef}
          src="src/assets/video/LandmarkVideoHd.mp4"
          controls={isPlaying}
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onPlay={handleVideoPlay}
        >
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay, hidden when video is playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/40 transition-all"
            >
              <img
                src="src/assets/Services/videoIcon2.svg"
                alt="Play video"
                className="w-12 h-12 rounded-full"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mission;