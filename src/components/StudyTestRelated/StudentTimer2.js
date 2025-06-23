import React, { useState, useEffect } from "react";


import { studentsData } from "../../data/studentsData";
import questionsData from "../../data/questionsData";
import additionalTasks from "../../data/additionalTasks";
import BatchSelector from "./BatchSelector/BatchSelector";
import QuestionPanel from "./QuestionsComponent/QuestionPanel";
import Timer from "./Timer/Timer";
import AnsweredStudents from "./AnsweredStudents/AnsweredStudents";
import NewTasks from "./NewTasks/NewTasks";

const StudentTimer2 = () => {
  // State to hold selected batch and its students
  // Using useState to manage the selected batch and its students
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchStudents, setBatchStudents] = useState([]);
  // State to hold current questions, session time, timer key, pause state, current student, answered students, new tasks, session started and finished states
  // Using useState to manage these states
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [answeredStudents, setAnsweredStudents] = useState([]);
  // State to manage session time, session started and finished states
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [sessionTime, setSessionTime] = useState(2400);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  // Update batch students when batch changes
  useEffect(() => {
    if (selectedBatch && studentsData[selectedBatch]) {
      setBatchStudents(studentsData[selectedBatch]);
    }
  }, [selectedBatch]);

  // Function to select a random student who hasn't answered yet
  const selectRandomStudent = () => {
    if (!batchStudents.length) return;

    // Filter out already answered students using student ID for more reliable comparison
    const unAnsweredStudents = batchStudents.filter(
      (student) => !answeredStudents.some((s) => s.id === student.id)
    );

    // If no students left to answer, end the session
    if (unAnsweredStudents.length === 0) {
      setSessionFinished(true);
      setSessionStarted(false);
      return;
    }

    // Randomly select a student who hasn't answered yet
    const randomIndex = Math.floor(Math.random() * unAnsweredStudents.length);
    const randomStudent = unAnsweredStudents[randomIndex];

    setCurrentStudent(randomStudent);
  };

  // Function to select 5 random questions
  const selectRandomQuestions = () => {
    if (!selectedBatch || !questionsData[selectedBatch]) return;

    const batchQuestions = questionsData[selectedBatch];
    const shuffledQuestions = [...batchQuestions].sort(
      () => 0.5 - Math.random()
    );
    setCurrentQuestions(shuffledQuestions.slice(0, 5));
  };

  // Randomly select 5 additional tasks for a student
  const assignRandomTasks = () => {
    const shuffledTasks = [...additionalTasks].sort(() => 0.5 - Math.random());
    return shuffledTasks.slice(0, 5);
  };

  // Handle what happens when time is up for the current student
  const handleTimeUp = () => {
    if (!currentStudent) return;

    // Mark current student as answered only if not already answered
    setAnsweredStudents((prev) => {
      const alreadyAnswered = prev.some((s) => s.id === currentStudent.id);
      if (!alreadyAnswered) {
        // Assign tasks to the student
        const tasks = assignRandomTasks();
        setNewTasks((prevTasks) => [
          ...prevTasks,
          { student: currentStudent.name, tasks },
        ]);
        return [...prev, currentStudent];
      }
      return prev;
    });

    // Continue session if there's time left
    if (sessionTime > 5) {
      setSessionTime((prev) => prev - 5);
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

    // Reset all states
    setAnsweredStudents([]);
    setNewTasks([]);
    setCurrentStudent(null);
    setSessionFinished(false);
    setSessionStarted(true);
    setIsPaused(false);
    setSessionTime(2400);

    // Select first student and questions
    selectRandomStudent();
    selectRandomQuestions();
  };

  // Filter out duplicate students (extra protection)
  const uniqueAnsweredStudents = answeredStudents.filter(
    (student, index, self) =>
      index === self.findIndex((s) => s.id === student.id)
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      {!sessionStarted && !sessionFinished ? (
        <div className="text-center">
          <BatchSelector onSelectBatch={setSelectedBatch} />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition"
            onClick={handleStartSession}
            disabled={!selectedBatch}
          >
            Start Session
          </button>
        </div>
      ) : sessionFinished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Session Completed!
          </h2>
          <p>All students have answered.</p>
          <button
            onClick={() => {
              // Reset all necessary states in one go
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
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Restart Session
          </button>
        </div>
      ) : sessionTime >= 0 && currentStudent ? (
        <div className="space-y-6">
          {/* rendered students and timer */}
          <div
            key={`student-panel-${currentStudent.id}`} // Add unique key to force re-render
            className="fixed top-20 right-0 w-1/3 h-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200"
          >
            
            <Timer
              key={`timer-${currentStudent.id}`} // Unique key for timer
              // key={timerKey} // 
              initialTime={5}
              onTimeUp={handleTimeUp}
              isPaused={isPaused}
              currentStudent={currentStudent}
              selectedBatch={selectedBatch}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Current Questions for{" "}
              <span className="text-2xl bold text-pink-300">
                {currentStudent.name}
              </span>
            </h2>
            <QuestionPanel questions={currentQuestions} />
          </div>

          {/* Display Answered Students */}
          <AnsweredStudents
            currentStudent={currentStudent}
            uniqueAnsweredStudents={uniqueAnsweredStudents}
          />
          {/* Display New Tasks */}
          <NewTasks
            newTasks={newTasks}
            batchStudents={batchStudents}
          />


          {/* Toggle Resume and Pause button */}
          <div className="flex justify-center space-x-4 mt-6">
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
            <button
              onClick={() => {
                // Reset all necessary states in one go
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
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Restart Session
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">Session Over</h2>
      )}
    </div>
  );
};

export default StudentTimer2;
