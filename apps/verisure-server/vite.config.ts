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
      // Use the Express adapter
      adapter: 'express',
      appPath: path.resolve(__dirname, './src/main.ts'),
      exportName: 'default',
      tsCompiler: 'esbuild', // Using esbuild for faster TypeScript compilation
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      // Set the entry point for the Node server
      input: path.resolve(__dirname, 'src/main.ts'),
      output: {
        format: 'cjs', // CommonJS format for Node.js compatibility
      },
      external: [
        'express', // Keep express as an external dependency for backend builds
        'fs', // Exclude native Node.js modules from bundling
        'path',
        'http',
        'https',
        // Add any additional dependencies as needed
      ],
    },
  },
  server: {
    port: 3000, // Use a specific port
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env, // Make environment variables accessible in Vite
  },
});
