import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Fullstack-Vehicle-Rental-Website/', // 👈 Use your actual repo name here
})
