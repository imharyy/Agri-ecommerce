import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@context': path.resolve(fileURLToPath(new URL('./src/context', import.meta.url))),
      '@components': path.resolve(fileURLToPath(new URL('./src/components', import.meta.url))),
    },
  },
})
