import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FileText, UserPlus, Target, BookOpen, Zap } from 'lucide-react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signUp(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex w-[45%] gradient-dark text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-16">
            <div className="gradient-primary p-2 rounded-xl shadow-lg shadow-blue-500/25">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight">ProResume</span>
          </div>
          
          <h2 className="text-4xl font-black leading-tight mb-6">
            Start your journey. <br />
            <span className="text-violet-400">Land your dream job.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Create unlimited resumes, optimize for ATS, and share with recruiters — all completely free.
          </p>
        </div>
        
        <div className="relative z-10 space-y-4">
          {[
            { icon: Target, text: 'Built-in ATS keyword scanner' },
            { icon: BookOpen, text: 'Pre-written phrase library' },
            { icon: Zap, text: 'Grammar & cliché checker' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-gray-50">
        {/* Mobile logo */}
        <div className="flex lg:hidden justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="gradient-primary p-2 rounded-xl text-white shadow-lg shadow-blue-500/25">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-gray-900">ProResume</span>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Create account</h2>
          <p className="text-gray-500 mb-8">Get started with your free account today.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                placeholder="Minimum 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 gradient-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Create free account
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
