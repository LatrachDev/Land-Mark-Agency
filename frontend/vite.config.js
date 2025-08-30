import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    // Optimize for production using esbuild (faster)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['swiper', 'framer-motion'],
          utils: ['axios', 'react-helmet', 'react-router-dom']
        },
        // Ensure consistent asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Ensure assets are properly handled
    assetsDir: 'assets'
  },
  server: {
    // Development server optimizations
    hmr: {
      overlay: false
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios', 'swiper']
  },
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
  // Base configuration for proper asset paths
  base: '/'
})
