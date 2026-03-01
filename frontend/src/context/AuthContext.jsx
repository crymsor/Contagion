import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock login function - replace with real API call later
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      console.log('Login attempt:', { email, password });
      // Mock successful login - if email contains 'admin', make them an admin
      const isAdmin = email.toLowerCase().includes('admin');
      setUser({ email, name: isAdmin ? 'Admin User' : 'Standard User', isAdmin });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (userData) => {
    setLoading(true);
    try {
      console.log('Register attempt:', userData);
      // Mock successful registration
      const isAdmin = userData.email.toLowerCase().includes('admin');
      setUser({ email: userData.email, name: userData.name, isAdmin });
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // For testing: toggle admin status
  const toggleAdmin = () => {
    setUser(prev => prev ? { ...prev, isAdmin: !prev.isAdmin } : null);
  };

  // Mock forgot password function
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      console.log('Forgot password for:', email);
      // Mock success
      return { success: true };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    console.log('Logged out');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    toggleAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
