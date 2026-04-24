import React, { useRef, useEffect } from 'react';
import FormStepper from './forms/FormStepper';
import TemplateRenderer from './templates/TemplateRenderer';
import { useUIStore, TEMPLATES } from '../store/uiStore';
import { exportToDocx } from '../utils/exportDOCX';
import { exportToPDF } from '../utils/exportPDF';
import { useAuthStore } from '../store/authStore';
import { db } from '../utils/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Download, FileText, Settings, Eye, Menu, LogOut, Cloud } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

function Builder() {
  const { activeTemplate, setActiveTemplate, isPreviewMode, togglePreviewMode } = useUIStore();
  const { resumeData } = useResumeStore();
  const { logOut } = useAuthStore();
  const printRef = useRef(null);

  const handleExportDocx = () => {
    exportToDocx(resumeData);
  };

  const handleExportPDF = () => {
    if (printRef.current) {
      exportToPDF(printRef.current, `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    }
  };

  // Load from Cloud once on mount
  useEffect(() => {
    const loadCloudData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'resumes', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             useResumeStore.getState().setResumeData(docSnap.data());
          }
        } catch (e) {
          console.error("Failed to load resume from cloud:", e);
        }
      }
    };
    loadCloudData();
  }, [user]);

  // Auto-Save to Cloud
  useEffect(() => {
    const syncData = async () => {
      if (user) {
         try {
           const docRef = doc(db, 'resumes', user.uid);
           await setDoc(docRef, resumeData);
         } catch (e) {
           console.error("Failed to auto-save to cloud:", e);
         }
      }
    };
    const debounceId = setTimeout(syncData, 1500); // Debounce auto-save
    return () => clearTimeout(debounceId);
  }, [resumeData, user]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={togglePreviewMode}
        className="lg:hidden absolute bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        {isPreviewMode ? <Menu className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
      </button>

      {/* Editor Panel (Left side on desktop, togglable on mobile) */}
      <div className={`
        ${isPreviewMode ? 'hidden lg:flex' : 'flex'} 
        flex-col w-full lg:w-[45%] xl:w-[40%] bg-white border-r border-gray-200 z-10 transition-all shadow-xl
      `}>
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 p-1.5 rounded-lg text-white">
               <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">ProResume</h1>
          </div>
          <button 
             onClick={logOut}
             className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 border border-transparent hover:bg-red-50 rounded-lg transition-colors"
             title="Sign Out"
          >
             <LogOut className="w-4 h-4" />
          </button>
        </header>

        {/* Dynamic Form Stepper */}
        <div className="flex-1 overflow-hidden">
          <FormStepper />
        </div>
      </div>

      {/* Preview Panel (Right side on desktop, togglable on mobile) */}
      <div className={`
        ${isPreviewMode ? 'flex' : 'hidden lg:flex'} 
        flex-col flex-1 bg-gray-200 overflow-hidden relative
      `}>
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-3">
             <Settings className="w-5 h-5 text-gray-500 hidden sm:block" />
             <select
               value={activeTemplate}
               onChange={(e) => setActiveTemplate(e.target.value)}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-medium transition-all hover:bg-gray-100 cursor-pointer"
             >
               <option value={TEMPLATES.ATS_PURIST}>ATS Purist (Parseable)</option>
               <option value={TEMPLATES.MODERN_TECH}>Modern Tech (Two Column)</option>
               <option value={TEMPLATES.EXECUTIVE}>Executive (Elegant)</option>
               <option value={TEMPLATES.ATS_ORDERED}>ATS Ordered (Strict Flow)</option>
               <option value={TEMPLATES.CREATIVE_PORTFOLIO}>Creative (Portfolio)</option>
               <option value={TEMPLATES.MINIMALIST_ACADEMIC}>Minimalist (Academic)</option>
             </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handleExportDocx}
               className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">DOCX</span>
            </button>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start print:p-0 custom-scrollbar">
           <TemplateRenderer printRef={printRef} />
        </div>
      </div>
    </div>
  );
}

export default Builder;
