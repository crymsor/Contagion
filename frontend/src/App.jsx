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
import Sidebar from './AppLayout/Dashboard/Components/Sidebar.jsx';
import TopBar from './AppLayout/Dashboard/Components/TopBar.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };


  const mainLayoutPages = ['/dashboard', '/submissions', '/leaderboard', '/sandbox', '/reviews', '/admin'];
  
  const shouldUseMainLayout = (path) => {
    return mainLayoutPages.some(page => path.startsWith(page));
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          

          <Route
            path="/dashboard"
            element={
              <div className="min-h-screen flex relative" style={{ background: '#0A0B10' }}>
                {/* Grid Background */}
                <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />
                {/* Scanlines */}
                <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
                
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div 
                  className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                  style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}
                >
                  <TopBar pageName="Dashboard" toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <DashboardPage />
                </div>
              </div>
            }
          />
          
          <Route
            path="/submissions"
            element={
              <div className="min-h-screen flex relative" style={{ background: '#0A0B10' }}>
                {/* Grid Background */}
                <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />
                {/* Scanlines */}
                <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
                
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div 
                  className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                  style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}
                >
                  <TopBar pageName="Submissions" toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <SubmissionsPage />
                </div>
              </div>
            }
          />
          
          <Route
            path="/leaderboard"
            element={
              <div className="min-h-screen flex relative" style={{ background: '#0A0B10' }}>
                {/* Grid Background */}
                <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />
                {/* Scanlines */}
                <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
                
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div 
                  className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                  style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}
                >
                  <TopBar pageName="Leaderboard" toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <Leaderboard />
                </div>
              </div>
            }
          />
          
          <Route
            path="/submissions/:submissionId/ai-evaluation"
            element={
              <div className="min-h-screen flex relative" style={{ background: '#0A0B10' }}>
                {/* Grid Background */}
                <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />
                {/* Scanlines */}
                <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
                
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div 
                  className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                  style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}
                >
                  <TopBar pageName="AI Evaluation" toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <AiEvaluationPage />
                </div>
              </div>
            }
          />
          
          <Route
            path="/admin"
            element={
              <div className="min-h-screen flex relative" style={{ background: '#0A0B10' }}>
                {/* Grid Background */}
                <div className="fixed inset-0 bg-grid-toxic pointer-events-none opacity-40" />
                {/* Scanlines */}
                <div className="fixed inset-0 bg-scanline pointer-events-none opacity-20" />
                
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div 
                  className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                  style={{ marginLeft: sidebarOpen ? '220px' : '64px' }}
                >
                  <TopBar pageName="Admin" toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                </div>
              </div>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
