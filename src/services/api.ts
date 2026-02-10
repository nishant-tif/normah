import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            // Optionally redirect to login
          }
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
        default:
          console.error('An error occurred')
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received')
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export { api }
