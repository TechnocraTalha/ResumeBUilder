import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Lazy loading pages for code splitting
const Builder = lazy(() => import('./components/Builder'));
const Login = lazy(() => import('./components/auth/Login'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const PublicResume = lazy(() => import('./components/PublicResume'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
      <p className="text-sm font-semibold text-gray-400 animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  const { user, loading, init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return <LoadingFallback />;
  }

  const isAdmin = user && user.email === 'talhasiddiqui240@gmail.com';

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/builder/:id" element={user ? <Builder /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/dashboard" replace />} />
        <Route path="/v/:uid/:rid" element={<PublicResume />} />
      </Routes>
    </Suspense>
  );
}

export default App;
