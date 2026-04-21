import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Plus,
  FileQuestion,
  BarChart3,
  Trophy,
  Users,
  Settings,
  Gamepad2,
  Target,
  LogOut,
} from "lucide-react";

import { Card } from "../components/Card";
import { Button } from "../components/Button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// DATA
const activityData = [
  { name: "Mon", players: 400, score: 2400 },
  { name: "Tue", players: 300, score: 1398 },
  { name: "Wed", players: 200, score: 9800 },
  { name: "Thu", players: 278, score: 3908 },
  { name: "Fri", players: 189, score: 4800 },
  { name: "Sat", players: 239, score: 3800 },
  { name: "Sun", players: 349, score: 4300 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  // ✅ UPDATED TOOLTIP (dark bg + white text)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a] border border-[#6C5CE7]/30 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-sm font-semibold text-white">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      navigate("/");
      return;
    }

    const user = JSON.parse(currentUser);

    if (user.role !== "admin") {
      navigate("/user-dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      label: "Total Players",
      value: "10,234",
      change: "+12.5%",
      color: "from-[#6C5CE7] to-[#8B5CF6]",
    },
    {
      icon: <FileQuestion className="w-6 h-6 text-white" />,
      label: "Total Quizzes",
      value: "523",
      change: "+8.2%",
      color: "from-[#00F5D4] to-[#06B6D4]",
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      label: "Average Score",
      value: "78%",
      change: "+3.1%",
      color: "from-[#FF2E63] to-[#EC4899]",
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      label: "Active Games",
      value: "45",
      change: "+15.8%",
      color: "from-[#F59E0B] to-[#F97316]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="flex">

        {/* Sidebar */}
        <motion.div
          className={`fixed md:static z-50 w-64 bg-[#111827] border-r border-[#6C5CE7]/20 min-h-screen p-6 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <button
            className="md:hidden text-white mb-4"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63] rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
                QUIZ GAME
              </span>
            </div>
            <p className="text-xs text-gray-400 ml-13">Admin Panel</p>
          </div>

          <nav className="space-y-2">
            {[
              { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", id: "dashboard" },
              { icon: <Plus className="w-5 h-5" />, label: "Create Quiz", id: "create", action: () => navigate("/admin/create-quiz") },
              { icon: <FileQuestion className="w-5 h-5" />, label: "Questions", id: "questions" },
              { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", id: "analytics" },
              { icon: <Trophy className="w-5 h-5" />, label: "Leaderboard", id: "leaderboard", action: () => navigate("/leaderboard") },
              { icon: <Settings className="w-5 h-5" />, label: "Settings", id: "settings" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  item.action ? item.action() : setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#6C5CE7]/20 to-[#FF2E63]/20 border border-[#6C5CE7]/30 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1E293B]/50"
                }`}
                whileHover={{ x: 5 }}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-[#6C5CE7]/10 to-[#FF2E63]/10 border border-[#6C5CE7]/30 rounded-xl">
            <Gamepad2 className="w-8 h-8 mb-2 text-white" />
            <h4 className="font-semibold mb-1 text-white">Exit Admin</h4>
            <p className="text-xs text-gray-400 mb-3">Logout from admin panel</p>

            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63]"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main */}
        <div className="flex-1 p-4 md:p-8">

          <div className="flex items-center gap-3 mb-4">
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>

            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
              GAME CONTROL CENTER
            </h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
            {stats.map((stat, i) => (
              <Card key={i} className="p-6 bg-[#111827] border-[#6C5CE7]/20">
                <div className="flex justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className="text-green-400 text-sm">{stat.change}</span>
                </div>

                <div className="text-3xl font-extrabold text-white">
                  {stat.value}
                </div>

                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Line Chart */}
            <Card className="p-4 md:p-6 bg-[#111827]">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Users className="w-5 h-5 text-[#6C5CE7]" />
                <h3 className="font-semibold">Player Activity</h3>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />

                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6C5CE7" />
                      <stop offset="100%" stopColor="#FF2E63" />
                    </linearGradient>
                  </defs>

                  <Line
                    type="monotone"
                    dataKey="players"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Bar Chart */}
            <Card className="p-4 md:p-6 bg-[#111827]">
              <div className="flex items-center gap-2 mb-4 text-white">
                <BarChart3 className="w-5 h-5 text-[#FF2E63]" />
                <h3 className="font-semibold">Score Analytics</h3>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />

                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6C5CE7" />
                      <stop offset="100%" stopColor="#FF2E63" />
                    </linearGradient>
                  </defs>

                  <Bar
                    dataKey="score"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          {/* ✅ Recent Quizzes Panel */}
          <div className="mt-8 bg-[#0b1220] rounded-2xl p-6 border border-[#1f2a44]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-white">
                <FileQuestion className="w-5 h-5 text-[#00F5D4]" />
                <h2 className="text-lg font-semibold">Recent Quizzes</h2>
              </div>

              <Button
                className="bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] px-4 py-2 rounded-lg text-white"
                onClick={() => navigate("/admin/create-quiz")}
              >
                + New Quiz
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { title: "General Knowledge", q: 10, plays: 234, score: 78 },
                { title: "Science Trivia", q: 15, plays: 189, score: 82 },
                { title: "History Challenge", q: 20, plays: 156, score: 71 },
                { title: "Math Quiz", q: 12, plays: 203, score: 85 },
              ].map((quiz, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#111827] p-4 rounded-xl hover:bg-[#1E293B] transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63]">
                      <FileQuestion className="text-white w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="text-white font-semibold">{quiz.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {quiz.q} questions • {quiz.plays} plays
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[#00F5D4] text-xl font-bold">
                      {quiz.score}%
                    </p>
                    <p className="text-gray-400 text-xs">Avg Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}