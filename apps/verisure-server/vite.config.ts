import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import path from 'path';

export default defineConfig({
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: path.resolve(__dirname, './src/main.ts'),
      exportName: 'default',
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
