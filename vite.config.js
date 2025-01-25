import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/plumbing-rate-finder/',
    build: {
        sourcemap: true, // Ensure source maps are generated in production builds
    },
})
