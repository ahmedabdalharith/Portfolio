import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin } from 'lucide-react'

const contacts = [
  { icon: <Mail size={20} />, label: 'Email', value: 'ahmed.alharith01@gmail.com', href: 'mailto:ahmed.alharith01@gmail.com' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+20 106 575 1305', href: 'tel:+201065751305' },
  { icon: <Github size={20} />, label: 'GitHub', value: 'github.com/ahmedabdalharith', href: 'https://github.com/ahmedabdalharith' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'linkedin.com/in/ahmedabdalharith', href: 'https://linkedin.com/in/ahmedabdalharith' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label justify-center flex">05 — Contact</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Get in <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            I'm always open to discussing new opportunities, exciting projects, or just chatting about Android development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, translateY: -4 }}
              className="glass-card p-6 flex flex-col items-center gap-3 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-600/40 transition">
                {c.icon}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{c.label}</div>
              <div className="text-gray-300 text-xs font-medium break-all">{c.value}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
