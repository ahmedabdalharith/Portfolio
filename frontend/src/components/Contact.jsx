import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="section-label">05 — Contact</p>
              <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-none text-balance">
                Let's Build Something <span className="text-[#3DDC84]">Incredible</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-lg font-bold">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: <Mail size={22} />, label: 'Email', value: 'ahmed.alharith01@gmail.com', href: 'mailto:ahmed.alharith01@gmail.com', color: '#EA4335' },
                { icon: <Linkedin size={22} />, label: 'LinkedIn', value: 'ahmedabdalharith', href: 'https://linkedin.com/in/ahmedabdalharith', color: '#0077B5' },
                { icon: <Github size={22} />, label: 'GitHub', value: 'ahmedabdalharith', href: 'https://github.com/ahmedabdalharith', color: '#fff' },
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ "--brand-color": item.color }}
                  className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-[var(--brand-color)]/30 hover:scale-[1.02] transition-all group duration-500 shadow-2xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#3DDC84]/10 flex items-center justify-center text-[#3DDC84] group-hover:bg-[var(--brand-color)] group-hover:text-slate-950 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white font-black text-lg tracking-tight">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-slate-900 border border-white/5 p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl relative"
          >
             <form className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" placeholder="Your Name" className="input-field" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                      <input type="email" placeholder="your.email@example.com" className="input-field" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                   <input type="text" placeholder="Project Inquiry" className="input-field" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                   <textarea placeholder="Tell me about your vision..." className="input-field min-h-[160px] py-6 resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center group">
                   Send Message
                   <Send size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
             </form>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#3DDC84]/5 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-t from-[#3DDC84]/5 to-transparent pointer-events-none" />
    </section>
  )
}
