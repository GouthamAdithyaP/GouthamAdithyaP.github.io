import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative, so the build works on GitHub Pages,
// Netlify, Vercel or any sub-folder without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2022', cssCodeSplit: false },
});
