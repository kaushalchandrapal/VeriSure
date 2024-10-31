// apps/verisure-server/src/main.ts
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// Export the app for Vercel serverless deployment
export default app;
