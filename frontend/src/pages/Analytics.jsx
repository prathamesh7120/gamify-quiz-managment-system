import { Card } from "../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

import {
  Users,
  UserCheck,
  FileText,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Trophy,
} from "lucide-react";

const COLORS = ["#6C5CE7", "#00F5D4"];

const tooltipStyle = {
  backgroundColor: "#020617",
  border: "1px solid #334155",
  borderRadius: "8px",
};

const tooltipTextStyle = {
  color: "#ffffff",
};

export default function AdminAnalytics() {
  const stats = [
    { title: "Total Users", value: 1250, icon: Users },
    { title: "Active Users", value: 860, icon: UserCheck },
    { title: "Total Quizzes", value: 45, icon: FileText },
    { title: "Completed", value: 320, icon: CheckCircle },
    { title: "Failed", value: 80, icon: XCircle },
    { title: "Avg Score", value: "72%", icon: BarChart3 },
  ];

  const lineData = [
    { name: "Mon", score: 60 },
    { name: "Tue", score: 70 },
    { name: "Wed", score: 65 },
    { name: "Thu", score: 80 },
    { name: "Fri", score: 75 },
    { name: "Sat", score: 90 },
  ];

  const barData = [
    { name: "Quiz 1", attempts: 120 },
    { name: "Quiz 2", attempts: 98 },
    { name: "Quiz 3", attempts: 150 },
  ];

  const pieData = [
    { name: "Passed", value: 320 },
    { name: "Failed", value: 80 },
  ];

  const leaderboard = [
    { name: "Amit", score: 95 },
    { name: "Riya", score: 92 },
    { name: "Rahul", score: 90 },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
        ANALYTICS DASHBOARD
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="p-4 bg-[#111827] border-2 border-white/30 rounded-xl">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00F5D4]" />
                <p className="text-xs sm:text-sm text-gray-400">{item.title}</p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mt-2 text-white">
                {item.value}
              </h2>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Line Chart */}
        <Card className="p-4 bg-[#111827] border-2 border-white/30">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-[#00F5D4] w-5 h-5" />
            <h3 className="font-semibold text-white text-sm sm:text-base">
              Score Trend
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />

              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipTextStyle}
                labelStyle={tooltipTextStyle}
              />

              <defs>
                <linearGradient id="lineGradient">
                  <stop offset="0%" stopColor="#6C5CE7" />
                  <stop offset="100%" stopColor="#FF2E63" />
                </linearGradient>
              </defs>

              <Line type="monotone" dataKey="score" stroke="url(#lineGradient)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card className="p-4 bg-[#111827] border-2 border-white/30">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-[#00F5D4] w-5 h-5" />
            <h3 className="font-semibold text-white text-sm sm:text-base">
              Quiz Attempts
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />

              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipTextStyle}
                labelStyle={tooltipTextStyle}
              />

              <defs>
                <linearGradient id="barGradient">
                  <stop offset="0%" stopColor="#6C5CE7" />
                  <stop offset="100%" stopColor="#FF2E63" />
                </linearGradient>
              </defs>

              <Bar dataKey="attempts" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-4 bg-[#111827] border-2 border-white/30">
          <div className="flex items-center gap-2 mb-4">
            <PieIcon className="text-[#00F5D4] w-5 h-5" />
            <h3 className="font-semibold text-white text-sm sm:text-base">
              Pass vs Fail
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={90}
                label={({ percent }) =>
                  `${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
                fill="#fff"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipTextStyle}
                labelStyle={tooltipTextStyle}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Players */}
        <Card className="p-4 bg-[#111827] border-2 border-white/30">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-[#00F5D4] w-5 h-5" />
            <h3 className="font-semibold text-white text-sm sm:text-base">
              Top Players
            </h3>
          </div>

          {leaderboard.map((user, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-white/10 text-sm">
              <span className="text-gray-300">{user.name}</span>
              <span className="text-[#00F5D4] font-semibold">
                {user.score}
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-4 bg-[#111827] border-2 border-white/30 mt-6">
        <h3 className="mb-4 font-semibold text-white text-sm sm:text-base">
          Recent Activity
        </h3>

        <ul className="space-y-2 text-gray-300 text-sm">
          <li>Rahul completed Quiz 1</li>
          <li>Sneha failed Quiz 2</li>
          <li>Amit scored 95 in Quiz 3</li>
        </ul>
      </Card>
    </div>
  );
}