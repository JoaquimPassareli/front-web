import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // tudo que começar com /pessoas em dev será redirecionado para o back-end
      '/pessoas': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
