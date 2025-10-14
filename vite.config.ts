/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/4.2.3_Aleksandr_Volkov/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
