import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SQL-Quest/', // Matches https://mrl832.github.io/SQL-Quest/
});
