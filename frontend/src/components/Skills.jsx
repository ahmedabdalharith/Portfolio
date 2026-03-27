import { motion } from 'framer-motion'

const categories = [
  {
    icon: '💻',
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'C++', 'Python'],
  },
  {
    icon: '🚀',
    title: 'Android SDK',
    skills: ['Jetpack Compose', 'ViewModel', 'Coroutines', 'Flow', 'WorkManager', 'Room', 'DataStore', 'ExoPlayer', 'FCM'],
  },
  {
    icon: '🏛️',
    title: 'Architecture',
    skills: ['MVVM', 'Clean Architecture', 'Repository Pattern', 'Hilt', 'Koin', 'MVP'],
  },
  {
    icon: '🌐',
    title: 'Cross-Platform',
    skills: ['Compose Multiplatform', 'KMP', 'Android + iOS'],
  },
  {
    icon: '🔗',
    title: 'Networking',
    skills: ['Retrofit', 'OkHttp', 'Ktor', 'REST APIs'],
  },
  {
    icon: '⚡',
    title: 'Real-Time',
    skills: ['SignalR', 'Pusher', 'Agora SDK', 'Firebase Realtime DB'],
  },
  {
    icon: '🗄️',
    title: 'Database',
    skills: ['Room', 'SQLite', 'Firebase Firestore', 'DataStore'],
  },
  {
    icon: '🛠️',
    title: 'Tools & DevOps',
    skills: ['Android Studio', 'Git / GitHub', 'Gradle', 'Google Play Console', 'Firebase', 'CI/CD'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="section-label">03 — Skills</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-14">
            Technical <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Skills</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.02, translateY: -4 }}
              className="glass-card p-6 group cursor-default"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h4 className="text-white font-bold mb-3 group-hover:text-primary-400 transition-colors">{cat.title}</h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map(s => (
                  <span key={s} className="text-xs bg-dark-600 text-gray-400 border border-white/5 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
