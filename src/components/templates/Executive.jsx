import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export default function Executive() {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, experience, education, skills, projects, customSections } = resumeData;
  const sections = customSections || [];

  return (
    <div className="p-8 font-serif text-gray-900 leading-relaxed w-full min-h-[297mm] bg-stone-50">
      {/* Header */}
      <div className="text-center mb-10 border-b-2 border-slate-800 pb-8 section-break">
        <h1 className="text-[28px] font-light tracking-widest uppercase mb-3 text-slate-900">{personalInfo.fullName}</h1>
        <div className="text-[13px] tracking-wide text-slate-600 flex flex-wrap justify-center gap-3">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <><span className="text-slate-300">|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && <><span className="text-slate-300">|</span><span>{personalInfo.email}</span></>}
          {personalInfo.linkedin && <><span className="text-slate-300">|</span><span>{personalInfo.linkedin}</span></>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8 max-w-4xl mx-auto section-break">
          <p className="text-[13px] text-justify text-slate-700 italic font-medium leading-loose border-l-4 border-slate-300 pl-6 py-2">
            "{summary}"
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-10 section-break">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.2em] text-slate-800 mb-6 flex items-center">
            <span className="uppercase">Executive Experience</span>
            <span className="ml-4 h-px bg-slate-300 flex-1"></span>
          </h2>
          <div className="space-y-8">
            {experience.map(exp => (
              <div key={exp.id} className="item-break">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-[13px] font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-[13px] font-semibold tracking-wider text-slate-500 uppercase">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[13px] text-slate-700 font-semibold mb-2">{exp.company}</div>
                {exp.description && <p className="text-[13px] text-slate-600 mb-3">{exp.description}</p>}
                <div className="text-[13px] text-slate-700 space-y-2 pl-2">
                  {exp.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-[0.5em] text-[10px] leading-none text-slate-400" style={{ minWidth: '8px' }}>•</span>
                      <span className="flex-1 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Expertise */}
      {skills.length > 0 && (
        <div className="mb-10 section-break">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.2em] text-slate-800 mb-6 flex items-center">
            <span className="uppercase">Core Competencies</span>
            <span className="ml-4 h-px bg-slate-300 flex-1"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[13px] text-slate-700 font-medium">
             {skills.map(s => (
               <div key={s.id} className="flex flex-col">
                 <span className="font-bold text-slate-900 mb-1">{s.category}</span>
                 <span className="text-slate-600 leading-relaxed">{s.items}</span>
               </div>
             ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {education.length > 0 && (
          <div className="section-break">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-800 mb-5 flex items-center">
              <span className="uppercase">Education</span>
              <span className="ml-4 h-px bg-slate-300 flex-1"></span>
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="item-break">
                  <h3 className="text-[13px] font-bold text-slate-900">{edu.degree}</h3>
                  <div className="text-[13px] font-semibold text-slate-700">{edu.field} {edu.gpa && `• GPA: ${edu.gpa}`}</div>
                  <div className="text-[13px] text-slate-600 italic mt-1">{edu.institution}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="section-break">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-800 mb-5 flex items-center">
              <span className="uppercase">Key Initiatives</span>
              <span className="ml-4 h-px bg-slate-300 flex-1"></span>
            </h2>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id} className="item-break">
                  <h3 className="text-[13px] font-bold text-slate-900 flex justify-between items-baseline">
                    {proj.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-medium my-1">{(proj.technologies || []).join(', ')}</div>
                  <div className="text-[13px] text-slate-700 space-y-2 mt-2 pl-2">
                    {proj.description && proj.description.split('\n').filter(Boolean).map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-[0.5em] text-[10px] leading-none text-slate-400" style={{ minWidth: '8px' }}>•</span>
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
          <div key={section.id} className="mb-8 section-break">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">
              {section.title}
            </h2>
            <div className="text-[13px] text-slate-700 space-y-2 mt-2 pl-2">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="mt-[0.5em] text-[10px] leading-none text-slate-400" style={{ minWidth: '8px' }}>•</span>
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
