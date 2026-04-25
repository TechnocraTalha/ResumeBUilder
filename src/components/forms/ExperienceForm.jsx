import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Plus, Trash2, GripVertical, BookOpen } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PhraseLibraryModal from '../PhraseLibraryModal';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeExpId, setActiveExpId] = useState(null);

  const handleSelectPhrase = (phrase) => {
    if (!activeExpId) return;
    const exp = resumeData.experience.find(e => e.id === activeExpId);
    if (exp) {
       const newHighlights = [...exp.highlights];
       if (newHighlights.length === 1 && newHighlights[0] === '') {
          newHighlights[0] = phrase;
       } else {
          newHighlights.push(phrase);
       }
       updateExperience(activeExpId, { highlights: newHighlights });
    }
    setIsLibraryOpen(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderExperience(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Work Experience</h2>
        <p className="text-sm text-gray-500 mt-1">List your relevant work experience, starting with the most recent.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experience-list">
          {(provided) => (
            <div 
              className="space-y-8"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {resumeData.experience.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-5 border ${snapshot.isDragging ? 'border-blue-500 shadow-lg bg-white' : 'border-gray-200 bg-gray-50/50'} rounded-lg space-y-4 relative group transition-all hover:border-gray-300`}
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove Experience"
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
                      
                      <h3 className="font-semibold text-gray-800">Experience #{index + 1}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Job Title</label>
                          <input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Senior Developer"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Company</label>
                          <input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Tech Corp"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Start Date</label>
                          <input
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">End Date</label>
                          <input
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                            placeholder="Present"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700 font-medium">I currently work here</label>
                      </div>

                      <div className="space-y-2 mt-4">
                         <label className="text-sm font-medium text-gray-700">Description / Highlights</label>
                         <textarea
                           value={exp.highlights.join('\n')}
                           onChange={(e) => updateExperience(exp.id, { highlights: e.target.value.split('\n') })}
                           rows={4}
                           className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder="• Implemented feature X resulting in Y% growth&#10;• Led team of Z engineers"
                         />
                         <div className="flex justify-between items-center mt-2">
                           <p className="text-xs text-gray-500">Press Enter to separate bullet points.</p>
                           <button 
                             onClick={() => { setActiveExpId(exp.id); setIsLibraryOpen(true); }}
                             className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                           >
                             <BookOpen className="w-4 h-4" /> Browse Phrase Library
                           </button>
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
        onClick={addExperience}
        className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium bg-white"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Experience
      </button>

      <PhraseLibraryModal 
        isOpen={isLibraryOpen} 
        onClose={() => setIsLibraryOpen(false)} 
        onSelectPhrase={handleSelectPhrase} 
      />
    </div>
  );
}
