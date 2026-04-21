import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star, TrendingUp, Flame, Play, User
} from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const currentUser = localStorage.getItem("currentUser");

      if (!currentUser) {
        navigate("/", { replace: true });
        return;
      }

      const user = JSON.parse(currentUser);

      setUserData(user);
      setUserName(user.username || user.email);

      const isComplete =
        user.username &&
        user.email &&
        (user.profileImage || user.avatarColor);

      setProfileCompleted(isComplete);

    } catch (err) {
      console.error("Invalid user data");
      localStorage.removeItem("currentUser");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const stats = [
    {
      title: "Level",
      value: userData?.level || 12,
      icon: <Star size={20} />,
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Total Quizzes",
      value: userData?.quizzes || 48,
      icon: <Play size={20} />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Win Rate",
      value: `${userData?.winRate || 67}%`,
      icon: <TrendingUp size={20} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Streak",
      value: userData?.streak || 7,
      icon: <Flame size={20} />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const quizzes = userData?.recentQuizzes || [
    { id: 1, name: "Science Trivia", score: 850 },
    { id: 2, name: "History Challenge", score: 720 },
  ];

  const handlePlay = () => {
    if (!profileCompleted) {
      alert("⚠️ Please complete your profile first!");
      navigate("/profile");
      return;
    }

    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#020617] text-white">

      {/* PAGE TITLE */}
      <div className="p-6 pb-0">
        <h1 className="text-2xl font-bold text-cyan-400">
          USER DASHBOARD
        </h1>
        <p className="text-gray-400">
          Welcome back, {userName}
        </p>
      </div>

      <div className="p-8 pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`p-5 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 border border-white/10 hover:scale-105 transition`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{stat.title}</span>
                  {stat.icon}
                </div>
                <h2 className="text-2xl font-bold mt-2">
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          {/* QUIZZES */}
          <div className="bg-[#0B1220] p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-cyan-400 font-semibold">
                RECENT QUIZZES
              </h2>

              <button
                onClick={handlePlay}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center gap-2"
              >
                <Play size={16} /> Play Now
              </button>
            </div>

            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex justify-between items-center py-3 px-4 mb-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <span>{quiz.name}</span>
                <span className="text-cyan-400 font-semibold">
                  {quiz.score} pts
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-[#0B1220] p-6 rounded-xl border border-white/10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
              <User />
            </div>

            <h3 className="mt-4 text-lg">{userName}</h3>
            <p className="text-gray-400 text-sm">
              {profileCompleted
                ? "Profile Complete ✅"
                : "Incomplete Profile ⚠️"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}