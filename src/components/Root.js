import React from 'react';
import StudentTimerApp from './StudentTimer/StudentTimerApp';

const Root = () => {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">This is root component</h1>
            <StudentTimerApp/>
        </div>
    );
};

export default Root;