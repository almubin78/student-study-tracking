// src/components/QuestionPanel.js
import React from 'react';
import './QuestionPanel.css';

const QuestionPanel = ({ questions }) => {
  // const newQues =[...questions]
  return (
    <div className=" bg-white shadow-lg rounded-lg p-6  mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Questions</h3>
      <ul className="flex flex-col">
        {questions.map((question, index) => (
          // {newQues.map((question, index) => (
          <div key={question.id} className="grid grid-cols-[auto_1fr] gap-2 text-gray-700 text-lg">
            <span className="font-bold text-blue-600">{index + 1}. </span>
            <span className="whitespace-normal break-words">{question.question}</span>
          </div>

        ))}
      </ul>
    </div>

  );
};

export default QuestionPanel;
