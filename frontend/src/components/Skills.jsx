import { motion } from 'framer-motion'

const skills = [
  { category: 'Android Core', items: ['Kotlin', 'Java', 'Coroutines', 'Flow', 'Hilt / Koin', 'Room', 'DataStore'] },
  { category: 'UI & Design', items: ['Jetpack Compose', 'Material Design 3', 'XML / View System', 'Framer Motion', 'Lottie Animations'] },
  { category: 'Architecture', items: ['MVVM / MVI', 'Clean Architecture', 'Modularization', 'SOLID Principles', 'Unit Testing'] },
  { category: 'Advanced', items: ['KMP (Multiplatform)', 'Google Play API', 'Payment Gateways', 'Maps & Location', 'CI/CD Pipelines'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className="section-label">03 — Skills</p>
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-16 tracking-tight leading-none">
            Technical <span className="text-[#3DDC84]">Toolkit</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
              className="bg-slate-900 border border-white/5 p-10 rounded-[2.5rem] hover:border-[#3DDC84]/20 transition-all duration-500 group"
            >
              <h3 className="text-[#3DDC84] font-black text-lg mb-8 uppercase tracking-widest leading-none">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.items.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#3DDC84] transition-colors" />
                    <span className="text-slate-400 font-bold group-hover:text-white transition-colors text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
