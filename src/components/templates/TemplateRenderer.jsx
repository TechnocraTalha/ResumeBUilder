import React from 'react';
import { useUIStore, TEMPLATES } from '../../store/uiStore';
import ATSPurist from './ATSPurist';
import ModernTech from './ModernTech';
import Executive from './Executive';
import ATSOrdered from './ATSOrdered';
import CreativePortfolio from './CreativePortfolio';
import MinimalistAcademic from './MinimalistAcademic';

export default function TemplateRenderer({ printRef }) {
  const { activeTemplate, fontScale } = useUIStore();
  const scale = fontScale || 1.0;

  const renderTemplate = () => {
    switch (activeTemplate) {
      case TEMPLATES.ATS_PURIST: return <ATSPurist />;
      case TEMPLATES.MODERN_TECH: return <ModernTech />;
      case TEMPLATES.EXECUTIVE: return <Executive />;
      case TEMPLATES.ATS_ORDERED: return <ATSOrdered />;
      case TEMPLATES.CREATIVE_PORTFOLIO: return <CreativePortfolio />;
      case TEMPLATES.MINIMALIST_ACADEMIC: return <MinimalistAcademic />;
      default: return <ATSPurist />;
    }
  };

  return (
    <div className="flex justify-center items-start origin-top scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] xl:scale-100">
      <div 
        ref={printRef}
        className="bg-white shadow-xl mx-auto text-left overflow-hidden relative"
        style={{ width: '210mm', minHeight: '296.5mm', padding: '0' }} // A4 dimensions
      >
        <div style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left', 
          width: `${100 / scale}%`, 
          minHeight: `${100 / scale}%`,
          backgroundColor: 'white' 
        }}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
