import { Routes, Route, Navigate } from "react-router-dom";

// ✅ IMPORT ALL COMPONENTS
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import Setting from "./pages/Setting";
import Analytics from "./pages/Analytics";
import Questions from "./pages/Questions";
import JoinQuiz from "./pages/JoinQuiz";
import Certificate from "./Components/Certificate";
import SuperAdmin from "./pages/SuperAdmin.jsx";
import CreateQuiz from "./pages/QuizPage";
import Results from "./pages/Results";


function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Login />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Certificate/>} />
      <Route path="/join" element={<JoinQuiz />} />
      <Route path="/" element={<CreateQuiz />} />
      <Route path="/quiz" element={<CreateQuiz />} />

      {/* Reset Password */}
      <Route path="/reset-password/:token?" element={<ResetPassword />} />

      {/* Super Admin */}
      <Route path="/superadmin" element={<SuperAdmin />} />

      
    </Routes>
  );
}

export default App;
