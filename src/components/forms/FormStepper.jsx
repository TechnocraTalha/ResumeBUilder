import React from 'react';
import { useUIStore, FORM_STEPS, STEP_ORDER } from '../../store/uiStore';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import CustomSectionForm from './CustomSectionForm';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const STEP_LABELS = {
  [FORM_STEPS.PERSONAL_INFO]: 'Personal',
  [FORM_STEPS.SUMMARY]: 'Summary',
  [FORM_STEPS.EXPERIENCE]: 'Experience',
  [FORM_STEPS.EDUCATION]: 'Education',
  [FORM_STEPS.SKILLS]: 'Skills',
  [FORM_STEPS.PROJECTS]: 'Projects',
  [FORM_STEPS.CERTIFICATIONS]: 'Certifs',
  [FORM_STEPS.CUSTOM_SECTIONS]: 'Custom',
};

export default function FormStepper() {
  const { activeFormStep, setActiveFormStep, nextStep, prevStep } = useUIStore();

  const currentIndex = STEP_ORDER.indexOf(activeFormStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === STEP_ORDER.length - 1;

  const renderActiveForm = () => {
    switch (activeFormStep) {
      case FORM_STEPS.PERSONAL_INFO: return <PersonalInfoForm />;
      case FORM_STEPS.SUMMARY: return <SummaryForm />;
      case FORM_STEPS.EXPERIENCE: return <ExperienceForm />;
      case FORM_STEPS.EDUCATION: return <EducationForm />;
      case FORM_STEPS.SKILLS: return <SkillsForm />;
      case FORM_STEPS.PROJECTS: return <ProjectsForm />;
      case FORM_STEPS.CERTIFICATIONS: return <CertificationsForm />;
      case FORM_STEPS.CUSTOM_SECTIONS: return <CustomSectionForm />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-gray-50/50">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between">
            {STEP_ORDER.map((step, index) => {
              const isActive = step === activeFormStep;
              const isCompleted = STEP_ORDER.indexOf(activeFormStep) > index;
              
              return (
                <li key={step} className="relative py-2 flex flex-col items-center group cursor-pointer" onClick={() => setActiveFormStep(step)}>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    {index < STEP_ORDER.length - 1 && (
                       <div className={`h-0.5 w-full bg-gray-200 absolute right-[-50%] ${isCompleted ? 'bg-blue-600' : ''}`} />
                    )}
                  </div>
                  <div className="relative flex items-center justify-center">
                    {isCompleted ? (
                      <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-white shadow-sm z-10 transition-transform group-hover:scale-110">
                        <Check className="w-5 h-5 text-white" />
                      </span>
                    ) : isActive ? (
                      <span className="h-8 w-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center ring-4 ring-white shadow-sm z-10">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                      </span>
                    ) : (
                      <span className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center ring-4 ring-white z-10 transition-colors group-hover:border-gray-400">
                        <span className="text-gray-500 text-xs font-medium">{index + 1}</span>
                      </span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${isActive || isCompleted ? 'text-blue-600' : 'text-gray-500'}`}>
                    {STEP_LABELS[step]}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {renderActiveForm()}
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50/50 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        
        <button
          onClick={nextStep}
          disabled={isLastStep}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
        >
          {isLastStep ? 'Finish' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
