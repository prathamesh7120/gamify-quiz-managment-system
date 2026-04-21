import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import Setting from "./pages/Setting";
import Analytics from "./pages/Analytics";
import Questions from "./pages/Questions";
import JoinQuiz from "./pages/JoinQuiz";
import Certificate from "./components/Certificate";
import SuperAdmin from "./pages/SuperAdmin.jsx";
import CreateQuiz from "./pages/QuizPage";
import Results from "./pages/Results";
import UserDashboard from "./pages/UserDashboard";
import Landing from "./pages/Landing";
import UserProfile from "./pages/UserProfile";
import LeaderBoard from "./pages/LeaderBoard";

// Pages that should NOT show Header/Footer
const noLayoutRoutes = ["/login", "/signup", "/forgot-password"];

function App() {
  return (
    <Routes>
      {/* No Layout (auth pages) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token?" element={<ResetPassword />} />
      <Route path="/" element={<Login />} />

      {/* With Layout (Header + Footer) */}
      <Route path="/landing" element={<Layout><Landing /></Layout>} />
      <Route path="/user-dashboard" element={<Layout><UserDashboard /></Layout>} />
      <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
      <Route path="/questions" element={<Layout><Questions /></Layout>} />
      <Route path="/settings" element={<Layout><Setting /></Layout>} />
      <Route path="/superadmin" element={<Layout><SuperAdmin /></Layout>} />
      <Route path="/join" element={<Layout><JoinQuiz /></Layout>} />
      <Route path="/JoinQuiz" element={<Layout><JoinQuiz /></Layout>} />
      <Route path="/quiz" element={<Layout><CreateQuiz /></Layout>} />
      <Route path="/results" element={<Layout><Results /></Layout>} />
      <Route path="/certificate" element={<Layout><Certificate /></Layout>} />
      <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
      <Route path="/leaderboard" element={<Layout><LeaderBoard /></Layout>} />
    </Routes>
  );
}

export default App;