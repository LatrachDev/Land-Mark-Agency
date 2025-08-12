// import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Offers from '../assets/JPG/Offers.jpg';

const ImageSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prev =>
//         prev === images.length - 1 ? 0 : prev + 1
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

  const handleClick = () => {
    navigate('/contact');
  };

  return (
    <div
      className="w-full overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={Offers}
        alt="Promotional Offer"
        className="w-full h-full object-cover transition-all duration-500"
      />
    </div>
  );
};

export default ImageSlider;
