import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Offers1 from "../assets/offers/offre1.png";
import Offers2 from "../assets/offers/offre2.png";
import Offers3 from "../assets/offers/offre3.png";
import Offers4 from "../assets/offers/offre1.png";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const images = [Offers1, Offers2, Offers3, Offers4];
  const slides = [images[images.length - 1], ...images, images[0]]; // Clone first & last

  // Auto-slide every 4 seconds
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

  // Handle loop reset when reaching clones
  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 2);
      }, 500);
    }
  }, [currentIndex]);

  // Swipe handling
  let startX = 0;
  let endX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
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
