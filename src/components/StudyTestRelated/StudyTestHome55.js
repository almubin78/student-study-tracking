import React, { useState, useEffect } from "react";
import { studentsData } from "../../data/studentsData";
import questionsData from "../../data/questionsData";
import additionalTasks from "../../data/additionalTasks";
import BatchSelector from "./BatchSelector/BatchSelector";
import QuestionPanel from "./QuestionsComponent/QuestionPanel";
import Timer from "./Timer/Timer";
import AnsweredStudents from "./AnsweredStudents/AnsweredStudents";
import NewTasks from "./NewTasks/NewTasks";

const StudyTestHome55 = () => {
  // State management
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchStudents, setBatchStudents] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [answeredStudents, setAnsweredStudents] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [sessionTime, setSessionTime] = useState(2400);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);
  const [studentTimeLimit, setStudentTimeLimit] = useState(15); // Default to 15 seconds
  const [showBatchSelector, setShowBatchSelector] = useState(false);

  // Update batch students when batch changes
  useEffect(() => {
    if (selectedBatch && studentsData[selectedBatch]) {
      setBatchStudents(studentsData[selectedBatch]);
    }
  }, [selectedBatch]);

  // Function to select a random student who hasn't answered yet
  const selectRandomStudent = () => {
    if (!batchStudents.length) return;

    const unAnsweredStudents = batchStudents.filter(
      (student) => !answeredStudents.some((s) => s.id === student.id)
    );

    if (unAnsweredStudents.length === 0) {
      setSessionFinished(true);
      setSessionStarted(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unAnsweredStudents.length);
    const randomStudent = unAnsweredStudents[randomIndex];
    setCurrentStudent(randomStudent);
  };

  // Function to select random questions
  const selectRandomQuestions = () => {
    if (!selectedBatch || !questionsData[selectedBatch]) return;
    const batchQuestions = questionsData[selectedBatch];
    const shuffledQuestions = [...batchQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffledQuestions.slice(0, 5));
  };

  // Randomly select additional tasks
  const assignRandomTasks = () => {
    const shuffledTasks = [...additionalTasks].sort(() => 0.5 - Math.random());
    return shuffledTasks.slice(0, 5);
  };

  // Handle time up for current student
  const handleTimeUp = () => {
    if (!currentStudent) return;

    setAnsweredStudents((prev) => {
      const alreadyAnswered = prev.some((s) => s.id === currentStudent.id);
      if (!alreadyAnswered) {
        const tasks = assignRandomTasks();
        setNewTasks((prevTasks) => [
          ...prevTasks,
          { student: currentStudent.name, tasks },
        ]);
        return [...prev, currentStudent];
      }
      return prev;
    });

    if (sessionTime > studentTimeLimit) {
      setSessionTime((prev) => prev - studentTimeLimit);
      selectRandomStudent();
      selectRandomQuestions();
      setTimerKey((prev) => prev + 1);
    } else {
      setSessionTime(0);
      setSessionFinished(true);
    }
  };

  // Handle session start
  const handleStartSession = () => {
    if (!selectedBatch) {
      alert("Please select a batch before starting the session.");
      return;
    }

    setAnsweredStudents([]);
    setNewTasks([]);
    setCurrentStudent(null);
    setSessionFinished(false);
    setSessionStarted(true);
    setIsPaused(false);
    setSessionTime(2400);
    selectRandomStudent();
    selectRandomQuestions();
  };

  // Filter out duplicate students
  const uniqueAnsweredStudents = answeredStudents.filter(
    (student, index, self) => index === self.findIndex((s) => s.id === student.id)
  );

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Vertical Batch Selector Button */}
      <button
        onClick={() => setShowBatchSelector(!showBatchSelector)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-2 rounded-r-lg shadow-lg z-20 transition-all"
      >
        {showBatchSelector ? "◄ Hide" : "► Settings"}
      </button>

      {/* Settings Panel */}
      {showBatchSelector && (
        <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-10 p-6 overflow-y-auto border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Session Settings</h2>
          
          <BatchSelector onSelectBatch={setSelectedBatch} />
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time per Student:
            </label>
            <select
              value={studentTimeLimit}
              onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={15}>15 seconds</option>
              <option value={20}>20 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={45}>45 seconds</option>
              <option value={60}>1 minute</option>
              <option value={120}>2 minutes</option>
            </select>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Session Summary</h3>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Total Students:</span> {batchStudents.length}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Answered:</span> {uniqueAnsweredStudents.length}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Remaining Time:</span> {formatTime(sessionTime)}
            </p>
          </div>

          <button
            onClick={() => {
              setShowBatchSelector(false);
              handleStartSession();
            }}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow transition"
          >
            Start Session
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${showBatchSelector ? "ml-72" : "ml-0"}`}>
        {!sessionStarted && !sessionFinished ? (
          <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Assessment Timer</h1>
              <p className="text-gray-600">Select batch and settings to begin your session</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <BatchSelector onSelectBatch={setSelectedBatch} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time per Student:
                  </label>
                  <select
                    value={studentTimeLimit}
                    onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={5}>5 seconds</option>
                    <option value={10}>10 seconds</option>
                    <option value={15}>15 seconds</option>
                    <option value={20}>20 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={45}>45 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={120}>2 minutes</option>
                  </select>
                </div>

                <button
                  onClick={handleStartSession}
                  disabled={!selectedBatch}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition ${
                    !selectedBatch 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 shadow-md"
                  }`}
                >
                  Start Assessment Session
                </button>
              </div>
            </div>
          </div>
        ) : sessionFinished ? (
          <div className="max-w-2xl mx-auto py-12 px-4 text-center">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Completed!</h2>
                <p className="text-gray-600">All students have answered the assessment.</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-green-800 mb-2">Session Summary</h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Total Students:</span> {batchStudents.length}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Time per Student:</span> {studentTimeLimit}s
                </p>
              </div>

              <button
                onClick={handleStartSession}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
              >
                Start New Session
              </button>
            </div>
          </div>
        ) : sessionTime >= 0 && currentStudent ? (
          <div className="max-w-7xl mx-auto py-6 px-4">
            {/* Timer and Current Student Panel */}
            <div className="fixed top-4 right-4 w-80 bg-white shadow-xl rounded-xl border border-gray-200 p-6 z-10">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={currentStudent.imgLink}
                  alt={currentStudent.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{currentStudent.name}</h3>
                  <p className="text-sm text-gray-500">{selectedBatch} Batch</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current:</span>
                  <span className="font-medium">{studentTimeLimit}s per student</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining:</span>
                  <span className="font-medium">{formatTime(sessionTime)}</span>
                </div>
              </div>

              <Timer
                key={`timer-${currentStudent.id}-${studentTimeLimit}`}
                initialTime={studentTimeLimit}
                onTimeUp={handleTimeUp}
                isPaused={isPaused}
              />

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isPaused
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white shadow-sm`}
                >
                  {isPaused ? "Resume Session" : "Pause Session"}
                </button>
              </div>
            </div>

            {/* Questions Panel */}
            <div className="mt-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 px-6 py-3">
                  <h2 className="text-xl font-bold text-white">
                    Questions for {currentStudent.name}
                  </h2>
                </div>
                <div className="p-6">
                  <QuestionPanel questions={currentQuestions} />
                </div>
              </div>
            </div>

            {/* Answered Students and Tasks */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 px-6 py-3">
                  <h2 className="text-xl font-bold text-white">
                    Answered Students ({uniqueAnsweredStudents.length}/{batchStudents.length})
                  </h2>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <AnsweredStudents
                    currentStudent={currentStudent}
                    uniqueAnsweredStudents={uniqueAnsweredStudents}
                  />
                </div>
              </div>
{/*  */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 px-6 py-3">
                  <h2 className="text-xl font-bold text-white">
                    Assigned Tasks
                  </h2>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <NewTasks newTasks={newTasks} batchStudents={batchStudents} />
                </div>
              </div>
            </div>

            {/* Session Controls */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setAnsweredStudents([]);
                  setNewTasks([]);
                  setCurrentStudent(null);
                  setSessionFinished(false);
                  setSessionStarted(true);
                  setIsPaused(false);
                  setSessionTime(2400);
                  selectRandomStudent();
                  selectRandomQuestions();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
              >
                Restart Session
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-12 px-4 text-center">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Ended</h2>
              <p className="text-gray-600 mb-6">The assessment session has concluded.</p>
              <button
                onClick={handleStartSession}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
              >
                Start New Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTestHome55;