import React from 'react';
import studentsData from '../../data/studentsData';

const AnsweredStudents = ({ answeredStudents, selectedBatch }) => {
    const batchStudents = studentsData[selectedBatch] || [];

    return (
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Score</th>
                </tr>
            </thead>
            <tbody>
                {answeredStudents.map((student, index) => {
                    const studentObj = batchStudents.find(s => s.name === student);

                    if (!studentObj) return null;

                    return (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-2">
                                <img src={studentObj.imgLink} alt={studentObj.name} className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="px-4 py-2">{studentObj.name}</td>
                            <td className="px-4 py-2 text-green-600">{studentObj.score || '0'} pts</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AnsweredStudents;
