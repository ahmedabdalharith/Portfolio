import { motion } from 'framer-motion'
import { ExternalLink, Star, Download } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, translateY: -6 }}
      className="glass-card p-6 flex flex-col gap-4 group relative overflow-hidden"
    >
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        {project.playStoreUrl && (
          <a
            href={project.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 w-8 h-8 rounded-lg bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-600/40 transition"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Category badge */}
      {project.category && (
        <span className="self-start text-xs font-mono bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 rounded-full">
          {project.category}
        </span>
      )}

      {/* Metrics row */}
      {(project.rating || project.downloads) && (
        <div className="flex items-center gap-4 text-sm">
          {project.rating && (
            <div className="flex items-center gap-1 text-yellow-400 font-semibold">
              <Star size={14} fill="currentColor" />
              {project.rating}
            </div>
          )}
          {project.downloads && (
            <div className="flex items-center gap-1 text-gray-400">
              <Download size={13} />
              {project.downloads}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      {project.techStack && (
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.split(',').map(t => (
            <span key={t.trim()} className="tag">{t.trim()}</span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
