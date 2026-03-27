import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, LayoutDashboard } from 'lucide-react'
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-800/90 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-xl font-bold text-white">
          AIM<span className="text-primary-400">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Dashboard button */}
        <Link
          to="/dashboard"
          className="hidden md:inline-flex items-center gap-2 bg-primary-600/20 hover:bg-primary-600/40 border border-primary-500/40 text-primary-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
        >
          <LayoutDashboard size={15} />
          Dashboard
        </Link>

        {/* Hamburger */}
        <button
          id="hamburger"
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark-800 border-b border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link py-1" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <Link to="/dashboard" className="nav-link py-1 text-primary-400" onClick={() => setOpen(false)}>
              ⚙ Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
