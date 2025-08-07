import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite'; // Import UnoCSS plugin

export default defineConfig({
  plugins: [
    react(),
    Unocss(), // Enable UnoCSS
  ],

  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Keep your backend proxy
    },
  },
});
