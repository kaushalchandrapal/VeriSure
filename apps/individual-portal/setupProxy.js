const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    logLevel: 'debug'
  })
);

app.listen(4201, () => {
  console.log('Proxy test server running on http://localhost:4201');
});
