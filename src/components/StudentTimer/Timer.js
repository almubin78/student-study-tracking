// src/components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ onTimeUp }) => {
  const [time, setTime] = useState(3); // ৩ মিনিট (180 সেকেন্ড)
  
  useEffect(() => {
    // এখানে আমরা টাইমার শুরু করছি একবার
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // টাইমার বন্ধ করা হচ্ছে যখন এটি শেষ হবে
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // ক্লিনআপ ফাংশন
  }, []); // খেয়াল করুন এখানে [] ডিপেন্ডেন্সি যুক্ত করা হয়েছে

  return (
    <div className="timer bg-transparent">
      <p>Time Left:</p>
      <h2 className='text-purple-600 font-extrabold text-6xl text-center mb-4'>{` ${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}</h2>
    </div>
  );
};

export default Timer;
