// vite.config.ts
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: path.resolve(__dirname, './src/main.ts'),
      exportName: 'default',
      tsCompiler: 'esbuild',
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
      output: {
        format: 'cjs',
      },
      external: [
        'express',
        'fs',
        'path',
        'http',
        'https',
      ],
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
  define: {
    'process.env': process.env,
  },
});
