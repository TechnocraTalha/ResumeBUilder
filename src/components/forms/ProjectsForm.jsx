import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Projects</h2>
        <p className="text-sm text-gray-500 mt-1">Highlight your most impactful side-projects or portfolio items.</p>
      </div>

      <div className="space-y-8">
        {resumeData.projects.map((proj, index) => (
          <div key={proj.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4 relative group transition-all hover:border-gray-300">
            <button 
              onClick={() => removeProject(proj.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove Project"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <h3 className="font-semibold text-gray-800">Project #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Project Name</label>
                <input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Task Manager App"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Project Link</label>
                <input
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="github.com/yourusername/app"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Technologies Used (comma separated)</label>
              <input
                value={(proj.technologies || []).join(', ')}
                onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })}
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="React, Firebase, Tailwind"
              />
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium text-gray-700">Description</label>
               <textarea
                 value={proj.description}
                 onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                 rows={4}
                 className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                 placeholder="Built a full-stack task manager.&#10;Handled 1k+ daily active users."
               />
               <p className="text-xs text-gray-500">Press Enter to separate bullet points.</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addProject}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium bg-white"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Project
      </button>
    </div>
  );
}
