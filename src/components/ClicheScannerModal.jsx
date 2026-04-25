import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { X, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { scanResumeText } from '../utils/clicheChecker';

export default function ClicheScannerModal({ isOpen, onClose }) {
  const { resumeData } = useResumeStore();
  const [issues, setIssues] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasScanned(false);
      setIssues([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const foundIssues = scanResumeText(resumeData);
      setIssues(foundIssues);
      setHasScanned(true);
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-lg font-bold text-gray-900">Grammar & Cliché Checker</h2>
               <p className="text-xs text-gray-500 font-medium">Scan your resume for weak phrasing</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto bg-white custom-scrollbar">
          {!hasScanned && !isScanning && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Find Weak Action Verbs</h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
                Recruiters hate buzzwords like "team player" and "hard worker". Run a scan to find them and replace them with strong action verbs.
              </p>
              <button
                onClick={handleScan}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" /> Run Full Scan
              </button>
            </div>
          )}

          {isScanning && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-gray-600 font-medium animate-pulse">Scanning syntax...</p>
            </div>
          )}

          {hasScanned && !isScanning && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {issues.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-emerald-50 rounded-2xl border border-emerald-100">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">Perfect Score!</h3>
                  <p className="text-sm text-emerald-700 max-w-sm">
                    No clichés or weak phrases were found. Your resume uses strong action verbs!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" /> 
                      {issues.length} Issue{issues.length > 1 ? 's' : ''} Found
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {issues.map((issue, idx) => (
                      <div key={idx} className="p-4 border border-amber-200 bg-amber-50 rounded-xl relative">
                        <div className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider">{issue.location}</div>
                        <div className="flex items-start gap-4 mt-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium mb-1">
                              Found weak phrase: <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold font-mono">"{issue.phrase}"</span>
                            </p>
                            <p className="text-xs text-gray-500 mb-3">{issue.reason}</p>
                            <div className="bg-white p-3 rounded-lg border border-amber-100">
                              <div className="text-xs font-bold text-emerald-600 mb-1">SUGGESTION:</div>
                              <p className="text-sm text-gray-700 font-medium">{issue.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {hasScanned && !isScanning && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={() => { setHasScanned(false); setIssues([]); }}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Scan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
