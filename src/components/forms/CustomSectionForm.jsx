import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function CustomSectionForm() {
  const { resumeData, addCustomSection, updateCustomSection, removeCustomSection, addCustomSectionItem, updateCustomSectionItem, removeCustomSectionItem } = useResumeStore();
  const { customSections } = resumeData;

  // Make sure it doesn't crash if customSections is undefined (for older saves)
  const sections = customSections || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Custom Sections</h2>
        <p className="mt-1 text-sm text-gray-500">Add any additional sections like Languages, Awards, or Publications.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.id} className="p-5 bg-gray-50 rounded-lg border border-gray-200 relative group">
            
            <button
              onClick={() => removeCustomSection(section.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Remove Section"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateCustomSection(section.id, { title: e.target.value })}
                  placeholder="e.g., Languages"
                  className="w-full xl:w-1/2 p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Items / Bullet Points</label>
              {section.items.map((item, itemIdx) => (
                <div key={item.id} className="flex items-start gap-2">
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateCustomSectionItem(section.id, item.id, e.target.value)}
                    placeholder="e.g., Fluent in Spanish and French"
                    className="flex-1 p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                  <button
                    onClick={() => removeCustomSectionItem(section.id, item.id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => addCustomSectionItem(section.id)}
              className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Item
            </button>
          </div>
        ))}

        <button
          onClick={addCustomSection}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center font-medium"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Section
        </button>
      </div>
    </div>
  );
}
