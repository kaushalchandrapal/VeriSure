// apps/verisure-server/vite.config.ts
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
      appPath: path.resolve(__dirname, 'src/main.ts'), // Simplify path for Vite
      exportName: 'default',
      tsCompiler: 'esbuild', // Faster TypeScript compilation
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
      output: {
        format: 'cjs', // CommonJS format for Node.js compatibility
      },
      external: ['express', 'fs', 'path', 'http', 'https'], // Exclude Node.js modules
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env, // Make environment variables accessible
  },
});
