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
    <section id="projects" className="py-32 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className="section-label">04 — Projects</p>
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-16 tracking-tight leading-none">
            Featured <span className="text-[#3DDC84]">Work</span>
          </h2>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="text-[#3DDC84] animate-spin" size={40} />
          </div>
        )}
        {isError && (
          <div className="bg-slate-900 border border-white/5 p-16 rounded-[3rem] text-center">
             <p className="text-slate-500 font-black text-lg">Failed to sync with backend.</p>
          </div>
        )}

        {projects && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {projects?.length === 0 && (
          <div className="bg-slate-900 border border-white/5 p-16 rounded-[3rem] text-center">
             <p className="text-slate-500 font-black text-lg">Portfolio is currently empty.</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3DDC84]/5 rounded-full blur-[150px] -z-10" />
    </section>
  )
}
