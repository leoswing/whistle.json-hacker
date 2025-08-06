import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        reqTab: resolve(__dirname, 'src/reqTab.html'),
      },
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
  },
  plugins: [react()],
});
