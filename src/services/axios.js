import axios from 'axios'

const token = localStorage.getItem('user-token') || ''

export const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${token}`,
    'Cache- Control': 'no - cache',
  },
  timeout: 3000
})
