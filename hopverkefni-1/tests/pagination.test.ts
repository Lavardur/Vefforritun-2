import request from 'supertest';
import { serve } from '@hono/node-server';
import app from '../src/index.js'; // Add .js extension

// Use the correct type for the server
let server: ReturnType<typeof serve>;

beforeAll((done) => {
  server = serve({
    fetch: app.fetch,
    port: 3002
  });
  done();
});

afterAll((done) => {
  server.close();
  done();
});

describe('Pagination', () => {
  it('should return paginated posts', async () => {
    const response = await request(server).get('/posts?page=1&limit=5');
    
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeLessThanOrEqual(5);
    expect(response.body.pagination).toBeDefined();
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(5);
  });

  it('should handle page parameter correctly', async () => {
    const response1 = await request(server).get('/posts?page=1&limit=2');
    const response2 = await request(server).get('/posts?page=2&limit=2');
    
    expect(response1.body.data[0].id).not.toBe(response2.body.data[0].id);
  });
});