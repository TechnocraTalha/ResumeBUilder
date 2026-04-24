import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, FileText, Search } from 'lucide-react';

export default function AdminPanel() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Extra guard to prevent flicker
    if (!user || user.email !== 'talhasiddiqui240@gmail.com') {
      navigate('/builder');
      return;
    }

    const fetchResumes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'resumes'));
        const fetchedResumes = [];
        querySnapshot.forEach((doc) => {
           fetchedResumes.push({
             id: doc.id,
             data: doc.data()
           });
        });
        setResumes(fetchedResumes);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, [user, navigate]);

  const filteredResumes = resumes.filter(r => 
    r.data?.personalInfo?.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    r.data?.personalInfo?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
       <div className="max-w-6xl w-full mx-auto">
          
          <header className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
                <span className="p-3 bg-blue-600 text-white rounded-lg shadow-md">
                   <ShieldCheck className="w-8 h-8" />
                </span>
                <div>
                   <h1 className="text-3xl font-black tracking-tight text-gray-900">Admin Dashboard</h1>
                   <p className="text-sm font-medium text-gray-500 mt-1">Manage platform resumes</p>
                </div>
             </div>
             <button 
               onClick={() => navigate('/builder')}
               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
             >
                Exit to Builder
             </button>
          </header>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
             
             <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">All Resumes ({resumes.length})</h2>
                <div className="relative">
                   <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                   <input 
                     type="text" 
                     placeholder="Search name or email..." 
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-[250px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                   />
                </div>
             </div>

             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-white border-b border-gray-200 text-sm font-semibold text-gray-600">
                        <th className="p-4 pl-6">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Template</th>
                        <th className="p-4 text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {loading ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">Loading resumes...</td>
                        </tr>
                     ) : filteredResumes.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">No resumes found.</td>
                        </tr>
                     ) : (
                        filteredResumes.map(r => (
                           <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="p-4 pl-6 font-bold text-gray-800">
                                 {r.data?.personalInfo?.fullName || 'Untitled User'}
                              </td>
                              <td className="p-4 text-gray-600 text-sm">
                                 {r.data?.personalInfo?.email || 'N/A'}
                              </td>
                              <td className="p-4 text-gray-600 text-sm">
                                 {r.data?.personalInfo?.phone || 'N/A'}
                              </td>
                              <td className="p-4">
                                 <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">
                                    Stored
                                 </span>
                              </td>
                              <td className="p-4 text-center">
                                 {/* To view, we can push their data into a preview state, or just let admin see JSON. For now, a placeholder action. */}
                                 <button 
                                   onClick={() => alert('View functionality requires merging with the builder view state. Data: ' + JSON.stringify(r.data.personalInfo))}
                                   className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                 >
                                    <FileText className="w-4 h-4" /> Preview Data
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
             </div>
          </div>

       </div>
    </div>
  );
}
