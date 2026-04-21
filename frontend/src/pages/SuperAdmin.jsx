import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import { motion } from "framer-motion";
import {
  Users, ShieldAlert, BarChart3, Plus, Search, Ban,
  Check, Crown, Shield, Target, Gamepad2, FileQuestion
} from "lucide-react";

const SuperAdminDashboard = () => {

  // ✅ ADDED: PROTECT ROUTE
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "superadmin") {
      navigate("/"); // redirect if not admin
    }
  }, [navigate]);

  // 🔹 STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 USERS DATA
  const [users, setUsers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", role: "user", isBlocked: false, joinedDate: "2026-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", isBlocked: false, joinedDate: "2026-01-20" },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "user", isBlocked: false, joinedDate: "2026-02-10" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "admin", isBlocked: false, joinedDate: "2026-02-15" },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "user", isBlocked: true, joinedDate: "2026-03-01" },
  ]);

  // 🔹 CREATE QUIZ STATES
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);

  // 🔹 TOGGLE BLOCK / UNBLOCK USER
  const toggleBlockUser = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
    ));
  };

  // 🔹 SEARCH FILTER
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 ADD NEW QUESTION
  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  };

  // 🔹 UPDATE QUESTION TEXT
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  // 🔹 UPDATE OPTIONS
  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // 🔹 CREATE QUIZ HANDLER
  const handleCreateQuiz = () => {
    if (!quizTitle.trim()) {
      alert("Please enter a quiz title");
      return;
    }

    const validQuestions = questions.filter(q =>
      q.question.trim() && q.options.every(o => o.trim())
    );

    if (validQuestions.length === 0) {
      alert("Please add at least one complete question");
      return;
    }

    alert("Quiz created successfully!");
    setQuizTitle("");
    setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  };

  // 🔹 DASHBOARD STATS
  const totalUsers = users.filter(u => u.role === "user").length;
  const totalAdmins = users.filter(u => u.role === "admin").length;
  const blockedUsers = users.filter(u => u.isBlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-4 sm:p-6">

      {/* 🔹 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard icon={<Users className="w-6 h-6 text-white" />} value={totalUsers} label="Total Users" />
        <StatCard icon={<ShieldAlert className="w-6 h-6 text-white" />} value={totalAdmins} label="Total Admins" />
        <StatCard icon={<Ban className="w-6 h-6 text-white" />} value={blockedUsers} label="Blocked Users" />
      </div>

      {/* 🔹 MAIN CONTAINER */}
      <div className="bg-[#111827] rounded-xl border border-[#6C5CE7]/20 shadow-xl backdrop-blur">

        {/* 🔹 TAB NAVIGATION */}
        <div className="flex gap-2 px-4 sm:px-6 border-b border-[#6C5CE7]/20 text-sm sm:text-base">
          {["users", "create"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 sm:py-4 px-4 sm:px-6 font-game transition-all ${
                activeTab === tab
                  ? "text-[#00F5D4] border-b-2 border-[#00F5D4]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 🔹 USERS SECTION */}
        {activeTab === "users" && (
          <div className="p-4 sm:p-6 overflow-x-auto">

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 sm:mb-6 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#00F5D4] outline-none"
            />

            <div className="min-w-[900px]">

              <div className="grid grid-cols-6 gap-2 sm:gap-4 text-xs text-[#00F5D4] mb-4 px-4">
                <p>USER</p>
                <p>EMAIL</p>
                <p>ROLE</p>
                <p>STATUS</p>
                <p>JOINED</p>
                <p>ACTIONS</p>
              </div>

              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className="grid grid-cols-6 gap-2 sm:gap-4 items-center p-4 mb-2 bg-[#0F172A] rounded-xl hover:bg-[#1E293B]/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00F5D4] flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <p className="text-white font-semibold text-sm sm:text-base">{user.name}</p>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm">{user.email}</p>

                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                    user.role === "admin"
                      ? "bg-[#6C5CE7]/20 text-[#6C5CE7]"
                      : "bg-[#00F5D4]/20 text-[#00F5D4]"
                  }`}>
                    {user.role === "admin" && <Shield className="w-3 h-3" />}
                    {user.role}
                  </span>

                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs w-fit ${
                    user.isBlocked
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}>
                    {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                  </span>

                  <p className="text-gray-400 text-xs sm:text-sm">{user.joinedDate}</p>

                  <button
                    onClick={() => toggleBlockUser(user.id)}
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium w-fit ${
                      user.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    {user.isBlocked ? (
                      <>
                        <Check className="w-3 h-3" /> Unblock
                      </>
                    ) : (
                      <>
                        <Ban className="w-3 h-3" /> Block
                      </>
                    )}
                  </button>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* 🔹 CREATE QUIZ SECTION */}
        {activeTab === "create" && (
          <div className="p-4 sm:p-6">

            <input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Quiz Title"
              className="mb-4 w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#00F5D4]"
            />

            {questions.map((q, i) => (
              <div key={i} className="mb-6 p-4 bg-[#1E293B]/40 rounded-xl border border-[#6C5CE7]/20">
                <input
                  value={q.question}
                  onChange={(e) => updateQuestion(i, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />

                {q.options.map((opt, oi) => (
                  <input
                    key={oi}
                    value={opt}
                    onChange={(e) => updateOption(i, oi, e.target.value)}
                    placeholder={`Option ${oi + 1}`}
                    className="w-full mb-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                ))}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={addQuestion} className="px-5 py-2 border border-[#6C5CE7] text-[#6C5CE7] rounded-lg hover:bg-[#6C5CE7]/10">
                Add Question
              </button>
              <button onClick={handleCreateQuiz} className="px-6 py-2 bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] rounded-lg text-white font-bold">
                Create Quiz
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

// 🔹 STAT CARD COMPONENT
const StatCard = ({ icon, value, label }) => (
  <div className="bg-[#111827] border border-[#6C5CE7]/20 p-4 sm:p-6 rounded-xl hover:border-[#00F5D4] transition">
    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-[#6C5CE7] to-[#00F5D4] flex items-center justify-center rounded-lg mb-3">
      {icon}
    </div>
    <h2 className="text-white text-xl sm:text-2xl font-bold">{value}</h2>
    <p className="text-gray-400 text-xs sm:text-sm">{label}</p>
  </div>
);

export default SuperAdminDashboard;