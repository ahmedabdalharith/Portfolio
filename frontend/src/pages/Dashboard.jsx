import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects'
import { Plus, Pencil, Trash2, LogOut, X, ExternalLink, LayoutDashboard, Star, Briefcase, Globe, BarChart3, Save } from 'lucide-react'

function ProjectModal({ project, onClose, onSave, isSaving }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: project || {},
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} 
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 bg-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-8 md:p-12 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] border border-white/10"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
             <h2 className="text-3xl font-black text-white tracking-tight">
               {project ? 'Edit Project' : 'Add New Project'}
             </h2>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Project Metadata Configuration</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title *</label>
               <input id="projectTitle" {...register('title', { required: 'Title is required' })} className="input-field bg-slate-950" placeholder="e.g. BNB Dafatery" />
               {errors.title && <p className="text-red-400 text-[11px] mt-1 font-bold ml-1">{errors.title.message}</p>}
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
               <input id="projectCategory" {...register('category')} className="input-field bg-slate-950" placeholder="e.g. Fintech · Personal Finance" />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rating</label>
              <input id="projectRating" {...register('rating')} className="input-field bg-slate-950" placeholder="e.g. 4.9" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Downloads</label>
              <input id="projectDownloads" {...register('downloads')} className="input-field bg-slate-950" placeholder="e.g. 5,000+" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description *</label>
            <textarea
              id="projectDesc"
              {...register('description', { required: 'Description is required' })}
              className="input-field bg-slate-950 resize-none h-32 py-4"
              placeholder="Detailed app overview..."
            />
            {errors.description && <p className="text-red-400 text-[11px] mt-1 font-bold ml-1">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tech Stack</label>
            <input id="projectTech" {...register('techStack')} className="input-field bg-slate-950" placeholder="Kotlin, Jetpack Compose, MVVM..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">App ID (Google Play)</label>
               <input id="projectAppId" {...register('appId')} className="input-field bg-slate-950" placeholder="com.example.app" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Play Store URL</label>
               <input id="projectUrl" {...register('playStoreUrl')} className="input-field bg-slate-950" placeholder="https://play.google.com/..." />
             </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button type="button" onClick={onClose} className="btn-outline flex-1 justify-center py-5 border-none bg-slate-800 hover:bg-slate-700">Cancel</button>
            <button id="saveProjectBtn" type="submit" disabled={isSaving} className="btn-primary flex-1 justify-center py-5 group">
              {isSaving ? (
                <span className="w-5 h-5 border-[3px] border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                   {project ? 'Save Changes' : 'Create Project'}
                   <Save size={18} strokeWidth={3} className="transition-transform group-hover:scale-110" />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [modal, setModal] = useState(null)

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => { queryClient.invalidateQueries(['projects']); setModal(null); toast.success('Project added!') },
    onError: () => toast.error('Failed to add project'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => { queryClient.invalidateQueries(['projects']); setModal(null); toast.success('Project updated!') },
    onError: () => toast.error('Failed to update project'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => { queryClient.invalidateQueries(['projects']); toast.success('Project deleted') },
    onError: () => toast.error('Failed to delete project'),
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleSave = (data) => {
    if (modal === 'add') {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate({ id: modal.id, data })
    }
  }

  const handleDelete = (project) => {
    if (window.confirm(`Delete "${project.title}"?`)) {
      deleteMutation.mutate(project.id)
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      {/* Premium Dark Header */}
      <header className="bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-40 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#3DDC84]/10 flex items-center justify-center text-[#3DDC84] shadow-2xl shadow-[#3DDC84]/10 border border-[#3DDC84]/20">
              <LayoutDashboard size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-black tracking-tight text-xl">Projects Dashboard</div>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Ahmed Ibrahim Mahmoud (ADMIN)</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="btn-outline py-3 px-6 text-xs flex items-center gap-2 border-white/5 hover:bg-slate-900 transition-all font-black uppercase tracking-widest">
              <ExternalLink size={16} /> View Portfolio
            </a>
            <button 
                id="logoutBtn" 
                onClick={handleLogout} 
                className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all border border-white/5"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Modern Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'Total Repositories', val: projects.length, icon: <Briefcase size={20}/>, color: '#3DDC84' },
            { label: 'Play Store Live', val: projects.filter(p => p.playStoreUrl).length, icon: <Globe size={20}/>, color: '#60a5fa' },
            { label: 'Average Feedback', val: projects.filter(p => p.rating).length, icon: <BarChart3 size={20}/>, color: '#facc15' },
          ].map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              key={s.label} className="structured-card p-10 relative group border-white/10"
            >
              <div className="absolute top-10 right-10 opacity-10 group-hover:scale-110 transition-transform duration-500" style={{ color: s.color }}>
                 {s.icon}
              </div>
              <div className="text-5xl font-black text-white tracking-tighter mb-2">{s.val}</div>
              <div className="text-slate-500 font-black text-[10px] uppercase tracking-[.25em]">{s.label}</div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-all rounded-[2.5rem] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div>
             <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2">Inventory Control</h1>
             <p className="text-slate-500 text-sm font-bold">Manage all active projects and portfolio catalog.</p>
          </div>
          <button id="addProjectBtn" onClick={() => setModal('add')} className="btn-primary py-4 px-10 text-[13px]">
            <Plus size={20} strokeWidth={3} /> Add New Entry
          </button>
        </div>

        {/* Data List (Table) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
             <div className="w-16 h-16 border-4 border-[#3DDC84]/20 border-t-[#3DDC84] rounded-full animate-spin" />
             <div className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Accessing Database...</div>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="structured-card p-24 text-center border-dashed border-white/10 bg-transparent"
          >
            <div className="w-24 h-24 bg-slate-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
               <Plus size={40} className="text-slate-700" />
            </div>
            <p className="text-white font-black text-2xl tracking-tight mb-4 text-balance">Your portfolio is currently a blank slate.</p>
            <p className="text-slate-500 font-bold mb-10">Start by adding your most impactful Android applications.</p>
            <button onClick={() => setModal('add')} className="btn-primary mx-auto">
              Initialize First Project
            </button>
          </motion.div>
        ) : (
          <div className="structured-card !rounded-[3.5rem] bg-slate-900/40 border border-white/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-8 py-8 text-left text-[10px] text-slate-500 font-black uppercase tracking-[.25em]">Registry ID & Overview</th>
                    <th className="px-8 py-8 text-left text-[10px] text-slate-500 font-black uppercase tracking-[.25em] hidden md:table-cell">Deployment Category</th>
                    <th className="px-8 py-8 text-left text-[10px] text-slate-500 font-black uppercase tracking-[.25em] hidden lg:table-cell">Market Rating</th>
                    <th className="px-8 py-8 text-left text-[10px] text-slate-500 font-black uppercase tracking-[.25em] hidden lg:table-cell">Integration Stack</th>
                    <th className="px-8 py-8 text-right text-[10px] text-slate-500 font-black uppercase tracking-[.25em]">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.03] transition-all group"
                    >
                      <td className="px-8 py-8">
                        <div className="text-white font-black text-base tracking-tight mb-1 group-hover:text-[#3DDC84] transition-colors">{p.title}</div>
                        <div className="text-slate-500 font-bold text-xs mt-1 line-clamp-1 max-w-sm opacity-70 italic">{p.description}</div>
                      </td>
                      <td className="px-8 py-8 hidden md:table-cell">
                        <span className="text-[10px] bg-slate-950 text-slate-300 font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-white/5">
                          {p.category || 'N/A'}
                        </span>
                      </td>
                      <td className="px-8 py-8 hidden lg:table-cell">
                        {p.rating ? (
                          <div className="flex items-center gap-2 text-white font-black text-sm">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />{p.rating}
                          </div>
                        ) : <span className="text-slate-600 font-bold">—</span>}
                      </td>
                      <td className="px-8 py-8 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-2 max-w-xs">
                          {p.techStack?.split(',').slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] bg-[#3DDC84]/5 text-[#3DDC84] font-black uppercase tracking-tighter px-2 py-1 rounded-md border border-[#3DDC84]/10">{t.trim()}</span>
                          ))}
                          {p.techStack?.split(',').length > 3 && (
                            <span className="text-slate-600 font-black text-[10px] py-1">+{p.techStack.split(',').length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center justify-end gap-3 text-slate-400">
                          <button
                            onClick={() => setModal(p)}
                            className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center hover:bg-[#3DDC84]/10 hover:text-[#3DDC84] transition-all border border-white/5"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-all border border-white/5"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto w-full px-6 py-12 text-center">
         <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
         <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">Inventory System v4.0.2 / © 2026</p>
      </footer>

      <AnimatePresence>
        {modal && (
          <ProjectModal
            project={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
            isSaving={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
