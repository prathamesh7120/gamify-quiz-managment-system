import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Home, Trophy, Play } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Quiz", path: "/quiz", icon: Play },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
  ];

  return (
    <div className="w-full flex justify-center mt-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex gap-3 bg-[#111827]/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-gray-700 shadow-lg"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4">
          <Star className="text-yellow-400 w-5 h-5" />
          <span className="text-white font-bold">QuizX</span>
        </div>

        {/* Links */}
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}