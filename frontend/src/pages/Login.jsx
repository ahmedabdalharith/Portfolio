import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { login } from '../api/projects'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast.success('Welcome back, Ahmed!')
      navigate('/dashboard')
    },
    onError: () => toast.error('البيانات غير صحيحة'),
  })

  const onSubmit = (data) => mutation.mutate(data)

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#3DDC84]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#3DDC84]/5 rounded-full blur-[100px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#3DDC84] text-sm mb-8 transition-colors group font-bold"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </button>

        <div className="glass-card p-10 md:p-12">
          {/* Brand Icon */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-950 border border-white/5 shadow-2xl flex items-center justify-center mx-auto mb-6 relative group">
              <div className="absolute inset-0 bg-[#3DDC84]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <Lock size={32} className="text-[#3DDC84] relative z-10" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">System Login</h1>
            <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">Administrative Access Only</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Username</label>
              <div className="relative group">
                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#3DDC84] transition-colors" />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  {...register('username', { required: 'Username is required' })}
                  className="input-field pl-14 bg-slate-950/50"
                />
              </div>
              {errors.username && <p className="text-red-400 text-[11px] mt-1 font-bold ml-1">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#3DDC84] transition-colors" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password', { required: 'Password is required' })}
                  className="input-field pl-14 pr-14 bg-slate-950/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-[11px] mt-1 font-bold ml-1">{errors.password.message}</p>}
            </div>

            <button
              id="loginBtn"
              type="submit"
              disabled={mutation.isPending}
              className="btn-primary w-full justify-center mt-4 group overflow-hidden"
            >
              {mutation.isPending ? (
                <span className="w-5 h-5 border-[3px] border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  Sign In 
                  <LogIn size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
