import React, { useState } from 'react';
import { useStudents } from '../../hooks/useStudents';
import { useQuestions } from '../../hooks/useQuestions';
import Timer from '../Timer';
import StudentInfo from '../StudentInfo/StudentInfo';
import AnsweredStudents from '../AnsweredStudents/AnsweredStudents';
import BatchSelector from '../BatchSelector/BatchSelector';
import QuestionPanel from '../questions/QuestionPanel';

const StudentTimer3 = () => {
    const [selectedBatch, setSelectedBatch] = useState('');
    const [sessionStarted, setSessionStarted] = useState(false);
    const { currentStudent, answeredStudents, newTasks, selectRandomStudent, handleStudentAnswered } = useStudents(selectedBatch);
    const { currentQuestions, selectRandomQuestions } = useQuestions(selectedBatch);

    const handleStartSession = () => {
        if (selectedBatch) {
            setSessionStarted(true);
            selectRandomStudent();
            selectRandomQuestions();
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            {!sessionStarted ? (
                <div className="text-center">
                    <BatchSelector onSelectBatch={setSelectedBatch} />
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleStartSession}>
                        Start Session
                    </button>
                </div>
            ) : (
                <div>
                    <StudentInfo student={currentStudent} />
                    {currentStudent && (
                        <Timer onTimeUp={() => handleStudentAnswered(currentStudent)} />
                    )}
                    <AnsweredStudents answeredStudents={answeredStudents} selectedBatch={selectedBatch} />
                    <div className="mt-4">
                        <h3 className="font-bold text-lg">New Tasks:</h3>
                        {newTasks.length === 0 ? (
                            <p>No tasks assigned yet.</p>
                        ) : (
                            newTasks.map((taskObj, index) => (
                                <div key={index}>
                                    <h4>{taskObj.student}:</h4>
                                    <ul>
                                        {taskObj.tasks.map((task, idx) => (
                                            <li key={idx}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            <QuestionPanel questions={currentQuestions}/>
        </div>
    );
};

export default StudentTimer3;
