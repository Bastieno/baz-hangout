import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 5000
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token') || ''

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
}, err => Promise.reject(err))

export default axiosInstance
