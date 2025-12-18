import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths so it works on both username.github.io/ and username.github.io/repo-name/
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  }
});