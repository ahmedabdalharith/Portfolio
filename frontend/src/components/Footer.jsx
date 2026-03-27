import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020617] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-8">
        <a href="#" className="font-sans text-2xl font-black text-white tracking-tighter">
          AIM<span className="text-[#3DDC84]">.</span>
        </a>
        
        <p className="text-white/40 text-sm font-bold text-center">
          © 2026 Ahmed Ibrahim Mahmoud
        </p>

        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/ahmedabdalharith" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-sm border border-white/5"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://linkedin.com/in/ahmedabdalharith" 
            target="_blank" 
            rel="noreferrer" 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 transition-all shadow-sm border border-white/5"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
