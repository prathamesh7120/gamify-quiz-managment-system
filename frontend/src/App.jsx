import { Routes, Route, Navigate } from "react-router-dom";

// ✅ IMPORT ALL COMPONENTS
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SuperAdmin from "./pages/SuperAdmin.jsx";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Login />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Reset Password */}
      <Route path="/reset-password/:token?" element={<ResetPassword />} />

      {/* Super Admin */}
      <Route path="/superadmin" element={<SuperAdmin />} />

      
    </Routes>
  );
}

export default App;