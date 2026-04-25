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
import { ChevronLeft, ChevronRight, Check, Download } from 'lucide-react';

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

export default function FormStepper({ onFinish }) {
  const { activeFormStep, setActiveFormStep, nextStep, prevStep } = useUIStore();

  const currentIndex = STEP_ORDER.indexOf(activeFormStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === STEP_ORDER.length - 1;
  const progressPercent = ((currentIndex) / (STEP_ORDER.length - 1)) * 100;

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
    <div className="flex flex-col h-full bg-white">
      {/* Progress Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full gradient-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Labels */}
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between">
            {STEP_ORDER.map((step, index) => {
              const isActive = step === activeFormStep;
              const isCompleted = currentIndex > index;
              
              return (
                <li 
                  key={step} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setActiveFormStep(step)}
                >
                  <div className="relative flex items-center justify-center mb-1.5">
                    {isCompleted ? (
                      <span className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center shadow-sm shadow-blue-500/20 transition-transform group-hover:scale-110">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </span>
                    ) : isActive ? (
                      <span className="h-7 w-7 rounded-full border-2 border-blue-500 bg-blue-50 flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                      </span>
                    ) : (
                      <span className="h-7 w-7 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center transition-colors group-hover:border-gray-300">
                        <span className="text-gray-400 text-[10px] font-bold">{index + 1}</span>
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold tracking-wide ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {STEP_LABELS[step]}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
        {renderActiveForm()}
      </div>

      {/* Navigation Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        <span className="text-xs font-semibold text-gray-400">
          {currentIndex + 1} / {STEP_ORDER.length}
        </span>

        <button
          onClick={() => {
            if (isLastStep && onFinish) {
              onFinish();
            } else if (!isLastStep) {
              nextStep();
            }
          }}
          className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold rounded-xl transition-all shadow-md ${
            isLastStep 
              ? 'gradient-primary text-white shadow-blue-500/25 hover:opacity-90' 
              : 'gradient-primary text-white shadow-blue-500/25 hover:opacity-90'
          }`}
        >
          {isLastStep ? (
            <>
              <Download className="w-4 h-4" /> Export PDF
            </>
          ) : (
            <>
              Next <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
