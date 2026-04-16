import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, Star, BarChart3, Target } from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Safe data
  const data = location.state || {};
  const obtainedMarks = data.obtainedMarks || 0;
  const totalMarks = data.totalMarks || 0;
  const totalScore = data.totalScore || 0;

  const percentage =
    totalMarks > 0 ? Math.floor((obtainedMarks / totalMarks) * 100) : 0;

  // 🎯 Performance
  let performance = "Average";
  if (percentage >= 80) performance = "Excellent";
  else if (percentage >= 60) performance = "Good";
  else if (percentage >= 40) performance = "Average";
  else performance = "Needs Improvement";

  // 🧠 Level System
  const level = Math.floor(totalScore / 100);
  const currentXP = totalScore % 100;
  const nextLevelXP = 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B132B] text-white px-4">

      <div className="w-full max-w-3xl text-center">

        {/* 🏆 Header */}
        <div className="mb-6">
          <Trophy className="mx-auto text-yellow-400 w-14 h-14 mb-2" />
          <h1 className="text-3xl font-bold">Results</h1>
          <p className="text-gray-400">Great job! You did amazing!</p>
        </div>

        {/* 📊 Score Card */}
        <div className="bg-gradient-to-r from-[#111827] to-[#1F2937] p-6 rounded-2xl border border-purple-500/30 shadow-lg">

          <p className="text-purple-400 mb-2">YOUR SCORE</p>

          {/* Marks */}
          <div className="text-5xl font-bold mb-2">
            <span className="text-green-400">{obtainedMarks}</span>
            <span className="mx-2">/</span>
            <span>{totalMarks}</span>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-6">

            <div className="flex flex-col items-center">
              <Star className="text-purple-400 mb-1" />
              <p className="text-lg font-semibold">{percentage}%</p>
              <p className="text-gray-400 text-sm">Percentage</p>
            </div>

            <div className="flex flex-col items-center">
              <BarChart3 className="text-blue-400 mb-1" />
              <p className="text-lg font-semibold">{totalScore}</p>
              <p className="text-gray-400 text-sm">Total Score</p>
            </div>

            <div className="flex flex-col items-center">
              <Target className="text-yellow-400 mb-1" />
              <p className="text-lg font-semibold text-yellow-400">
                {performance}
              </p>
              <p className="text-gray-400 text-sm">Performance</p>
            </div>

          </div>
        </div>

        {/* 🧠 Level Section */}
        <div className="mt-6 bg-[#111827] p-6 rounded-2xl shadow-md">

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Level {level}</h2>
            <span className="text-gray-400">Level {level + 1}</span>
          </div>

          {/* XP Bar */}
          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
            />
          </div>   

          <p className="text-sm text-gray-400 mt-2">
            {currentXP} / {nextLevelXP} XP
          </p>
        </div>

        {/* 🔘 Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Next Quiz →
          </button>
        </div>

      </div>
    </div>
  );
}