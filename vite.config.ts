import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Large diagram libraries
          'mermaid': ['mermaid'],
          'viz': ['@viz-js/viz'],
          // Other diagram tools
          'diagram-tools': ['wavedrom', 'railroad-diagrams'],
        },
      },
    },
    // Increase chunk size warning limit for diagram libraries
    chunkSizeWarningLimit: 1000,
  },
})
