import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

/**
 * Creative Portfolio Template
 * A bold, modern two-col layout for creatives with strong typography.
 */
export default function CreativePortfolio() {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, experience, education, skills, projects, certifications, customSections } = resumeData;

  const sections = customSections || [];

  return (
    <div className="w-full h-full bg-white print:bg-white text-gray-800" style={{ minHeight: '297mm' }}>
      <div className="grid grid-cols-[1fr_2fr] min-h-full">
        {/* LEFT COLUMN (Sidebar) */}
        <div className="bg-gray-900 text-gray-50 flex flex-col pt-12">
          <div className="px-8 pb-10 border-b border-gray-700">
            <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 leading-tight">
              {personalInfo.fullName.split(' ').map((name, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-blue-400' : ''}`}>{name}</span>
              ))}
            </h1>
            <div className="mt-6 text-sm space-y-3 font-light text-gray-300">
              {personalInfo.email && <div className="flex gap-2"><span className="text-blue-400">@</span>{personalInfo.email}</div>}
              {personalInfo.phone && <div className="flex gap-2"><span className="text-blue-400">#</span>{personalInfo.phone}</div>}
              {personalInfo.location && <div className="flex gap-2"><span className="text-blue-400">📍</span>{personalInfo.location}</div>}
              {personalInfo.website && <div className="flex gap-2"><span className="text-blue-400">W</span>{personalInfo.website}</div>}
              {personalInfo.linkedin && <div className="flex gap-2"><span className="text-blue-400">in</span>{personalInfo.linkedin}</div>}
            </div>
          </div>

          <div className="px-8 py-8 flex-1">
            {/* SKILLS */}
            {skills.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400 mb-5 text-sm">Skills Base</h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <h3 className="text-sm font-semibold text-white mb-1">{skill.category}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{skill.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION in Sidebar */}
            {education.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400 mb-5 text-sm">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-sm font-semibold text-white leading-tight">{edu.degree} in {edu.field}</h3>
                      <p className="text-xs text-blue-300 my-1">{edu.institution}</p>
                      <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && <p className="text-xs text-gray-400 mt-1">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* CERTIFICATES */}
            {certifications.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400 mb-5 text-sm">Certifications</h2>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 className="text-sm font-semibold text-white">{cert.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (Main Content) */}
        <div className="px-10 py-12 flex flex-col bg-white">
          {summary && (
            <section className="mb-10">
              <h2 className="text-3xl font-light text-gray-800 mb-4 tracking-tight">Profile</h2>
              <p className="text-sm text-gray-600 leading-relaxed font-med">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6 tracking-tight uppercase text-sm">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-blue-500">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-blue-500" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">{exp.company}</p>
                    {exp.description && <p className="text-xs text-gray-500 mb-3">{exp.description}</p>}
                    <ul className="list-none space-y-1">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="mr-2 text-blue-400">▸</span> {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6 tracking-tight uppercase text-sm">Featured Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((proj) => (
                   <div key={proj.id} className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
                     <div className="flex justify-between items-start mb-2">
                       <h3 className="text-base font-bold text-gray-800">{proj.name}</h3>
                       {proj.link && <a href={`https://${proj.link.replace('https://', '')}`} className="text-xs text-blue-600 font-medium hover:underline">Link ↗</a>}
                     </div>
                     <p className="text-xs text-gray-600 mb-3 leading-relaxed">{proj.description}</p>
                     <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className="text-[10px] uppercase font-bold px-2 py-0.5 bg-gray-200 text-gray-600 rounded-sm">
                            {tech}
                          </span>
                        ))}
                     </div>
                   </div>
                ))}
              </div>
            </section>
          )}

          {/* CUSTOM SECTIONS */}
          {sections.map(section => (
            <section key={section.id} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6 tracking-tight uppercase text-sm">{section.title}</h2>
              <ul className="list-disc list-outside ml-4 space-y-1.5">
                {section.items.map(item => (
                   <li key={item.id} className="text-xs text-gray-600 leading-relaxed pl-1 marker:text-blue-500">
                     {item.text}
                   </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
