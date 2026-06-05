// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["highcharts"],
  },
  optimizeDeps: {
    include: [
      "highcharts",
      "highcharts/modules/map",
      "highcharts/modules/accessibility",
    ],
  },
})