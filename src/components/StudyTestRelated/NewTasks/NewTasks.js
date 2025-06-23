import React from 'react';

const NewTasks = (newTasks,batchStudents) => {
    return (
        <div>
            <h3 className="text-lg font-bold mt-6">দেখে নাও কার জন্য কোন প্রশ্ন </h3>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {newTasks
                            .filter((taskObj, index, self) => self.findIndex(t => t.student === taskObj.student) === index)
                            .map((taskObj, index) => {
                                // Access the batch students
                                // const batchStudents = studentsData[selectedBatch] || [];
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
    );
};

export default NewTasks;