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
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const handleNavItemClick = (index) => {
    setCurrentStudentIndex(index);
    setTimeLeft(students[index].time);
    setIsRunning(false);
    setIsNavOpen(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Student Timer</h1>
              <div className="hidden md:block">
                <span className="text-blue-200">
                  Current: {students[currentStudentIndex].name}
                </span>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isNavOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1">
              {students.map((student, index) => (
                <button
                  key={student.id}
                  onClick={() => handleNavItemClick(index)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${index === currentStudentIndex ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                >
                  {student.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Nav */}
          {isNavOpen && (
            <div className="md:hidden pb-3">
              <div className="flex flex-col space-y-1">
                {students.map((student, index) => (
                  <button
                    key={student.id}
                    onClick={() => handleNavItemClick(index)}
                    className={`px-3 py-2 rounded-md text-left text-sm font-medium ${index === currentStudentIndex ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                  >
                    {student.name} - {formatTime(student.time)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {students[currentStudentIndex].name}
            </h2>
            <div className="text-5xl font-bold my-4 text-blue-500">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">
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
    </div>
  );
};

export default StudentTimerApp;