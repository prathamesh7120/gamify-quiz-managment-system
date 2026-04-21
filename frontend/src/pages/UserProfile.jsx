import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Camera } from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();

  const [userName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? (user.username || user.email) : "User";
  });

  const [userEmail] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? user.email : "user@quiz.com";
  });

  const [avatarColor, setAvatarColor] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? (user.avatarColor || "from-purple-500 to-pink-500") : "from-purple-500 to-pink-500";
  });

  const [profileImage, setProfileImage] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? (user.profileImage || null) : null;
  });

  const saveUser = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));
  };

  const handleColorChange = (color) => {
    setAvatarColor(color);
    saveUser({ username: userName, email: userEmail, avatarColor: color, profileImage });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      saveUser({ username: userName, email: userEmail, avatarColor, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const stats = {
    quizzes: 48,
    points: 12450,
    winRate: 67,
    xp: 2450,
    nextXp: 3000,
  };

  return (
    <div className="relative w-screen min-h-screen text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full min-h-screen">

        {/* HEADER */}
        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white text-sm"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            MY PROFILE
          </h1>

          <div />
        </div>

        {/* MAIN GRID */}
        <div className="w-full p-6 grid lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* PROFILE CARD */}
            <div className="bg-[#111827]/80 backdrop-blur p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center">

              <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center mb-4 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.5)]`}>
                {profileImage ? (
                  <img src={profileImage} className="w-full h-full object-cover" />
                ) : (
                  <User size={40} />
                )}

                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                  <Camera size={14} />
                  <input type="file" hidden onChange={handleImageUpload} />
                </label>
              </div>

              <div className="flex gap-2 mb-3">
                {[
                  "from-pink-500 to-red-500",
                  "from-cyan-400 to-blue-500",
                  "from-orange-500 to-yellow-500",
                  "from-green-500 to-emerald-500",
                  "from-red-500 to-pink-500",
                  "from-blue-500 to-indigo-500",
                ].map((c, i) => (
                  <div
                    key={i}
                    onClick={() => handleColorChange(c)}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${c} cursor-pointer border-2 ${
                      avatarColor === c ? "border-white scale-110" : "border-transparent"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-400 mb-2 text-center">
                Select avatar color or upload your photo
              </p>

              <h2 className="text-lg font-semibold">{userName}</h2>
              <p className="text-gray-400 text-sm">{userEmail}</p>

              {/* XP */}
              <div className="w-full mt-4">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{stats.xp} XP</span>
                  <span>{stats.nextXp} XP</span>
                </div>

                <div className="h-2 bg-gray-700 rounded-full mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"
                    style={{ width: `${(stats.xp / stats.nextXp) * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* QUICK STATS */}
            <div className="bg-[#111827]/80 backdrop-blur p-6 rounded-2xl border border-white/10 shadow-xl">
              <h2 className="text-sm text-purple-400 mb-4 font-semibold">QUICK STATS</h2>

              <div className="space-y-3">
                <QuickItem label="Total Quizzes" value={stats.quizzes} color="cyan" />
                <QuickItem label="Total Points" value={stats.points} color="yellow" />
                <QuickItem label="Win Rate" value={`${stats.winRate}%`} color="green" />
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* STATS */}
            <div className="bg-[#111827]/80 backdrop-blur p-6 rounded-2xl border border-white/10 shadow-xl">
              <h2 className="text-sm text-purple-400 mb-4 font-semibold">
                PERFORMANCE STATS
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <StatCard label="Total Quizzes" value={stats.quizzes} color="cyan" />
                <StatCard label="Total Points" value={stats.points} color="yellow" />
                <StatCard label="Win Rate" value={`${stats.winRate}%`} color="green" />
                <StatCard label="Accuracy" value="82%" color="purple" />
                <StatCard label="Best Streak" value="12" color="pink" />
                <StatCard label="Avg Time" value="45s" color="cyan" />
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="bg-[#111827]/80 backdrop-blur p-6 rounded-2xl border border-white/10 shadow-xl">
              <div className="flex justify-between mb-4">
                <h2 className="text-sm text-orange-400 font-semibold">ACHIEVEMENTS</h2>
                <span className="text-sm text-gray-400">4 / 6</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Achievement title="Speed Demon" progress="100%" color="cyan" />
                <Achievement title="Quiz Master" progress="96%" color="yellow" />
                <Achievement title="Perfect Score" progress="100%" color="pink" />
                <Achievement title="Week Warrior" progress="100%" color="purple" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */

function QuickItem({ label, value, color }) {
  const colors = {
    cyan: "text-cyan-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };

  return (
    <div className="flex justify-between">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`font-semibold ${colors[color]}`}>{value}</p>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    cyan: "text-cyan-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
    purple: "text-purple-400",
    pink: "text-pink-400",
  };

  return (
    <div className="bg-[#1E293B]/40 p-4 rounded-xl border border-white/5">
      <p className="text-xs text-gray-400">{label}</p>
      <h2 className={`text-lg font-bold ${colors[color]}`}>{value}</h2>
    </div>
  );
}

function Achievement({ title, progress, color }) {
  const colors = {
    cyan: "bg-cyan-400",
    yellow: "bg-yellow-400",
    pink: "bg-pink-400",
    purple: "bg-purple-400",
  };

  return (
    <div className="bg-[#1E293B]/40 p-4 rounded-xl border border-white/5">
      <div className="flex justify-between mb-2">
        <p className="font-semibold">{title}</p>
        <span className="text-green-400">✔</span>
      </div>

      <div className="h-2 bg-gray-700 rounded-full">
        <div className={`${colors[color]} h-2 rounded-full`} style={{ width: progress }} />
      </div>
    </div>
  );
}