import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ArrowDown } from 'lucide-react'
import MobileMockup from './MobileMockup'

const WORDS = [
  'Android Apps',
  'Jetpack Compose UIs',
  'Fintech Solutions',
  'KMP Apps',
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
      timer = setTimeout(() => setCharIdx(i => i + 1), 80)
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(i => i - 1), 45)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    setDisplay(word.slice(0, charIdx))
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words])

  return display
}

const stats = [
  { num: '7+', label: 'Production Apps' },
  { num: '4.9★', label: 'Top Rated App' },
  { num: '<0.5%', label: 'Crash Rate' },
  { num: '5K+', label: 'Downloads' },
]

export default function Hero() {
  const typed = useTyping(WORDS)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-dark-900/60 to-dark-900" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-700/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-900/50 border border-primary-700/40 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-white leading-tight mb-4"
          >
            Ahmed<br />
            Ibrahim<br />
            <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
              Mahmoud
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-gray-300 mb-4 font-medium h-9"
          >
            I build{' '}
            <span className="text-primary-400 font-semibold">
              {typed}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed"
          >
            Android Developer with <strong className="text-white">3+ years</strong> shipping <strong className="text-white">7+ production apps</strong>. Egypt's highest-rated personal finance app — <strong className="text-primary-400">4.9★</strong> · 5,000+ downloads.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-4 gap-4 mb-10"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-primary-400">{s.num}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-outline">Get in Touch</a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-5"
          >
            {[
              { href: 'https://github.com/ahmedabdalharith', icon: <Github size={20} />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/ahmedabdalharith', icon: <Linkedin size={20} />, label: 'LinkedIn' },
              { href: 'mailto:ahmed.alharith01@gmail.com', icon: <Mail size={20} />, label: 'Email' },
              { href: 'tel:+201065751305', icon: <Phone size={20} />, label: 'Phone' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors text-sm"
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right – Floating phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative">
            <div className="animate-float">
                <MobileMockup />
            </div>
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-[56px] border border-cyan-500/20 -z-10" />
            <div className="absolute -inset-8 rounded-[64px] border border-blue-500/10 -z-10" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
