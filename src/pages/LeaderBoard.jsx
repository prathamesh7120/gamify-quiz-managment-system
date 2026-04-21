import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* 🌍 FLAG FUNCTION */
const getFlag = (code) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

/* ---------------- TOP 3 ---------------- */
const topPlayers = [
  {
    rank: 2,
    name: "QuizMaster",
    score: 9420,
    xp: 2300,
    avatar: "https://i.pravatar.cc/150?img=12",
    country: "GB",
  },
  {
    rank: 1,
    name: "Alex_Pro",
    score: 9850,
    xp: 2500,
    avatar: "https://i.pravatar.cc/150?img=32",
    country: "US",
  },
  {
    rank: 3,
    name: "BrainStorm",
    score: 9100,
    xp: 2100,
    avatar: "https://i.pravatar.cc/150?img=45",
    country: "CA",
  },
];

/* ---------------- REST LIST ---------------- */
const leaderboardData = [
  {
    rank: 4,
    name: "FastThinker",
    country: "AU",
    score: 8900,
    xp: 2000,
    correct: 89,
    streak: 8,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    rank: 5,
    name: "WiseOwl",
    country: "DE",
    score: 8700,
    xp: 1900,
    correct: 87,
    streak: 7,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    rank: 6,
    name: "SpeedRunner",
    country: "FR",
    score: 8500,
    xp: 1850,
    correct: 85,
    streak: 6,
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    rank: 7,
    name: "ThinkTank",
    country: "JP",
    score: 8300,
    xp: 1800,
    correct: 83,
    streak: 5,
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    rank: 8,
    name: "MindReader",
    country: "IT",
    score: 8100,
    xp: 1750,
    correct: 81,
    streak: 4,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    rank: 9,
    name: "QuickWit",
    country: "ES",
    score: 7900,
    xp: 1700,
    correct: 79,
    streak: 3,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    rank: 10,
    name: "GeniusX",
    country: "BR",
    score: 7700,
    xp: 1650,
    correct: 77,
    streak: 2,
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

/* ---------------- STYLE ---------------- */
const getCardStyle = (rank) => {
  if (rank === 1)
    return "bg-yellow-500/10 border-yellow-400 shadow-yellow-500/30 scale-105";
  if (rank === 2)
    return "bg-gray-400/10 border-gray-300";
  if (rank === 3)
    return "bg-orange-400/10 border-orange-400";
};

export default function LeaderBoard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#0F172A] text-white px-4 py-10">

      {/* 🔥 HEADER */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-pink-500">
          <Trophy className="text-white w-8 h-8" />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          GLOBAL LEADERBOARD
        </h1>

        <p className="text-gray-400 mt-2">
          Top players from around the world
        </p>
      </div>

      {/* 🏆 TOP 3 */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
        {topPlayers.map((player, index) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`w-72 rounded-2xl border p-6 text-center backdrop-blur-lg transition-all hover:scale-105 ${getCardStyle(player.rank)}`}
          >
            <div className="text-3xl mb-3">
              {player.rank === 1 && "🥇"}
              {player.rank === 2 && "🥈"}
              {player.rank === 3 && "🥉"}
            </div>

            <img
              src={player.avatar}
              alt={player.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20"
            />

            {/* ✅ NAME + FLAG */}
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-semibold">{player.name}</h2>
              <img
                src={getFlag(player.country)}
                alt={player.country}
                className="w-5 h-4 rounded-sm"
              />
            </div>

            <p className="text-2xl font-bold mt-2 text-yellow-400">
              #{player.rank}
            </p>

            <p className="text-2xl text-[#00F5D4] font-bold mt-3">
              {player.score.toLocaleString()}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {player.xp} XP
            </p>
          </motion.div>
        ))}
      </div>

      {/* 📊 REST LIST */}
      <div className="max-w-5xl mx-auto space-y-4">
        {leaderboardData.map((player, index) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between bg-[#111827] rounded-xl px-4 py-4 md:px-6 hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-purple-400">
                #{player.rank}
              </div>

              <img
                src={player.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div>
                {/* ✅ NAME + FLAG */}
                <div className="flex items-center gap-2 font-semibold">
                  {player.name}
                  <img
                    src={getFlag(player.country)}
                    alt={player.country}
                    className="w-5 h-4 rounded-sm"
                  />
                </div>

                <div className="text-sm text-gray-400">
                  {player.correct} correct • {player.streak} streak
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[#00F5D4] font-bold">
                {player.score.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">
                {player.xp} XP
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔘 BUTTONS */}
      <div className="flex justify-center gap-4 mt-10 flex-wrap">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
        >
          Play Now
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 border border-gray-500 rounded-lg"
        >
          Back to Home
        </button>
      </div>

    </div>
  );
}