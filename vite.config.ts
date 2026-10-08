import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteMcp } from 'vite-plugin-mcp';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteMcp({
      mcpRouteRoot: '/__mcp',
      printUrl: true,
      updateConfig: 'auto'
    })
  ],
  server: {
    port: 5173,
    open: false
  }
});
