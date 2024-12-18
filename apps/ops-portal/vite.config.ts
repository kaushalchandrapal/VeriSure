/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/ops-portal',

  server: {
    proxy: {
      '/api/auth': {
        target: 'https://verisure-server.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, '/api/auth'),
      },
      '/api/user': {
        target: 'https://verisure-server.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/user/, '/api/user'),
      },
      '/api/aws': {
        target: 'https://verisure-server.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/aws/, '/api/aws'),
      },
      '/api/role': {
        target: 'https://verisure-server.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/role/, '/api/role'),
      },
      '/api/kyc': {
        target: 'https://verisure-server.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kyc/, '/api/kyc'),
      },
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
