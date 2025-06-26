import React, { useState, useEffect } from "react";
import { studentsData } from "../../data/studentsData";
import questionsData from "../../data/questionsData";
import additionalTasks from "../../data/additionalTasks";
import BatchSelector from "./BatchSelector/BatchSelector";
import QuestionPanel from "./QuestionsComponent/QuestionPanel";
import Timer from "./Timer/Timer";
import AnsweredStudents from "./AnsweredStudents/AnsweredStudents";
import NewTasks from "./NewTasks/NewTasks";

const StudyTestHome1 = () => {
  // State management
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchStudents, setBatchStudents] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [answeredStudents, setAnsweredStudents] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [studentTimeLimit, setStudentTimeLimit] = useState(15); // Default 15 seconds
  const [showBatchSelector, setShowBatchSelector] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("idle"); // 'idle', 'active', 'completed'

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
      setSessionStatus("completed");
      return;
    }

    const randomIndex = Math.floor(Math.random() * unAnsweredStudents.length);
    setCurrentStudent(unAnsweredStudents[randomIndex]);
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

    selectRandomStudent();
    selectRandomQuestions();
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
    setSessionStatus("active");
    setIsPaused(false);
    selectRandomStudent();
    selectRandomQuestions();
  };

  // Filter out duplicate students
  const uniqueAnsweredStudents = answeredStudents.filter(
    (student, index, self) =>
      index === self.findIndex((s) => s.id === student.id)
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Settings Button */}
      <button
        onClick={() => setShowBatchSelector(!showBatchSelector)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-r-lg z-20"
      >
        {showBatchSelector ? "◄" : "⚙️"}
      </button>

      {/* Settings Panel */}
      {showBatchSelector && (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10 p-4">
          <h2 className="text-lg font-bold mb-4">Session Settings</h2>
          <BatchSelector onSelectBatch={setSelectedBatch} />

          <div className="my-4">
            <label className="block mb-2">Time per Student:</label>
            <select
              value={studentTimeLimit}
              onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={15}>15 seconds</option>
              <option value={20}>20 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 Minite</option>
              <option value={120}>2 Minite</option>
            </select>
          </div>

          <button
            onClick={() => {
              setShowBatchSelector(false);
              handleStartSession();
            }}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Start Session
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all ${showBatchSelector ? "ml-64" : "ml-0"}`}>
        {sessionStatus === "idle" ? (
          <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Student Assessment
            </h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <BatchSelector onSelectBatch={setSelectedBatch} />

              <div className="my-4">
                <label className="block mb-2">Time per Student:</label>
                <select
                  value={studentTimeLimit}
                  onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                >
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                  <option value={15}>15 seconds</option>
                  <option value={20}>20 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 Minite</option>
                  <option value={120}>2 Minite</option>
                </select>
              </div>

              <button
                onClick={handleStartSession}
                disabled={!selectedBatch}
                className={`w-full py-2 rounded text-white ${
                  !selectedBatch
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Start Session
              </button>
            </div>
          </div>
        ) : sessionStatus === "completed" ? (
          <div className="max-w-md mx-auto p-4 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Session Completed!</h2>
              <p>All students have answered.</p>
              <button
                onClick={handleStartSession}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Restart Session
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto p-4">
            {/* Timer Panel */}
            {currentStudent && (
              <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg w-72">
                <div className="flex items-center mb-3">
                  <img
                    src={currentStudent.imgLink}
                    alt={currentStudent.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold">{currentStudent.name}</h3>
                    <p className="text-sm">{selectedBatch}</p>
                  </div>
                </div>

                <Timer
                  key={`timer-${currentStudent.id}`}
                  initialTime={studentTimeLimit}
                  onTimeUp={handleTimeUp}
                  isPaused={isPaused}
                />

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`w-full mt-3 py-1 rounded ${
                    isPaused ? "bg-green-500" : "bg-yellow-500"
                  } text-white`}
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
            )}

            {/* Questions */}
            <div className="mt-4 max-w-3xl mx-auto">
              <QuestionPanel questions={currentQuestions} />
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Answered Students</h3>
                <AnsweredStudents
                  currentStudent={currentStudent}
                  uniqueAnsweredStudents={uniqueAnsweredStudents}
                />
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Assigned Tasks</h3>
                <NewTasks newTasks={newTasks} batchStudents={batchStudents} />
              </div>
            </div>

            {/* Restart Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleStartSession}
                className="bg-blue-500 text-white py-2 px-6 rounded"
              >
                Restart Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTestHome1;
