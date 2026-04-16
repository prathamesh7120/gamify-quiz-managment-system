import { Routes, Route } from "react-router-dom";

import QuizGame from "./pages/QuizGame";
import Results from "./pages/ResultPage";
import NotFound from "./pages/NotFound";
import LeaderBoard from "./pages/LeaderBoard"; // ✅ ADD THIS
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-white">

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<QuizGame />} />
          <Route path="/results" element={<Results />} />

          

          {/* ✅ NEW ROUTE */}
          <Route path="/leaderboard" element={<LeaderBoard />} />
          

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;