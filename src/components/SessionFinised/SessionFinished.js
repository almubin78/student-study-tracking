import React, { useEffect } from 'react';
import NewTasks from '../NewTasks/NewTasks';
import studentsData from '../../../data/studentsData';

const SessionFinished = (answeredStudents, selectedBatch) => {
    const renderedTbody = (answeredStudents) => {

        if (answeredStudents) {
            return <tbody>
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
        }
    }

    // console.log(answeredStudents);
    return (
        <div>
            <h2 className="text-2xl font-bold text-green-600">Session Finished</h2>
            <h3 className="text-lg font-bold mt-6">Answered Students:</h3>

            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Score</th>
                    </tr>
                </thead>
            </table>
                {/* {renderedTbody()} */}
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
            {/* <NewTasks newTasks={newTasks} batchStudents={batchStudents}/> */}
            {/* <h3 className="text-lg font-bold mt-6">দেখে নাও কার জন্য কোন প্রশ্ন </h3>
            <div className="bg-white shadow-md rounded-lg p-4">
                {NewTasks
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
            </div> */}
        </div>
    );
};

export default SessionFinished;