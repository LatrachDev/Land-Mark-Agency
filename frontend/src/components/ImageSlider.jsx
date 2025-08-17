import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Offers1 from "../assets/offers/offre4.png";
import Offers2 from "../assets/offers/offre3.png";
import Offers3 from "../assets/offers/offre2.png";
import Offers4 from "../assets/offers/offre1.png"; 

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const images = [Offers1, Offers2, Offers3, Offers4];
  
  const slides = [images[images.length - 1], ...images, images[0]];

  // auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  // Reset to first/last real slide when reaching a clone
  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      // At the end clone → jump to first real slide
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
      return () => clearTimeout(timeout);
    }
    if (currentIndex === 0) {
      // At the start clone → jump to last real slide
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 2);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, slides.length]);

  // Swipe handling
  const startX = useRef(0);
  const endX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current - endX.current > 50) {
      nextSlide();
    } else if (endX.current - startX.current > 50) {
      prevSlide();
    }
  };

  return (
    <div
      className="w-full cursor-pointer overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => navigate("/contact")}
    >
      <div
        ref={sliderRef}
        className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={() => setIsTransitioning(true)}
      >
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Offer ${index}`}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
