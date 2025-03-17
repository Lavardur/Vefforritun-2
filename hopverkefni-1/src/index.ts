import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import dotenv from 'dotenv';
import router from './routes/index.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = new Hono();

app.use('*', errorHandler); // Use the error handling middleware

app.route('/', router);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);