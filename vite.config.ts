import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 0.0.0.0 для удобства разработки, чтобы открывать приложение с другого устройства
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
