import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Star } from "lucide-react";

import Card from "../components/ui/Card";
import Progress from "../components/ui/Progress";

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
];

export default function QuizGame() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  const question = quizData[currentQuestion];

  const progress =
    quizData.length > 0
      ? ((currentQuestion + 1) / quizData.length) * 100
      : 0;

  // TIMER LOGIC
  useEffect(() => {
    if (!question) return;

    if (timer > 0 && !showResult) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (timer === 0 && !showResult) {
      handleTimeout();
    }
  }, [timer, showResult]);

  const handleTimeout = () => {
    setShowResult(true);
    setStreak(0);

    setTimeout(() => {
      nextQuestion();
    }, 1200);
  };

  const handleAnswer = (index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correct) {
      setScore((prev) => prev + 100);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1200);
  };

  const nextQuestion = () => {
    const next = currentQuestion + 1;

    if (next < quizData.length) {
      setCurrentQuestion(next);
      setTimer(15);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      navigate("/results", {
        state: {
          score,
          totalQuestions: quizData.length,
        },
      });
    }
  };

  if (!question) {
    return <h1 className="text-white">Loading Quiz...</h1>;
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white p-6 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-purple-500/10 blur-[140px] rounded-full" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        {/* TIMER */}
        <motion.div
          animate={timer <= 5 ? { scale: [1, 1.1, 1] } : {}}
          className="flex items-center gap-2 bg-[#111827]/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-cyan-500/20"
        >
          <Clock className={`w-5 h-5 ${timer <= 5 ? "text-red-400" : "text-cyan-400"}`} />
          <span className="text-xl font-bold">{timer}s</span>
        </motion.div>

        {/* SCORE */}
        <motion.div
          key={score}
          animate={{ scale: [1, 1.1, 1] }}
          className="flex items-center gap-2 bg-[#111827]/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-yellow-500/20"
        >
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-bold text-yellow-300">{score}</span>
        </motion.div>

        {/* STREAK */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/30"
          >
            <Zap className="w-5 h-5 text-orange-300" />
            <span className="font-bold">{streak}x</span>
          </motion.div>
        )}
      </div>

      {/* PROGRESS */}
      <div className="mb-6">
        <Progress value={progress} />
      </div>

      {/* QUESTION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <Card className="p-8 bg-[#0F172A]/70 border border-cyan-500/10">

            <h2 className="text-2xl font-semibold mb-8 text-center">
              {question.question}
            </h2>

            <div className="grid gap-4">

              {question.options.map((option, index) => {
                const isCorrect = index === question.correct;
                const isSelected = index === selectedAnswer;

                let style =
                  "bg-[#111827]/60 border border-white/5 hover:border-cyan-400/40";

                if (showResult) {
                  if (isCorrect) {
                    style = "bg-green-500/10 border-green-400/40";
                  } else if (isSelected) {
                    style = "bg-red-500/10 border-red-400/40";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-4 rounded-xl text-left font-medium ${style}`}
                  >
                    {option}
                  </motion.button>
                );
              })}

            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 