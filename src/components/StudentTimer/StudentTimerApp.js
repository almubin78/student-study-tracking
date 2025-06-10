import React, { useState, useEffect } from 'react';

const StudentTimerApp = () => {
  // Sample student data with their allocated time in seconds
  const studentsData = [
    { id: 1, name: 'Alice Johnson', time: 10 },
    { id: 2, name: 'Bob Smith', time: 15 },
    { id: 3, name: 'Charlie Brown', time: 8 },
    { id: 4, name: 'Diana Prince', time: 12 },
  ];

  const [students, setStudents] = useState(studentsData);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(studentsData[0].time);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Move to next student when timer reaches 0
      const nextIndex = (currentStudentIndex + 1) % students.length;
      setCurrentStudentIndex(nextIndex);
      setTimeLeft(students[nextIndex].time);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isRunning, currentStudentIndex, students.length]);

  const handlePauseResume = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStudentIndex(0);
    setTimeLeft(students[0].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Student Timer</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {students[currentStudentIndex].name}
          </h2>
          <div className="text-5xl font-bold text-center my-4 text-blue-500">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-500 text-center">
            {currentStudentIndex + 1} of {students.length} students
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePauseResume}
            className={`px-4 py-2 rounded-md font-medium ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
          >
            Reset
          </button>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-2">Upcoming Students:</h3>
          <ul className="space-y-2">
            {students.map((student, index) => (
              <li 
                key={student.id} 
                className={`p-2 rounded ${index === currentStudentIndex ? 'bg-blue-100 font-medium' : ''}`}
              >
                <span className="text-gray-700">{student.name}</span> - 
                <span className="text-gray-600 ml-2">{formatTime(student.time)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentTimerApp;