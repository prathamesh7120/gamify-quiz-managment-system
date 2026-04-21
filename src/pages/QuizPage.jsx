import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Save, ArrowLeft, CheckCircle } from "lucide-react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Textarea } from "../components/Textarea";
import { toast } from "sonner";

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState("15");
  const [quizCode, setQuizCode] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const [questions, setQuestions] = useState([
    {
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 100,
    },
  ]);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setQuizCode(code);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 100,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSave = () => {
    try {
      if (!quizTitle || !category || !quizCode) {
        toast.error("Quiz not saved ❌ (Fill all quiz settings)");
        return;
      }

      let existingQuizzes = [];
      try {
        const data = localStorage.getItem("quizzes");
        existingQuizzes = data ? JSON.parse(data) : [];
      } catch {
        existingQuizzes = [];
      }

      const formattedCode = quizCode.trim().toUpperCase();

      const isDuplicate = existingQuizzes.some(
        (quiz) => quiz.code === formattedCode
      );

      if (isDuplicate) {
        toast.error("Quiz not saved ❌ (Code already exists)");
        return;
      }

      const incompleteQuestions = questions.some(
        (q) => !q.question || q.options.some((opt) => !opt)
      );

      if (incompleteQuestions) {
        toast.error("Quiz not saved ❌ (Complete all questions)");
        return;
      }

      const newQuiz = {
        id: Date.now(),
        title: quizTitle,
        category: category,
        difficulty: difficulty,
        timeLimit: timeLimit,
        code: formattedCode,
        totalQuestions: questions.length,
        questions: questions,
      };

      existingQuizzes.push(newQuiz);
      localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));

      toast.success("Quiz saved successfully ✅");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.log(error);
      toast.error("Quiz not saved ❌ (Something went wrong)");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      
      {/* 🔥 NEW HEADER ADDED */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-6 text-white">
        <div
          className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer mb-6"
          onClick={() => navigate("/admin")}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Plus size={28} />
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CREATE QUIZ
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Design your custom quiz game
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-5xl">

        <div className="flex justify-between items-center mb-5">
          <Button onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>

          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>

        <Card className="p-4 bg-[#111827] rounded-xl mb-5 space-y-3">
          <h4 className="text-white text-lg">Quiz Settings</h4>

          <div className="grid md:grid-cols-2 gap-3">
            <Input
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />

            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className="flex gap-2">
              <Input
                placeholder="Quiz Code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
              />
              <Button onClick={generateCode}>Gen</Button>
            </div>

            <Input
              type="number"
              placeholder="Time (sec)"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-[#1F2937] text-white p-2 rounded-md"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="text-gray-400 text-sm">
            Total Questions: {questions.length}
          </div>
        </Card>

        {questions.map((question, qIndex) => (
          <Card key={question.id} className="mt-5 p-5 bg-[#111827] rounded-xl">

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white text-lg">
                Question {qIndex + 1}
              </h3>

              <Button
                onClick={() => removeQuestion(question.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Remove
              </Button>
            </div>

            <Textarea
              placeholder="Enter question"
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />

            <h4 className="text-white text-sm mt-4 mb-2">
              Answer Options
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    question.correctAnswer === oIndex
                      ? "border-green-500 bg-[#1e293b]"
                      : "border-gray-600 bg-[#1e293b] hover:border-green-400"
                  }`}
                >
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      updateOption(question.id, oIndex, e.target.value)
                    }
                    className="bg-transparent outline-none w-full text-sm text-white"
                  />

                  <CheckCircle
                    size={18}
                    onClick={() =>
                      updateQuestion(question.id, "correctAnswer", oIndex)
                    }
                    className={`cursor-pointer ml-2 ${
                      question.correctAnswer === oIndex
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="text-gray-300 text-sm mb-1 block">
                Points
              </label>

              <input
                type="number"
                value={question.points}
                onChange={(e) =>
                  updateQuestion(question.id, "points", e.target.value)
                }
                className="w-32 px-4 py-2 rounded-xl bg-[#1e293b] border border-cyan-400 text-white outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

          </Card>
        ))}

        <Button onClick={addQuestion} className="mt-5 w-full">
          <Plus className="w-4 h-4 mr-1" /> Add Question
        </Button>

      </div>
    </div>
  );
}