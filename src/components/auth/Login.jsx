import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FileText, LogIn, ShieldCheck, Sparkles, Layout, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await logIn(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Left Panel — Warm Branding ── */}
      <div className="hidden lg:flex w-[45%] bg-[#F7F3E8] text-[#1a1a1a] flex-col justify-between p-12 relative overflow-hidden">
        {/* Warm blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-200/25 rounded-full blur-[70px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="gradient-primary p-2 rounded-xl shadow-lg shadow-amber-500/25">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">ProResume</span>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Floating proof card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-black/8 p-5 mb-8 border border-black/5 w-64">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] text-gray-400 font-medium">Resume Score</div>
                <div className="text-sm font-black text-gray-900">ATS Ready ✓</div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 w-[91%]" />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-gray-400">Score</span>
              <span className="text-[10px] font-bold text-emerald-600">91 / 100</span>
            </div>
          </div>

          <h2 className="text-4xl font-black leading-tight mb-4">
            Welcome back.<br />
            <span className="font-serif-display italic text-amber-600">Let's keep building.</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Your resumes are saved in the cloud. Pick up right where you left off and land that next interview.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-3">
          {[
            { icon: ShieldCheck, text: 'ATS-optimized templates' },
            { icon: Sparkles,    text: 'Smart keyword matching' },
            { icon: Layout,      text: 'Live preview & export' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                <item.icon className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-cream">

        {/* Mobile logo */}
        <div className="flex lg:hidden justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="gradient-primary p-2 rounded-xl text-white shadow-lg shadow-amber-500/25">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-[#1a1a1a]">ProResume</span>
          </div>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl font-black text-[#1a1a1a] mb-1">Sign in</h1>
          <p className="text-gray-500 text-sm mb-8">Enter your credentials to access your account.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all shadow-sm placeholder:text-gray-300"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all shadow-sm placeholder:text-gray-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-amber w-full justify-center !rounded-2xl !py-3.5 disabled:opacity-50 mt-1"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Sign in
                </span>
              )}
            </button>
          </form>

          <div className="mt-7 text-center">
            <span className="text-sm text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
              Create one free →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
