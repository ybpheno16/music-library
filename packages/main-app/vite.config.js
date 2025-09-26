import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main_app',
      remotes: {
        musicLibrary: {
          external: `Promise.resolve(window.location.origin + '/music-library/assets/remoteEntry.js')`,
          format: 'esm',
          from: 'vite'
        }
      },
      shared: {
        'react': { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5000,
    cors: true
  },
  preview: {
    port: 5000,
    cors: true
  }
})
