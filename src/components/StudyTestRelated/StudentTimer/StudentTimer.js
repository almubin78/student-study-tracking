import React, { useState, useEffect } from 'react';
import studentsData from '../../data/studentsData';
import questionsData from '../../data/questionsData';
import Timer from '../Timer';
import QuestionPanel from '../questions/QuestionPanel';
import BatchSelector from '../BatchSelector/BatchSelector';

const StudentTimer = () => {
    const [selectedBatch, setSelectedBatch] = useState(''); // Store selected batch
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [sessionTime, setSessionTime] = useState(2400);
    const [timerKey, setTimerKey] = useState(0);
    const [sessionStarted, setSessionStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Track pause status

    const selectRandomStudent = () => {
        const batchStudents = studentsData[selectedBatch];
        const randomStudent = batchStudents[Math.floor(Math.random() * batchStudents.length)];
        setCurrentStudent(randomStudent);
    };

    const selectRandomQuestions = () => {
        const batchQuestions = questionsData[selectedBatch];
        const shuffledQuestions = batchQuestions.sort(() => 0.5 - Math.random());
        setCurrentQuestions(shuffledQuestions.slice(0, 5));
    };

    const handleTimeUp = () => {
        if (sessionTime > 180) {
            setSessionTime((prevTime) => prevTime - 180);
            selectRandomStudent();
            selectRandomQuestions();
            setTimerKey((prevKey) => prevKey + 1);
        } else {
            setSessionTime(0);
        }
    };

    const handleStartSession = () => {
        if (selectedBatch) {
            setSessionStarted(true);
            setIsPaused(false); // Ensure not paused on start
            selectRandomStudent();
            selectRandomQuestions();
        } else {
            alert("Please select a batch before starting the session.");
        }
    };

    const handlePause = () => {
        setIsPaused((prev) => !prev); // Toggle pause state
    };

    const handleStop = () => {
        setSessionStarted(false);
        setIsPaused(false);
        setSessionTime(2400); // Reset time
        setCurrentStudent(null);
        setCurrentQuestions([]);
        setTimerKey((prevKey) => prevKey + 1); // Reset timer key
    };

    useEffect(() => {
        if (sessionStarted && !isPaused) {
            selectRandomStudent();
            selectRandomQuestions();
        }
    }, [selectedBatch, sessionStarted]);

    return (
        <div className="student-timer">
            {!sessionStarted ? (
                <>
                    <BatchSelector onSelectBatch={setSelectedBatch} />
                    <button onClick={handleStartSession}>Start Session</button>
                </>
            ) : sessionTime > 0 ? (
                <>
                    <h2>
                        Current Student: {currentStudent ? (
                            <>
                                <img src={currentStudent.imgLink} alt="img not found" style={{ width: '100px', marginRight: '10px' }} /> <br />
                                {currentStudent.name}
                            </>
                        ) : 'Loading...'}
                    </h2>

                    <Timer key={timerKey} onTimeUp={handleTimeUp} sessionTime={isPaused ? sessionTime : sessionTime} />
                    <QuestionPanel questions={currentQuestions} />

                    <div>
                        <button onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                        <button onClick={handleStop}>Stop</button>
                    </div>
                </>
            ) : (
                <h2>Session Over</h2>
            )}
        </div>
    );
};

export default StudentTimer;


/*
//Another successfull part

// src/components/StudentTimer.js
import React, { useState, useEffect } from 'react';
import studentsData from '../../data/studentsData';
import questionsData from '../../data/questionsData';
import Timer from '../Timer';
import QuestionPanel from '../questions/QuestionPanel';
import BatchSelector from '../BatchSelector/BatchSelector';

const StudentTimer = () => {
    const [selectedBatch, setSelectedBatch] = useState(''); // ব্যাচ স্টোর করছে
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [sessionTime, setSessionTime] = useState(2400);
    const [timerKey, setTimerKey] = useState(0);
    const [sessionStarted, setSessionStarted] = useState(false);

    const selectRandomStudent = () => {
        const batchStudents = studentsData[selectedBatch];
        const randomStudent = batchStudents[Math.floor(Math.random() * batchStudents.length)];
        setCurrentStudent(randomStudent);
    };

    const selectRandomQuestions = () => {
        const batchQuestions = questionsData[selectedBatch];
        const shuffledQuestions = batchQuestions.sort(() => 0.5 - Math.random());
        setCurrentQuestions(shuffledQuestions.slice(0, 5));
    };

    const handleTimeUp = () => {
        if (sessionTime > 180) {
            setSessionTime((prevTime) => prevTime - 180);
            selectRandomStudent();
            selectRandomQuestions();
            setTimerKey((prevKey) => prevKey + 1);
        } else {
            setSessionTime(0);
        }
    };

    const handleStartSession = () => {
        if (selectedBatch) {
            setSessionStarted(true);
            selectRandomStudent();
            selectRandomQuestions();
        } else {
            alert("Please select a batch before starting the session.");
        }
    };

    useEffect(() => {
        if (sessionStarted) {
            selectRandomStudent();
            selectRandomQuestions();
        }
    }, [selectedBatch]);

    return (
        <div className="student-timer">
            {!sessionStarted ? (
                <>
                    <BatchSelector onSelectBatch={setSelectedBatch} />
                    <button onClick={handleStartSession}>Start Session</button>
                </>
            ) : sessionTime > 0 ? (
                <>
                    <h2>
                        Current Student: {currentStudent ? (
                            <>
                                <img src={currentStudent.imgLink} alt={currentStudent.name} style={{ width: '50px', marginRight: '10px' }} />
                                {currentStudent.name}
                            </>
                        ) : 'Loading...'}
                    </h2>

                    <Timer key={timerKey} onTimeUp={handleTimeUp} />
                    <QuestionPanel questions={currentQuestions} />
                </>
            ) : (
                <h2>Session Over</h2>
            )}
        </div>
    );
};

export default StudentTimer;


*/
/*


ব্যাচ সিলেক্ট এর পুর্বের সফল অংশ


*/
// // ব্যাচ সিলেক্ট এর পুর্বের সফল অংশ
// import React, { useState, useEffect } from 'react';
// import studentsData from '../../data/studentsData';
// import questionsData from '../../data/questionsData';
// import Timer from '../Timer';
// import QuestionPanel from '../questions/QuestionPanel';

// const StudentTimer = () => {
//     const [currentStudent, setCurrentStudent] = useState(null);
//     const [currentQuestions, setCurrentQuestions] = useState([]);
//     const [sessionTime, setSessionTime] = useState(2400); // মোট ৪০ মিনিট (2400 সেকেন্ড)
//     const [timerKey, setTimerKey] = useState(0); // Timer রিস্টার্টের জন্য key

//     const selectRandomStudent = () => {
//         const randomStudent = studentsData[Math.floor(Math.random() * studentsData.length)];
//         setCurrentStudent(randomStudent);
//     };

//     const selectRandomQuestions = () => {
//         const shuffledQuestions = questionsData.sort(() => 0.5 - Math.random());
//         setCurrentQuestions(shuffledQuestions.slice(0, 5));
//     };

//     const handleTimeUp = () => {
//         if (sessionTime > 180) {
//             setSessionTime((prevTime) => prevTime - 180); // ৩ মিনিট বাদ দিয়ে সেশনের সময় কমাচ্ছে
//             selectRandomStudent();
//             selectRandomQuestions();
//             setTimerKey((prevKey) => prevKey + 1); // Timer রিস্টার্টের জন্য নতুন key সেট
//         } else {
//             setSessionTime(0); // সেশন শেষ হলে sessionTime শূন্যতে সেট করা হচ্ছে
//         }
//     };

//     useEffect(() => {
//         selectRandomStudent();
//         selectRandomQuestions();
//     }, []);

//     return (
//         <div className="student-timer">
//             {sessionTime > 0 ? (
//                 <>
//                     <h2>Current Student: {currentStudent ? currentStudent.name : 'Loading...'}</h2>
//                     <Timer key={timerKey} onTimeUp={handleTimeUp} /> {/* Timer কম্পোনেন্টে key প্রপার্টি */}
//                     <QuestionPanel questions={currentQuestions} />
//                 </>
//             ) : (
//                 <h2>Session Over</h2>
//             )}
//         </div>
//     );
// };

// export default StudentTimer;



// stop/pause button start
//  const [time, setTime] = useState(0); // Timer in seconds
//  const [isActive, setIsActive] = useState(false); // Timer status
//  const [isPaused, setIsPaused] = useState(false); // Pause status

//  useEffect(() => {
//      let interval = null;

//      if (isActive && !isPaused) {
//          interval = setInterval(() => {
//              setTime((prevTime) => prevTime + 1);
//          }, 1000); // Update every second
//      } else if (!isActive || isPaused) {
//          clearInterval(interval);
//      }

//      return () => clearInterval(interval); // Cleanup on component unmount
//  }, [isActive, isPaused]);

//  const handleStart = () => {
//      setIsActive(true);
//      setIsPaused(false);
//  };

//  const handlePause = () => {
//      setIsPaused(true);
//  };

//  const handleStop = () => {
//      setIsActive(false);
//      setIsPaused(false);
//      setTime(0); // Reset time
//  };

//  // stop/pause button END