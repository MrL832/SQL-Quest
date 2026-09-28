import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SQL-Quest/', // Matches https://mrl832.github.io/SQL-Quest/
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/app.css';
          }

          if (assetInfo.name?.endsWith('.wasm')) {
            return 'assets/sql-wasm.wasm';
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },
});
