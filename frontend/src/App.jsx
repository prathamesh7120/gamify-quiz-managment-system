import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";

import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";



export default function App() {
  return (
    <Layout>
      <Routes>

      

        {/* ✅ Dashboard */}
        <Route path="/" element={<Landing />} />

        {/* ✅ Profile */}
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/quiz" element={<h1>Quiz</h1>} />

      </Routes>
    </Layout>
  );
}