import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

/**
 * Minimalist Academic Template
 * Clean, single-column, heavy emphasis on structure and clarity over styling.
 */
export default function MinimalistAcademic() {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, experience, education, skills, projects, certifications, customSections } = resumeData;

  const sections = customSections || [];

  return (
    <div className="w-[210mm] max-w-full bg-white p-[25mm] print:p-[20mm] text-black font-serif text-[11pt] leading-snug mx-auto">
      
      {/* HEADER SECTION */}
      <header className="text-center mb-6">
        <h1 className="text-[20pt] font-semibold mb-2">{personalInfo.fullName}</h1>
        <div className="text-[10pt] text-gray-800 flex flex-wrap justify-center gap-x-3 gap-y-1">
           {personalInfo.location && <span>{personalInfo.location}</span>}
           {personalInfo.phone && <span>• {personalInfo.phone}</span>}
           {personalInfo.email && <span>• {personalInfo.email}</span>}
           {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
           {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-5">
           <p className="text-justify text-[10.5pt]">{summary}</p>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[12pt] font-bold border-b border-black uppercase pb-0.5 mb-3 tracking-widest text-center mt-6">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline font-bold">
                 <span>{edu.institution}</span>
                 <span className="font-normal italic text-[10pt]">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                 <span>{edu.degree} in {edu.field}</span>
                 {edu.gpa && <span className="font-normal text-[10pt]">GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[12pt] font-bold border-b border-black uppercase pb-0.5 mb-3 tracking-widest text-center mt-6">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
               <div className="flex justify-between items-baseline font-bold">
                 <span>{exp.position}</span>
                 <span className="font-normal italic text-[10pt]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
               </div>
               <div className="italic mb-1">{exp.company}</div>
               {exp.description && <p className="mb-1 text-[10pt]">{exp.description}</p>}
               {exp.highlights.length > 0 && (
                 <ul className="list-disc list-outside ml-5 space-y-0.5 text-[10pt]">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="pl-1 leading-snug">{highlight}</li>
                    ))}
                 </ul>
               )}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[12pt] font-bold border-b border-black uppercase pb-0.5 mb-3 tracking-widest text-center mt-6">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3 text-[10pt]">
               <div className="font-bold flex items-center justify-between">
                  <span>{proj.name}</span>
                  {proj.link && <span className="font-normal italic text-[9pt]">{proj.link}</span>}
               </div>
               <div className="italic mb-0.5 text-gray-800">
                  {proj.technologies.join(', ')}
               </div>
               <p className="leading-snug">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[12pt] font-bold border-b border-black uppercase pb-0.5 mb-3 tracking-widest text-center mt-6">Certifications</h2>
          <ul className="list-disc list-outside ml-5 space-y-1 text-[10pt]">
             {certifications.map((cert) => (
               <li key={cert.id} className="pl-1">
                 <span className="font-bold">{cert.name}</span>, {cert.issuer} ({cert.date})
               </li>
             ))}
          </ul>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[12pt] font-bold border-b border-black uppercase pb-0.5 mb-3 tracking-widest text-center mt-6">Skills</h2>
          <div className="text-[10pt] space-y-1">
             {skills.map((skill) => (
               <div key={skill.id} className="flex">
                  <span className="font-bold min-w-[25%] block">{skill.category}:</span>
                  <span className="flex-1 ml-2">{skill.items}</span>
               </div>
             ))}
          </div>
        </section>
      )}

      {/* CUSTOM SECTIONS */}
      {sections.map(section => (
        <section key={section.id} className="mb-5">
          <h2 className="text-[12pt] font-bold border-b border-black uppercase pb-0.5 mb-3 tracking-widest text-center mt-6">{section.title}</h2>
          <ul className="list-disc list-outside ml-5 space-y-1 text-[10pt]">
             {section.items.map(item => (
                <li key={item.id} className="pl-1 leading-snug">{item.text}</li>
             ))}
          </ul>
        </section>
      ))}

    </div>
  );
}
