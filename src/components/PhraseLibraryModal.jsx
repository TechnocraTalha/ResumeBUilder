import React, { useState } from 'react';
import { X, Search, PlusCircle, BookOpen } from 'lucide-react';

const PHRASE_DATABASE = {
  "Software Engineering": [
    "Architected and deployed scalable microservices architecture using Node.js and Docker, improving system reliability by 40%.",
    "Optimized database queries and implemented Redis caching, reducing API response times by 60%.",
    "Spearheaded the migration of legacy frontend monolithic app to React, decreasing page load times by 2.5 seconds.",
    "Led a cross-functional Agile team of 5 developers to deliver a new enterprise dashboard 2 weeks ahead of schedule.",
    "Implemented automated CI/CD pipelines using GitHub Actions, reducing deployment errors by 90%."
  ],
  "Sales & Marketing": [
    "Exceeded annual sales quota by 140%, generating $1.2M in new revenue within the first year.",
    "Developed and executed a comprehensive digital marketing strategy that increased inbound lead generation by 300%.",
    "Managed a portfolio of 50+ enterprise clients, maintaining a 98% retention rate over 3 years.",
    "Negotiated and closed 15 high-value contracts with Fortune 500 companies, increasing market share by 15%.",
    "Launched targeted email marketing campaigns with A/B testing, resulting in a 25% increase in conversion rates."
  ],
  "Product Management": [
    "Defined product vision and roadmap, leading to the successful launch of a mobile app with 100k+ downloads in 3 months.",
    "Conducted user research and A/B testing to identify pain points, resulting in a 40% increase in user engagement.",
    "Collaborated with engineering, design, and marketing teams to ensure seamless product delivery and go-to-market strategy.",
    "Prioritized product backlog using data-driven insights, increasing engineering velocity by 20%.",
    "Spearheaded the integration of a new payment gateway, reducing cart abandonment by 15%."
  ],
  "Leadership & Management": [
    "Recruited, hired, and mentored a high-performing team of 15 employees, reducing turnover by 30%.",
    "Managed a $5M annual budget, identifying operational inefficiencies to reduce costs by 18%.",
    "Fostered a culture of continuous improvement, implementing new performance review processes that increased employee satisfaction.",
    "Led organizational restructuring during a merger, ensuring seamless transition and zero downtime.",
    "Presented quarterly performance reports to the Board of Directors, securing $2M in additional funding."
  ]
};

export default function PhraseLibraryModal({ isOpen, onClose, onSelectPhrase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState("Software Engineering");

  if (!isOpen) return null;

  const categories = Object.keys(PHRASE_DATABASE);
  
  const filteredPhrases = PHRASE_DATABASE[activeCategory].filter(phrase => 
    phrase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-lg font-bold text-gray-900">Pre-Written Phrase Library</h2>
               <p className="text-xs text-gray-500 font-medium">Click a phrase to add it to your experience</p>
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
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-100 p-4 flex flex-col gap-2 overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Categories</h3>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search phrases..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
               {filteredPhrases.length === 0 ? (
                 <div className="text-center py-12 text-gray-500">
                   No phrases found matching "{searchTerm}"
                 </div>
               ) : (
                 filteredPhrases.map((phrase, idx) => (
                   <div 
                     key={idx} 
                     onClick={() => onSelectPhrase(phrase)}
                     className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all flex items-start gap-3"
                   >
                     <div className="mt-0.5 text-blue-400 group-hover:text-blue-600">
                       <PlusCircle className="w-5 h-5" />
                     </div>
                     <p className="text-sm text-gray-700 leading-relaxed font-medium">
                       {phrase}
                     </p>
                   </div>
                 ))
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
