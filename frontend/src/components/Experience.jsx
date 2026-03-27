import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

const jobs = [
  {
    title: 'Android Developer',
    company: 'Project EGY',
    location: 'Cairo, Egypt',
    period: 'Jan 2025 — Present',
    bullets: [
      'Built and shipped 7+ production Android apps to Google Play with 5,000+ combined downloads and sub-0.5% crash rate.',
      'Delivered BNB Dafatery fintech app — 4.9★ rating across 162 verified reviews, Egypt\'s top personal finance app.',
      'Built all UIs with Jetpack Compose, cutting UI development time by ~30% via reusable component libraries.',
      'Developed TAS Travel as a Kotlin Multiplatform (KMP) app on both Google Play & Apple App Store (60%+ shared codebase).',
      'Architected all projects with MVVM & Clean Architecture — zero-regression feature delivery.',
      'Integrated SignalR, Pusher, and Agora SDK for real-time features supporting 100+ concurrent users.',
      'Managed end-to-end Google Play Console submissions: signing, staged rollouts, listing optimization.',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'KMP', 'Hilt', 'Firebase', 'SignalR', 'Agora SDK'],
  },
  {
    title: 'Mobile Developer',
    company: 'Freelance',
    location: 'Remote',
    period: 'Jan 2022 — Present',
    bullets: [
      'Delivered 5+ complete Android applications for clients across fintech, on-demand, and real estate — 100% on-time.',
      'Designed reusable UI component libraries adopted across 3+ projects, reducing development time by ~25%.',
      'Implemented real-time chat & push notifications via Firebase Cloud Messaging (1,000+ daily active users).',
      'Managed full app lifecycle: requirements → architecture → development → QA → Google Play release.',
    ],
    tags: ['Android', 'Firebase', 'FCM', 'REST APIs', 'Google Play', 'Full Lifecycle'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-dark-800/40 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="section-label">02 — Experience</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-14">
            Work <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-600/50 via-primary-800/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-6 w-5 h-5 rounded-full bg-primary-600 border-2 border-primary-400 shadow-lg shadow-primary-500/40 hidden md:block" />

                <div className="glass-card p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={16} className="text-primary-400" />
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      </div>
                      <div className="text-primary-400 font-semibold text-lg">{job.company}</div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Calendar size={13} />
                        {job.period}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <MapPin size={13} />
                        {job.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-2" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
