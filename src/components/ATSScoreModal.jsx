import React, { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { X, Target, CheckCircle2, AlertCircle, Loader2, TrendingUp, FileText, User, AlignLeft, Zap, Award, Hash } from 'lucide-react';

// ─── Data ───────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'the','and','a','an','in','to','for','with','on','at','from','by','about','as','into',
  'through','after','over','between','out','against','during','without','before','under',
  'around','among','of','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','shall','should','can','could','may','might','must',
  'i','you','he','she','it','we','they','my','your','his','her','its','our','their',
  'this','that','these','those','who','which','what','all','any','both','each','few',
  'more','most','other','some','such','no','nor','not','only','own','same','so','than',
  'too','very','just','now','experience','years','required','preferred','looking','seeking',
  'role','job','team','ability','skills','strong','excellent','working','environment','plus',
  'familiarity','proficient','including','work','use','using','used','also','well','based',
  'able','new','good','high','great','large','small','make','made','get','give','need',
]);

const ACTION_VERBS = new Set([
  'achieved','accelerated','accomplished','architected','automated','built','championed',
  'coached','collaborated','conceived','configured','consolidated','contributed','created',
  'cut','debugged','decreased','defined','delivered','deployed','designed','developed',
  'directed','drove','engineered','established','exceeded','executed','expanded','founded',
  'generated','grew','improved','implemented','increased','initiated','integrated','launched',
  'led','managed','mentored','migrated','modernized','optimized','orchestrated','owned',
  'partnered','pioneered','produced','reduced','refactored','released','restructured',
  'revamped','scaled','secured','shipped','solved','spearheaded','streamlined','transformed',
  'upgraded','wrote','analyzed','assessed','boosted','built','collaborated','communicated',
  'coordinated','created','cultivated','delivered','demonstrated','devised','eliminated',
  'enhanced','evaluated','facilitated','formulated','guided','identified','innovated',
  'introduced','negotiated','oversaw','planned','presented','prioritized','proposed',
  'provided','published','resolved','reviewed','simplified','supported','trained','unified',
]);

const WEAK_PHRASES = [
  'responsible for','helped with','worked on','assisted with','duties included',
  'tasks included','in charge of','tasked with','contributed to','participated in',
  'involved in','part of the team','helped to','was responsible','worked with',
];

// ─── Helpers ────────────────────────────────────────────────────────────────

const tokenize = (text) => {
  if (!text) return [];
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
};

const getBigrams = (words) => {
  const bigrams = [];
  for (let i = 0; i < words.length - 1; i++) bigrams.push(`${words[i]} ${words[i+1]}`);
  return bigrams;
};

const countWords = (text) => (text || '').split(/\s+/).filter(Boolean).length;

const hasQuantifier = (text) => /\d+%|\$[\d,]+|\d+x|\d{2,}|\b\d+\s*(million|billion|thousand|k\b)/i.test(text || '');

const startsWithActionVerb = (text) => {
  const first = (text || '').trim().toLowerCase().split(/\s+/)[0];
  return ACTION_VERBS.has(first);
};

const hasWeakPhrase = (text) => WEAK_PHRASES.some(p => (text || '').toLowerCase().includes(p));

// ─── Scoring Engine ──────────────────────────────────────────────────────────

const score = (resumeData, jobDescription) => {
  const results = [];

  // ── 1. Keyword Match (25 pts) ──
  const jdWords = tokenize(jobDescription);
  const jdBigrams = getBigrams(jdWords);
  const jdFreq = {};
  [...jdWords, ...jdBigrams].forEach(w => jdFreq[w] = (jdFreq[w] || 0) + 1);
  const targetKws = Object.entries(jdFreq).sort((a,b)=>b[1]-a[1]).slice(0,25).map(e=>e[0]);

  const resumeText = [
    resumeData.summary,
    ...resumeData.skills.map(s => s.items),
    ...resumeData.experience.map(e => e.position + ' ' + e.description + ' ' + e.highlights.join(' ')),
    ...resumeData.projects.map(p => p.name + ' ' + p.description + ' ' + (p.technologies||[]).join(' ')),
    ...resumeData.certifications.map(c => c.name),
  ].join(' ');
  const resumeWords = new Set(tokenize(resumeText));
  const resumeBigrams = new Set(getBigrams(Array.from(resumeWords)));

  const matched = [], missing = [];
  targetKws.forEach(kw => {
    const found = kw.includes(' ') ? resumeBigrams.has(kw) : resumeWords.has(kw) || Array.from(resumeWords).some(w => w.includes(kw) || kw.includes(w));
    (found ? matched : missing).push(kw);
  });
  const kwScore = targetKws.length > 0 ? Math.round((matched.length / targetKws.length) * 25) : 25;
  const missingKwsFormatted = missing.filter(kw => !kw.includes(' ')).slice(0,10);
  results.push({
    id: 'keywords', label: 'Keyword Match', icon: Hash, max: 25, score: kwScore,
    details: [`${matched.length}/${targetKws.length} keywords matched`],
    issues: missingKwsFormatted.length > 0 ? [`Missing: ${missingKwsFormatted.join(', ')}`] : [],
    tip: 'Add missing keywords naturally into your Skills or Experience sections.',
  });

  // ── 2. Quantified Achievements (20 pts) ──
  const allBullets = resumeData.experience.flatMap(e => [...e.highlights, e.description].filter(Boolean));
  const totalBullets = allBullets.length;
  const quantifiedBullets = allBullets.filter(hasQuantifier).length;
  const qaRatio = totalBullets > 0 ? quantifiedBullets / totalBullets : 0;
  const qaScore = Math.round(qaRatio * 20);
  const qaIssues = [];
  if (totalBullets === 0) qaIssues.push('No experience bullet points found at all');
  else if (qaRatio < 0.3) qaIssues.push(`Only ${quantifiedBullets}/${totalBullets} bullets have numbers/metrics`);
  results.push({
    id: 'achievements', label: 'Quantified Achievements', icon: TrendingUp, max: 20, score: qaScore,
    details: [`${quantifiedBullets} of ${totalBullets} bullets contain metrics`],
    issues: qaIssues,
    tip: 'Add numbers, %, $ or "2x" to at least 50% of your bullet points.',
  });

  // ── 3. Action Verbs & Language (15 pts) ──
  const verbBullets = allBullets.filter(startsWithActionVerb).length;
  const weakBullets = allBullets.filter(hasWeakPhrase).length;
  const verbRatio = totalBullets > 0 ? verbBullets / totalBullets : 0;
  const verbScore = Math.max(0, Math.round(verbRatio * 15) - (weakBullets * 2));
  const verbIssues = [];
  if (verbRatio < 0.5 && totalBullets > 0) verbIssues.push(`Only ${verbBullets}/${totalBullets} bullets start with strong action verbs`);
  if (weakBullets > 0) verbIssues.push(`${weakBullets} bullet(s) use weak phrases like "responsible for"`);
  results.push({
    id: 'verbs', label: 'Action Verbs & Language', icon: Zap, max: 15, score: Math.min(15, verbScore),
    details: [`${verbBullets} bullets start with strong action verbs`],
    issues: verbIssues,
    tip: 'Begin each bullet with a verb like "Led", "Built", "Reduced", or "Scaled".',
  });

  // ── 4. Format Compliance (15 pts) ──
  let formatScore = 15;
  const formatIssues = [];
  const expWithNoHighlights = resumeData.experience.filter(e => e.highlights.filter(Boolean).length === 0);
  if (expWithNoHighlights.length > 0) {
    formatScore -= 5;
    formatIssues.push(`${expWithNoHighlights.length} experience(s) have no bullet points`);
  }
  const tooLongBullets = allBullets.filter(b => b.length > 250);
  if (tooLongBullets.length > 0) {
    formatScore -= 3;
    formatIssues.push(`${tooLongBullets.length} bullet(s) are too long (>250 chars) — split them`);
  }
  const tooShortBullets = allBullets.filter(b => b.length < 20 && b.length > 0);
  if (tooShortBullets.length > 0) {
    formatScore -= 2;
    formatIssues.push(`${tooShortBullets.length} bullet(s) are too short (<20 chars) — add more detail`);
  }
  const noSummary = !resumeData.summary || resumeData.summary.length < 50;
  if (noSummary) { formatScore -= 5; formatIssues.push('Summary is missing or too short (<50 chars)'); }
  results.push({
    id: 'format', label: 'Format & Structure', icon: AlignLeft, max: 15, score: Math.max(0, formatScore),
    details: ['Checked bullet lengths, summary, and section structure'],
    issues: formatIssues,
    tip: 'Add 2–5 bullet points per job. Keep each between 50–200 characters.',
  });

  // ── 5. Section Coverage (10 pts) ──
  let sectionScore = 0;
  const sectionIssues = [];
  const sections = [
    { key: 'summary', label: 'Professional Summary', check: resumeData.summary && resumeData.summary.length > 20 },
    { key: 'experience', label: 'Work Experience', check: resumeData.experience.length > 0 },
    { key: 'education', label: 'Education', check: resumeData.education.length > 0 },
    { key: 'skills', label: 'Skills', check: resumeData.skills.length > 0 },
  ];
  sections.forEach(s => {
    if (s.check) sectionScore += 2.5;
    else sectionIssues.push(`${s.label} section is missing`);
  });
  results.push({
    id: 'sections', label: 'Section Coverage', icon: FileText, max: 10, score: Math.round(sectionScore),
    details: [`${sections.filter(s=>s.check).length}/4 major sections present`],
    issues: sectionIssues,
    tip: 'All 4 sections (Summary, Experience, Education, Skills) must be filled in.',
  });

  // ── 6. Contact Completeness (10 pts) ──
  const { personalInfo: pi } = resumeData;
  const contactFields = [
    { label: 'Full Name', val: pi.fullName },
    { label: 'Email', val: pi.email },
    { label: 'Phone', val: pi.phone },
    { label: 'Location', val: pi.location },
    { label: 'LinkedIn', val: pi.linkedin },
    { label: 'Website / Portfolio', val: pi.website },
  ];
  const filledContact = contactFields.filter(f => f.val && f.val.trim());
  const missingContact = contactFields.filter(f => !f.val || !f.val.trim());
  const contactScore = Math.round((filledContact.length / contactFields.length) * 10);
  results.push({
    id: 'contact', label: 'Contact Completeness', icon: User, max: 10, score: contactScore,
    details: [`${filledContact.length}/6 contact fields filled`],
    issues: missingContact.map(f => `Missing: ${f.label}`),
    tip: 'Fill in all contact fields for maximum ATS parseability.',
  });

  // ── 7. Resume Length (5 pts) ──
  const allText = [
    resumeData.summary,
    ...resumeData.experience.map(e => e.description + ' ' + e.highlights.join(' ')),
    ...resumeData.education.map(e => e.degree + ' ' + e.institution),
    ...resumeData.skills.map(s => s.items),
    ...resumeData.projects.map(p => p.description),
  ].join(' ');
  const wordCount = countWords(allText);
  const lengthIssues = [];
  let lengthScore = 5;
  if (wordCount < 200) { lengthScore = 1; lengthIssues.push(`Only ${wordCount} words — resume is too sparse (aim for 300+)`); }
  else if (wordCount < 300) { lengthScore = 3; lengthIssues.push(`${wordCount} words — slightly thin, add more detail`); }
  else if (wordCount > 900) { lengthScore = 3; lengthIssues.push(`${wordCount} words — may be too long, aim for under 700`); }
  else if (wordCount > 700) { lengthScore = 4; lengthIssues.push(`${wordCount} words — borderline, try to trim slightly`); }
  results.push({
    id: 'length', label: 'Resume Length', icon: Award, max: 5, score: lengthScore,
    details: [`~${wordCount} words detected (ideal: 300–700)`],
    issues: lengthIssues,
    tip: 'Aim for 300–700 words. Too short looks thin; too long loses recruiters.',
  });

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);

  // Top 3 Quick Wins = lowest score/max ratios
  const quickWins = [...results].sort((a,b) => (a.score/a.max) - (b.score/b.max)).slice(0,3);

  return { totalScore, dimensions: results, quickWins };
};

// ─── Circular Gauge ──────────────────────────────────────────────────────────

function Gauge({ score }) {
  const r = 54, circ = 2 * Math.PI * r;
  const offset = circ - (circ * score) / 100;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 75 ? 'Strong Match' : score >= 50 ? 'Needs Work' : 'Needs Optimization';
  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 70 70)"
          style={{transition:'stroke-dashoffset 1s ease-out'}} />
        <text x="70" y="65" textAnchor="middle" fontSize="28" fontWeight="900" fill="#111827">{score}</text>
        <text x="70" y="83" textAnchor="middle" fontSize="11" fill="#6b7280" fontWeight="600">/ 100</text>
      </svg>
      <p className="font-bold text-gray-800 mt-1">{label}</p>
    </div>
  );
}

// ─── Score Card ──────────────────────────────────────────────────────────────

function ScoreCard({ dim }) {
  const pct = Math.round((dim.score / dim.max) * 100);
  const color = pct >= 75 ? 'emerald' : pct >= 50 ? 'amber' : 'red';
  const barColors = { emerald: 'bg-emerald-500', amber: 'bg-amber-400', red: 'bg-red-500' };
  const bgColors  = { emerald: 'bg-emerald-50 border-emerald-100', amber: 'bg-amber-50 border-amber-100', red: 'bg-red-50 border-red-100' };
  const textColors= { emerald: 'text-emerald-700', amber: 'text-amber-700', red: 'text-red-700' };
  return (
    <div className={`p-4 rounded-xl border ${bgColors[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <dim.icon className={`w-4 h-4 ${textColors[color]}`} />
          <span className="text-sm font-bold text-gray-800">{dim.label}</span>
        </div>
        <span className={`text-sm font-black ${textColors[color]}`}>{dim.score}/{dim.max}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div className={`h-full ${barColors[color]} rounded-full transition-all duration-700`} style={{width:`${pct}%`}} />
      </div>
      {dim.issues.map((issue, i) => (
        <p key={i} className="text-xs text-gray-600 flex items-start gap-1 mt-1">
          <AlertCircle className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />{issue}
        </p>
      ))}
      {dim.issues.length === 0 && (
        <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
          <CheckCircle2 className="w-3 h-3" /> Looks great!
        </p>
      )}
    </div>
  );
}

// ─── Main Modal ──────────────────────────────────────────────────────────────

export default function ATSScoreModal({ isOpen, onClose }) {
  const { resumeData } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  if (!isOpen) return null;

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setResults(score(resumeData, jobDescription));
      setIsAnalyzing(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="gradient-primary p-2 rounded-lg text-white">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900">ATS Score Analyzer</h2>
              <p className="text-xs text-gray-500 font-medium">7-dimension professional resume scan</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">

          {/* Input State */}
          {!results && !isAnalyzing && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['25 pts','Keyword Match'],['20 pts','Achievements'],['15 pts','Action Verbs'],
                  ['15 pts','Format'],['10 pts','Sections'],['10 pts','Contact'],['5 pts','Length']
                ].map(([pts, label]) => (
                  <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                    <div className="text-lg font-black text-blue-600">{pts}</div>
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">
                  Paste the Job Description <span className="text-gray-400 font-normal">(optional but recommended)</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">We'll match your resume against 25 keywords extracted from the JD. Without a JD, keyword score defaults to full points.</p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="e.g. We are looking for a Senior React Developer with 3+ years experience in Node.js, TypeScript, and AWS..."
                  className="w-full h-40 rounded-xl border border-gray-200 p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <button
                onClick={runAnalysis}
                className="w-full py-3.5 gradient-primary text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all"
              >
                Run Full ATS Analysis
              </button>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="text-gray-600 font-semibold animate-pulse">Analyzing 7 dimensions...</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {['Keywords','Achievements','Verbs','Format','Sections','Contact','Length'].map(d => (
                  <span key={d} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {results && !isAnalyzing && (
            <div className="space-y-6 animate-fade-in">
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <Gauge score={results.totalScore} />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-gray-900 mb-1">Your ATS Score</h3>
                  <p className="text-gray-500 text-sm mb-4">Based on 7 professional resume criteria used by Jobscan & ResumeWorded.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {results.dimensions.map(d => (
                      <div key={d.id} className="flex items-center justify-between text-xs text-gray-600 bg-white rounded-lg px-2 py-1.5 border border-gray-100">
                        <span className="font-medium">{d.label}</span>
                        <span className={`font-black ${(d.score/d.max)>=0.75?'text-emerald-600':(d.score/d.max)>=0.5?'text-amber-600':'text-red-600'}`}>
                          {d.score}/{d.max}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7 Score Cards */}
              <div>
                <h4 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-3">Dimension Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.dimensions.map(d => <ScoreCard key={d.id} dim={d} />)}
                </div>
              </div>

              {/* Quick Wins */}
              {results.quickWins.some(d => d.issues.length > 0) && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <h4 className="text-sm font-black text-blue-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Top Quick Wins to Boost Your Score
                  </h4>
                  <div className="space-y-3">
                    {results.quickWins.filter(d => d.issues.length > 0).map((d, i) => (
                      <div key={d.id} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{d.label}</p>
                          <p className="text-xs text-gray-600">{d.tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setResults(null)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Scan Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
