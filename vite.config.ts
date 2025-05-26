import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: '/patient-reg-app/',
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  server: {
    fs: {
      strict: false,
    },
    // no need for historyApiFallback here — Vite does this automatically
  },
});