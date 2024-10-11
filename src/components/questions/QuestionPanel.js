// src/components/QuestionPanel.js
import React from 'react';
import './QuestionPanel.css';

const QuestionPanel = ({ questions }) => {
  return (
    <div className="question-panel bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Questions</h3>
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={question.id} className="text-gray-700 text-lg">
            <span className="font-bold text-blue-600">{index + 1}. </span>
            <span className="whitespace-normal break-words">{question.question}</span>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default QuestionPanel;
