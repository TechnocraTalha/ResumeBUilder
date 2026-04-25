import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Universal Data Schema (Crucial for ATS)
const initialData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  customSections: [],
};

export const useResumeStore = create(
  persist(
    (set) => ({
      resumeData: initialData,
      activeResumeId: null,
      
      setActiveResumeId: (id) => set({ activeResumeId: id }),

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

  reorderExperience: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.resumeData.experience);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { resumeData: { ...state.resumeData, experience: result } };
    }),

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

  reorderEducation: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.resumeData.education);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { resumeData: { ...state.resumeData, education: result } };
    }),

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

  reorderSkillCategory: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.resumeData.skills);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { resumeData: { ...state.resumeData, skills: result } };
    }),

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

  reorderProject: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.resumeData.projects);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { resumeData: { ...state.resumeData, projects: result } };
    }),

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

      reorderCertification: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.resumeData.certifications);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { resumeData: { ...state.resumeData, certifications: result } };
        }),

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
