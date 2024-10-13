import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Question from './components/Question';
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackClass, setFeedbackClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(600);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer > 0 && currentQuestionIndex < questions.length) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsTimeUp(true);
            setFeedback('Time is up! You cannot answer any more questions.');
            clearInterval(timerId);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timer, currentQuestionIndex, questions.length]);

  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setFeedback('');
    setFeedbackClass('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimer(30);
    } else {
      setTimer(0);
      setQuestionTimer(0);
      setIsTimeUp(true);
      setQuizFinished(true);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (questionTimer > 0 && !quizFinished && !isTimeUp) {
      const questionTimerId = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(questionTimerId);
    }
  }, [questionTimer, quizFinished, isTimeUp, handleNextQuestion]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://pacmann-frontend.pacmann.workers.dev/');
      const questionsData = response.data.data;
      if (questionsData.length > 0) {
        setQuestions(questionsData);
      } else {
        setError('No questions available.');
      }
    } catch {
      setError('Failed to fetch questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (answer) => {
    if (!isTimeUp) {
      setSelectedAnswer(answer);
      setQuestionTimer(0);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correctOption = questions[currentQuestionIndex].options.find(
      (option) => option.label === questions[currentQuestionIndex].correctAnswer
    );

    if (selectedAnswer === correctOption.value) {
      setFeedback('Correct!');
      setFeedbackClass('feedback-correct');
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback(`Incorrect. The correct answer is: ${correctOption.value}`);
      setFeedbackClass('feedback-incorrect');
    }

    if (currentQuestionIndex === questions.length - 1) {
      setTimer(0);
      setIsTimeUp(true);
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback('');
    setFeedbackClass('');
    setTimer(600);
    setQuestionTimer(30);
    setScore(0);
    setQuizFinished(false);
    setIsTimeUp(false);
    fetchQuestions();
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  const isLowTime = questionTimer <= 10;

  if (isTimeUp || quizFinished) {
    return (
      <div className="score-screen">
        <h2 className="score-title">Quiz Finished!</h2>
        <p className="score-text">Your Score: <span className="score-highlight">{score}/{questions.length}</span></p>
        <button onClick={handleRestartQuiz} className="restart-button">Back to Quiz</button>
      </div>
    );
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const questionMinutes = Math.floor(questionTimer / 60);
  const questionSeconds = questionTimer % 60;

  return (
    <>
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1>ThinkTank</h1>
          <div className="question-info">
            Question: {currentQuestionIndex + 1}/{questions.length}
          </div>
          <div className="timer">
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="app-container">
        <div className={`question-timer ${isLowTime ? 'low-time' : ''}`}>
          Time for this question: {questionMinutes}:{questionSeconds < 10 ? `0${questionSeconds}` : questionSeconds}
        </div>

        <Question
          questionData={questions[currentQuestionIndex]}
          handleSelectAnswer={handleSelectAnswer}
          selectedAnswer={selectedAnswer}
          feedback={feedback}
          feedbackClass={feedbackClass}
        />

        {!feedback && (
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        )}

        {feedback && (
          <div className={feedbackClass}>
            <p>{feedback}</p>
            <p>Your current score: {score}</p>
            {currentQuestionIndex < questions.length - 1 && (
              <button onClick={handleNextQuestion} className="next-button">
                Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
