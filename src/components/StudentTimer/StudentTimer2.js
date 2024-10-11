import React, { useState, useEffect } from 'react';
import studentsData from '../../data/studentsData';
import questionsData from '../../data/questionsData';
import Timer from '../Timer';
import QuestionPanel from '../questions/QuestionPanel';
import BatchSelector from '../BatchSelector/BatchSelector';
import additionalTasks from '../../data/additionalTasks';

const StudentTimer2 = () => {
    const [selectedBatch, setSelectedBatch] = useState(''); // Store selected batch
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [sessionTime, setSessionTime] = useState(2400);
    const [timerKey, setTimerKey] = useState(0);
    const [sessionStarted, setSessionStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Track pause status
    const [answeredStudents, setAnsweredStudents] = useState([]); // Track students who have answered
    const [newTasks, setNewTasks] = useState([]); // Store tasks for answered students
    const [sessionFinished, setSessionFinished] = useState(false); // Track session finished status

    // Function to select a random student who hasn't answered yet
    const selectRandomStudent = () => {
        const batchStudents = studentsData[selectedBatch];
        const unAnsweredStudents = batchStudents.filter(student => !answeredStudents.includes(student.name));

        // If no students left to answer, end the session
        if (unAnsweredStudents.length === 0) {
            setSessionFinished(true); // Set session as finished
            setSessionStarted(false); // Stop the session
            return;
        }

        const randomStudent = unAnsweredStudents[Math.floor(Math.random() * unAnsweredStudents.length)];
        setCurrentStudent(randomStudent);
    };

    // Function to select 5 random questions
    const selectRandomQuestions = () => {
        const batchQuestions = questionsData[selectedBatch];
        const shuffledQuestions = batchQuestions.sort(() => 0.5 - Math.random());
        setCurrentQuestions(shuffledQuestions.slice(0, 5));
    };

    // Randomly select 5 additional tasks for a student
    const assignRandomTasks = () => {
        const shuffledTasks = additionalTasks.sort(() => 0.5 - Math.random());
        return shuffledTasks.slice(0, 5);
    };

    // Function to assign new tasks to a student if not already assigned
    const assignNewTask = (student) => {
        // Check if tasks are already assigned to the student
        const isAlreadyAssigned = newTasks.some(taskObj => taskObj.student === student.name);

        // Only assign new tasks if the student hasn't received any yet
        if (!isAlreadyAssigned) {
            const tasks = assignRandomTasks(); // Get 5 random tasks
            setNewTasks((prevTasks) => [
                ...prevTasks,
                { student: student.name, tasks }
            ]);
        }
    };


    // Handle what happens when time is up for the current student
    const handleTimeUp = () => {
        if (sessionTime > 180) {
            setSessionTime((prevTime) => prevTime - 180);
            if (currentStudent) {
                // Check if the student has already answered before adding to the answeredStudents list
                if (!answeredStudents.includes(currentStudent.name)) {
                    setAnsweredStudents((prev) => [...prev, currentStudent.name]);
                    assignNewTask(currentStudent);
                }
            }
            selectRandomStudent(); // Select the next student who hasn't answered
            selectRandomQuestions();
            setTimerKey((prevKey) => prevKey + 1);
        } else {
            setSessionTime(0);
        }
    };


    // Handle session start
    const handleStartSession = () => {
        if (selectedBatch) {
            setSessionStarted(true);
            setIsPaused(false); // Ensure not paused on start
            setSessionFinished(false); // Reset session finished status
            selectRandomStudent();
            selectRandomQuestions();
        } else {
            alert("Please select a batch before starting the session.");
        }
    };

    // Handle pause/resume functionality
    const handlePause = () => {
        setIsPaused((prev) => !prev); // Toggle pause state
    };

    // Handle stop/reset functionality
    const handleStop = () => {
        setSessionStarted(false);
        setIsPaused(false);
        setSessionTime(2400); // Reset time
        setCurrentStudent(null);
        setCurrentQuestions([]);
        setTimerKey((prevKey) => prevKey + 1); // Reset timer key
        setAnsweredStudents([]); // Clear answered students
        setNewTasks([]); // Clear tasks
        setSessionFinished(false); // Reset session finished
    };

    // Ensure questions are refreshed when the batch changes or session starts
    useEffect(() => {
        if (sessionStarted && !isPaused) {
            selectRandomStudent();
            selectRandomQuestions();
        }
    }, [selectedBatch, sessionStarted]);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            {!sessionStarted && !sessionFinished ? (
                <div className="text-center">
                    <BatchSelector onSelectBatch={setSelectedBatch} />
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleStartSession}
                    >
                        Start Session
                    </button>
                </div>
            ) : sessionFinished ? (
                <h2 className="text-2xl font-bold text-green-600">Session Finished</h2>
            ) : sessionTime > 0 ? (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">
                        Current Student: {currentStudent ? (
                            <div className="flex items-center">
                                <img src={currentStudent.imgLink} alt="img not found" className="w-16 h-16 rounded-full mr-4" />
                                {currentStudent.name}
                            </div>
                        ) : 'Loading...'}
                    </h2>

                    <Timer key={timerKey} onTimeUp={handleTimeUp} sessionTime={isPaused ? sessionTime : sessionTime} />
                    <QuestionPanel questions={currentQuestions} />

                    <div className="flex space-x-4">
                        <button
                            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                            onClick={handlePause}
                        >
                            {isPaused ? 'Resume' : 'Pause'}
                        </button>
                        <button
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                            onClick={handleStop}
                        >
                            Stop
                        </button>
                    </div>


                    {/* <h3 className="text-lg font-bold mt-6">Answered Students:</h3> 
                     <ul className="list-disc pl-5 space-y-2">
                        {answeredStudents.filter((student, index, self) => self.indexOf(student) === index).map((student, index) => (
                            <li key={index} className="text-green-600">
                                {student}
                            </li>
                        ))}
                    </ul> */}
                    {/* <h3 className="text-lg font-bold mt-6">Answered Students:</h3>
                    <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answeredStudents
                                .filter((student, index, self) => self.indexOf(student) === index)
                                .map((student, index) => {
                                    // Assuming each student has an image and score property
                                    const studentObj = studentsData.find(s => s.name === student); // Get student details
                                    return (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="px-4 py-2">
                                                <img
                                                    src={studentObj?.imgLink || 'default.jpg'}
                                                    alt={studentObj?.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{studentObj?.name || 'N/A'}</td>
                                            <td className="px-4 py-2 text-green-600">
                                                {studentObj?.score || '0'} pts
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table> */}

                    <h3 className="text-lg font-bold mt-6">Answered Students:</h3>
                    <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answeredStudents
                                .filter((student, index, self) => self.indexOf(student) === index)
                                .map((student, index) => {
                                    // Access the batch students
                                    const batchStudents = studentsData[selectedBatch] || [];
                                    // Find the current student from the batch
                                    const studentObj = batchStudents.find(s => s.name === student);

                                    if (!studentObj) {
                                        return null; // In case studentObj is undefined, return null to avoid rendering errors
                                    }

                                    return (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="px-4 py-2">
                                                <img
                                                    src={studentObj.imgLink || 'default.jpg'}
                                                    alt={studentObj.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{studentObj.name}</td>
                                            <td className="px-4 py-2 text-green-600">
                                                {studentObj.score || '0'} pts
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>

                    {/* <h3 className="text-lg font-bold mt-6">New Tasks:</h3> */}
                    {/* <ul className="list-disc pl-5 space-y-2">
                        {newTasks
                            .filter((taskObj, index, self) => self.findIndex(t => t.student === taskObj.student) === index)
                            .map((taskObj, index) => (
                                <li key={index} className="text-blue-600">
                                    <strong>{taskObj.student}:</strong>
                                    <ul className="pl-4">
                                        {taskObj.tasks.map((task, idx) => (
                                            <li key={idx} className="text-blue-400">
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        }
                    </ul> */}
                    <h3 className="text-lg font-bold mt-6">New Tasks:</h3>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {newTasks
                            .filter((taskObj, index, self) => self.findIndex(t => t.student === taskObj.student) === index)
                            .map((taskObj, index) => {
                                // Access the batch students
                                const batchStudents = studentsData[selectedBatch] || [];
                                // Find the student in the batch
                                const studentObj = batchStudents.find(s => s.name === taskObj.student);

                                return (
                                    <div key={index} className="border-b border-gray-200 py-4">
                                        <h4 className="text-blue-600 font-semibold">
                                            {studentObj?.name || 'N/A'}
                                        </h4>
                                        <ul className="list-disc pl-5 mt-2 space-y-2">
                                            {taskObj.tasks.map((task, idx) => (
                                                <li key={idx} className="text-blue-400">
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                    </div>


                </div>
            ) : (
                <h2 className="text-2xl font-bold text-red-600">Session Over</h2>
            )}
        </div>
    );
};

export default StudentTimer2;
