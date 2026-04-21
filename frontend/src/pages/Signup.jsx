import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Gamepad2,
  Sparkles,
  Zap,
  Trophy,
  Shield,
  UserCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    // Temporary success
    setSuccess("Account created successfully! Redirecting to login...");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        <motion.div
          className="absolute top-20 left-20 opacity-20"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gamepad2 className="w-28 h-28 text-[#FF2E63]" />
        </motion.div>

        <motion.div
          className="absolute bottom-24 right-32 opacity-20"
          animate={{ rotate: [0, 40, -40, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-24 h-24 text-[#6C5CE7]" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div className="relative z-10 w-full max-w-md">
        <div className="bg-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="font-game text-3xl font-bold text-white">
              JOIN THE GAME
            </h1>

            <p className="text-white/80 mt-2">
              Create your account and start playing
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-white mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C5CE7]" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white"
                    required
                  />
                </div>
              </div>

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

              {/* Confirm Password */}
              <div>
                <label className="block text-white mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C5CE7]" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex-1 p-3 rounded-xl ${
                    role === "user"
                      ? "bg-[#00F5D4]/20"
                      : "bg-white/5"
                  }`}
                >
                  <UserCircle className="inline mr-2" />
                  USER
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 p-3 rounded-xl ${
                    role === "admin"
                      ? "bg-[#FF2E63]/20"
                      : "bg-white/5"
                  }`}
                >
                  
                  <Shield className="inline mr-2" />
                  ADMIN
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] text-white py-3 rounded-xl font-bold"
              >
                <UserPlus className="inline mr-2" />
                CREATE ACCOUNT
              </motion.button>
            </form>

            {/* Error */}
            {error && (
              <div className="mt-4 text-red-400 flex gap-2">
                <AlertCircle />
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-4 text-green-400 flex gap-2">
                <CheckCircle />
                {success}
              </div>
            )}

            {/* Login */}
            <div className="mt-6 text-center">
              <p className="text-white/60">
              Already have an account?{""} 
              <button onClick={() => navigate("/")}
                className=" ml-2 text-[#00F5D4]">
                Login here
              </button>
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}