import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FileText, UserPlus, Target, BookOpen, Zap, CheckCircle2 } from 'lucide-react';

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
      {/* ── Left Panel — Warm Branding ── */}
      <div className="hidden lg:flex w-[45%] bg-[#F2EDE0] text-[#1a1a1a] flex-col justify-between p-12 relative overflow-hidden">
        {/* Warm blobs */}
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-orange-300/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-amber-200/25 rounded-full blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="gradient-primary p-2 rounded-xl shadow-lg shadow-amber-500/25">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">ProResume</span>
        </div>

        {/* Steps preview */}
        <div className="relative z-10">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/8 p-5 mb-8 border border-black/5">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Guided Resume Flow</div>
            {['Personal Details', 'Professional Summary', 'Skills & Experience'].map((step, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 2 ? 'bg-emerald-500' : 'bg-amber-400'}`}>
                  {i < 2
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    : <span className="text-[9px] text-white font-bold">3</span>
                  }
                </div>
                <span className="text-sm font-medium text-gray-700">{step}</span>
                {i === 2 && <span className="ml-auto text-[10px] text-amber-600 font-bold">In Progress</span>}
              </div>
            ))}
          </div>

          <h2 className="text-4xl font-black leading-tight mb-4">
            Start your journey.<br />
            <span className="font-serif-display italic text-orange-600">Land your dream job.</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Create unlimited resumes, optimize for ATS, and share with recruiters — all completely free, forever.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-3">
          {[
            { icon: Target,   text: 'Built-in ATS keyword scanner' },
            { icon: BookOpen, text: 'Pre-written phrase library' },
            { icon: Zap,      text: 'Grammar & cliché checker' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                <item.icon className="w-3.5 h-3.5 text-orange-700" />
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
          <h1 className="text-3xl font-black text-[#1a1a1a] mb-1">Create account</h1>
          <p className="text-gray-500 text-sm mb-8">Get started with your free account today.</p>

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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all shadow-sm placeholder:text-gray-300"
                placeholder="Minimum 6 characters"
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
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Create free account
                </span>
              )}
            </button>
          </form>

          <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="mt-5 text-center">
            <span className="text-sm text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
              Sign in →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
