import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Reel1 from '../assets/video/Reel1.mp4';
import Reel2 from '../assets/video/Reel2.mp4';
import Reel3 from '../assets/video/Reel3.mp4';

const VideoCard = ({ src, onVideoPlay, thumbnail }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const showControls = () => {
      video.controls = true;
      setIsPlaying(true);
    };

    const hideControls = () => {
      video.controls = false;
      setIsPlaying(false);
    };

    // Handle fullscreen change to maintain aspect ratio
    const handleFullscreenChange = () => {
      if (video) {
        if (document.fullscreenElement) {
          // In fullscreen, maintain original aspect ratio
          video.style.objectFit = 'contain';
          video.style.backgroundColor = 'black';
        } else {
          // Normal view, show full video without cropping
          video.style.objectFit = 'contain';
          video.style.backgroundColor = 'transparent';
        }
      }
    };

    if (video) {
      video.controls = false;
      video.addEventListener('play', showControls);
      video.addEventListener('pause', hideControls);
      video.addEventListener('ended', hideControls);
      video.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    return () => {
      if (video) {
        video.removeEventListener('play', showControls);
        video.removeEventListener('pause', hideControls);
        video.removeEventListener('ended', hideControls);
        video.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
      }
    };
  }, []);

  // Expose pause method to parent component
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const handleVideoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const video = videoRef.current;
    
    if (video && video.paused) {
      // If video is paused, clicking anywhere should start it
      onVideoPlay(videoRef);
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    } else if (video && isPlaying) {
      // If video is playing, any click should pause it
      video.pause();
    }
  };

  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // This will trigger the video click handler
    handleVideoClick(e);
  };

  // Method to pause this video (called from parent)
  const pauseVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  // Expose pauseVideo method to parent
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pauseVideo = pauseVideo;
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-8 relative group">
        {/* Thumbnail overlay - shows when video is paused */}
        {!isPlaying && thumbnail && (
          <div className="absolute inset-0 z-10">
            <img 
              src={thumbnail} 
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto object-contain cursor-pointer"
          onClick={handleVideoClick}
          playsInline
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Play button overlay - shows when video is paused */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ display: isPlaying ? 'none' : 'flex' }}
        >
          <div 
            className="pointer-events-auto cursor-pointer p-4"
            onClick={handlePlayButtonClick}
          >
            <svg
              className="w-16 h-16 text-white opacity-80 hover:scale-110 transition-transform drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
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
  );
};

const Content = () => {
  const activeVideoRef = useRef(null);

  const handleVideoPlay = (newVideoRef) => {
    // If there's already a video playing, pause it
    if (activeVideoRef.current && activeVideoRef.current !== newVideoRef.current) {
      activeVideoRef.current.pause();
    }
    // Set the new active video
    activeVideoRef.current = newVideoRef.current;
  };

  return (
    <section className="px-4 sm:px-10 py-16 bg-white">
      <div className="container w-[90%] mx-auto">
        <div className="mb-12">
          <h2
            className="text-sm sm:text-xl text-[#263973] uppercase text-left"
            style={{ fontFamily: 'BioRhyme_Expanded' }}
          >
            CONTENT CREATION
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <VideoCard 
            src={Reel1} 
            onVideoPlay={handleVideoPlay} 
            // thumbnail="src/assets/JPG/thumbnail.png" 
          />
          <VideoCard 
            src={Reel2} 
            onVideoPlay={handleVideoPlay} 
            // thumbnail="src/assets/JPG/thumbnail.png" 
          />
          <VideoCard 
            src={Reel3} 
            onVideoPlay={handleVideoPlay} 
            // thumbnail="src/assets/JPG/thumbnail.png" 
          />
        </div>

        <div className="text-left text-xs sm:text-sm md:text-xl mt-12">
          <Link
            to="/portfolio"
            className="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors"
          >
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Content;