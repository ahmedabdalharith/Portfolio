import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import MobileMockup from './MobileMockup'

const WORDS = [
  'Android Apps',
  'Jetpack Compose',
  'Kotlin & Java',
  'Multiplatform (KMP)',
  'Clean Architecture',
]

function useTyping(words) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timer
    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx(i => i + 1), 60)
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(i => i - 1), 30)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    setDisplay(word.slice(0, charIdx))
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words])

  return display
}

export default function Hero() {
  const typed = useTyping(WORDS)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#020617]">
      {/* Soft animated blobs - Dark mode oriented */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#3DDC84]/10 blur-[120px] -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }} 
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] -z-10" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-bold px-5 py-2.5 rounded-full mb-8"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84] shadow-[0_0_10px_#3DDC84]" />
            Android Engineer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8"
          >
            Ahmed<br />
            Ibrahim<br />
            <span className="text-[#3DDC84]">
              Mahmoud
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="text-xl lg:text-3xl text-slate-400 mb-8 font-black tracking-tight"
          >
            I build{' '}
            <span className="text-[#3DDC84]">
              {typed}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            className="text-slate-400 text-lg mb-12 max-w-lg font-bold leading-relaxed"
          >
            Android Developer specialized in <span className="text-white font-black">Kotlin, Java, Jetpack Compose</span>, and <span className="text-white font-black">Multiplatform (KMP/CMP)</span>. Focused on Clean Architecture and high-performance mobile ecosystems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a href="#projects" className="btn-primary px-12 py-5 text-sm">View Projects</a>
            <a href="#contact" className="btn-outline px-12 py-5 text-sm">Get in Touch</a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-5"
          >
            {[
              { href: 'https://github.com/ahmedabdalharith', icon: <Github size={20} />, label: 'GitHub', color: '#fff' },
              { href: 'https://linkedin.com/in/ahmedabdalharith', icon: <Linkedin size={20} />, label: 'LinkedIn', color: '#0077B5' },
              { href: 'mailto:ahmed.alharith01@gmail.com', icon: <Mail size={20} />, label: 'Email', color: '#EA4335' },
            ].map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{ "--brand-color": s.color }}
                className="w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center text-slate-400 hover:text-[var(--brand-color)] hover:bg-[var(--brand-color)]/[0.08] hover:scale-110 active:scale-95 shadow-xl border border-white/5 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
          className="hidden lg:flex justify-center items-center relative"
        >
          <div className="animate-float z-10 hover:scale-[1.02] transition-transform duration-500">
              <MobileMockup />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
