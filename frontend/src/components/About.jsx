import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, GraduationCap, Zap } from 'lucide-react'

const info = [
  { icon: <MapPin size={18} />, label: 'Location', value: 'Cairo, Egypt' },
  { icon: <Phone size={18} />, label: 'Phone', value: '+20 106 575 1305' },
  { icon: <Mail size={18} />, label: 'Email', value: 'ahmed.alharith01@gmail.com' },
  { icon: <GraduationCap size={18} />, label: 'Education', value: 'B.Sc. Computer Science, Fayoum — Very Good (80%)' },
  { icon: <Zap size={18} />, label: 'Experience', value: '3+ Years Android Development' },
]

const chips = ['Kotlin', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'KMP', 'Hilt / Koin', 'Coroutines', 'Firebase']

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="section-label">01 — About</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-14">
            Professional <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Summary</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Motivated Android Developer with <strong className="text-white">3+ years</strong> of hands-on experience
              building and shipping <strong className="text-white">7+ production applications</strong> on Google Play.
              Proficient in Kotlin, Jetpack Compose, MVVM, and Clean Architecture.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Experienced across <strong className="text-white">fintech, ride-hailing, real estate, e-learning, and live streaming</strong> domains.
              Delivered Egypt's highest-rated personal finance app (<em className="text-primary-400">BNB Dafatery</em>) with
              a <strong className="text-white">4.9-star rating</strong> and 5,000+ downloads.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Strong foundation in writing clean, testable, and maintainable code with a{' '}
              <strong className="text-primary-400">sub-0.5% crash rate</strong> across all production releases.
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map(c => (
                <span key={c} className="tag">{c}</span>
              ))}
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8 space-y-5"
          >
            {info.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</div>
                  <div className="text-gray-200 font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
