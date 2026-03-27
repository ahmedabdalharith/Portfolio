import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { login } from '../api/projects'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react'

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
    onError: () => toast.error('Invalid credentials'),
  })

  const onSubmit = (data) => mutation.mutate(data)

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary-800/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back link */}
        <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-8 transition">
          ← Back to Portfolio
        </a>

        <div className="glass-card p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-primary-400" />
            </div>
            <h1 className="text-2xl font-black text-white">Dashboard Login</h1>
            <p className="text-gray-500 text-sm mt-1">Admin access only</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-2">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="username"
                  type="text"
                  placeholder="admin"
                  autoComplete="username"
                  {...register('username', { required: 'Username is required' })}
                  className="input-field pl-10"
                />
              </div>
              {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password', { required: 'Password is required' })}
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              id="loginBtn"
              type="submit"
              disabled={mutation.isPending}
              className="btn-primary w-full justify-center mt-2"
            >
              {mutation.isPending ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            Default: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  )
}
