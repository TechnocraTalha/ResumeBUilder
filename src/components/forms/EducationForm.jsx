import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Education</h2>
        <p className="text-sm text-gray-500 mt-1">Add your educational background.</p>
      </div>

      <div className="space-y-8">
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4 relative group transition-all hover:border-gray-300">
            <button 
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove Education"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <h3 className="font-semibold text-gray-800">Institution #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Institution</label>
                <input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="State University"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Degree</label>
                <input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="B.S."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Field of Study</label>
                <input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">GPA (Optional)</label>
                <input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="3.8"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <input
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Sep 2014"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <input
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="May 2018"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addEducation}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium bg-white"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Education
      </button>
    </div>
  );
}
