import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Zap, Star, Users } from "lucide-react";
import { Card } from "../components/Card";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "Real-time Quiz", desc: "Live gameplay" },
    { icon: <Trophy className="w-6 h-6" />, title: "Leaderboards", desc: "Track ranks" },
    { icon: <Star className="w-6 h-6" />, title: "XP System", desc: "Earn rewards" },
    { icon: <Users className="w-6 h-6" />, title: "Multiplayer", desc: "Play with friends" },
  ];

  const stats = [
    { value: "10K+", label: "Players 👥" },
    { value: "500+", label: "Quizzes 🧠" },
    { value: "1M+", label: "XP ⚡" },
    { value: "50+", label: "Countries 🌍" },
  ];

  const topPlayers = [
    { rank: 1, name: "Alex_Pro", score: 9850, flag: "🇺🇸" },
    { rank: 2, name: "QuizMaster", score: 9420, flag: "🇮🇳" },
    { rank: 3, name: "BrainStorm", score: 9100, flag: "🇬🇧" },
    { rank: 4, name: "FastThinker", score: 8900, flag: "🇨🇦" },
    { rank: 5, name: "WiseOwl", score: 8700, flag: "🇦🇺" },
  ];

  const handleStartQuiz = () => {
    const role = localStorage.getItem("role");
    if (role) navigate("/quiz");
    else navigate("/login");
  };

  return (
   <div className="relative min-h-screen bg-[#0F172A] text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-10 pointer-events-none">

        {/* Animated Gradient */}
        <div className="absolute inset-0 animated-bg"></div>

        {/* Glow Blobs */}
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>

        {/* Floating Icons */}
        <div className="absolute inset-0">

          <motion.div
            className="absolute top-20 left-20 opacity-60"
            animate={{ y: [0, -40, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Trophy className="w-32 h-32 text-yellow-400 drop-shadow-[0_0_40px_#F59E0B]" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-20 opacity-60"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-28 h-28 text-purple-400 drop-shadow-[0_0_40px_#6C5CE7]" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/4 opacity-40"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Zap className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_30px_#00F5D4]" />
          </motion.div>

        </div>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="relative z-10">

        {/* HERO */}
        <div className="text-center pt-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,150,0.5)]">
            PLAY. COMPETE. WIN.
          </h1>

          <p className="text-gray-400 mt-3">
            Challenge players worldwide in a fun quiz game
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button
              onClick={handleStartQuiz}
              className="px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Start Game
            </button>

            <button
              onClick={() => navigate("/join")}
              className="px-5 py-3 rounded-full border border-cyan-400 text-cyan-400"
            >
              Join Code
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6 mt-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/10 p-4 rounded-lg text-center backdrop-blur">
              <h3 className="text-lg font-bold text-cyan-400">{s.value}</h3>
              <p className="text-gray-300 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6 mt-12">
          {features.map((f, i) => (
            <Card key={i} className="bg-white/10 p-4 rounded-lg backdrop-blur">
              <div className="text-cyan-400">{f.icon}</div>
              <h3 className="font-bold mt-2">{f.title}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </Card>
          ))}
        </div>

        {/* LEADERBOARD */}
        <div className="px-4 md:px-8 mt-12 pb-12">
          <h2 className="text-xl font-bold mb-4 text-center">Top Players</h2>

          <div className="space-y-2">
            {topPlayers.map((p, i) => (
              <div
                key={i}
                className="flex justify-between bg-white/10 p-3 rounded-lg backdrop-blur"
              >
                <div className="flex gap-3">
                  <span>#{p.rank}</span>
                  <span>{p.flag}</span>
                  <span>{p.name}</span>
                </div>

                <div className="text-cyan-400">{p.score}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}