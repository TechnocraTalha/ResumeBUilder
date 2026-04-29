import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Sparkles, ArrowRight, CheckCircle2, Target,
  BookOpen, Zap, Eye, ShieldCheck, Layout, ChevronRight,
  Star, TrendingUp, Clock, Users
} from 'lucide-react';

// Floating stat badge component used in hero
function StatBadge({ icon: Icon, label, value, color, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl shadow-black/10 px-4 py-3 flex items-center gap-3 border border-black/5 ${className}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs text-gray-400 font-medium leading-none mb-0.5">{label}</div>
        <div className="text-sm font-black text-gray-900 leading-none">{value}</div>
      </div>
    </div>
  );
}

// Animated ATS score card for hero
function ATSCard() {
  const [score, setScore] = useState(62);
  useEffect(() => {
    const timer = setTimeout(() => setScore(91), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 p-5 w-full border border-black/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Resume Quality</div>
            <div className="text-sm font-bold text-gray-900">ATS Score</div>
          </div>
        </div>
        <div
          className="text-3xl font-black transition-all duration-1000"
          style={{ color: score > 80 ? '#16a34a' : '#f59e0b' }}
        >
          {score}%
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
        <div
          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${score}%`,
            background: score > 80 ? 'linear-gradient(90deg,#22c55e,#16a34a)' : 'linear-gradient(90deg,#f59e0b,#ea580c)'
          }}
        />
      </div>
      <div className="space-y-2">
        {[
          { label: 'Keywords matched', pct: score > 80 ? 95 : 58 },
          { label: 'Format score',     pct: score > 80 ? 100 : 80 },
          { label: 'Relevance',        pct: score > 80 ? 88 : 55 },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="text-xs text-gray-400 w-32 shrink-0">{item.label}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000"
                style={{ width: `${item.pct}%` }}
              />
            </div>
            <div className="text-xs font-bold text-gray-700 w-8 text-right">{item.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: Target,
    title: 'ATS Keyword Scanner',
    desc: 'Paste any job description and instantly see which keywords you\'re missing. Score your resume out of 100.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    icon: ShieldCheck,
    title: 'ATS-Optimized Templates',
    desc: 'All templates are rigorously tested against major Applicant Tracking Systems to never get filtered.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Layout,
    title: '6 Premium Templates',
    desc: 'From minimalist to creative — choose designs crafted by expert recruiters and typographers.',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    icon: BookOpen,
    title: 'Phrase Library',
    desc: 'Struggling to write? Browse a built-in database of high-impact bullet points by industry.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    icon: Zap,
    title: 'Grammar & Cliché Scanner',
    desc: 'Automatically detect weak phrases like "hard worker" and get strong action-verb replacements.',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
  },
  {
    icon: Eye,
    title: 'Public Link & Analytics',
    desc: 'Host your resume online with a shareable link. Track views so you know when recruiters look.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
];

const STEPS = [
  { num: '01', title: 'Create Account',    desc: 'Sign up in seconds. No credit card, no strings attached — ever.' },
  { num: '02', title: 'Fill Your Details', desc: 'Use smart forms, the phrase library, and drag-to-reorder sections to build fast.' },
  { num: '03', title: 'Download & Share',  desc: 'Export as PDF or DOCX, or share a live public link directly with recruiters.' },
];

export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream font-sans overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        navScrolled ? 'glass shadow-sm shadow-black/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="gradient-primary p-2 rounded-xl text-white shadow-lg shadow-amber-500/25">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#1a1a1a] tracking-tight">ProResume</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
              <a href="#features" className="hover:text-[#1a1a1a] transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-[#1a1a1a] transition-colors">How it works</a>
            </div>

            <div className="flex gap-3 items-center">
              <Link to="/login" className="text-gray-600 hover:text-[#1a1a1a] px-4 py-2 text-sm font-semibold transition-colors hidden sm:block">
                Log in
              </Link>
              <Link to="/signup" className="btn-amber text-sm !py-2.5 !px-5">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="gradient-hero pt-24 pb-0 lg:pt-32 relative overflow-hidden">
        {/* Background texture blobs */}
        <div className="absolute top-10 left-[-10%] w-[600px] h-[600px] bg-amber-200/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div className="relative z-10 pt-8 pb-16 lg:pb-24">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-700 text-xs font-bold mb-7 animate-slide-down">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-gen resume builder — 100% Free</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[64px] font-black text-[#1a1a1a] leading-[1.05] mb-6 animate-slide-up">
                Build a{' '}
                <span className="font-serif-display italic text-transparent bg-clip-text gradient-primary animate-gradient">
                  Job&#8209;Winning
                </span>
                <br />
                Resume in{' '}
                <span className="relative inline-block">
                  Minutes
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6 C50 2, 150 2, 198 6" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                .
              </h1>

              <p className="text-lg text-gray-500 mb-9 max-w-lg leading-relaxed animate-slide-up delay-200" style={{animationFillMode:'both'}}>
                AI-powered ATS optimization, premium templates, and a smart phrase library — everything you need to land more interviews, fast.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300" style={{animationFillMode:'both'}}>
                <Link to="/signup" className="btn-amber text-base">
                  Build My Resume <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-outline-dark text-base">
                  View Templates
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-5 mt-8 animate-slide-up delay-400" style={{animationFillMode:'both'}}>
                <div className="flex -space-x-2">
                  {['bg-amber-400','bg-orange-500','bg-rose-400','bg-violet-500'].map((c,i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold`}>
                      {['J','A','M','S'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-700">4,200+</span> resumes built this month
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,i)=>(
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — floating UI mockup */}
            <div className="relative hidden lg:flex items-end justify-center pb-0 min-h-[520px]">
              {/* Main ATS card */}
              <div className="absolute bottom-0 left-4 right-4 animate-slide-up delay-200" style={{animationFillMode:'both'}}>
                <ATSCard />
              </div>

              {/* Floating badges */}
              <StatBadge
                icon={TrendingUp}
                label="ATS Match Rate"
                value="↑ 40% higher"
                color="bg-emerald-50 text-emerald-600"
                className="absolute top-8 -left-4 animate-float z-20"
              />
              <StatBadge
                icon={Clock}
                label="Build Time"
                value="Under 5 min"
                color="bg-amber-50 text-amber-600"
                className="absolute top-24 right-0 animate-float-slow z-20"
              />
              <StatBadge
                icon={Users}
                label="Recruiter Views"
                value="+32% more"
                color="bg-violet-50 text-violet-600"
                className="absolute top-56 -left-6 animate-float z-20"
              />
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="relative h-16 -mb-1">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full" fill="#14120e" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"/>
          </svg>
        </div>
      </section>

      {/* ── STATS TICKER (dark band) ── */}
      <section className="bg-warm-dark py-6 overflow-hidden">
        <div className="flex gap-12 items-center animate-ticker whitespace-nowrap">
          {[
            { icon: '🚀', text: 'Since 2024' },
            { icon: '📄', text: '10,000+ Resumes Generated' },
            { icon: '✅', text: '95% User Success Score' },
            { icon: '🎯', text: 'ATS-Optimized Templates' },
            { icon: '⚡', text: '5-Minute Build Time' },
            { icon: '🆓', text: 'Free Forever — No Credit Card' },
            // duplicate for seamless loop
            { icon: '🚀', text: 'Since 2024' },
            { icon: '📄', text: '10,000+ Resumes Generated' },
            { icon: '✅', text: '95% User Success Score' },
            { icon: '🎯', text: 'ATS-Optimized Templates' },
            { icon: '⚡', text: '5-Minute Build Time' },
            { icon: '🆓', text: 'Free Forever — No Credit Card' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm font-semibold text-white/70">{item.text}</span>
              <span className="text-white/20 text-lg ml-8">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES (dark bg) ── */}
      <section id="features" className="bg-warm-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Features that make <br />
              <span className="text-transparent bg-clip-text gradient-primary">ProResume stand out</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              From AI-powered ATS optimization to a built-in grammar scanner — everything you need to win, in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feat, i) => (
              <div key={i} className="card-dark p-7 group">
                <div className={`w-11 h-11 rounded-xl ${feat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feat.icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curved bottom */}
        <div className="relative h-16 -mb-1 mt-12">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full" fill="#FAFAF7" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C360,0 1080,64 1440,32 L1440,64 L0,64 Z"/>
          </svg>
        </div>
      </section>

      {/* ── SOCIAL PROOF / STATS ── */}
      <section className="bg-cream py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proven Results
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight mb-6">
                AI-Powered <br />
                <span className="font-serif-display italic text-amber-600">Interview-Ready</span> <br />
                Resumes
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                ProResume helps job seekers optimize their resumes with AI — improving visibility, relevance, and recruiter engagement across every application.
              </p>
              <Link to="/signup" className="btn-amber">
                See How It Works <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5 relative">
              {[
                { value: '40%', label: 'Higher ATS match rate',     color: 'bg-amber-50 border-amber-200/60' },
                { value: '32%', label: 'More recruiter engagement', color: 'bg-orange-50 border-orange-200/60' },
                { value: '3x',  label: 'Faster resume creation',    color: 'bg-emerald-50 border-emerald-200/60' },
              ].map((stat, i) => (
                <div key={i} className={`${stat.color} border rounded-2xl p-6 text-center`}>
                  <div className="text-3xl font-black text-[#1a1a1a] mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium leading-snug">{stat.label}</div>
                </div>
              ))}

              {/* Extra proof card */}
              <div className="col-span-3 card-warm p-6 flex items-center gap-5">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-[#1a1a1a] text-sm mb-0.5">Trusted ATS Scanning Engine</div>
                  <div className="text-xs text-gray-400 leading-relaxed">Our 7-dimension ATS scorer analyzes your resume against real recruiter criteria — no guesswork, no external API costs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-cream-md relative">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/60 text-violet-700 text-xs font-bold mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a]">Ready in 3 steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-px bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200" />

            {STEPS.map((step, i) => (
              <div key={i} className="text-center relative group">
                <div className="mx-auto w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-amber-500/25 mb-6 relative z-10 group-hover:scale-105 transition-transform">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
      <section className="bg-warm-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-dark pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Start Today — It's Free
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Ready to boost <br />your career?
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            Join thousands of professionals who landed their dream job with a ProResume.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {['Free forever', 'No credit card', 'Unlimited resumes'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> {item}
              </div>
            ))}
          </div>

          <Link to="/signup" className="btn-amber text-base !py-4 !px-10">
            Build Your Resume Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-warm-dark border-t border-white/5 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="gradient-primary p-1.5 rounded-lg text-white">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-sm font-black text-white tracking-tight">ProResume</span>
        </div>
        <p className="text-xs text-gray-600">© {new Date().getFullYear()} ProResume. All rights reserved.</p>
      </footer>
    </div>
  );
}
