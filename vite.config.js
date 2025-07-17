import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-analyzer.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "src",
        replacement: "/src",
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Material-UI components
          mui: ['@mui/material', '@mui/system', '@mui/lab', '@mui/x-date-pickers'],
          // Animation and media libraries
          animation: ['framer-motion', 'react-player', 'react-lazy-load-image-component'],
          // Form and validation libraries
          forms: ['react-hook-form', 'yup'],
          // Utility libraries
          utils: ['lodash.isequal', 'lodash.merge', 'date-fns'],
          // Iconify and carousel
          icons: ['@iconify/react', 'slick-carousel'],
          // Google Maps
          maps: ['google-map-react'],
          // Lightbox and image handling
          lightbox: ['yet-another-react-lightbox'],
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Optimize dependencies
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});
