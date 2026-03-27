import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/projects'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function Projects() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  return (
    <section id="projects" className="py-32 bg-dark-800/40 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="section-label">04 — Projects</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-14">
            Key <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="text-primary-400 animate-spin" size={40} />
          </div>
        )}
        {isError && (
          <p className="text-center text-gray-500 py-24">Failed to load projects. Backend might be starting up — try refreshing.</p>
        )}

        {projects && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {projects?.length === 0 && (
          <p className="text-center text-gray-500 py-24">No projects yet. Add some from the Dashboard.</p>
        )}
      </div>
    </section>
  )
}
