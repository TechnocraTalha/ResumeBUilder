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
    // Full Resume Generators
    {
      id: 'full_entry',
      title: '🌟 1. Full Resume: Student / Entry-Level',
      description: 'Generate an entire resume from scratch, prioritizing education and projects over work experience.',
      prompt: 'I am a student/recent graduate with a degree in [Degree] targeting a [Job Title] role. Here are my raw details: [Paste courses, projects, internships, and extracurriculars]. Please write a complete, professional resume. Include a highly motivated summary, format my projects using the XYZ achievement formula, and extract a list of relevant hard and soft skills.'
    },
    {
      id: 'full_career_change',
      title: '🌟 2. Full Resume: Career Changer',
      description: 'Generate a complete resume that perfectly pivots your old experience into a new industry.',
      prompt: 'I am transitioning from a career in [Old Field] to [New Target Field]. Here is my raw work history: [Paste Work History]. Write a complete, ATS-friendly resume. Write a strong summary explaining my pivot, rewrite my past experience to heavily emphasize transferable skills relevant to [New Target Field], and ensure the tone fits my new industry.'
    },
    {
      id: 'full_senior',
      title: '🌟 3. Full Resume: Senior / Executive',
      description: 'Generate a high-level executive resume focused on leadership, metrics, and business impact.',
      prompt: 'I am an experienced professional targeting a [Senior/Executive Title] role at [Company Name]. Here is my raw work history over the last 10+ years: [Paste Work History]. Please write a complete, executive-level resume. Include a powerful executive summary, rewrite my experience to heavily focus on leadership and quantified business impact, and keep the tone authoritative.'
    },
    // Section Specific
    {
      id: 'summary',
      title: '4. Professional Summary Writer',
      description: 'Generate a highly impactful opening statement tailored to your exact target role.',
      prompt: 'I am applying for a [Job Title] role. Please write a 3-sentence professional summary for my resume. I have [Number] years of experience. Focus on my core strengths: [Skill 1], [Skill 2], and [Skill 3]. Make it sound confident, impactful, and avoid overly generic buzzwords.'
    },
    {
      id: 'experience',
      title: '5. Impactful Experience Bullets',
      description: 'Turn your basic daily tasks into powerful, data-driven achievements (XYZ Format).',
      prompt: 'I need to write resume bullet points for my past role as a [Previous Job Title]. My main tasks were [Task 1] and [Task 2]. Please generate 4 professional bullet points using the XYZ resume format (Accomplished [X] as measured by [Y], by doing [Z]). Make them sound metric-driven and highly professional.'
    },
    {
      id: 'projects',
      title: '6. Project Description Enhancer',
      description: 'Transform a casual side-project into a highly technical, recruiter-ready feature.',
      prompt: 'I built a project that does [Brief Description of what it does]. The technologies I used are: [Tech Stack]. Please rewrite this into 3 professional resume bullet points. Highlight the technical architecture, the problem it solved, and the final impact or result.'
    },
    {
      id: 'skills',
      title: '7. ATS Keyword Extraction',
      description: 'Extract exactly what the recruiter is looking for from the job description.',
      prompt: 'Here is a job description for a role I want: [Paste Job Description Here]. Please extract the top 10 most critical hard skills and top 5 soft skills required for this role. Format them as a simple comma-separated list so I can easily paste them directly into my resume skills section.'
    },
    // Polish & Extras
    {
      id: 'grammar',
      title: '8. Grammar & Tone Polish',
      description: 'Fix typos, grammar errors, and improve the overall vocabulary of your written text.',
      prompt: 'Please review my current resume content: [Paste Content]. Correct any grammatical errors, improve the vocabulary to sound more professional and active, and ensure a consistent tone throughout. Do not change any of my core facts or metrics.'
    },
    {
      id: 'cover_letter',
      title: '9. Tailored Cover Letter Generator',
      description: 'Instantly generate a customized cover letter that perfectly matches the job.',
      prompt: 'Write a tailored, engaging cover letter for the [Job Title] position at [Company]. Here is my resume: [Paste Resume] and here is the job description: [Paste Job Description]. Keep it under 300 words, make it conversational but professional, and focus heavily on how my past achievements solve their specific needs.'
    },
    {
      id: 'interview_prep',
      title: '10. Mock Interview Preparation',
      description: 'Anticipate exactly what the hiring manager will ask you based on your new resume.',
      prompt: 'Based on my resume: [Paste Resume] and this job description: [Paste Job Description], act as a strict hiring manager. What are the top 5 toughest questions you would ask me in an interview to test my skills? Also, provide the ideal way I should structure my answers for each.'
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
