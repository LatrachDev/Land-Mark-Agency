import React, { useRef, useState } from 'react';
import videoSrc from '../assets/video/LandmarkVideoHd.mp4';
import thumbnailSrc from '../assets/JPG/ThumbnailMission.jpg';
import videoIconSrc from '../assets/Services/videoIcon2.svg';

const Mission = (props) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleVideoPause = () => {
    setIsPaused(true);
  };

  return (
    <div className="container" {...props}>
      <h2 style={{ fontFamily: 'bodoni' }} className="text-xl sm:text-2xl font-bold tracking-[0.2em] mb-6 uppercase pl-0">
        Notre Mission
      </h2>

      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={thumbnailSrc}
          controls={isPlaying}
          className="w-full h-full object-cover"
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        >
          Your browser does not support the video tag.
        </video>

        {/* Thumbnail and Play Button Overlay */}
        {(!isPlaying || isPaused) && (
          <>
            {/* Thumbnail Image - only shown when paused or not playing */}
            {isPaused && (
              <img
                src={thumbnailSrc}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button
                onClick={handlePlayClick}
                className="md:w-28 md:h-28 w-16 h-16 cursor-pointer rounded-full flex items-center justify-center hover:bg-black/40 transition-all"
              >
                <img
                  src={videoIconSrc}
                  alt="Play video"
                  className="md:w-20 md:h-20 w-12 h-12 rounded-full"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mission;