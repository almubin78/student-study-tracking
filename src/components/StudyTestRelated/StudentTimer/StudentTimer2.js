import React, { useState } from 'react';
import studentsData from '../../../data/studentsData';
import questionsData from '../../../data/questionsData';
import additionalTasks from '../../../data/additionalTasks';
import BatchSelector from '../BatchSelector/BatchSelector';
import QuestionPanel from '../QuestionsComponent/QuestionPanel';
import Timer from './Timer';

// import NewTasks from './NewTasks/NewTasks';

const StudentTimer2 = () => {
    const [selectedBatch, setSelectedBatch] = useState(''); // Store selected batch

    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [inputTime, setInputTime] = useState(2400); // Track input for session time
    const [sessionTime, setSessionTime] = useState(2400);
    const [timerKey, setTimerKey] = useState(0);

    const [isPaused, setIsPaused] = useState(false); // Track pause status

    const [currentStudent, setCurrentStudent] = useState(null);
    const [answeredStudents, setAnsweredStudents] = useState([]); // Track students who have answered
    const [newTasks, setNewTasks] = useState([]); // Store tasks for answered students
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionFinished, setSessionFinished] = useState(false); // Track session finished status



    console.log('%cFIRST LINE for EVERY render()','font-size:30px; color:yellow');
    // console.log('%cCurrent Student','font-size:30px;',currentStudent?.name);
    console.log('%cউত্তর দিল যারা','font-size:20px',answeredStudents);
    // Function to select a random student who hasn't answered yet
    const selectRandomStudent = () => {
        const batchStudents = studentsData[selectedBatch];
        console.log(batchStudents.length);
        // Filter out already answered students
        const unAnsweredStudents = batchStudents.filter(
            (student) => !answeredStudents.includes(student.name)
        );
        console.log('%cunAnsweredStudents', 'border:2px solid red', unAnsweredStudents);

        // If no students left to answer, end the session
        if (unAnsweredStudents.length === 0) {
            console.log('%cunAnsweredStudents.length===0', 'border:2px solid green', unAnsweredStudents.length);
            setSessionFinished(true); // Set session as finished
            setSessionStarted(false); // Stop the session
            return;
        }
       

        // Randomly select a student who hasn't answered yet
        const randomStudent = unAnsweredStudents[Math.floor(Math.random() * unAnsweredStudents.length)];
        console.log('%crandomStudent', 'border:2px solid green', randomStudent);
        // Make sure current student isn't in the answeredStudents array
        if (!answeredStudents.includes(randomStudent.name)) {
            setCurrentStudent(randomStudent);
        }
    };
    console.log('%cCurrent Student', 'border-bottom:2px solid green', currentStudent);

    // Function to select 5 random questions
    const selectRandomQuestions = () => {
        const batchQuestions = questionsData[selectedBatch];
        const shuffledQuestions = batchQuestions.sort(() => 0.5 - Math.random());
        setCurrentQuestions(shuffledQuestions.slice(0, 5));
        console.log('%cshuffledQuestions', 'border:2px solid green,font-size:20px', shuffledQuestions);
    };

    // Randomly select 5 additional tasks for a student
    const assignRandomTasks = () => {
        const shuffledTasks = additionalTasks.sort(() => 0.5 - Math.random());
        return shuffledTasks.slice(0, 5);
    };

    // Function to assign new tasks to a student if not already assigned
    const assignNewTask = (student) => {
        const isAlreadyAssigned = newTasks.some(taskObj => taskObj.student === student.name);

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
        if (sessionTime > 5) {
            setSessionTime((prevTime) => prevTime - 5);

            if (currentStudent) {
                // Add the current student to the answered list only if they aren't already added
                if (!answeredStudents.includes(currentStudent.name)) {
                    // setAnsweredStudents((prev) => [ currentStudent.name]);
                    setAnsweredStudents((prev) => [...prev, currentStudent.name]);
                    assignNewTask(currentStudent); // Assign tasks only after the student is marked as answered
                }
            }
            // Select the next student and questions only after the current student is handled
            selectRandomStudent(); // Select the next student
            selectRandomQuestions(); // Get new random questions for the next student
            setTimerKey((prevKey) => prevKey + 1); // Force timer rerender
        } else {
            // setSessionTime(200); // Reset the time (or you can stop the session)
            setSessionTime(0); // Reset the time (or you can stop the session)
        }
    };


    // Handle session start
    const handleStartSession = () => {
        if (selectedBatch) {
            setSessionStarted(true);
            setIsPaused(false); // Ensure not paused on start
            setSessionFinished(false); // Reset session finished status
            setSessionTime(inputTime); // Use the input time as session time
            selectRandomStudent();
            selectRandomQuestions();
        } else {
            alert("Please select a batch before starting the session.");
        }
    };
    // const batchStudents = studentsData[selectedBatch];
    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            {!sessionStarted && !sessionFinished ? (
                <div className="text-center">
                    <BatchSelector onSelectBatch={setSelectedBatch} />
                    {/* <div className="mt-4">
                        <label className="mr-2">Set Session Time (in seconds): </label>
                        <input
                            type="number"
                            value={batchStudents?.length * 5 + 1}
                            onChange={(e) => setInputTime(Number(e.target.value))}
                            className="border px-2 py-1 rounded"
                        />
                    </div> */}
                    
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleStartSession}
                    >
                        Start Session
                    </button>
                </div>
            ) : sessionFinished ? (
                // সেশন শেষ হলে এটা দেখাবে 
                <>
                    {/* <SessionFinished
                         answeredStudents={currentStudent}
                         selectedBatch={selectedBatch}
                    /> */}
                </>
            ) : sessionTime >= 0 ? (
                <div className="space-y-6">
                    

                    <div className='fixed top-20 right-0 w-1/3 h-auto p-6 bg-transparent shadow-xl rounded-lg'>
                        {/* <h3 className='text-xl font-bold text-gray-700 mb-4 text-center'>Time Remaining</h3> */}
                        <div className='text-xl font-extrabold text-blue-600 text-center mb-4'>
                            <span className='text-orange-400 '>{currentStudent.name}</span> 
                            {/* Display the time here */}
                            {/* {sessionTime} You will probably have a function here to format this */}
                        </div>
                        <img src={currentStudent.imgLink} alt="img not found" className="w-16 h-16 rounded-full mr-4" />
                        <Timer key={timerKey} onTimeUp={handleTimeUp} sessionTime={isPaused ? sessionTime : sessionTime} />
                    </div>

                    <QuestionPanel questions={currentQuestions} />



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
                                .filter((student, index, self) => self.indexOf(student) === index) // Ensuring no duplicates
                                .map((student, index) => {
                                    const batchStudents = studentsData[selectedBatch] || [];
                                    const studentObj = batchStudents.find(s => s.name === student);

                                    if (!studentObj) return null;

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
                                        <ul className="list-disc pl-5 mt-2 flex flex-col">
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
