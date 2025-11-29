import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Shims process.env.API_KEY to allow the @google/genai SDK to work in the browser
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});