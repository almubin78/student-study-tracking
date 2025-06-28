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
  const [studentTimeLimit, setStudentTimeLimit] = useState(15);
  const [showBatchSelector, setShowBatchSelector] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("setup"); // 'setup', 'attendance', 'active'
  const [presentStudents, setPresentStudents] = useState([]);

  // Update batch students when batch changes
  useEffect(() => {
    if (selectedBatch && studentsData[selectedBatch]) {
      const batchStudents = studentsData[selectedBatch];
      setBatchStudents(batchStudents);
      setPresentStudents(
        batchStudents.map((student) => ({ ...student, present: true }))
      );
    }
  }, [selectedBatch]);

  // Function to select a random student who hasn't answered yet
  const selectRandomStudent = () => {
    const presentAndUnanswered = presentStudents
      .filter((student) => student.present)
      .filter((student) => !answeredStudents.some((s) => s.id === student.id));

    if (presentAndUnanswered.length === 0) {
      setCurrentStudent(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * presentAndUnanswered.length);
    setCurrentStudent(presentAndUnanswered[randomIndex]);
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
    //updated code
    // In your StudyTestHome1 component, update the assignRandomTasks function:

    const batchTasks = additionalTasks[selectedBatch] || [];
    const shuffledTasks = [...batchTasks].sort(() => 0.5 - Math.random());
    return shuffledTasks.slice(0, 5);

    //last version code
    // const shuffledTasks = [...additionalTasks].sort(() => 0.5 - Math.random());
    //   return shuffledTasks.slice(0, 3);
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

  // Toggle student attendance
  const toggleStudentAttendance = (studentId) => {
    setPresentStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  // Handle session start after attendance confirmation
  const confirmAttendanceAndStart = () => {
    if (presentStudents.filter((s) => s.present).length === 0) {
      alert("Please mark at least one student as present");
      return;
    }
    setSessionStatus("active");
    selectRandomStudent();
    selectRandomQuestions();
  };

  // Filter out duplicate students
  const uniqueAnsweredStudents = answeredStudents.filter(
    (student, index, self) =>
      index === self.findIndex((s) => s.id === student.id)
  );

  const presentCount = presentStudents.filter((s) => s.present).length;
  const answeredCount = uniqueAnsweredStudents.length;

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
              {/* for testing  */}
              <option value={5}>5 seconds</option>
              {/* for deploy */}
              <option value={30}>30 seconds</option>
              <option value={60}>1 Minute</option>
              <option value={120}>2 Minutes</option>
              <option value={180}>3 Minutes</option>
              <option value={300}>5 Minutes</option>
            </select>
          </div>

          <button
            onClick={() => {
              setShowBatchSelector(false);
              setSessionStatus("attendance");
            }}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Confirm Attendance
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all ${showBatchSelector ? "ml-64" : "ml-0"}`}>
        {sessionStatus === "setup" ? (
          <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Student Assessment Setup
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
                  {/* for testing  */}
                  <option value={5}>5 seconds</option>
                  {/* for deploy */}
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 Minute</option>
                  <option value={120}>2 Minutes</option>
                  <option value={180}>3 Minutes</option>
                  <option value={300}>5 Minutes</option>
                </select>
              </div>

              <button
                onClick={() => setSessionStatus("attendance")}
                disabled={!selectedBatch}
                className={`w-full py-2 rounded text-white ${
                  !selectedBatch
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Confirm Attendance
              </button>
            </div>
          </div>
        ) : sessionStatus === "attendance" ? (
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Mark Present Students
            </h1>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">
                  {selectedBatch} Batch ({presentCount}/{presentStudents.length}{" "}
                  present)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                  {presentStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center p-2 border rounded cursor-pointer ${
                        student.present
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                      onClick={() => toggleStudentAttendance(student.id)}
                    >
                      <input
                        type="checkbox"
                        checked={student.present}
                        onChange={() => toggleStudentAttendance(student.id)}
                        className="mr-2"
                      />
                      <img
                        src={student.imgLink}
                        alt={student.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{student.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={confirmAttendanceAndStart}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                শুরু করুন (Start Test)
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto p-4">
            {/* Timer and Current Student Panel */}
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

            {/* Questions Panel - Only shown when there's a current student */}
            {currentStudent && (
              <div className="mt-4 max-w-3xl mx-auto">
                <QuestionPanel questions={currentQuestions} />
              </div>
            )}

            {/* Results - Always visible */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">
                  Answered Students ({answeredCount}/{presentCount})
                  {answeredCount === presentCount && presentCount > 0 && (
                    <span className="ml-2 text-green-500">✓ All completed</span>
                  )}
                </h3>
                <AnsweredStudents
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
                onClick={() => {
                  setSessionStatus("setup");
                  setAnsweredStudents([]);
                  setNewTasks([]);
                }}
                className="bg-blue-500 text-white py-2 px-6 rounded"
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

export default StudyTestHome1;
