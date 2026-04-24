import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Builder from './components/Builder';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AdminPanel from './components/AdminPanel';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, loading, init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  const isAdmin = user && user.email === 'talhasiddiqui240@gmail.com';

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/builder" : "/login"} replace />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/builder" replace />} />
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/builder" replace />} />
      <Route path="/builder" element={user ? <Builder /> : <Navigate to="/login" replace />} />
      <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/builder" replace />} />
    </Routes>
  );
}

export default App;
