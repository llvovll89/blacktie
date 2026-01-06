import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    pages({ pagesDir: 'src/pages' }),
  ],
  base: '/blacktie/',
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['axios'],
  },
});
