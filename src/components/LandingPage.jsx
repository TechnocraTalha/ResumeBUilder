import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Layout, ShieldCheck, ArrowRight, CheckCircle2, Target, BookOpen, Zap, Eye } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="glass fixed top-0 w-full z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2.5">
              <div className="gradient-primary p-2 rounded-xl text-white shadow-lg shadow-blue-500/25">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">ProResume</span>
            </div>
            <div className="flex gap-3 items-center">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-semibold transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8 animate-slide-down">
            <Sparkles className="w-4 h-4" />
            <span>Next-gen resume builder — 100% Free</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-8 leading-[1.1] animate-slide-up">
            Build a resume that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text gradient-primary animate-gradient">
              wins interviews.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200" style={{animationFillMode: 'both', animationDelay: '200ms'}}>
            Create professional, ATS-optimized resumes in minutes with premium templates, smart keyword analysis, and a built-in grammar scanner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up delay-300" style={{animationFillMode: 'both', animationDelay: '300ms'}}>
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 gradient-primary text-white px-8 py-4 rounded-2xl text-lg font-bold hover:opacity-90 transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Create My Resume <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-2xl text-lg font-bold hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              View Templates
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-gray-900">6+</div>
            <div className="text-sm font-medium text-gray-500 mt-1">Premium Templates</div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">95%</div>
            <div className="text-sm font-medium text-gray-500 mt-1">ATS Pass Rate</div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">∞</div>
            <div className="text-sm font-medium text-gray-500 mt-1">Free Resumes</div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900">$0</div>
            <div className="text-sm font-medium text-gray-500 mt-1">No Hidden Fees</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Powerful Features</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Everything you need to land the job</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, color: 'emerald', title: 'ATS Keyword Scanner', desc: 'Paste any job description and instantly see which keywords you\'re missing. Score your resume out of 100.' },
              { icon: ShieldCheck, color: 'blue', title: 'ATS-Optimized Templates', desc: 'All templates are rigorously tested against major Applicant Tracking Systems to never get filtered out.' },
              { icon: Layout, color: 'violet', title: '6 Premium Templates', desc: 'From minimalist to creative — choose designs crafted by expert recruiters and typographers.' },
              { icon: BookOpen, color: 'amber', title: 'Phrase Library', desc: 'Struggling to write? Browse a built-in database of high-impact bullet points by industry.' },
              { icon: Zap, color: 'rose', title: 'Grammar & Cliché Scanner', desc: 'Automatically detect weak phrases like "hard worker" and get strong action-verb replacements.' },
              { icon: Eye, color: 'cyan', title: 'Public Link & Analytics', desc: 'Host your resume online with a shareable link. Track views so you know when recruiters look.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-7 rounded-2xl border border-gray-100 hover-lift group">
                <div className={`w-12 h-12 bg-${feature.color}-50 rounded-xl flex items-center justify-center text-${feature.color}-600 mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Ready in 3 steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-violet-200" />
            
            {[
              { num: '1', title: 'Create Account', desc: 'Sign up in seconds. No credit card, no strings attached.' },
              { num: '2', title: 'Fill Your Details', desc: 'Use our smart forms, phrase library, and drag-to-reorder to build fast.' },
              { num: '3', title: 'Download & Share', desc: 'Export as PDF or DOCX, or share a live public link with recruiters.' },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/25 mb-6 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Ready to boost your career?</h2>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto">Join thousands of professionals who landed their dream job with a ProResume.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {['Free forever', 'No credit card', 'Unlimited resumes'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-600 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
              </div>
            ))}
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-10 py-5 rounded-2xl text-xl font-bold hover:opacity-90 transition-all shadow-xl shadow-blue-500/25 hover:-translate-y-1"
          >
            Build Your Resume Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm bg-white">
        <p>&copy; {new Date().getFullYear()} ProResume. All rights reserved.</p>
      </footer>
    </div>
  );
}
