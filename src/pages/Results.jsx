import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Trophy, Star, CheckCircle, XCircle, TrendingUp, Zap } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Progress } from "../components/Progress";


export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const score = state.score || 0;
  const totalQuestions = state.totalQuestions || 10;

  const [animatedScore, setAnimatedScore] = useState(0);

  const correctAnswers = Math.floor((score / 1500) * totalQuestions);
  const wrongAnswers = totalQuestions - correctAnswers;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const rank =
    accuracy >= 80 ? "Master" :
    accuracy >= 60 ? "Expert" :
    accuracy >= 40 ? "Skilled" :
    "Beginner";

  const xpEarned = Math.floor(score / 5);

  const getBadge = () => {
    if (accuracy >= 90)
      return { icon: "🏆", name: "Champion", color: "from-[#FFD700] to-[#FFA500]" };
    if (accuracy >= 75)
      return { icon: "🥇", name: "Gold Star", color: "from-[#6C5CE7] to-[#FF2E63]" };
    if (accuracy >= 60)
      return { icon: "🥈", name: "Silver Badge", color: "from-[#C0C0C0] to-[#A8A8A8]" };

    return { icon: "🥉", name: "Bronze Medal", color: "from-[#CD7F32] to-[#8B4513]" };
  };

  const badge = getBadge();

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();

    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < score) {
          return Math.min(prev + Math.ceil(score / 50), score);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">

        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full 
            bg-gradient-to-r from-purple-500 to-pink-500 mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r 
       from-purple-500 via-pink-500 to-red-500
            bg-clip-text text-transparent tracking-wide">
            QUIZ COMPLETE!
          </h1>

          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Here's how you performed
          </p>
        </div>

        <Card className="p-6 bg-[#111827] mb-6">

          <div className="text-center mb-6">
            <div className="text-5xl text-purple-400 font-bold">
              {animatedScore}
            </div>
            <p className="text-gray-400">Total Score</p>
          </div>

          {/* 🔥 ONLY THIS PART UPDATED */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">

            <div className="bg-[#1e293b] rounded-xl p-4 text-center hover:scale-105 transition-all">
              <CheckCircle className="mx-auto text-green-400 mb-2" />
              <p className="text-green-400 text-xl font-bold">{correctAnswers}</p>
              <p className="text-gray-400 text-sm">Correct</p>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-4 text-center hover:scale-105 transition-all">
              <XCircle className="mx-auto text-red-400 mb-2" />
              <p className="text-red-400 text-xl font-bold">{wrongAnswers}</p>
              <p className="text-gray-400 text-sm">Wrong</p>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-4 text-center hover:scale-105 transition-all">
              <TrendingUp className="mx-auto text-cyan-400 mb-2" />
              <p className="text-cyan-400 text-xl font-bold">{accuracy}%</p>
              <p className="text-gray-400 text-sm">Accuracy</p>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-4 text-center hover:scale-105 transition-all">
              <Zap className="mx-auto text-yellow-400 mb-2" />
              <p className="text-yellow-400 text-xl font-bold">{xpEarned}</p>
              <p className="text-gray-400 text-sm">XP</p>
            </div>

          </div>

          <Progress value={accuracy} />

        </Card>

        <div className={`rounded-2xl p-8 text-center text-white mb-6 bg-gradient-to-r ${badge.color}`}>
          <div className="text-5xl mb-3">{badge.icon}</div>
          <h2 className="text-2xl font-semibold">{badge.name}</h2>
          <p className="text-sm opacity-90">Badge Unlocked!</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 flex justify-between items-center text-white mb-6">

          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Star size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Your Rank: {rank}
              </h3>
              <p className="text-sm opacity-80">
                Keep playing to improve!
              </p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-3xl font-bold text-green-300">
              #{Math.floor(Math.random() * 100) + 1}
            </h2>
            <p className="text-xs opacity-80">Global Rank</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">

          <button
            onClick={() => navigate("/quiz/demo")}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-all"
          >
            Play Again
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="flex-1 py-3 rounded-full border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black transition-all"
          >
            View Leaderboard
          </button>

          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate("/", { replace: true });
              } else {
                window.location.href = "/";
              }
            }}
            className="text-gray-400 text-sm hover:text-white"
          >
            Back to Home
          </button>

        </div>

      </div>
    </div>
  );
}