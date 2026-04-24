import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Universal Data Schema (Crucial for ATS)
const initialData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'hello@johndoe.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
  },
  summary: 'Experienced Software Engineer with a passion for building scalable web applications and optimizing backend architectures. Proven track record of leading teams and delivering high-impact projects.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp Inc.',
      position: 'Senior Frontend Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      current: true,
      description: 'Led the migration of legacy monolithic frontend to micro-frontends.',
      highlights: [
        'Improved load time by 40% through code splitting.',
        'Mentored 3 junior developers.',
      ],
    },
     {
      id: '2',
      company: 'Web Solutions Ltd.',
      position: 'Web Developer',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      current: false,
      description: 'Developed and maintained responsive client websites.',
      highlights: [
        'Implemented modern UI/UX principles increasing user retention by 25%.',
        'Built automated testing suite reducing bugs by 15%.',
      ],
    }
  ],
  education: [
    {
      id: '1',
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering',
      startDate: 'Sep 2014',
      endDate: 'May 2018',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', category: 'Languages', items: 'JavaScript, TypeScript, Python, Java' },
    { id: '2', category: 'Frameworks/Libraries', items: 'React, Node.js, Tailwind CSS' },
    { id: '3', category: 'Tools', items: 'Git, Vite, AWS, Zustand' }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Aug 2023',
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform Refactor',
      description: 'Redesigned core checkout flow for high-volume store.',
      technologies: ['React', 'Redux', 'Stripe API'],
      link: 'github.com/johndoe/ecommerce',
    },
  ],
  customSections: [],
};

export const useResumeStore = create(
  persist(
    (set) => ({
      resumeData: initialData,
      
      setResumeData: (data) => set((state) => {
        // Deep merge to ensure arrays and objects exist, preventing crashes on old saves
        const mergedData = {
          ...initialData,
          ...data,
          personalInfo: { ...initialData.personalInfo, ...(data?.personalInfo || {}) },
          experience: data?.experience || [],
          education: data?.education || [],
          skills: data?.skills || [],
          projects: data?.projects || [],
          certifications: data?.certifications || [],
          customSections: data?.customSections || [],
        };
        return { resumeData: mergedData };
      }),

      updatePersonalInfo: (data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, personalInfo: { ...state.resumeData.personalInfo, ...data } },
        })),

  updateSummary: (summary) =>
    set((state) => ({ resumeData: { ...state.resumeData, summary } })),

  addExperience: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [
          ...state.resumeData.experience,
          { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '', highlights: [] },
        ],
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((exp) => exp.id !== id),
      },
    })),

  addEducation: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          { id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
        ],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((edu) => edu.id !== id),
      },
    })),

  addSkillCategory: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [
          ...state.resumeData.skills,
          { id: crypto.randomUUID(), category: '', items: '' },
        ],
      },
    })),

  updateSkillCategory: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((skill) => (skill.id === id ? { ...skill, ...data } : skill)),
      },
    })),

  removeSkillCategory: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((skill) => skill.id !== id),
      },
    })),

  addProject: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [
          ...state.resumeData.projects,
          { id: crypto.randomUUID(), name: '', description: '', technologies: [], link: '' },
        ],
      },
    })),

  updateProject: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((proj) => (proj.id === id ? { ...proj, ...data } : proj)),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((proj) => proj.id !== id),
      },
    })),

  addCertification: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: [
          ...state.resumeData.certifications,
          { id: crypto.randomUUID(), name: '', issuer: '', date: '' },
        ],
      },
    })),

  updateCertification: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.map((cert) => (cert.id === id ? { ...cert, ...data } : cert)),
      },
    })),

      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
          },
        })),

      addCustomSection: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: [
              ...state.resumeData.customSections,
              { id: crypto.randomUUID(), title: 'Custom Section', items: [{ id: crypto.randomUUID(), text: '' }] },
            ],
          },
        })),

      updateCustomSection: (id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.map((sec) => (sec.id === id ? { ...sec, ...data } : sec)),
          },
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.filter((sec) => sec.id !== id),
          },
        })),

      addCustomSectionItem: (sectionId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.map((sec) => 
              sec.id === sectionId 
                ? { ...sec, items: [...sec.items, { id: crypto.randomUUID(), text: '' }] }
                : sec
            ),
          },
        })),

      updateCustomSectionItem: (sectionId, itemId, text) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.map((sec) => 
              sec.id === sectionId 
                ? { ...sec, items: sec.items.map(item => item.id === itemId ? { ...item, text } : item) }
                : sec
            ),
          },
        })),

      removeCustomSectionItem: (sectionId, itemId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.map((sec) => 
              sec.id === sectionId 
                ? { ...sec, items: sec.items.filter(item => item.id !== itemId) }
                : sec
            ),
          },
        })),
    }),
    {
      name: 'resume-storage',
    }
  )
);
