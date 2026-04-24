import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function SkillsForm() {
  const { resumeData, addSkillCategory, updateSkillCategory, removeSkillCategory } = useResumeStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Technical Skills</h2>
        <p className="text-sm text-gray-500 mt-1">Group your skills by category (e.g. Languages, Frameworks, Tools).</p>
      </div>

      <div className="space-y-6">
        {resumeData.skills.map((skill, index) => (
          <div key={skill.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4 relative group transition-all hover:border-gray-300">
            <button 
              onClick={() => removeSkillCategory(skill.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove Category"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <div className="pr-8 grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category Name</label>
                <input
                  value={skill.category}
                  onChange={(e) => updateSkillCategory(skill.id, { category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Languages"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <input
                  value={skill.items}
                  onChange={(e) => updateSkillCategory(skill.id, { items: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Java, C++, C#"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSkillCategory}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium bg-white"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Skill Category
      </button>
    </div>
  );
}
