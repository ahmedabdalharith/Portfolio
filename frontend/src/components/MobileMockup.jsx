import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/projects'
import { 
  Wifi, Battery, Signal, Plus, Home, Search, Calendar, User, 
  TrendingUp, Cpu, Layout, CheckCircle2, 
  MessageSquare, Code2, Rocket, Briefcase,
  Star, Trophy, Award, Globe, Github, Linkedin, Mail, Building,
  X, ExternalLink, Plane, Music, Scissors, ShoppingBag, Loader2,
  Zap, Bell, Settings, Share2, Layers, Binary
} from 'lucide-react'

// --- Timeline Screen (Workflow) ---
const TimelineScreen = ({ onTaskClick }) => {
  const [completedIdx, setCompletedIdx] = useState(-1)
  useEffect(() => {
    const timers = [
       setTimeout(() => setCompletedIdx(0), 1000),
       setTimeout(() => setCompletedIdx(1), 2200),
       setTimeout(() => setCompletedIdx(2), 3400)
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col pt-1.5 px-3.5 bg-[#0f172a]">
      <div className="mb-3">
        <div className="text-[6.5px] font-black text-slate-500 uppercase tracking-[0.25em] mb-0.5">Friday, March 27</div>
        <div className="text-base font-black text-white tracking-tighter">Daily <span className="text-[#3DDC84]">Workflow</span></div>
      </div>
      <div className="flex justify-between mb-4 px-0.5">
        {[24, 25, 26, 27, 28, 29, 30].map((day, i) => (
          <div key={day} className={`flex flex-col items-center gap-0.5 p-1 rounded-lg min-w-[28px] ${day === 27 ? 'bg-[#3DDC84] text-slate-950 shadow-sm shadow-[#3DDC84]/30' : 'text-slate-600'}`}>
            <span className="text-[6px] font-black uppercase">{['M','T','W','T','F','S','S'][i]}</span>
            <span className="text-[9px] font-black">{day}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto pr-0.5 custom-scrollbar">
        {[
          { time: '09:00', title: 'Daily Standup', icon: <MessageSquare size={8} />, type: 'Meeting', color: 'bg-blue-500/10 text-blue-400' },
          { time: '10:30', title: 'Compose UI Fixes', icon: <Layout size={8} />, type: 'Coding', color: 'bg-[#3DDC84]/20 text-[#3DDC84]' },
          { time: '13:00', title: 'Architecture Review', icon: <Cpu size={8} />, type: 'Design', color: 'bg-purple-500/10 text-purple-400' },
          { time: '15:30', title: 'Ktor API Integration', icon: <Code2 size={8} />, type: 'Backend', color: 'bg-orange-500/10 text-orange-400' },
          { time: '17:00', title: 'App Store Deploy', icon: <Rocket size={8} />, type: 'DevOps', color: 'bg-pink-500/10 text-pink-400' },
        ].map((task, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-2.5 items-start relative overflow-hidden cursor-pointer group"
            onClick={() => onTaskClick(task)}
          >
            <div className={`text-[7px] font-black pt-2.5 w-6 text-right transition-colors duration-500 ${i <= completedIdx ? 'text-slate-500' : 'text-slate-700'}`}>{task.time}</div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex-1 bg-slate-800/50 border border-white/5 rounded-xl p-2.5 flex items-center gap-2.5 z-10">
              <div className={`w-7 h-7 rounded-lg ${task.color} flex items-center justify-center shrink-0 group-hover:bg-[#3DDC84] group-hover:text-slate-950 transition-colors`}>
                {task.icon}
              </div>
              <div className="flex-1 min-w-0">
                 <div className={`font-black text-[10px] leading-tight mb-0.5 truncate transition-colors ${i <= completedIdx ? 'text-slate-500 line-through' : 'text-white'}`}>{task.title}</div>
                 <div className="text-[7px] font-black text-slate-500 uppercase">{task.type}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// --- Projects Screen (Apps) ---
const ProjectsScreen = ({ onProjectClick }) => {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const getCategoryIcon = (category) => {
    const cat = category?.toLowerCase() || ''
    if (cat.includes('finance') || cat.includes('bank')) return <TrendingUp size={10}/>
    if (cat.includes('travel') || cat.includes('trip')) return <Plane size={10}/>
    if (cat.includes('ride') || cat.includes('delivery')) return <Rocket size={10}/>
    if (cat.includes('soccer') || cat.includes('live')) return <Globe size={10}/>
    if (cat.includes('salon') || cat.includes('style')) return <Scissors size={10}/>
    if (cat.includes('estate') || cat.includes('home')) return <Building size={10}/>
    return <Briefcase size={10}/>
  }

  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase() || ''
    if (cat.includes('finance')) return 'bg-[#3DDC84]'
    if (cat.includes('travel')) return 'bg-blue-500'
    if (cat.includes('ride')) return 'bg-pink-500'
    if (cat.includes('soccer')) return 'bg-orange-500'
    if (cat.includes('salon')) return 'bg-purple-500'
    if (cat.includes('estate')) return 'bg-indigo-500'
    return 'bg-slate-600'
  }

  if (isLoading) return (
    <div className="h-full flex items-center justify-center bg-[#0f172a]">
      <Loader2 className="text-[#3DDC84] animate-spin" size={24} />
    </div>
  )

  if (isError || !projects || projects.length === 0) return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0f172a] px-8 text-center">
       <div className="text-[#3DDC84] mb-4 opacity-20"><Plus size={40}/></div>
       <div className="text-slate-500 font-black text-[10px] uppercase tracking-widest">No Projects Found</div>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col pt-1.5 px-3.5 bg-[#0f172a]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-black text-white tracking-tighter">My <span className="text-[#3DDC84]">Apps</span></h3>
        <div className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-slate-600"><Search size={8}/></div>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto pr-0.5 custom-scrollbar pb-4">
        {projects.map((p, i) => {
          const color = getCategoryColor(p.category)
          const icon = getCategoryIcon(p.category)
          return (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/80 border border-white/5 shadow-sm rounded-2xl p-3 hover:border-[#3DDC84]/30 active:scale-95 transition-all cursor-pointer group"
              onClick={() => onProjectClick({
                ...p, 
                name: p.title, 
                desc: p.category || 'Android Project',
                longDesc: p.description, 
                tech: p.techStack ? p.techStack.split(',').map(t => t.trim()) : [],
                color,
                icon,
                playUrl: p.playStoreUrl
              })}
            >
               <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2.5 items-center">
                     <div className={`w-7 h-7 rounded-lg ${color}/10 text-white flex items-center justify-center transition-all group-hover:${color} group-hover:text-slate-950`}>
                        {icon}
                     </div>
                     <div>
                        <div className="font-black text-white text-[10px] leading-tight group-hover:text-[#3DDC84] transition-colors line-clamp-1">{p.title.split('—')[0].split('-')[0].trim()}</div>
                        <div className="text-[7.5px] font-bold text-slate-500 line-clamp-1">{p.category || 'Production App'}</div>
                     </div>
                  </div>
                  <div className="text-[6px] font-black text-[#3DDC84] bg-[#3DDC84]/10 px-1.5 py-0.5 rounded-sm shrink-0">LIVE</div>
               </div>
               <div className="flex justify-between items-center mb-1.5">
                  <div className="flex gap-2.5 text-[7px] font-black text-slate-500 uppercase">
                     <span className="flex items-center gap-1"><User size={7}/> {p.downloads || '1K+'}</span>
                     <span className="flex items-center gap-1 text-orange-400"><Star size={7}/> {p.rating || '4.8'}</span>
                  </div>
                  <div className="text-[7px] font-black text-[#3DDC84]">100%</div>
               </div>
               <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className={`h-full ${color}`} />
               </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// --- Stats Screen ---
const StatsScreen = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col pt-1.5 px-3.5 bg-[#0f172a]">
       <div className="mb-3">
        <div className="text-[6.5px] font-black text-slate-500 uppercase tracking-[0.25em] mb-0.5">Performance Metrics</div>
        <div className="text-base font-black text-white tracking-tighter">System <span className="text-[#3DDC84]">Health</span></div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#3DDC84] rounded-2xl p-3 text-slate-950 shadow-lg shadow-[#3DDC84]/20">
             <div className="flex justify-between items-center mb-1.5"><TrendingUp size={10} /><div className="text-[6px] font-black bg-slate-950/20 px-1 py-0.5 rounded">UP</div></div>
             <div className="text-[7px] font-bold opacity-70 mb-0.5 uppercase">Crash-free</div>
             <div className="text-lg font-black tracking-tighter leading-none">99.9%</div>
          </motion.div>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="bg-slate-800/80 border border-white/5 rounded-2xl p-3 shadow-sm">
             <div className="flex justify-between items-center mb-1.5"><Cpu size={10} className="text-[#3DDC84]" /></div>
             <div className="text-[7px] font-bold text-slate-500 mb-0.5 uppercase">Rendering</div>
             <div className="text-lg font-black text-white tracking-tighter leading-none">120fps</div>
          </motion.div>
      </div>
      <div className="bg-slate-800/40 border border-white/5 rounded-[1.5rem] p-4 flex-1 mb-2">
         <div className="font-black text-white tracking-tight text-[9px] uppercase mb-4">Core stack performance</div>
         <div className="space-y-3.5">
            {[
              { label: 'Kotlin Coroutines', val: 98 },
              { label: 'Jetpack Compose', val: 95 },
              { label: 'Clean Arch Patterns', val: 92 },
              { label: 'Dependency Injection', val: 90 },
            ].map((s) => (
              <div key={s.label}>
                 <div className="flex justify-between text-[8px] font-black text-slate-400 mb-1 leading-none"><span>{s.label}</span><span>{s.val}%</span></div>
                 <div className="h-0.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} className="h-full bg-[#3DDC84]" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </motion.div>
)

// --- Me Screen ---
const MeScreen = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col pt-1.5 px-3.5 bg-[#0f172a] overflow-hidden">
       <div className="flex flex-col items-center pt-2 mb-4 relative">
          <div className="w-14 h-14 rounded-full border-2 border-[#3DDC84] p-1 mb-2">
             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-[#3DDC84]">
                <User size={24} />
             </div>
          </div>
          <div className="text-center">
             <div className="text-xs font-black text-white tracking-tight">Ahmed Abdalharith</div>
             <div className="text-[7px] font-black text-[#3DDC84] uppercase tracking-widest">Android Developer</div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-800/50 border border-white/5 rounded-xl p-2 flex flex-col justify-center">
             <div className="text-[6px] font-black text-slate-500 uppercase mb-0.5">Experience</div>
             <div className="text-[10px] font-black text-white">3+ Years</div>
          </div>
          <div className="bg-slate-800/50 border border-white/5 rounded-xl p-2 flex flex-col justify-center">
             <div className="text-[6px] font-black text-slate-500 uppercase mb-0.5">Projects</div>
             <div className="text-[10px] font-black text-white">7+ Production</div>
          </div>
       </div>

       <div className="flex-1 space-y-3 overflow-y-auto pr-0.5 custom-scrollbar pb-4">
          <div>
            <div className="text-[7px] font-black text-slate-500 uppercase px-1 mb-1.5 flex items-center gap-1.5">
               <Binary size={8} /> Technical Arsenal
            </div>
            <div className="grid grid-cols-2 gap-1.5">
               {[
                 { label: 'Kotlin', icon: <Code2 size={8} /> },
                 { label: 'Java', icon: <Binary size={8} /> },
                 { label: 'Compose', icon: <Layout size={8} /> },
                 { label: 'KMP/CMP', icon: <Layers size={8} /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-1.5 p-1.5 bg-slate-800/30 rounded-lg border border-white/5">
                    <div className="text-[#3DDC84]">{item.icon}</div>
                    <div className="text-[8px] font-bold text-slate-300">{item.label}</div>
                 </div>
               ))}
            </div>
          </div>

          <div>
            <div className="text-[7px] font-black text-slate-500 uppercase px-1 mb-1.5 flex items-center gap-1.5">
               <Globe size={8} /> Domain Expertise
            </div>
            <div className="space-y-1.5">
               {[
                 { label: 'Fintech / Banking', icon: <TrendingUp size={9} /> },
                 { label: 'Logistics / Ride-hailing', icon: <Rocket size={9} /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 p-1.5 bg-slate-800/30 rounded-lg border border-white/5">
                    <div className="text-[#3DDC84]">{item.icon}</div>
                    <div className="text-[8px] font-bold text-slate-300">{item.label}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="pt-1">
             <div className="text-[7px] font-black text-slate-500 uppercase px-1 mb-1.5">Connect</div>
             <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"><Mail size={12}/></motion.div>
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-[#0077B5] transition-colors cursor-pointer"><Linkedin size={12}/></motion.div>
                <motion.div whileHover={{ scale: 1.1, y: -2 }} className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"><Github size={12}/></motion.div>
             </div>
          </div>
       </div>
    </motion.div>
)

export default function MobileMockup() {
  const [screen, setScreen] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [progress, setProgress] = useState(0)
  const autoCycleDuration = 7000
  const progressInterval = 100

  useEffect(() => {
    if (isHovered || selectedProject || showQuickActions) {
      setProgress(0)
      return
    }
    
    const cycleTimer = setInterval(() => {
      setScreen((prev) => (prev + 1) % 4)
      setProgress(0)
    }, autoCycleDuration)

    const progressTimer = setInterval(() => {
      setProgress(prev => Math.min(prev + (progressInterval / autoCycleDuration) * 100, 100))
    }, progressInterval)

    return () => {
      clearInterval(cycleTimer)
      clearInterval(progressTimer)
    }
  }, [isHovered, selectedProject, showQuickActions])

  const openPlayStore = (url) => {
    if (url) window.open(url, '_blank')
  }

  return (
    <div 
      className="relative w-[280px] h-[580px] group transition-all duration-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-[#0f172a] rounded-[3rem] border-[4px] border-slate-800 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden p-[2px] transform transition-transform group-hover:scale-[1.02] active:scale-[0.98] isolation-auto z-0 transform-gpu">
        <div className="w-full h-full bg-[#0f172a] rounded-[2.85rem] overflow-hidden relative flex flex-col isolation-auto z-0 transform translate-z-0">
          
          {/* Status Bar & Progress Indicators */}
          <div className="absolute top-0 left-0 right-0 h-6 z-[100] px-6 pt-1.5 flex gap-1 justify-center">
             {[0,1,2,3].map((i) => (
                <div key={i} className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: screen === i ? `${progress}%` : (screen > i ? "100%" : "0%") }}
                     className="h-full bg-[#3DDC84]"
                   />
                </div>
             ))}
          </div>

          <div className="h-8 w-full flex justify-between items-center px-7 pt-3 text-[8px] font-black text-slate-600 z-10">
            <span>9:41</span>
            <div className="flex items-center gap-1.5"><Signal size={8} /><Wifi size={8} /><Battery size={9} /></div>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {screen === 0 && <TimelineScreen key="timeline" onTaskClick={(t) => setSelectedProject({...t, name: t.title, longDesc: 'Daily task focused on ' + t.title})} />}
              {screen === 1 && <ProjectsScreen key="projects" onProjectClick={setSelectedProject} />}
              {screen === 2 && <StatsScreen key="stats" />}
              {screen === 3 && <MeScreen key="me" />}
            </AnimatePresence>

            {/* Quick Actions Overlay */}
            <AnimatePresence>
               {showQuickActions && (
                 <>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-[80]" onClick={() => setShowQuickActions(false)} />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 z-[90]">
                      <div className="grid grid-cols-2 gap-3">
                         {[
                           { label: 'Fast Deploy', icon: <Rocket size={14}/>, color: 'bg-orange-500' },
                           { label: 'Security Scan', icon: <Zap size={14}/>, color: 'bg-[#3DDC84]' },
                           { label: 'System Alert', icon: <Bell size={14}/>, color: 'bg-blue-500' },
                           { label: 'Preferences', icon: <Settings size={14}/>, color: 'bg-purple-500' }
                         ].map((action, i) => (
                           <motion.button 
                             key={i}
                             initial={{ scale: 0.8, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             transition={{ delay: i * 0.05 }}
                             className="flex flex-col items-center gap-2 p-4 bg-slate-900 border border-white/10 rounded-[2rem] hover:border-[#3DDC84]/50 transition-all"
                           >
                              <div className={`w-10 h-10 rounded-2xl ${action.color} flex items-center justify-center text-slate-950 shadow-lg`}>{action.icon}</div>
                              <span className="text-[8px] font-black text-white uppercase tracking-tighter">{action.label}</span>
                           </motion.button>
                         ))}
                      </div>
                      <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setShowQuickActions(false)}
                        className="w-full mt-6 py-3 bg-slate-800 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/5"
                      >
                         Dismiss
                      </motion.button>
                   </div>
                 </>
               )}
            </AnimatePresence>

            {/* Bottom Sheet */}
            <AnimatePresence>
              {selectedProject && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-[110]"
                    onClick={() => setSelectedProject(null)}
                  />
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 rounded-t-[2.5rem] z-[120] p-6 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                  >
                    <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-6" />
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex gap-3 items-center">
                          <div className={`w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center overflow-hidden border border-white/5`}>
                             {selectedProject.iconUrl ? (
                               <img src={selectedProject.iconUrl} alt="" className="w-full h-full object-cover" />
                             ) : (
                               selectedProject.icon || <Briefcase size={16}/>
                             )}
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="font-black text-white text-sm leading-tight truncate">{selectedProject.name || selectedProject.title}</div>
                             <div className="text-[10px] font-bold text-slate-500 uppercase truncate">{selectedProject.desc || selectedProject.category}</div>
                          </div>
                       </div>
                       <button onClick={() => setSelectedProject(null)} className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                         <X size={14} />
                       </button>
                    </div>

                    <div className="text-[11px] text-slate-400 font-bold leading-relaxed mb-6 line-clamp-4">
                      {selectedProject.longDesc || selectedProject.description}
                    </div>

                    {selectedProject.tech && selectedProject.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                         {selectedProject.tech.slice(0, 4).map(t => (
                           <span key={t} className="text-[8px] font-black text-slate-100 bg-slate-800 px-2.5 py-1 rounded-full border border-white/5 uppercase">{t}</span>
                         ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                       <button 
                         onClick={() => openPlayStore(selectedProject.playStoreUrl || selectedProject.playUrl)}
                         className="flex-1 bg-[#3DDC84] py-3.5 rounded-2xl text-slate-950 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                         disabled={!(selectedProject.playStoreUrl || selectedProject.playUrl)}
                       >
                          Open Store <ShoppingBag size={12}/>
                       </button>
                       <button className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-slate-700 transition-colors">
                          <Share2 size={16}/>
                       </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Nav */}
          <div className="h-16 bg-slate-900/80 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-2 pb-2.5 relative">
             <button onClick={() => setScreen(0)} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${screen === 0 ? 'text-[#3DDC84] scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                <Home size={14} strokeWidth={screen === 0 ? 3 : 2} />
                <span className="text-[6px] font-black uppercase">Today</span>
             </button>
             <button onClick={() => setScreen(1)} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${screen === 1 ? 'text-[#3DDC84] scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                <Search size={14} strokeWidth={screen === 1 ? 3 : 2} />
                <span className="text-[6px] font-black uppercase">Apps</span>
             </button>
             <button 
                onClick={() => setShowQuickActions(true)}
                className={`w-10 h-10 bg-[#3DDC84] rounded-[1rem] -mt-6 flex items-center justify-center text-slate-950 border-[3px] border-[#0f172a] shadow-lg shadow-[#3DDC84]/20 hover:scale-110 active:scale-90 transition-all z-10 ${showQuickActions ? 'rotate-45' : ''}`}
             >
                <Plus size={16} strokeWidth={3} />
             </button>
             <button onClick={() => setScreen(2)} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${screen === 2 ? 'text-[#3DDC84] scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                <TrendingUp size={14} strokeWidth={screen === 2 ? 3 : 2} />
                <span className="text-[6px] font-black uppercase">Growth</span>
             </button>
             <button onClick={() => setScreen(3)} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${screen === 3 ? 'text-[#3DDC84] scale-110' : 'text-slate-600 hover:text-slate-400'}`}>
                <User size={14} strokeWidth={screen === 3 ? 3 : 2} />
                <span className="text-[6px] font-black uppercase">Me</span>
             </button>
          </div>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-slate-800 rounded-full" />
        </div>
      </div>

      {/* Floating Interactive Elements */}
      <motion.div whileHover={{ scale: 1.1, x: 10 }} animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-8 top-[15%] bg-slate-800/90 backdrop-blur-xl shadow-2xl px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3 cursor-pointer group/tag z-50">
        <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover/tag:bg-orange-500 group-hover/tag:text-white transition-all"><Layers size={12}/></div>
        <div className="text-[8px] font-black text-white tracking-tight uppercase">Clean Architecture</div>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1, x: -10 }} animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-8 top-[40%] bg-slate-800/90 backdrop-blur-xl shadow-2xl px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3 cursor-pointer group/tag z-50">
        <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover/tag:bg-blue-500 group-hover/tag:text-white transition-all"><Layout size={12}/></div>
        <div className="text-[8px] font-black text-white tracking-tight uppercase">Modern UI</div>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1, x: 10 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -right-8 top-[65%] bg-slate-800/90 backdrop-blur-xl shadow-2xl px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3 cursor-pointer group/tag z-50">
        <div className="w-6 h-6 rounded-lg bg-[#3DDC84]/20 text-[#3DDC84] flex items-center justify-center group-hover/tag:bg-[#3DDC84] group-hover/tag:text-slate-950 transition-all"><Zap size={12}/></div>
        <div className="text-[8px] font-black text-white tracking-tight uppercase">Jetpack Compose</div>
      </motion.div>
    </div>
  )
}
