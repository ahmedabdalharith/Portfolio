import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const jobs = [
  {
    title: 'Android Developer',
    company: 'Project EGY',
    period: 'Jan 2025 - Present',
    location: 'Cairo, Egypt',
    achievements: [
      'Built and shipped 7+ production Android apps using Kotlin and Java with 5,000+ combined downloads.',
      'Delivered BNB Dafatery fintech app achieving a 4.9-star rating — ranked among Egypt\'s top personal finance apps.',
      'Developed TAS Travel as a premium Compose Multiplatform (KMP/CMP) app published simultaneously on Android and iOS.',
      'Architected projects using MVVM and Clean Architecture, enabling zero-regression feature delivery.',
      'Integrated real-time features using SignalR, Pusher, and Agora SDK for live-streaming and ride-hailing apps.',
      'Managed end-to-end Google Play Console submissions including app signing and Store listing optimization.'
    ],
  },
  {
    title: 'Mobile Developer',
    company: 'Freelance',
    period: 'Jan 2022 - Jan 2025',
    location: 'Remote',
    achievements: [
      'Delivered 5+ complete Android applications for clients across fintech, on-demand services, and real estate.',
      'Designed reusable UI component libraries and shared modules adopted across 3+ projects.',
      'Implemented real-time chat and push notification services via Firebase Cloud Messaging.',
      'Managed full app lifecycle independently: requirements, architecture, development, QA, and release.'
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className="section-label">02 — Experience</p>
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-16 tracking-tight leading-none">
            Work <span className="text-[#3DDC84]">History</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-slate-800 rounded-full hidden md:block" />

          <div className="space-y-12">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
                className="md:pl-16 relative"
              >
                <div className="absolute left-[20px] top-10 w-4 h-4 rounded-full bg-slate-900 border-4 border-[#3DDC84] shadow-[0_0_15px_#3DDC8450] hidden md:block z-10" />

                <div className="bg-slate-900/50 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md shadow-xl">
                  <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#3DDC84]/10 flex items-center justify-center text-[#3DDC84]">
                           <Briefcase size={22} />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">{job.title}</h3>
                      </div>
                      <div className="text-[#3DDC84] font-black text-xl md:ml-16 leading-none">{job.company}</div>
                      <div className="text-slate-500 font-bold text-sm md:ml-16 mt-2 uppercase tracking-widest">{job.location}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-slate-400 font-black text-sm uppercase tracking-widest">{job.period}</div>
                  </div>
                  
                  <ul className="space-y-3 md:ml-16">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 text-lg leading-relaxed font-bold">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#3DDC84] shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
