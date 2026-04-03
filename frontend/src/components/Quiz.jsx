// src/components/Quiz.jsx
import React, { useState } from 'react';
import { X, Check, AlertCircle, Trophy, Car, Clock, Award } from 'lucide-react';
import { IoLogoYoutube } from 'react-icons/io5';

const Quiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Static car-related questions
  const questions = [
    {
      id: 1,
      text: "What does 'SUV' stand for in the automotive world?",
      options: [
        "Sports Utility Vehicle",
        "Super Urban Vehicle",
        "Standard Utility Van",
        "Sport Utility Vehicle"
      ],
      correctAnswer: "Sport Utility Vehicle",
      explanation: "SUV stands for Sport Utility Vehicle, combining off-road capabilities with passenger comfort."
    },
    {
      id: 2,
      text: "Which company produces the 'Mustang' car model?",
      options: [
        "Chevrolet",
        "Dodge",
        "Ford",
        "Tesla"
      ],
      correctAnswer: "Ford",
      explanation: "The Ford Mustang is an iconic American muscle car first introduced in 1964."
    },
    {
      id: 3,
      text: "What is the typical number of cylinders in a standard inline-4 engine?",
      options: [
        "4 cylinders",
        "6 cylinders",
        "8 cylinders",
        "3 cylinders"
      ],
      correctAnswer: "4 cylinders",
      explanation: "An inline-4 engine has 4 cylinders arranged in a straight line, commonly used in compact cars."
    },
    {
      id: 4,
      text: "Which fuel type is known for being more environmentally friendly?",
      options: [
        "Petrol",
        "Diesel",
        "Electric",
        "Hydrogen"
      ],
      correctAnswer: "Electric",
      explanation: "Electric vehicles produce zero direct emissions, making them the most environmentally friendly among common options."
    },
    {
      id: 5,
      text: "What does 'ABS' stand for in car safety systems?",
      options: [
        "Automatic Braking System",
        "Anti-lock Braking System",
        "Advanced Brake Support",
        "Auto Balance System"
      ],
      correctAnswer: "Anti-lock Braking System",
      explanation: "ABS prevents wheels from locking up during braking, maintaining steering control."
    }
  ];

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: (correct / questions.length) * 100
    };
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();

  if (!quizStarted) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity"></div>
        
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full p-2">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Car Knowledge Quiz</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Test Your Car Knowledge!</h4>
                <p className="text-gray-600">Challenge yourself with 5 car-related questions</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-semibold text-gray-900">{questions.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Time Limit:</span>
                  <span className="font-semibold text-gray-900">No time limit</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Topics:</span>
                  <span className="font-semibold text-gray-900">Car Brands, Engines, Safety</span>
                </div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Car className="w-5 h-5" />
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const isPassed = score.percentage >= 60;
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity"></div>
        
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full p-2">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Quiz Results</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isPassed ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {isPassed ? (
                    <Check className="w-16 h-16 text-green-600" />
                  ) : (
                    <AlertCircle className="w-16 h-16 text-yellow-600" />
                  )}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {isPassed ? 'Congratulations!' : 'Good Try!'}
                </h4>
                <p className="text-gray-600 mb-4">
                  You scored {score.correct} out of {score.total} ({Math.round(score.percentage)}%)
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isPassed ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${score.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Detailed Answers */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                <h5 className="font-semibold text-gray-900 mb-3">Detailed Review:</h5>
                {questions.map((question, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        {isCorrect ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{question.text}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {userAnswer || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mt-1">
                              Correct answer: {question.correctAnswer}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                >
                  Restart Quiz
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity"></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full p-2">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Car Quiz</h3>
                <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-500">Take your time to answer</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                {currentQ.text}
              </h4>
              
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === option
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === option
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === option && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={!hasAnswered}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  !hasAnswered
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;