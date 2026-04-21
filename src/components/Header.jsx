import { useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, Home, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="w-full bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1f2937] px-4 md:px-8 py-4 shadow-md">

      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            🎯
          </div>

          <div>
            <h1 className="text-lg md:text-2xl font-bold text-cyan-400">
              {isDashboard ? "USER DASHBOARD" : "Quiz App"}
            </h1>
            <p className="text-xs md:text-sm text-gray-400">
              {isDashboard
                ? "Welcome back, User!"
                : "Play and compete with others"}
            </p>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
          >
            <Home size={16} />
            Home
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
          >
            <User size={16} />
            Profile
          </button>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-[#111827] p-4 rounded-xl border border-white/10">
          <button onClick={() => navigate("/")} className="text-left">Home</button>
          <button onClick={() => navigate("/profile")} className="text-left">Profile</button>
          <button onClick={() => navigate("/login")} className="text-left text-red-400">Logout</button>
        </div>
      )}
    </div>
  );
}