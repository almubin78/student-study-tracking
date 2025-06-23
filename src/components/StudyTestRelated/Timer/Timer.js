import React, { useEffect, useState } from "react";

const Timer = ({ initialTime, onTimeUp, isPaused,currentStudent ,selectedBatch}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="timer text-center">
      <p className="text-gray-600 mb-1">Time Remaining</p>
      <h2
        className={`text-6xl font-bold ${
          time <= 10 ? "text-red-500" : "text-blue-500"
        }`}
      >
        {formatTime(time)}
      </h2>

      <div className="flex items-center justify-center mb-4">
        <img
          src={currentStudent?.imgLink}
          alt={currentStudent?.name}
          className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-700">
            {currentStudent?.name}
          </h3>
          <p className="text-gray-500">Class: {selectedBatch} </p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
