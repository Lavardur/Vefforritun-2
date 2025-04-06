import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import dotenv from 'dotenv';
import router from './routes/index.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const PORT = process.env.PORT ?? '8000';
const port = Number.parseInt(PORT, 10);

dotenv.config();

const app = new Hono();
app.use(logger());
app.use(prettyJSON());
app.use('/*', cors({ origin: '*' }));
app.use('*', errorHandler); // Use the error handling middleware
app.notFound((c) => c.json({ message: 'not found' }, 404));
app.onError((err, c) => {
  console.error(err.name, err.message);

  if (err.message === 'Malformed JSON in request body') {
    return c.json({ message: 'invalid json' }, 400);
  }

  return c.json({ message: 'internal server error' }, 500);
});

app.route('/', router);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

// Export the app for testing
export default app;