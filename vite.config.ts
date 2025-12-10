import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/constants': path.resolve(__dirname, './src/constants'),
    },
  },
  server: {
    proxy: {
      '/api/roomalert': {
        target: 'https://account.roomalert.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/roomalert/, ''),
        secure: true,
      },
    },
  },
})