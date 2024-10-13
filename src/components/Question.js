// components/Question.js
import React from 'react';

const Question = ({ questionData, handleSelectAnswer, selectedAnswer, isTimeUp }) => {
  return (
    <div className="options-container">
      <p className="question">{questionData.question}</p>
      <ul className="options-list">
        {questionData.options.map((option) => (
          <li key={option.label} className="option-item">
            <button
              className="option-button"
              onClick={() => handleSelectAnswer(option.value)}
              disabled={isTimeUp || selectedAnswer !== null}
            >
              {option.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
