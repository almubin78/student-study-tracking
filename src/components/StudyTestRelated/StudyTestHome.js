import React, { useState, useEffect } from "react";
import { studentsData } from "../../data/studentsData";
import questionsData from "../../data/questionsData";
import additionalTasks from "../../data/additionalTasks";
import BatchSelector from "./BatchSelector/BatchSelector";
import QuestionPanel from "./QuestionsComponent/QuestionPanel";
import Timer from "./Timer/Timer";
import AnsweredStudents from "./AnsweredStudents/AnsweredStudents";
import NewTasks from "./NewTasks/NewTasks";

const StudyTestHome = () => {
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
  const [studentTimeLimit, setStudentTimeLimit] = useState(5); // New state for dynamic time limit
  const [showBatchSelector, setShowBatchSelector] = useState(false); // For the vertical selector

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
    const shuffledQuestions = [...batchQuestions].sort(
      () => 0.5 - Math.random()
    );
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
    (student, index, self) =>
      index === self.findIndex((s) => s.id === student.id)
  );

  return (
    <div className="relative p-6 bg-gray-100 rounded-lg shadow-lg min-h-screen">
      {/* Vertical Batch Selector Button */}
      <button
        onClick={() => setShowBatchSelector(!showBatchSelector)}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-2 rounded-l-lg shadow-lg z-10 transition-all"
      >
        {showBatchSelector ? "◄" : "►"} Batch
      </button>

      {/* Batch Selector Panel */}
      {showBatchSelector && (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-10 p-4 overflow-y-auto">
          <BatchSelector onSelectBatch={setSelectedBatch} />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time per Student (seconds):
            </label>
            <select
              value={studentTimeLimit}
              onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={15}>15 seconds</option>
              <option value={20}>20 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
            </select>
          </div>
          <button
            onClick={() => {
              setShowBatchSelector(false);
              handleStartSession();
            }}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Start Session
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all ${showBatchSelector ? "ml-72" : "ml-0"}`}>
        {!sessionStarted && !sessionFinished ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">
              Student Timer
            </h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
              <BatchSelector onSelectBatch={setSelectedBatch} />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time per Student (seconds):
                </label>
                <select
                  value={studentTimeLimit}
                  onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                  <option value={15}>15 seconds</option>
                  <option value={20}>20 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minute</option>
                </select>
              </div>
              <button
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
                onClick={handleStartSession}
                disabled={!selectedBatch}
              >
                Start Session
              </button>
            </div>
          </div>
        ) : sessionFinished ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Session Completed!
            </h2>
            <p className="text-lg mb-6">All students have answered.</p>
            <button
              onClick={handleStartSession}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Restart Session
            </button>
          </div>
        ) : sessionTime >= 0 && currentStudent ? (
          <div className="space-y-6">
            {/* Student Timer Panel */}
            <div className="fixed top-4 right-4 w-80 bg-white shadow-2xl rounded-xl border border-gray-200 p-6 z-10">
              <Timer
                key={`timer-${currentStudent.id}`} // Unique key for timer
                // key={timerKey} //
                initialTime={5}
                onTimeUp={handleTimeUp}
                isPaused={isPaused}
                currentStudent={currentStudent}
                selectedBatch={selectedBatch}
              />
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isPaused
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white`}
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
            </div>

            {/* Questions Panel */}
            <div className="mt-24">
              <h2 className="text-2xl font-bold text-center mb-6">
                Current Questions for{" "}
                <span className="text-blue-500">{currentStudent.name}</span>
              </h2>
              <QuestionPanel questions={currentQuestions} />
            </div>

            {/* Answered Students and Tasks - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* Display New Tasks */}
              
               <NewTasks newTasks={newTasks} batchStudents={batchStudents} />
              {/* Display Answered Students */}
              <AnsweredStudents
                currentStudent={currentStudent}
                uniqueAnsweredStudents={uniqueAnsweredStudents}
              />
             
            </div>

            {/* Session Controls */}
            <div className="flex justify-center space-x-4 mt-8">
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
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
              >
                Restart Session
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600">Session Over</h2>
            <button
              onClick={handleStartSession}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTestHome;
