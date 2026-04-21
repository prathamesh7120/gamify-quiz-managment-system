import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  Gamepad2,
  Sparkles,
  Zap,
  Trophy,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Super Admin
    if (email === "admin@quiz.com" && password === "admin123") {
      localStorage.setItem("currentUser", JSON.stringify({ email, username: "Super Admin", role: "superadmin" }));
      localStorage.setItem("role", "superadmin");
      navigate("/superadmin");
      return;
    }

    // Quiz Admin (AdminDashboard)
    if (email === "quizadmin@quiz.com" && password === "quiz123") {
      localStorage.setItem("currentUser", JSON.stringify({ email, username: "Quiz Admin", role: "admin" }));
      localStorage.setItem("role", "admin");
      navigate("/admin");
      return;
    }

    // Regular User
    localStorage.setItem("currentUser", JSON.stringify({ email, username: "Player", role: "user" }));
    localStorage.setItem("role", "user");
    navigate("/user-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Trophy className="w-24 h-24 text-[#F59E0B]" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-24 opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Zap className="w-20 h-20 text-[#00F5D4]" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <Gamepad2 className="w-28 h-28 text-[#FF2E63]" />
        </motion.div>
        <motion.div
          className="absolute bottom-24 right-32 opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-24 h-24 text-[#6C5CE7]" />
        </motion.div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] p-6 text-center relative overflow-hidden">
            <div className="relative flex justify-center mb-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="font-game text-3xl font-bold text-white">
              PLAYER LOGIN
            </h1>
            <p className="text-white/80 mt-2">Enter the arena</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-white mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C5CE7]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C5CE7]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[#00F5D4] hover:text-[#00F5D4]/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] text-white py-3 rounded-xl font-bold"
              >
                <LogIn className="w-5 h-5 inline mr-2" />
                START PLAYING
              </motion.button>
            </form>

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Signup */}
            <div className="mt-6 text-center">
              <p className="text-white/60">
                New player?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="ml-2 text-[#00F5D4]"
                >
                  Sign up here
                </button>
              </p>
            </div>

            {/* Guest */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate("/JoinQuiz")}
                className="mt-4 w-full bg-white/5 border border-white/10 hover:border-[#00F5D4] hover:bg-white/10 text-white py-3 rounded-xl transition-all"
              >
                Join as Guest
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}