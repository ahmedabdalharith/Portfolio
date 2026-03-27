import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-800/50 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-lg font-bold text-white">
          AIM<span className="text-primary-400">.</span>
        </span>
        <p className="text-gray-500 text-sm text-center">
          © 2025 Ahmed Ibrahim Mahmoud · Built with React + Spring Boot
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/ahmedabdalharith" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-400 transition">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/ahmedabdalharith" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-400 transition">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
