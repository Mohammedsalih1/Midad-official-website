import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const configuredPort = Number(process.env.PORT || 5173);
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: configuredPort,
    strictPort: Boolean(process.env.PORT),
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: configuredPort,
    allowedHosts: true,
  },
});
