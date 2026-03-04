// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
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
import Post from './AppLayout/Post/Post';
import MainLayout from './AppLayout/MainLayout';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Dashboard & Main Layout Routes */}
          <Route
            path="/dashboard"
            element={
              <MainLayout pageName="Dashboard" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <DashboardPage />
              </MainLayout>
            }
          />

          <Route
            path="/submissions"
            element={
              <MainLayout pageName="Submissions" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <SubmissionsPage />
              </MainLayout>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <MainLayout pageName="Leaderboard" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Leaderboard />
              </MainLayout>
            }
          />

          <Route
            path="/post/:postId"
            element={
              <MainLayout pageName="Post" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <Post />
              </MainLayout>
            }
          />

          <Route
            path="/submissions/:submissionId/ai-evaluation"
            element={
              <MainLayout pageName="AI Evaluation" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <AiEvaluationPage />
              </MainLayout>
            }
          />

          <Route
            path="/admin"
            element={
              <MainLayout pageName="Admin" sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              </MainLayout>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
