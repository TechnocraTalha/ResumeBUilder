import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Professional Summary</h2>
        <p className="text-sm text-gray-500 mt-1">Write a short and engaging pitch about yourself.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-gray-700">Summary</label>
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          rows={6}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
          placeholder="Experienced Software Engineer with a passion for..."
        />
        <p className="text-xs text-gray-500">Keep it to 3-4 sentences. Highlight your biggest achievements.</p>
      </div>
    </div>
  );
}
