import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [react()],

    // Strip debug code in production only (smaller JS, less runtime work)
    esbuild: isProd
      ? {
          drop: ['console', 'debugger'],
          legalComments: 'none',
        }
      : undefined,

    // Build optimizations for performance and compression
    build: {
      // Enable minification (esbuild is faster and included by default)
      minify: 'esbuild',

      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
            'emailjs': ['@emailjs/browser'],
          },
          // Optimize chunk file names
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            // Optimize asset file names and organization
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `images/[name]-[hash][extname]`
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `fonts/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
        },
      },

      // Increase chunk size warning limit (for better code splitting)
      chunkSizeWarningLimit: 1000,

      // Keep off for smaller builds (and avoids shipping source)
      sourcemap: false,

      // Optimize CSS
      cssCodeSplit: true,
      cssMinify: true,
    },

    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
      exclude: [],
    },

    // Server optimizations (for dev)
    server: {
      http2: true,
    },
  }
})