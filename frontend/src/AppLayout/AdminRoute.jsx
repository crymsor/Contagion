import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-abyss flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-toxic border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    // Redirect non-admins to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
