import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation, reorderEducation } = useResumeStore();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderEducation(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Education</h2>
        <p className="text-sm text-gray-500 mt-1">Add your educational background.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="education-list">
          {(provided) => (
            <div 
              className="space-y-8"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {resumeData.education.map((edu, index) => (
                <Draggable key={edu.id} draggableId={edu.id} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-5 border ${snapshot.isDragging ? 'border-blue-500 shadow-lg bg-white' : 'border-gray-200 bg-gray-50/50'} rounded-lg space-y-4 relative group transition-all hover:border-gray-300`}
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button 
                          onClick={() => removeEducation(edu.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove Education"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div 
                          {...provided.dragHandleProps}
                          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
                      </div>
                      
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
