import React, { useState } from 'react';
import { Sparkles, Copy, Check, X } from 'lucide-react';

export default function AIGuideModal({ isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const prompts = [
    {
      id: 'summary',
      title: '1. Professional Summary',
      description: 'Generate a highly impactful opening statement tailored to your exact target role.',
      prompt: 'I am applying for a [Job Title] role. Please write a 3-sentence professional summary for my resume. I have [Number] years of experience. Focus on my core strengths: [Skill 1], [Skill 2], and [Skill 3]. Make it sound confident, impactful, and avoid overly generic buzzwords.'
    },
    {
      id: 'experience',
      title: '2. Impactful Experience Bullets',
      description: 'Turn your basic daily tasks into powerful, data-driven achievements (XYZ Format).',
      prompt: 'I need to write resume bullet points for my past role as a [Previous Job Title]. My main tasks were [Task 1] and [Task 2]. Please generate 4 professional bullet points using the XYZ resume format (Accomplished [X] as measured by [Y], by doing [Z]). Make them sound metric-driven and highly professional.'
    },
    {
      id: 'skills',
      title: '3. ATS Keyword Optimization',
      description: 'Extract exactly what the recruiter is looking for from the job description.',
      prompt: 'Here is a job description for a role I want: [Paste Job Description Here]. Please extract the top 10 most critical hard skills and top 5 soft skills required for this role. Format them as a simple comma-separated list so I can paste them directly into my resume skills section.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-indigo-950">AI Resume Writer Guide</h2>
              <p className="text-sm font-medium text-indigo-700/80 mt-0.5">Copy these prompts into ChatGPT or Gemini for best results</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-gray-50/50">
          {prompts.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-4 mt-1">{p.description}</p>
              
              <div className="relative group">
                <div className="bg-slate-800 rounded-lg p-4 pr-12">
                  <p className="text-sm text-emerald-50 font-mono leading-relaxed">{p.prompt}</p>
                </div>
                <button
                  onClick={() => handleCopy(p.prompt, p.id)}
                  className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-md backdrop-blur-sm transition-colors"
                  title="Copy Prompt"
                >
                  {copiedId === p.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="mt-3 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-100">
                💡 Tip: Fill in the [Bracketed] information before sending the prompt!
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
