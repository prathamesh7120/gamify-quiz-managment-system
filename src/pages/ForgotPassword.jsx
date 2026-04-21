import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  Send,
  Gamepad2,
  Sparkles,
  Zap,
  Trophy,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("quizUsers") || "{}");
    const user = users[email];

    if (!user) {
      setError("No account found with this email address");
      return;
    }

    localStorage.setItem("resetEmail", email);
    setIsSubmitted(true);

    setTimeout(() => {
      navigate("/reset-password"); // ✅ FIXED (was /ResetPassword)
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden flex items-center justify-center p-4">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-20 left-20 opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}>
          <Trophy className="w-24 h-24 text-[#F59E0B]" />
        </motion.div>

        <motion.div className="absolute top-32 right-24 opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}>
          <Zap className="w-20 h-20 text-[#00F5D4]" />
        </motion.div>

        <motion.div className="absolute bottom-32 left-32 opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}>
          <Gamepad2 className="w-28 h-28 text-[#FF2E63]" />
        </motion.div>

        <motion.div className="absolute bottom-24 right-32 opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity }}>
          <Sparkles className="w-24 h-24 text-[#6C5CE7]" />
        </motion.div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#111827] rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] p-6 text-center">
          <Mail className="w-10 h-10 text-white mx-auto mb-3" />
          <h1 className="font-game text-3xl font-bold text-white">FORGOT PASSWORD</h1>
          <p className="text-white/80 mt-2">Recover your account</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label className="text-white">Email</label>
                  <div className="flex items-center bg-white/5 rounded-lg px-3 mt-1">
                    <Mail className="text-purple-400" size={18} />
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="bg-transparent w-full p-2 text-white outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* ✅ FIXED: submit button (was wrong type + wrong navigate) */}
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded-lg text-white"
                >
                  Send Reset Link
                </button>

              </form>

              {error && (
                <div className="mt-3 text-red-400 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 text-[#00F5D4]"
                >
                  <ArrowLeft size={16} className="inline mr-1 text-center" />
                  Back to Login
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle className="text-green-400 mx-auto mb-3" size={40} />
              <p className="text-white">
                Reset link sent to <span className="text-[#00F5D4]">{email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;