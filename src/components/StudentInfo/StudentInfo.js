import React from 'react';

const StudentInfo = ({ student }) => {
    if (!student) return <div>Loading...</div>;

    return (
        <div className="flex items-center">
            <img src={student.imgLink} alt="student" className="w-16 h-16 rounded-full mr-4" />
            <h2 className="text-xl font-bold">{student.name}</h2>
        </div>
    );
};

export default StudentInfo;
