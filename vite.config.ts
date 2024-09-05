import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reqTab: resolve(__dirname, 'reqTab.html'),
      },
    },
    // outDir: './public/vite',
    emptyOutDir: false,
  },
  plugins: [react()],
});
