import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Ganti "belajar-bareng" sesuai nama repo GitHub kamu
export default defineConfig({
  plugins: [react()],
  base: '/belajar-bareng/',
})
