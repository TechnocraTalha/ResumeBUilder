import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormStepper from './forms/FormStepper';
import TemplateRenderer from './templates/TemplateRenderer';
import { useUIStore, TEMPLATES } from '../store/uiStore';

import { useAuthStore } from '../store/authStore';
import { db } from '../utils/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Download, FileText, Settings, Eye, Menu, LogOut, Cloud, ShieldCheck, Sparkles, ArrowLeft, Target, ShieldAlert, Edit2 } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import AIGuideModal from './AIGuideModal';
import ATSScoreModal from './ATSScoreModal';
import ClicheScannerModal from './ClicheScannerModal';

function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeTemplate, setActiveTemplate, isPreviewMode, togglePreviewMode, fontScale, setFontScale, themeColor, setThemeColor, fontFamily, setFontFamily } = useUIStore();
  const { resumeData, setActiveResumeId } = useResumeStore();
  const { logOut, user } = useAuthStore();
  const printRef = useRef(null);
  const [isAIGuideOpen, setIsAIGuideOpen] = React.useState(false);
  const [isATSScoreOpen, setIsATSScoreOpen] = React.useState(false);
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);
  const [isExportingPDF, setIsExportingPDF] = React.useState(false);
  const [isExportingDOCX, setIsExportingDOCX] = React.useState(false);

  const handleExportDocx = async () => {
    setIsExportingDOCX(true);
    try {
      const { exportToDocx } = await import('../utils/exportDOCX');
      exportToDocx(resumeData);
    } catch (e) {
      console.error("Failed to export DOCX:", e);
    } finally {
      setIsExportingDOCX(false);
    }
  };

  const handleExportPDF = async () => {
    if (printRef.current) {
      setIsExportingPDF(true);
      try {
        const { exportToPDF } = await import('../utils/exportPDF');
        exportToPDF(printRef.current, `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      } catch (e) {
        console.error("Failed to export PDF:", e);
      } finally {
        setIsExportingPDF(false);
      }
    }
  };

  // Load from Cloud once on mount
  useEffect(() => {
    const loadCloudData = async () => {
      if (user && id) {
        try {
          const docRef = doc(db, 'users', user.uid, 'resumes', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             const data = docSnap.data();
             useResumeStore.getState().setResumeData(data);
             if (data.uiSettings) {
                useUIStore.getState().setActiveTemplate(data.uiSettings.activeTemplate || TEMPLATES.ATS_PURIST);
                useUIStore.getState().setFontScale(data.uiSettings.fontScale || 1.0);
                useUIStore.getState().setThemeColor(data.uiSettings.themeColor || '#2563eb');
                useUIStore.getState().setFontFamily(data.uiSettings.fontFamily || 'Inter');
             }
             setActiveResumeId(id);
          } else {
             // If resume doesn't exist, go back to dashboard
             navigate('/dashboard');
          }
        } catch (e) {
          console.error("Failed to load resume from cloud:", e);
        }
      }
    };
    loadCloudData();
  }, [user, id, navigate, setActiveResumeId]);

  // Auto-Save to Cloud
  useEffect(() => {
    const syncData = async () => {
      if (user && id) {
         try {
           const docRef = doc(db, 'users', user.uid, 'resumes', id);
           await setDoc(docRef, { 
             ...resumeData, 
             uiSettings: { activeTemplate, fontScale, themeColor, fontFamily },
             updatedAt: serverTimestamp() 
           }, { merge: true });
         } catch (e) {
           console.error("Failed to auto-save to cloud:", e);
         }
      }
    };
    const debounceId = setTimeout(syncData, 1500); // Debounce auto-save
    return () => clearTimeout(debounceId);
  }, [resumeData, activeTemplate, fontScale, themeColor, fontFamily, user, id]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={togglePreviewMode}
        className="lg:hidden fixed bottom-6 right-6 z-50 gradient-primary text-white p-4 rounded-2xl shadow-xl shadow-blue-500/30 animate-pulse-glow"
      >
        {isPreviewMode ? <Menu className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
      </button>

      {/* Editor Panel */}
      <div className={`
        ${isPreviewMode ? 'hidden lg:flex' : 'flex'} 
        flex-col w-full lg:w-[45%] xl:w-[40%] bg-white border-r border-gray-200/80 z-10
      `}>
        {/* Header */}
        <header className="px-6 py-3.5 border-b border-gray-100 glass flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-gray-900 transition-colors p-1.5 hover:bg-gray-100 rounded-lg"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/dashboard')}
                className="gradient-primary p-1.5 rounded-lg text-white shadow-md shadow-amber-500/20 hover:opacity-90 transition-opacity cursor-pointer"
                title="Back to Dashboard"
              >
                 <FileText className="w-4 h-4" />
              </button>
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={resumeData.title || ''}
                  onChange={(e) => useResumeStore.getState().updateTitle(e.target.value)}
                  placeholder="Untitled Resume"
                  className="text-lg font-black text-gray-900 tracking-tight bg-transparent border-none outline-none focus:ring-2 focus:ring-amber-500/50 rounded pl-1.5 pr-6 py-0.5 w-48 sm:w-64 truncate hover:bg-gray-100 transition-colors cursor-text"
                />
                <Edit2 className="w-3.5 h-3.5 text-gray-400 absolute right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user?.email === 'talhasiddiqui240@gmail.com' && (
              <button 
                onClick={() => window.location.href = '/admin'}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white gradient-primary rounded-lg shadow-sm transition-all hover:opacity-90"
              >
                 <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </button>
            )}
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
               <Cloud className="w-3 h-3" /> Saved
            </span>
            <button 
               onClick={logOut}
               className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
               title="Sign Out"
            >
               <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Form Stepper */}
        <div className="flex-1 overflow-hidden">
          <FormStepper onFinish={handleExportPDF} />
        </div>
      </div>

      {/* Preview Panel */}
      <div className={`
        ${isPreviewMode ? 'flex' : 'hidden lg:flex'} 
        flex-col flex-1 bg-gray-100 overflow-hidden relative
      `}>
        {/* Toolbar — Row 1: Design Controls */}
        <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-2 z-20 flex-wrap">
          <Settings className="w-4 h-4 text-gray-400 hidden sm:block" />
          <select
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg p-2 outline-none font-semibold hover:bg-gray-100 cursor-pointer"
          >
            <option value={TEMPLATES.ATS_PURIST}>ATS Purist</option>
            <option value={TEMPLATES.MODERN_TECH}>Modern Tech</option>
            <option value={TEMPLATES.EXECUTIVE}>Executive</option>
            <option value={TEMPLATES.ATS_ORDERED}>ATS Ordered</option>
            <option value={TEMPLATES.CREATIVE_PORTFOLIO}>Creative</option>
            <option value={TEMPLATES.MINIMALIST_ACADEMIC}>Minimalist</option>
          </select>
          
          <div className="w-px h-5 bg-gray-200 mx-0.5 hidden sm:block" />

          <select
            value={fontScale}
            onChange={(e) => setFontScale(parseFloat(e.target.value))}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg p-2 outline-none font-semibold hover:bg-gray-100 cursor-pointer w-[90px]"
          >
            <option value={0.8}>Smallest</option>
            <option value={0.9}>Small</option>
            <option value={1.0}>Standard</option>
            <option value={1.1}>Large</option>
          </select>
          
          <div className="w-px h-5 bg-gray-200 mx-0.5 hidden sm:block" />
          
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-7 h-7 rounded-lg border border-gray-200 cursor-pointer p-0.5 hidden sm:block"
            title="Theme Color"
          />
          
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg p-2 outline-none font-semibold hover:bg-gray-100 cursor-pointer w-[90px] hidden lg:block"
          >
            <option value="Inter">Inter</option>
            <option value="Merriweather">Serif</option>
            <option value="Roboto Mono">Mono</option>
          </select>

          <div className="flex-1" />
          
          {/* Export Buttons */}
          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isExportingPDF ? (
              <span className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                PDF...
              </span>
            ) : (
              <><FileText className="w-3.5 h-3.5" /> PDF</>
            )}
          </button>
          <button
            onClick={handleExportDocx}
            disabled={isExportingDOCX}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white gradient-primary rounded-lg hover:opacity-90 transition-all shadow-sm shadow-blue-500/20 disabled:opacity-50"
          >
            {isExportingDOCX ? (
              <span className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                DOCX...
              </span>
            ) : (
              <><Download className="w-3.5 h-3.5" /> DOCX</>
            )}
          </button>
        </div>

        {/* Toolbar — Row 2: Smart Tools */}
        <div className="bg-gray-50/80 border-b border-gray-100 px-4 py-2 flex items-center gap-2 z-20">
          <button
            onClick={() => setIsAIGuideOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Guide
          </button>
          <button
            onClick={() => setIsATSScoreOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Target className="w-3.5 h-3.5" /> ATS Check
          </button>
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Grammar
          </button>
        </div>

        {/* Live Preview Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start print:p-0 custom-scrollbar bg-gray-100">
           <TemplateRenderer printRef={printRef} />
        </div>
      </div>
      
      {/* Modals */}
      <AIGuideModal isOpen={isAIGuideOpen} onClose={() => setIsAIGuideOpen(false)} />
      <ATSScoreModal isOpen={isATSScoreOpen} onClose={() => setIsATSScoreOpen(false)} />
      <ClicheScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </div>
  );
}

export default Builder;
