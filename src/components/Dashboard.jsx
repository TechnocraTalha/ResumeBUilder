import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { db } from '../utils/firebase';
import { collection, query, getDocs, setDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { FileText, Plus, LogOut, Copy, Trash2, Clock, ShieldCheck, Link as LinkIcon, Eye, Sparkles } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

// Generate a gradient from a string seed (resume title)
const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-violet-600',
  'from-lime-500 to-emerald-600',
];
const getGradient = (id) => GRADIENTS[id.charCodeAt(0) % GRADIENTS.length];

export default function Dashboard() {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setActiveResumeId, setResumeData, resumeData: initialDataTemplate } = useResumeStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchResumes();
  }, [user, navigate]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users', user.uid, 'resumes'));
      const querySnapshot = await getDocs(q);
      const fetchedResumes = [];
      querySnapshot.forEach((doc) => {
        fetchedResumes.push({ id: doc.id, ...doc.data() });
      });
      // Sort by updatedAt descending
      fetchedResumes.sort((a, b) => {
        const dateA = a.updatedAt?.toDate() || new Date(0);
        const dateB = b.updatedAt?.toDate() || new Date(0);
        return dateB - dateA;
      });
      setResumes(fetchedResumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    const newResumeId = crypto.randomUUID();
    const newResumeData = {
      ...initialDataTemplate,
      title: 'Untitled Resume',
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'users', user.uid, 'resumes', newResumeId), newResumeData);
      navigate(`/builder/${newResumeId}`);
    } catch (error) {
      console.error("Error creating new resume:", error);
    }
  };

  const duplicateResume = async (resumeToDuplicate, e) => {
    e.stopPropagation();
    const newResumeId = crypto.randomUUID();
    const newResumeData = {
      ...resumeToDuplicate,
      title: `${resumeToDuplicate.title || 'Untitled'} (Copy)`,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'users', user.uid, 'resumes', newResumeId), newResumeData);
      fetchResumes();
    } catch (error) {
      console.error("Error duplicating resume:", error);
    }
  };

  const deleteResume = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'resumes', id));
      setResumes(resumes.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const openResume = (id) => {
    navigate(`/builder/${id}`);
  };

  const copyShareLink = (id, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/v/${user.uid}/${id}`;
    navigator.clipboard.writeText(url);
    alert('Public link copied to clipboard!');
  };

  const totalViews = resumes.reduce((sum, r) => sum + (r.views || 0), 0);
  const isAdmin = user?.email === 'talhasiddiqui240@gmail.com';
  const firstName = user?.email?.split('@')[0] || 'there';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="glass sticky top-0 z-10 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2.5">
              <div className="gradient-primary p-1.5 rounded-lg text-white shadow-md shadow-blue-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">ProResume</span>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <button 
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white gradient-primary rounded-lg shadow-sm transition-all hover:opacity-90"
                >
                  <ShieldCheck className="w-4 h-4" /> Admin
                </button>
              )}
              <span className="text-sm font-medium text-gray-500 hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={logOut}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 gradient-mesh" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-slate-400 mt-1 text-sm">Manage your resumes and track your applications.</p>
            </div>
            <button
              onClick={createNewResume}
              className="flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" /> New Resume
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-8">
            <div className="bg-white/10 rounded-xl px-5 py-3 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black">{resumes.length}</div>
              <div className="text-xs text-slate-400 font-medium">Resumes</div>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black flex items-center gap-1.5">
                <Eye className="w-5 h-5 text-slate-400" /> {totalViews}
              </div>
              <div className="text-xs text-slate-400 font-medium">Total Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resumes.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center">
            <div className="mx-auto w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-3">Create your first resume</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Build a stunning, ATS-optimized resume and start landing interviews today.
            </p>
            <button
              onClick={createNewResume}
              className="inline-flex items-center gap-2 gradient-primary text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
            >
              <Plus className="w-5 h-5" /> Create New Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resumes.map((resume) => {
              const initials = (resume.title || 'UR').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              const gradient = getGradient(resume.id);
              
              return (
                <div 
                  key={resume.id}
                  onClick={() => openResume(resume.id)}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover-lift cursor-pointer flex flex-col h-full"
                >
                  {/* Gradient Thumbnail */}
                  <div className={`h-36 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-4xl font-black text-white/30">{initials}</span>
                    
                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button 
                        onClick={(e) => copyShareLink(resume.id, e)}
                        className="bg-white text-gray-700 p-2.5 rounded-xl hover:text-green-600 hover:bg-green-50 transition-colors shadow-lg"
                        title="Copy Share Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => duplicateResume(resume, e)}
                        className="bg-white text-gray-700 p-2.5 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => deleteResume(resume.id, e)}
                        className="bg-white text-gray-700 p-2.5 rounded-xl hover:text-red-600 hover:bg-red-50 transition-colors shadow-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
                      {resume.title || 'Untitled Resume'}
                    </h3>
                    <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100 justify-between">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {resume.updatedAt ? (
                          <span>{resume.updatedAt.toDate().toLocaleDateString()}</span>
                        ) : (
                          <span>Recently</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1" title="Public Views">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{resume.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
