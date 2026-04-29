import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { db } from '../utils/firebase';
import { collection, query, getDocs, setDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import {
  FileText, Plus, LogOut, Copy, Trash2, Clock,
  ShieldCheck, Link as LinkIcon, Eye, Sparkles, TrendingUp, Edit2
} from 'lucide-react';
import { useResumeStore, initialData } from '../store/resumeStore';

// Warm gradient palette for resume card thumbnails
const GRADIENTS = [
  'from-amber-400 to-orange-500',
  'from-orange-400 to-rose-500',
  'from-yellow-400 to-amber-500',
  'from-rose-400 to-pink-500',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-cyan-400 to-blue-500',
  'from-lime-400 to-emerald-500',
];
const getGradient = (id) => GRADIENTS[id.charCodeAt(0) % GRADIENTS.length];

export default function Dashboard() {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const { setActiveResumeId, setResumeData, resumeData: initialDataTemplate } = useResumeStore();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
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
      fetchedResumes.sort((a, b) => {
        const dateA = a.updatedAt?.toDate() || new Date(0);
        const dateB = b.updatedAt?.toDate() || new Date(0);
        return dateB - dateA;
      });
      setResumes(fetchedResumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    const newResumeId = crypto.randomUUID();
    const newResumeData = {
      ...initialData,
      title: 'Untitled Resume',
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, 'users', user.uid, 'resumes', newResumeId), newResumeData);
      navigate(`/builder/${newResumeId}`);
    } catch (error) {
      console.error('Error creating new resume:', error);
    }
  };

  const duplicateResume = async (resumeToDuplicate, e) => {
    e.stopPropagation();
    const newResumeId = crypto.randomUUID();
    const { id: _oldId, ...restOfData } = resumeToDuplicate;
    const newResumeData = {
      ...restOfData,
      title: `${resumeToDuplicate.title || 'Untitled'} (Copy)`,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, 'users', user.uid, 'resumes', newResumeId), newResumeData);
      fetchResumes();
    } catch (error) {
      console.error('Error duplicating resume:', error);
    }
  };

  const deleteResume = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'resumes', id));
      setResumes(resumes.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const renameResume = async (id, currentTitle, e) => {
    e.stopPropagation();
    const newTitle = window.prompt('Enter new name for your resume:', currentTitle || 'Untitled Resume');
    if (newTitle && newTitle.trim() !== '' && newTitle !== currentTitle) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'resumes', id), {
          title: newTitle.trim(),
          updatedAt: serverTimestamp()
        }, { merge: true });
        
        // Update local state to reflect change instantly
        setResumes(resumes.map(r => r.id === id ? { ...r, title: newTitle.trim() } : r));
      } catch (error) {
        console.error('Error renaming resume:', error);
      }
    }
  };

  const openResume = (id) => navigate(`/builder/${id}`);

  const copyShareLink = (id, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/v/${user.uid}/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalViews = resumes.reduce((sum, r) => sum + (r.views || 0), 0);
  const isAdmin = user?.email === 'talhasiddiqui240@gmail.com';
  const firstName = user?.email?.split('@')[0] || 'there';

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-medium text-sm">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── HEADER ── */}
      <header className="glass sticky top-0 z-10 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <div className="gradient-primary p-1.5 rounded-lg text-white shadow-md shadow-amber-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-[#1a1a1a] tracking-tight">ProResume</span>
            </button>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white gradient-primary rounded-lg shadow-sm transition-all hover:opacity-90"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </button>
              )}
              <span className="text-sm font-medium text-gray-400 hidden sm:block">{user.email}</span>
              <button
                onClick={logOut}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── WELCOME BANNER ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1c1916 0%, #2a2318 60%, #332b1e 100%)' }}>
        <div className="absolute inset-0 gradient-mesh-dark opacity-70 pointer-events-none" />
        {/* Warm glow orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-gray-500 mt-1 text-sm">Manage your resumes and track your applications.</p>
            </div>
            <button
              onClick={createNewResume}
              className="btn-amber text-sm !py-2.5 !px-5 shrink-0"
            >
              <Plus className="w-4 h-4" /> New Resume
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-8">
            <div className="glass-amber rounded-2xl px-5 py-3 border border-amber-400/20">
              <div className="text-xl font-black text-white">{resumes.length}</div>
              <div className="text-xs text-gray-400 font-medium">Resumes</div>
            </div>
            <div className="glass-amber rounded-2xl px-5 py-3 border border-amber-400/20">
              <div className="text-xl font-black text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-400" /> {totalViews}
              </div>
              <div className="text-xs text-gray-400 font-medium">Total Views</div>
            </div>
            {resumes.length > 0 && (
              <div className="glass-amber rounded-2xl px-5 py-3 border border-amber-400/20">
                <div className="text-xl font-black text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  {Math.max(...resumes.map(r => r.atsScore || 0), 0) || '—'}
                </div>
                <div className="text-xs text-gray-400 font-medium">Best ATS Score</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resumes.length === 0 ? (
          /* Empty state */
          <div className="card-warm border-2 border-dashed border-amber-200/60 p-16 text-center">
            <div className="mx-auto w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20 animate-pulse-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-black text-[#1a1a1a] mb-3">Create your first resume</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Build a stunning, ATS-optimized resume and start landing interviews today — completely free.
            </p>
            <button
              onClick={createNewResume}
              className="btn-amber"
            >
              <Plus className="w-5 h-5" /> Create New Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {resumes.map((resume) => {
              const initials = (resume.title || 'UR')
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              const gradient = getGradient(resume.id);

              return (
                <div
                  key={resume.id}
                  onClick={() => openResume(resume.id)}
                  className="card-warm cursor-pointer group flex flex-col h-full overflow-hidden !rounded-2xl"
                >
                  {/* Gradient Thumbnail */}
                  <div className={`h-36 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-4xl font-black text-white/25 select-none">{initials}</span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button
                        onClick={(e) => copyShareLink(resume.id, e)}
                        className="bg-white text-gray-700 p-2.5 rounded-xl hover:text-emerald-600 hover:bg-emerald-50 transition-colors shadow-lg"
                        title="Copy Share Link"
                      >
                        {copiedId === resume.id
                          ? <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          : <LinkIcon className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => duplicateResume(resume, e)}
                        className="bg-white text-gray-700 p-2.5 rounded-xl hover:text-amber-600 hover:bg-amber-50 transition-colors shadow-lg"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => renameResume(resume.id, resume.title, e)}
                        className="bg-white text-gray-700 p-2.5 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
                        title="Rename"
                      >
                        <Edit2 className="w-4 h-4" />
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

                  {/* Card info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-1 truncate group-hover:text-amber-600 transition-colors">
                      {resume.title || 'Untitled Resume'}
                    </h3>

                    {resume.atsScore != null && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                            style={{ width: `${resume.atsScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-500">{resume.atsScore}%</span>
                      </div>
                    )}

                    <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100 justify-between">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {resume.updatedAt
                          ? <span>{resume.updatedAt.toDate().toLocaleDateString()}</span>
                          : <span>Recently</span>}
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
