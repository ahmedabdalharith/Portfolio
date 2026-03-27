import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, GraduationCap, Zap } from 'lucide-react'

const info = [
  { icon: <MapPin size={18} />, label: 'Location', value: 'Cairo, Egypt' },
  { icon: <Phone size={18} />, label: 'Phone', value: '+20 106 575 1305' },
  { icon: <Mail size={18} />, label: 'Email', value: 'ahmed.alharith01@gmail.com' },
  { icon: <GraduationCap size={18} />, label: 'Education', value: 'B.Sc. Computer Science (80%)' },
  { icon: <Zap size={18} />, label: 'Experience', value: '3+ Years Android Development' },
]

const chips = ['Kotlin', 'Java', 'Jetpack Compose', 'MVVM', 'Clean Arch', 'KMP/CMP', 'Hilt', 'Coroutines']

export default function About() {
  return (
    <section id="about" className="py-32 relative bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <p className="section-label">01 — About me</p>
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-14 tracking-tight leading-none">
            Professional <span className="text-[#3DDC84]">Summary</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="text-slate-400 text-lg leading-relaxed mb-6 font-bold">
              Motivated Android Developer with <strong className="text-white text-xl">3+ years</strong> of hands-on experience 
              building and shipping <strong className="text-white text-xl">7+ production applications</strong> on Google Play. 
              Proficient in <span className="text-[#3DDC84]">Kotlin, Java, Jetpack Compose</span>, 
              and <span className="text-[#3DDC84]">Multiplatform (KMP/CMP)</span>. Focused on MVVM, MVI, and Clean Architecture.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 font-bold">
              Experienced across <strong className="text-white">fintech, ride-hailing, real estate, e-learning,</strong> and 
              <strong className="text-white">live streaming</strong> domains. Delivered Egypt's highest-rated personal finance app 
              (<strong className="text-[#3DDC84]">BNB Dafatery</strong>) with a <strong className="text-white">4.9-star rating</strong> and 
              <strong className="text-white">5,000+ downloads</strong>.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {chips.map(c => (
                <span key={c} className="tag text-[10px] px-3.5 py-1.5">{c}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-12 space-y-7 backdrop-blur-sm shadow-2xl"
          >
            {info.map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-10 h-10 rounded-2xl bg-[#3DDC84]/10 flex items-center justify-center text-[#3DDC84] shrink-0 group-hover:bg-[#3DDC84] group-hover:text-slate-950 transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1 leading-none">{item.label}</div>
                  <div className="text-white font-black text-[14px] tracking-tight leading-none">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#3DDC84]/5 rounded-full blur-[120px] -z-10" />
    </section>
  )
}
