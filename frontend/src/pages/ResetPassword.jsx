import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock, Eye, EyeOff, Shield, CheckCircle,
  AlertCircle, Gamepad2, Sparkles, Zap, Trophy
} from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const e = localStorage.getItem("resetEmail");
    if (!e) return navigate("/forgot-password");
    setEmail(e);
  }, [navigate]);

  const validatePassword = (p) => {
    if (p.length < 6) return "Min 6 characters";
    if (!/[A-Z]/.test(p)) return "Add uppercase letter";
    if (!/[a-z]/.test(p)) return "Add lowercase letter";
    if (!/[0-9]/.test(p)) return "Add number";
    return "";
  };

  const getStrength = (p) => {
    let s = [p.length >= 6, p.length >= 10, /[A-Z]/.test(p), /[a-z]/.test(p), /[0-9]/.test(p)].filter(Boolean).length;
    return s <= 2
      ? { label: "Weak", color: "#FF2E63", width: "33%" }
      : s <= 4
      ? { label: "Medium", color: "#F59E0B", width: "66%" }
      : { label: "Strong", color: "#22C55E", width: "100%" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) return setError("Passwords do not match");

    const err = validatePassword(newPassword);
    if (err) return setError(err);

    const users = JSON.parse(localStorage.getItem("quizUsers") || "{}");

    if (!users[email]) return setError("User not found");

    users[email].password = newPassword;
    localStorage.setItem("quizUsers", JSON.stringify(users));
    localStorage.removeItem("resetEmail");

    setIsSubmitted(true);
    setTimeout(() => navigate("/"), 3000);
  };

  const strength = getStrength(newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Animations */}
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
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md">

        <div className="bg-[#111827] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF2E63] to-[#F59E0B] p-6 text-center">
            <Shield className="w-10 h-10 text-white mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-white">RESET PASSWORD</h1>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isSubmitted ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* New Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-[#6C5CE7]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white/5 px-10 py-3 text-white rounded-xl"
                      placeholder="New password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400">
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {/* Strength */}
                  {newPassword && (
                    <div>
                      <div className="text-xs text-gray-400 flex justify-between">
                        <span>Strength</span>
                        <span style={{ color: strength.color }}>{strength.label}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded">
                        <div style={{ width: strength.width, background: strength.color }}
                          className="h-full rounded"></div>
                      </div>
                    </div>
                  )}

                  {/* Confirm */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-[#6C5CE7]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/5 px-10 py-3 text-white rounded-xl"
                      placeholder="Confirm password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400">
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#FF2E63] to-[#F59E0B] py-3 text-white rounded-xl">
                    RESET PASSWORD
                  </button>
                </form>

                {error && <p className="text-red-400 mt-2">{error}</p>}

              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="text-green-400 mx-auto mb-3" size={40} />
                <p className="text-white">Password reset successful</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default ResetPassword;