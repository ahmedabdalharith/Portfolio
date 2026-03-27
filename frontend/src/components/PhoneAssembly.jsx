import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Code2, Cpu, Database, Layout, Smartphone, Cloud, Layers, Info } from 'lucide-react'

const FloatingItem = ({ icon: Icon, initialX, initialY, targetX, targetY, scrollProgress, color, delay }) => {
  // Ultra-precise gather timing (0.3 to 0.7 range for maximum impact)
  const gatherStart = 0.2 + (delay * 0.08)
  const gatherEnd = 0.6 + (delay * 0.08)
  
  const x = useTransform(scrollProgress, [0, gatherStart, gatherEnd], [initialX, initialX, targetX])
  const y = useTransform(scrollProgress, [0, gatherStart, gatherEnd], [initialY, initialY, targetY])
  
  // Handoff logic: item disappears as it "enters" the phone to avoid messy overlap
  const opacity = useTransform(scrollProgress, [0, gatherStart, gatherEnd, gatherEnd + 0.02], [0, 0, 1, 0])
  const scale = useTransform(scrollProgress, [gatherStart, gatherEnd], [2, 0.45]) // Matches internal circle size (44px/100px roughly)
  const rotate = useTransform(scrollProgress, [gatherStart, gatherEnd], [initialX > 0 ? 30 : -30, 0])

  return (
    <motion.div
      style={{ x, y, opacity, scale, rotate }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <div 
        className="w-24 h-24 rounded-full flex items-center justify-center text-white shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative border border-white/10"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full opacity-50" />
        <Icon size={44} className="relative z-10" />
      </div>
    </motion.div>
  )
}

export default function PhoneAssembly() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Silky smooth spring physics for the entire experience
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 22, restDelta: 0.001 })

  // COORDINATE MAPPING (Targeting -108 for perfect bubble centering)
  const items = [
    { icon: Code2, initialX: -650, initialY: -500, targetX: -108, targetY: -100, color: "#7F52FF", label: "Kotlin Engine", status: "READY" },
    { icon: Cpu, initialX: 620, initialY: -400, targetX: -108, targetY: -20, color: "#3DDC84", label: "Coroutines", status: "STABLE" },
    { icon: Database, initialX: -750, initialY: 150, targetX: -108, targetY: 60, color: "#4285F4", label: "Room Data", status: "CACHED" },
    { icon: Layout, initialX: 700, initialY: 350, targetX: -108, targetY: 140, color: "#0073E6", label: "UI Compose", status: "RENDERED" },
    { icon: Cloud, initialX: 0, initialY: 700, targetX: -108, targetY: 220, color: "#FFA000", label: "Firebase", status: "SYNCED" },
  ]

  const phoneScale = useTransform(smoothProgress, [0, 0.2, 0.8], [0.85, 1, 1])
  const phoneOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1])
  const listOpacity = useTransform(smoothProgress, [0.65, 0.85], [0, 1])

  return (
    <section ref={containerRef} className="relative h-[550vh] bg-[#020617] overflow-clip">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Space Depth */}
        <div className="absolute inset-0 z-0">
           <motion.div 
              style={{ opacity: useTransform(smoothProgress, [0, 1], [0.1, 0.4]) }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-sky-500/5 rounded-full blur-[200px]" 
           />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        </div>

        {/* Assembly Components Overlay */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          {items.map((item, i) => (
            <FloatingItem key={i} {...item} delay={i} scrollProgress={smoothProgress} />
          ))}
        </div>

        {/* High-Fidelity Master Mockup */}
        <motion.div 
          style={{ scale: phoneScale, opacity: phoneOpacity }}
          className="relative z-20 w-[320px] h-[650px] shrink-0"
        >
          {/* Hardware Chassis */}
          <div className="absolute inset-0 bg-slate-900 rounded-[4.2rem] p-2 shadow-[0_120px_250px_-50px_rgba(0,0,0,1)] border-[6px] border-white/5 ring-1 ring-white/10 overflow-hidden">
             
             {/* Glass Reflections */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-50 rounded-[3.8rem]" />
             <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-l from-white/[0.02] to-transparent -skew-x-12 pointer-events-none z-50" />

             {/* Dynamic Screen */}
             <div className="w-full h-full bg-[#050811] rounded-[3.5rem] overflow-hidden relative border border-white/10 z-10">
                
                {/* Status Bar Reveal */}
                <div className="pt-14 px-8 pb-8 flex items-end justify-between border-b border-white/[0.03]">
                   <div>
                       <div className="text-[#3DDC84] font-black text-[10px] uppercase tracking-[0.3em] mb-2 drop-shadow-glow">SYSTEM_SYNC</div>
                       <h3 className="text-white text-2xl font-black tracking-tight leading-none uppercase italic">Architect</h3>
                   </div>
                   <div className="flex gap-1.5 pb-1">
                       {[0, 1, 2].map(i => <div key={i} className="w-1 h-3.5 bg-white/10 rounded-full" />)}
                       <div className="w-6 h-3.5 bg-[#3DDC84] rounded-full" />
                   </div>
                </div>

                {/* The Timeline List (Matches FloatingItem placement perfectly) */}
                <motion.div style={{ opacity: listOpacity }} className="p-6 space-y-6">
                   {items.map((item, idx) => (
                      <div key={idx} className="flex gap-5 items-center">
                         {/* Circle slot (Target position for assembly) */}
                         <div className="w-11 h-11 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 relative">
                            {/* Inner Landing Glow */}
                            <motion.div 
                               initial={{ scale: 0, opacity: 0 }}
                               whileInView={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                               transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                               className="absolute inset-0 rounded-full bg-current opacity-20 blur-lg"
                               style={{ color: item.color }}
                            />
                            {/* The permanent icon inside */}
                            <item.icon size={18} style={{ color: item.color }} className="relative z-10" />
                         </div>

                         {/* Content Reveal */}
                         <div className="flex-1 space-y-1">
                            <div className="text-white/90 font-black text-[13px] tracking-tight uppercase">{item.label}</div>
                            <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                               <div className="text-white/20 font-bold text-[9px] tracking-widest uppercase">{item.status} MODULE</div>
                            </div>
                         </div>
                      </div>
                   ))}
                </motion.div>

                {/* Assembly Loading State (Fades out when list appears) */}
                <motion.div 
                   style={{ opacity: useTransform(smoothProgress, [0.1, 0.75], [1, 0]) }}
                   className="absolute bottom-24 inset-x-0 flex flex-col items-center justify-center p-12 text-center"
                >
                   <div className="flex gap-2.5 mb-8">
                       {[1, 2, 3].map(i => (
                           <motion.div
                               key={i}
                               animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                               transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                               className="w-3 h-3 rounded-full bg-[#3DDC84] shadow-[0_0_15px_#3DDC84]"
                           />
                       ))}
                   </div>
                   <div className="text-[10px] text-white/30 font-black tracking-[0.5em] uppercase leading-relaxed">
                       Collecting Disparate Modules...
                   </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/5 rounded-full ring-1 ring-white/5" />
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
