import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, User, Gamepad2, ArrowRight, Sparkles } from "lucide-react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";

export default function JoinQuiz() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🎮");
  const [loading, setLoading] = useState(false);

  const avatars = ["🎮", "🎯", "🚀", "⚡", "🔥", "💎", "🌟", "🦄", "🎪", "🎨", "🎭", "🎸"];

  const handleJoin = () => {
    const cleanCode = code.trim().toUpperCase();
    const cleanName = playerName.trim();

    if (!cleanCode || !cleanName) return;

    setLoading(true);

    localStorage.setItem(
      "player",
      JSON.stringify({
        name: cleanName,
        avatar: selectedAvatar,
      })
    );

    navigate(`/quiz/${cleanCode}`);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden flex items-center justify-center p-6">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#00F5D4]/10 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#111827] border-[#6C5CE7]/30 p-8 shadow-[0_0_50px_rgba(108,92,231,0.3)]">

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63] rounded-2xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
              JOIN GAME
            </h1>
            <p className="text-gray-400">Enter your code and get ready to play!</p>
          </div>

          <div className="space-y-6">

            {/* Quiz Code */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white">
                <Code className="w-4 h-4 text-[#00F5D4]" />
                Quiz Code
              </label>

              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\s/g, "").toUpperCase())
                }
                maxLength={6}
                className="bg-[#1E293B] border-[#6C5CE7]/30 text-center text-2xl tracking-widest h-14"
              />
            </div>

            {/* Player Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-white">
                <User className="w-4 h-4 text-[#00F5D4]" />
                Player Name
              </label>

              <Input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                className="bg-[#1E293B] border-[#6C5CE7]/30 h-12"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3 text-white">
                <Sparkles className="w-4 h-4 text-[#00F5D4]" />
                Choose Avatar
              </label>

              <div className="grid grid-cols-6 gap-2">
                {avatars.map((avatar) => (
                  <motion.button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-3 rounded-xl transition-all ${
                      selectedAvatar === avatar
                        ? "bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63] shadow-lg"
                        : "bg-[#1E293B] hover:bg-[#273449]"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Join Button */}
            <Button
              className="w-full h-14 rounded-xl text-white font-semibold 
              bg-gradient-to-r from-[#6C5CE7] via-[#8B5CF6] to-[#FF2E63]
              hover:scale-[1.02] transition-all duration-300
              shadow-[0_0_20px_rgba(108,92,231,0.5)]"
              onClick={handleJoin}
              disabled={!code.trim() || !playerName.trim() || loading}
            >
              {loading ? "Joining..." : "JOIN GAME"}
              <ArrowRight className="ml-2 text-white" />
            </Button>

            {/* Back Button */}
            <Button
              onClick={() => navigate("/")}
              className="w-full h-12 rounded-xl text-white font-medium
              bg-white/5 backdrop-blur-md border border-white/10
              hover:bg-white/10 transition-all duration-300"
            >
              Back to Home
            </Button>

          </div>
        </Card>
      </motion.div>
    </div>
  );
}