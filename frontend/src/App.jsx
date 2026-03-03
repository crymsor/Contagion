import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './AppLayout/Auth/LoginPage';
import RegisterPage from './AppLayout/Auth/RegisterPage';
import ForgotPasswordPage from './AppLayout/Auth/ForgotPasswordPage';
import DashboardPage from './AppLayout/Dashboard/DashboardPage';
import SubmissionsPage from './AppLayout/SubmissionsPage/SubmissionsPage';
import AiEvaluationPage from './AppLayout/AiEvaluation/AiEvaluationPage';
import AdminDashboardPage from './AppLayout/Dashboard/AdminDashboardPage';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './AppLayout/AdminRoute';
import Leaderboard from './AppLayout/Leaderboard/Leaderboard';

/* ── App Component ─────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/submissions/:submissionId/ai-evaluation" element={<AiEvaluationPage />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
