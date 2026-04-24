import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Certifications</h2>
        <p className="text-sm text-gray-500 mt-1">Add any relevant certifications or licenses.</p>
      </div>

      <div className="space-y-8">
        {resumeData.certifications?.map((cert, index) => (
          <div key={cert.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4 relative group transition-all hover:border-gray-300">
            <button 
              onClick={() => removeCertification(cert.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove Certification"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <h3 className="font-semibold text-gray-800">Certification #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Certification Name</label>
                <input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="AWS Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
                <input
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Amazon Web Services"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Issue Date</label>
                <input
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Aug 2023"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addCertification}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium bg-white"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Certification
      </button>
    </div>
  );
}
