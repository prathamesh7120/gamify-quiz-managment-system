import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"],
    correct: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
  
];

export default function QuizGame() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0); // 🎯 total points
  const [marks, setMarks] = useState(0); // ✅ correct answers
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  // ⏱ Timer logic
  useEffect(() => {
    if (timer > 0 && !showResult) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !showResult) {
      handleTimeout();
    }
  }, [timer, showResult]);

  const handleTimeout = () => {
    setShowResult(true);
    setTimeout(nextQuestion, 1500);
  };

  const handleAnswer = (index) => {
    if (showResult || selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === question.correct;

    if (isCorrect) {
      const points = Math.max(100, timer * 10);

      // ✅ update total points
      setScore((prev) => prev + points);

      // ✅ update marks
      setMarks((prev) => prev + 1);

      // ✅ better XP formula
      const xp = Math.floor(points / 10);
      setXpGained(xp);
    } else {
      setXpGained(0);
    }

    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(15);
      setSelectedAnswer(null);
      setShowResult(false);
      setXpGained(0);
    } else {
      // 🚀 FINAL NAVIGATION TO RESULTS
      navigate("/results", {
        state: {
          obtainedMarks: marks,
          totalMarks: quizData.length,
          totalScore: score,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">

      {/* 🔥 Animated Background */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-4xl">

        {/* 🔝 Top Bar */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center gap-2 bg-[#111827] px-3 py-1 rounded-lg">
            <Clock className="text-cyan-400 w-4 h-4" />
            <span>{timer}s</span>
          </div>

          <div className="text-gray-400">
            {currentQuestion + 1} / {quizData.length}
          </div>

          <div className="flex items-center gap-2 bg-[#111827] px-3 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{score}</span>
          </div>
        </div>

        {/* 📊 Progress Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ❓ Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-6 border-b border-purple-500 inline-block pb-1">
            {question.question}
          </h2>

          {/* 🟢 Options */}
          <div className="grid gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;

              let stateStyle = "bg-[#1F2937]";

              if (showResult) {
                if (isCorrect) {
                  stateStyle = "bg-green-600";
                } else if (isSelected) {
                  stateStyle = "bg-red-600";
                }
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg text-left transition ${stateStyle}`}
                >
                  <span className="mr-2 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 🎉 XP Popup */}
        {xpGained > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mt-6 text-green-400 text-xl font-bold"
          >
            🎉 +{xpGained} XP
          </motion.div>
        )}
      </div>
    </div>
  );
}