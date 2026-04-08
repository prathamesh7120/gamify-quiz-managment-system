import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import AdminPage from './pages/AdminDashboard'
import QuizPage from './pages/QuizPage'
import LeaderboardPage from './pages/LeaderBoard'
import WelcomeCard from './components/WelcomeCard'

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>


       <WelcomeCard/>
    </>
  )
}

export default App