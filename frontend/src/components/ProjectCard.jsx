import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Download } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 group relative overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#3DDC84]/30"
    >
      <div className="flex items-start justify-between gap-3 font-sans">
        <div className="flex items-center gap-5">
            {project.iconUrl ? (
                <img src={project.iconUrl} alt={project.title} className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            ) : (
                <div className="w-14 h-14 rounded-2xl bg-slate-800 text-[#3DDC84] font-black text-xl flex items-center justify-center">
                    {project.title.charAt(0)}
                </div>
            )}
          <div>
            <h3 className="text-xl font-black text-white group-hover:text-[#3DDC84] transition-colors tracking-tight leading-none">
              {project.title}
            </h3>
            {project.category && (
              <span className="text-[10px] font-black text-slate-500 mt-2 block uppercase tracking-widest">
                {project.category}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed flex-grow font-bold">
        {project.description}
      </p>

      {project.techStack && (
        <div className="flex flex-wrap gap-2.5 pt-2">
          {project.techStack.split(',').map((tech, i) => (
            <span key={i} className="tag text-[9px] px-3.5 py-1.5 uppercase font-black tracking-widest">
              {tech.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-6 mt-auto border-t border-white/5">
        <div className="flex gap-5">
            {project.rating && (
                <div className="flex items-center gap-2 text-white text-xs font-black">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    {project.rating}
                </div>
            )}
            {project.downloads && (
                <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase">
                    <Download size={14} />
                    {project.downloads}
                </div>
            )}
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
              <Github size={20} />
            </a>
          )}
          {project.playStoreUrl && (
            <a href={project.playStoreUrl} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#3DDC84]/10 text-[#3DDC84] hover:bg-[#3DDC84]/20 hover:scale-110 active:scale-95 transition-all">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

