import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import ResumePage from './pages/ResumePage'
import ResumeHistoryPage from './pages/ResumeHistoryPage'
import AnalyserPage from './pages/AnalyserPage'
import AnalyserHistoryPage from './pages/AnalyserHistoryPage'
import ProfilePage from './pages/ProfilePage'
import AppLayout from './layouts/AppLayout'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/resume/history" element={<ResumeHistoryPage />} />
              <Route path="/analyser" element={<AnalyserPage />} />
              <Route path="/analyser/history" element={<AnalyserHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/resume" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
