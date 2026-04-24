import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export default function ATSOrdered() {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, experience, education, skills, projects, certifications, customSections } = resumeData;
  const sections = customSections || [];

  // Contact -> Summary -> Skills -> Experience -> Projects -> Certifications -> Education

  return (
    <div className="p-8 font-serif text-black leading-snug w-full h-full">
      {/* Contact Header */}
      <div className="text-center mb-6">
        <h1 className="text-[22px] font-bold uppercase mb-2">{personalInfo.fullName || 'Name'}</h1>
        <div className="text-[13px] flex flex-wrap justify-center gap-2 items-center">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <><span className="text-gray-400">|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && <><span className="text-gray-400">|</span><span>{personalInfo.email}</span></>}
          {personalInfo.linkedin && <><span className="text-gray-400">|</span><span>{personalInfo.linkedin}</span></>}
          {personalInfo.website && <><span className="text-gray-400">|</span><span>{personalInfo.website}</span></>}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
         <div className="mb-5 section-break">
           <h2 className="text-md font-bold uppercase border-b border-black mb-2 pb-1">Professional Summary</h2>
           <p className="text-[13px] w-full text-justify">{summary}</p>
         </div>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-5 section-break">
          <h2 className="text-md font-bold uppercase border-b border-black mb-2 pb-1">Technical Skills</h2>
          <div className="space-y-1">
             {skills.map(s => (
               <div key={s.id} className="text-[13px] item-break">
                 <span className="font-bold">{s.category}:</span> {s.items}
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-5 section-break">
          <h2 className="text-md font-bold uppercase border-b border-black mb-3 pb-1">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="item-break">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[13px] font-bold">{exp.position}</h3>
                  <span className="text-[13px] font-semibold">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[13px] italic mb-1">{exp.company}</div>
                {exp.description && <p className="text-[13px] mb-1">{exp.description}</p>}
                <div className="text-[13px] space-y-1 pl-1">
                  {exp.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-[0.4em] text-[10px] leading-none" style={{ minWidth: '8px' }}>•</span>
                      <span className="flex-1 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5 section-break">
          <h2 className="text-md font-bold uppercase border-b border-black mb-3 pb-1">Projects</h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id} className="item-break">
                <div className="flex justify-between items-baseline mb-1">
                   <h3 className="text-[13px] font-bold flex items-center gap-2">
                     {proj.name} 
                     {proj.link && <span className="text-[11px] font-normal text-gray-600">({proj.link})</span>}
                   </h3>
                </div>
                <div className="text-[13px] italic mb-1">Technologies: {(proj.technologies || []).join(', ')}</div>
                <div className="text-[13px] space-y-1 pl-1">
                  {proj.description && proj.description.split('\n').filter(Boolean).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-[0.4em] text-[10px] leading-none" style={{ minWidth: '8px' }}>•</span>
                      <span className="flex-1 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-5 section-break">
          <h2 className="text-md font-bold uppercase border-b border-black mb-3 pb-1">Certifications</h2>
          <div className="space-y-3">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline item-break">
                <div>
                  <h3 className="text-[13px] font-bold">{cert.name}</h3>
                  <div className="text-[13px]">{cert.issuer}</div>
                </div>
                <div className="text-[13px] font-semibold">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5 section-break">
          <h2 className="text-md font-bold uppercase border-b border-black mb-3 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline item-break">
                <div>
                  <h3 className="text-[13px] font-bold">{edu.institution}</h3>
                  <div className="text-[13px]">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
                </div>
                <div className="text-[13px] font-semibold">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {sections.length > 0 && sections.map(section => (
        <div key={section.id} className="mb-5 section-break">
          <h2 className="text-md font-bold uppercase border-b border-black mb-3 pb-1">{section.title}</h2>
          <div className="space-y-1">
             {section.items.map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <span className="mt-[0.4em] text-[10px] leading-none" style={{ minWidth: '8px' }}>•</span>
                  <span className="flex-1 text-[13px] leading-snug">{item.text}</span>
                </div>
             ))}
          </div>
        </div>
      ))}
    </div>
  );
}
