import React, { useEffect, useState } from 'react';

const Timer = ({ initialTime, onTimeUp, isPaused }) => {
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
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="timer text-center">
            <p className="text-gray-600 mb-1">Time Remaining</p>
            <h2 className={`text-6xl font-bold ${
                time <= 10 ? 'text-red-500' : 'text-blue-500'
            }`}>
                {formatTime(time)}
            </h2>
        </div>
    );
};

export default Timer;