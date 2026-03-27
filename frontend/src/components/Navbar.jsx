import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 transition-all duration-700 px-8 py-3 rounded-[2rem] border ${
      scrolled 
        ? 'bg-slate-900/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)]' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-sans text-2xl font-black text-white tracking-tighter transition-transform active:scale-95 group">
          AIM<span className="text-[#3DDC84] group-hover:animate-pulse">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-slate-400 hover:text-[#3DDC84] font-black transition-colors text-[11px] uppercase tracking-[0.2em]">{l.label}</a>
            </li>
          ))}
        </ul>


        {/* Hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden absolute top-20 right-0 w-full bg-slate-900 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl flex flex-col gap-6"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-white font-black text-xl tracking-tight" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
