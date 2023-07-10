import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 8080,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/page/index.jsx"),
      name: "PageBuilder",
    },
    target: "esnext",
    outDir: "dist",
    sourcemap: true,
  }
})
