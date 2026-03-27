import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects'
import { Plus, Pencil, Trash2, LogOut, X, ExternalLink, LayoutDashboard, Star } from 'lucide-react'

function ProjectModal({ project, onClose, onSave, isSaving }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: project || {},
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 glass-card p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm font-medium block mb-1.5">Title *</label>
            <input id="projectTitle" {...register('title', { required: 'Title is required' })} className="input-field" placeholder="BNB Dafatery" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-sm font-medium block mb-1.5">Category</label>
            <input id="projectCategory" {...register('category')} className="input-field" placeholder="Fintech · Personal Finance" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-1.5">Rating</label>
              <input id="projectRating" {...register('rating')} className="input-field" placeholder="4.9" />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-1.5">Downloads</label>
              <input id="projectDownloads" {...register('downloads')} className="input-field" placeholder="5,000+" />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm font-medium block mb-1.5">Description *</label>
            <textarea
              id="projectDesc"
              {...register('description', { required: 'Description is required' })}
              className="input-field resize-none"
              rows={4}
              placeholder="What does this app do?"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-sm font-medium block mb-1.5">Tech Stack</label>
            <input id="projectTech" {...register('techStack')} className="input-field" placeholder="Kotlin, Jetpack Compose, MVVM, Room, Firebase" />
            <p className="text-gray-600 text-xs mt-1">Comma-separated values</p>
          </div>

          <div>
            <label className="text-gray-400 text-sm font-medium block mb-1.5">Play Store URL</label>
            <input id="projectUrl" {...register('playStoreUrl')} className="input-field" placeholder="https://play.google.com/..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1 justify-center">Cancel</button>
            <button id="saveProjectBtn" type="submit" disabled={isSaving} className="btn-primary flex-1 justify-center">
              {isSaving
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : project ? 'Save Changes' : 'Add Project'
              }
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
  const [modal, setModal] = useState(null) // null | 'add' | project object

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
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-dark-800/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <div className="text-white font-bold">Projects Dashboard</div>
              <div className="text-gray-500 text-xs">Ahmed Ibrahim Mahmoud</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="btn-outline py-2 px-4 text-sm flex items-center gap-2">
              <ExternalLink size={14} /> View Portfolio
            </a>
            <button id="logoutBtn" onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Projects', val: projects.length },
            { label: 'With Play Store URL', val: projects.filter(p => p.playStoreUrl).length },
            { label: 'With Rating', val: projects.filter(p => p.rating).length },
          ].map(s => (
            <div key={s.label} className="glass-card p-5 text-center">
              <div className="text-3xl font-black text-primary-400">{s.val}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">All Projects</h1>
          <button id="addProjectBtn" onClick={() => setModal('add')} className="btn-primary py-2.5 px-5 text-sm">
            <Plus size={16} /> Add Project
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-16 text-center"
          >
            <div className="text-5xl mb-4">📱</div>
            <p className="text-gray-400 mb-6">No projects yet. Add your first one!</p>
            <button onClick={() => setModal('add')} className="btn-primary mx-auto">
              <Plus size={16} /> Add First Project
            </button>
          </motion.div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Category</th>
                  <th className="px-6 py-4 font-medium hidden lg:table-cell">Rating</th>
                  <th className="px-6 py-4 font-medium hidden lg:table-cell">Tech Stack</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{p.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5 line-clamp-1 max-w-xs">{p.description}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded-full">
                        {p.category || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {p.rating ? (
                        <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                          <Star size={13} fill="currentColor" />{p.rating}
                        </div>
                      ) : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.techStack?.split(',').slice(0, 3).map(t => (
                          <span key={t} className="tag text-xs">{t.trim()}</span>
                        ))}
                        {p.techStack?.split(',').length > 3 && (
                          <span className="text-gray-600 text-xs">+{p.techStack.split(',').length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setModal(p)}
                          className="w-8 h-8 rounded-lg bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-600/40 transition"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-600/30 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
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
