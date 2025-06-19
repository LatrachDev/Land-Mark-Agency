import React, { useEffect, useState } from 'react';

const Promotion = () => {
  const [timeLeft, setTimeLeft] = useState('00 : 00 : 00 : 00');

  useEffect(() => {
    // Load or create promoEndTime from localStorage
    let endTime = localStorage.getItem('promoEndTime');
    if (!endTime) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3); // 3 days from now
      endTime = futureDate.getTime();
      localStorage.setItem('promoEndTime', endTime);
    } else {
      endTime = parseInt(endTime);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('EXPIRED');
        localStorage.removeItem('promoEndTime');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-600 sticky py-4 px-4 sm:px-20 text-white w-full flex flex-col sm:flex-row items-center">
      <div className="flex-1 flex items-center justify-between gap-1 sm:gap-2 text-xs sm:text-base">
        <div className="w-8/12">
          <span className="text-left sm:w-full text-xs sm:text-sm font-bold">
            ÉCONOMISEZ 25% SUR TOUS NOS SERVICES AVANT LE
          </span>
          <span className="sm:bg-gray-700 ml-2 px-2 py-1 w-[170px] text-center inline-block">
            {timeLeft}
          </span>
        </div>
        <button className="bg-gray-100 font-bold hover:bg-gray-200 text-black px-3 sm:px-4 py-1 text-xs sm:text-sm transition-colors">
          SAVE NOW
        </button>
      </div>
    </div>
  );
};

export default Promotion;