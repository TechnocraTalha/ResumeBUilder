import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const TEMPLATES = {
  ATS_PURIST: 'ATS_PURIST',
  MODERN_TECH: 'MODERN_TECH',
  EXECUTIVE: 'EXECUTIVE',
  ATS_ORDERED: 'ATS_ORDERED',
  CREATIVE_PORTFOLIO: 'CREATIVE_PORTFOLIO',
  MINIMALIST_ACADEMIC: 'MINIMALIST_ACADEMIC',
};

export const FORM_STEPS = {
  PERSONAL_INFO: 'PERSONAL_INFO',
  SUMMARY: 'SUMMARY',
  EXPERIENCE: 'EXPERIENCE',
  EDUCATION: 'EDUCATION',
  SKILLS: 'SKILLS',
  PROJECTS: 'PROJECTS',
  CERTIFICATIONS: 'CERTIFICATIONS',
  CUSTOM_SECTIONS: 'CUSTOM_SECTIONS',
};

// Map steps to sequential order for Stepper
export const STEP_ORDER = [
  FORM_STEPS.PERSONAL_INFO,
  FORM_STEPS.SUMMARY,
  FORM_STEPS.SKILLS,
  FORM_STEPS.EXPERIENCE,
  FORM_STEPS.PROJECTS,
  FORM_STEPS.CERTIFICATIONS,
  FORM_STEPS.CUSTOM_SECTIONS,
  FORM_STEPS.EDUCATION,
];

export const useUIStore = create(
  persist(
    (set) => ({
      activeTemplate: TEMPLATES.ATS_PURIST,
      activeFormStep: FORM_STEPS.PERSONAL_INFO,
      isPreviewMode: false, // For mobile responsiveness
      fontScale: 1.0, // Scale multiplier

      setActiveTemplate: (template) => set({ activeTemplate: template }),
      
      setFontScale: (scale) => set({ fontScale: scale }),
      
      setActiveFormStep: (step) => set({ activeFormStep: step }),

  nextStep: () => set((state) => {
    const currentIndex = STEP_ORDER.indexOf(state.activeFormStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      return { activeFormStep: STEP_ORDER[currentIndex + 1] };
    }
    return state;
  }),

  prevStep: () => set((state) => {
    const currentIndex = STEP_ORDER.indexOf(state.activeFormStep);
    if (currentIndex > 0) {
      return { activeFormStep: STEP_ORDER[currentIndex - 1] };
    }
    return state;
  }),

      togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
    }),
    {
      name: 'ui-storage',
    }
  )
);
