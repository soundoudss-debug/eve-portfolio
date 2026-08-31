import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/*.mp4',
        '**/*.mov',
        '**/*.avi',
        '**/*.mkv',
        '**/*.webm',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.png',
        '**/*.gif',
        '**/*.webp',
      ],
    },
  },
})
