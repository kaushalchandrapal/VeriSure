// apps/my-app/vite.config.js
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: './src/main.ts',
      exportName: 'default',
    }),
  ],
  server: {
    port: 3000,
  },
});
