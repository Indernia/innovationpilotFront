import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: '../my-app',
  plugins: [react()],
  server: {
    host: true, // allow access from other devices/OS (e.g. Windows browser while Vite runs in WSL)
    watch: {
      usePolling: true, // needed when editing files on mounted Windows drives
      interval: 100, // tighten polling to keep refreshes snappy
    },
  },
})