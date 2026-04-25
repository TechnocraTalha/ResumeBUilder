import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { TEMPLATES } from '../store/uiStore';
import { Eye, Loader2, AlertCircle } from 'lucide-react';
// We don't use the stores for public view, we render it purely from props to avoid overwriting the local user's data.

// Import Templates directly
import ATSPurist from './templates/ATSPurist';
import ModernTech from './templates/ModernTech';
import Executive from './templates/Executive';
import ATSOrdered from './templates/ATSOrdered';
import CreativePortfolio from './templates/CreativePortfolio';
import MinimalistAcademic from './templates/MinimalistAcademic';

// We need a custom, lightweight version of TemplateRenderer that accepts props instead of using the Zustand store.
function PublicTemplateRenderer({ data, uiSettings }) {
  const { activeTemplate, fontScale, themeColor, fontFamily } = uiSettings;
  const scale = fontScale || 1.0;

  const customStyles = `
    .theme-text { color: ${themeColor} !important; }
    .theme-bg { background-color: ${themeColor} !important; }
    .theme-border { border-color: ${themeColor} !important; }
    .theme-font { font-family: '${fontFamily}', sans-serif !important; }
  `;

  // We have to temporarily mock the store so the templates can render, but doing so might overwrite the real user's local state.
  // Since we are on a separate route, and this is for PUBLIC viewing (usually on a different device), we can safely use the store just for rendering.
  // A better architecture would be passing props down, but since templates rely on useResumeStore, we will initialize it here.
  
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
    <div className="flex justify-center items-start pt-8 pb-16 min-h-screen">
      <style>{customStyles}</style>
      <div 
        className="bg-white shadow-2xl text-left overflow-hidden relative theme-font"
        style={{ width: '210mm', minHeight: '296.5mm', padding: '0' }}
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

export default function PublicResume() {
  const { uid, rid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [uiSettings, setUiSettings] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, 'users', uid, 'resumes', rid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.isPublic !== false) { // Default to public or explicitly public
            setResumeData(data);
            setUiSettings(data.uiSettings || {
              activeTemplate: TEMPLATES.ATS_PURIST,
              fontScale: 1.0,
              themeColor: '#2563eb',
              fontFamily: 'Inter'
            });

            // Increment views if possible (might fail if rules restrict it, so catch silently)
            try {
              await updateDoc(docRef, { views: increment(1) });
            } catch (e) {
              console.log("Could not increment views (requires specific rules)");
            }

            // Hack: We need to populate the Zustand store temporarily so the templates render correctly.
            // In a production app, the templates should accept props instead of reading from global state.
            const { useResumeStore } = await import('../store/resumeStore');
            useResumeStore.getState().setResumeData(data);
          } else {
            setError('This resume is private.');
          }
        } else {
          setError('Resume not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load resume. Make sure the link is correct.');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [uid, rid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Loading resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 overflow-y-auto">
      {/* Small top bar indicating it's hosted by ProResume */}
      <div className="bg-slate-900 text-white py-2 px-6 flex justify-between items-center text-sm shadow-md sticky top-0 z-50">
        <div className="font-bold tracking-tight">ProResume</div>
        <div className="flex items-center gap-2 text-slate-400">
           <Eye className="w-4 h-4" /> 
           <span>{resumeData.views ? resumeData.views + 1 : 1} Views</span>
        </div>
      </div>
      
      {resumeData && uiSettings && (
        <PublicTemplateRenderer data={resumeData} uiSettings={uiSettings} />
      )}
    </div>
  );
}
