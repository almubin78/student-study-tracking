import React from 'react';

const ErrorElement = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] bg-red-50 border border-red-200 rounded-lg p-6 shadow-md">
            <span className="text-4xl mb-2 text-red-500">⚠️</span>
            <h2 className="text-xl font-semibold text-red-700 mb-1">Something went wrong</h2>
            <p className="text-red-600">Oops! Please try again later.</p>
        </div>
    );
};

export default ErrorElement;