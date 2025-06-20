import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ videoUrl, onVideoPlay, thumbnailUrl, title, views }) => {
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

    const handleFullscreenChange = () => {
      if (video) {
        if (document.fullscreenElement) {
          video.style.objectFit = 'contain';
          video.style.backgroundColor = 'black';
        } else {
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
      onVideoPlay(videoRef);
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    } else if (video && isPlaying) {
      video.pause();
    }
  };

  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleVideoClick(e);
  };

  const pauseVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pauseVideo = pauseVideo;
    }
  }, []);

  const formatViews = (num) => {
    const n = Number(num);
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return n.toString();
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8 relative group">
        {!isPlaying && thumbnailUrl && (
          <div className="absolute inset-0 z-10">
            <img 
              src={thumbnailUrl} 
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-auto object-contain cursor-pointer"
          onClick={handleVideoClick}
          playsInline
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          poster={thumbnailUrl}
        >
          Your browser does not support the video tag.
        </video>
        
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
      <h3 className="text-xl font-bold font-['Jost'] mb-3">{title}</h3>
      <div>
        <p className="sm:text-2xl text-2xl text-blue-500 font-bold font-['Jost']">
          {formatViews(views)} <span className='text-sm'>views</span>
        </p>
      </div>
    </div>
  );
};

const Content = () => {
  const activeVideoRef = useRef(null);
  const [threeContents, setThreeContents] = useState([]);

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
        if (data.threeContents) {
          setThreeContents(data.threeContents);
        }
      })
      .catch(error => {
        console.error('Failed to fetch content:', error);
      });
  }, []);

  const handleVideoPlay = (newVideoRef) => {
    if (activeVideoRef.current && activeVideoRef.current !== newVideoRef.current) {
      activeVideoRef.current.pause();
    }
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
          {threeContents.map((content, index) => (
            <VideoCard 
              key={content.id}
              videoUrl={`http://127.0.0.1:8000/storage/${content.video}`}
              thumbnailUrl={`http://127.0.0.1:8000/storage/${content.thumbnail}`}
              title={content.title}
              views={content.views}
              onVideoPlay={handleVideoPlay}
            />
          ))}
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