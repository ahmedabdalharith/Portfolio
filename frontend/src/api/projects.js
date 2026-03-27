import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Projects ───────────────────────────────────────────────
export const getProjects = () => api.get('/projects').then(r => r.data)

export const createProject = (data) => api.post('/projects', data).then(r => r.data)

export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then(r => r.data)

export const deleteProject = (id) => api.delete(`/projects/${id}`)

// ─── Auth ────────────────────────────────────────────────────
export const login = (credentials) => api.post('/auth/login', credentials).then(r => r.data)

export default api
