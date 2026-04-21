import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Questions() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  // ✅ Dummy Data
  const defaultData = [
    {
      _id: "1",
      title: "General Knowledge",
      description: "Basic GK quiz",
      quizCode: "GK123",
      createdAt: new Date(),
      attempts: 25,
      avgScore: 72,
      questions: [
        {
          question: "Capital of India?",
          options: ["Mumbai", "Delhi", "Pune", "Chennai"],
          correctAnswer: 1,
        },
        {
          question: "Sun rises in?",
          options: ["West", "East", "North", "South"],
          correctAnswer: 1,
        },
      ],
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/quiz/all")
      .then((res) => res.json())
      .then((data) => setQuizzes(data.length ? data : defaultData))
      .catch(() => setQuizzes(defaultData));
  }, []);

  // 🔍 Filter
  const filtered = quizzes
    .filter(
      (q) =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.quizCode.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
      if (filter === "old") return new Date(a.createdAt) - new Date(b.createdAt);
      if (filter === "attempts") return b.attempts - a.attempts;
      return 0;
    });

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this quiz?")) return;
    setQuizzes(quizzes.filter((q) => q._id !== id));
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  return (
    <div className="flex bg-[#07090f] min-h-screen text-white">
      
      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
              QUIZ MANAGEMENT 
            </h1>

          <div className="flex gap-3">
            <input
              placeholder="Search..."
              className="px-4 py-2 rounded-lg bg-[#111827] border border-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="px-4 py-2 rounded-lg bg-[#111827] border border-gray-700"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="recent">Recent</option>
              <option value="old">Old</option>
              <option value="attempts">Attempts</option>
            </select>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Total Quizzes</p>
            <h2 className="text-2xl font-bold">{quizzes.length}</h2>
          </div>

          <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Total Attempts</p>
            <h2 className="text-2xl font-bold">
              {quizzes.reduce((a, b) => a + (b.attempts || 0), 0)}
            </h2>
          </div>

          <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Average Score</p>
            <h2 className="text-2xl font-bold">
              {Math.round(
                quizzes.reduce((a, b) => a + (b.avgScore || 0), 0) /
                  quizzes.length
              ) || 0}
              %
            </h2>
          </div>
        </div>

        {/* QUIZ CARDS */}
        <div className="grid md:grid-cols-2 gap-6">
          {paginated.map((quiz) => (
            <motion.div
              key={quiz._id}
              whileHover={{ scale: 1.03 }}
              className="bg-[#0f172a] p-6 rounded-2xl border border-gray-700 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-[#6C5CE7]">
                {quiz.title}
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                {quiz.description}
              </p>

              <div className="mt-3 text-sm text-gray-400 space-y-1">
                <p>Code: {quiz.quizCode}</p>
                <p>Date: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                <p>Attempts: {quiz.attempts}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="bg-[#6C5CE7] px-4 py-2 rounded-lg hover:opacity-90"
                >
                  View
                </button>

                <button
                  onClick={() => copyCode(quiz.quizCode)}
                  className="bg-gray-700 px-4 py-2 rounded-lg"
                >
                  Copy
                </button>

                <button
                  onClick={() => handleDelete(quiz._id)}
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-[#6C5CE7]" : "bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedQuiz && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#0f172a] p-6 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-[#6C5CE7] mb-4">
                {selectedQuiz.title}
              </h2>

              {selectedQuiz.questions.map((q, i) => (
                <div key={i} className="mb-4">
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>

                  <ul className="mt-2 space-y-1">
                    {q.options.map((opt, idx) => (
                      <li
                        key={idx}
                        className={`px-3 py-1 rounded ${
                          idx === q.correctAnswer
                            ? "bg-green-500/20 text-green-400"
                            : "text-gray-300"
                        }`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <button
                onClick={() => setSelectedQuiz(null)}
                className="mt-4 bg-red-500 px-4 py-2 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}