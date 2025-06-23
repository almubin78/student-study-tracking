import React from 'react';

const AnsweredStudents = ({ currentStudent, uniqueAnsweredStudents }) => {
    // const batchStudents = studentsData[selectedBatch] || [];

    return (
        <>
         {/* Display Answered Students in reverse way */}
         <h1>Hey this is separate component </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">
              Answered Students:{currentStudent?.length}
            </h3>
            <div className="overflow-y-auto max-h-64">
              {[...uniqueAnsweredStudents]
                .reverse() // Reverse the array to show newest first
                .map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center py-2 border-b border-gray-100"
                  >
                    <img
                      src={student.imgLink}
                      alt={student.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">
                        {student.score || "0"} pts
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
       
          
    );
};

export default AnsweredStudents;
