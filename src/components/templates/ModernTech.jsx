import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export default function ModernTech() {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, experience, education, skills, projects, customSections } = resumeData;
  const sections = customSections || [];

  return (
    <div className="font-sans text-gray-800 w-full h-full flex flex-row">
      {/* Sidebar */}
      <div className="w-[32%] bg-slate-800 text-white p-6 sidebar-break">
        <h1 className="text-[22px] font-bold tracking-tight text-white mb-2 leading-tight">{personalInfo.fullName}</h1>
        <h2 className="text-[13px] font-medium theme-text mb-8">{experience[0]?.position || 'Professional'}</h2>

        <div className="mb-8 space-y-3 text-[13px] text-slate-300">
          {personalInfo.location && <div className="flex items-center gap-2"><span className="text-slate-500">📍</span> {personalInfo.location}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><span className="text-slate-500">📞</span> {personalInfo.phone}</div>}
          {personalInfo.email && <div className="flex items-center gap-2"><span className="text-slate-500">✉️</span> {personalInfo.email}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><span className="text-slate-500">💼</span> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-2"><span className="text-slate-500">🌐</span> {personalInfo.website}</div>}
        </div>

        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-600 pb-2">Skills</h3>
            <div className="space-y-4">
              {skills.map(s => (
                <div key={s.id}>
                  <div className="text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">{s.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.split(',').map((skill, i) => skill.trim() && (
                      <span key={i} className="bg-slate-700/50 border border-slate-600 text-slate-200 px-2.5 py-1 text-[11px] rounded-md">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-600 pb-2">Education</h3>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="text-[13px] font-bold text-slate-200">{edu.degree}</div>
                  <div className="text-[11px] theme-text mb-1">{edu.field}</div>
                  <div className="text-[11px] text-slate-400">{edu.institution}</div>
                  <div className="text-[11px] text-slate-500">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[68%] p-6 bg-slate-50">
        {summary && (
          <div className="mb-8 section-break">
            <h3 className="text-[15px] font-bold text-slate-800 mb-3 flex items-center gap-2">
               <span className="w-6 h-0.5 theme-bg inline-block"></span> Profile
            </h3>
            <p className="text-[13px] text-slate-600 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8 section-break">
            <h3 className="text-[15px] font-bold text-slate-800 mb-5 flex items-center gap-2">
               <span className="w-6 h-0.5 theme-bg inline-block"></span> Experience
            </h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 item-break">
                  <div className="absolute w-2.5 h-2.5 theme-bg rounded-full -left-[6px] top-1.5 border-2 border-slate-50"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-800">{exp.position}</h4>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-[13px] theme-text font-medium mb-2">{exp.company}</div>
                  {exp.description && <p className="text-[13px] text-slate-600 mb-2">{exp.description}</p>}
                  <div className="text-[13px] text-slate-600 space-y-1">
                    {exp.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="theme-text mt-[0.2em] leading-none text-[1em]">▹</span>
                        <span className="flex-1 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="section-break">
            <h3 className="text-[15px] font-bold text-slate-800 mb-5 flex items-center gap-2">
               <span className="w-6 h-0.5 theme-bg inline-block"></span> Projects
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 item-break">
                  <div className="flex justify-between items-baseline mb-1">
                     <h4 className="font-bold text-slate-800 text-[13px]">{proj.name}</h4>
                     <span className="text-[11px] text-slate-400">{proj.link}</span>
                  </div>
                  <div className="text-[11px] theme-text font-medium mb-2">{(proj.technologies || []).join(' • ')}</div>
                  <div className="text-[13px] text-slate-600 space-y-1">
                    {proj.description && proj.description.split('\n').filter(Boolean).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="theme-text mt-[0.2em] leading-none text-[1em]">▹</span>
                        <span className="flex-1 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Custom Sections */}
        {sections.length > 0 && sections.map(section => (
          <div key={section.id} className="mb-6 item-break">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 theme-border pb-1 mb-4">
              {section.title}
            </h2>
            <div className="text-[13px] text-slate-600 space-y-1">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <span className="theme-text mt-[0.2em] leading-none text-[1em]">▹</span>
                  <span className="flex-1 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
