import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  
  plugins: [react()],


  define: {
    global: 'globalThis',
  },
//  optimizeDeps: {
//    exclude: ['crypto'] // tarayıcı crypto’sunu dışla
//  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  }

})

