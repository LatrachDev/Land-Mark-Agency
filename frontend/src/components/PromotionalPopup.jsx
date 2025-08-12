import React, { useState, useEffect } from 'react';
import eagleCard from '../assets/JPG/eaglecard.png';

const PromotionalPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const POPUP_STORAGE_KEY = 'promotional-popup-shown';

  useEffect(() => {
    // Check if the popup has been shown before
    const hasBeenShown = localStorage.getItem(POPUP_STORAGE_KEY);
    
    if (!hasBeenShown) {
      setIsVisible(true);
      // Mark as shown in localStorage
      localStorage.setItem(POPUP_STORAGE_KEY, 'true');
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleImageClick = () => {
    window.location.href = '/contact';
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[90] p-4"
      onClick={closePopup}
    >
      <div 
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute -top-0 -right-0 cursor-pointer bg-gray-600 text-white rounded-full w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center shadow-lg hover:bg-gray-500 transition-colors duration-200 z-10"
          aria-label="Close popup"
        >
          <svg className="w-2 h-2 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image with click handler */}
        <img 
          src={eagleCard} 
          alt="Promotional Card" 
          className="max-h-[90vh] max-w-[90vw] object-contain cursor-pointer"
          onClick={handleImageClick}
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
      </div>
    </div>
  );
};

export default PromotionalPopup;