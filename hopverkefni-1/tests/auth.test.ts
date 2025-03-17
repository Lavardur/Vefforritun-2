import request from 'supertest';
import { serve } from '@hono/node-server';
import type { Server } from 'node:http';
import app from '../src/index.js'; // Note the .js extension

// Use the correct type for the server
// The serve function from @hono/node-server returns a different server type
let server: ReturnType<typeof serve>;
let token: string;

beforeAll((done) => {
  server = serve({
    fetch: app.fetch,
    port: 3001
  });
  done();
});

afterAll((done) => {
  server.close();
  done();
});

describe('Auth Controller', () => {
  // Generate a unique username to avoid conflicts
  const uniqueUsername = `testuser_${Date.now()}`;

  it('should register a new user', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        username: uniqueUsername,
        password: 'Pass123!'
      });
    
    // Adjust status code based on your actual API
    expect(response.status).toBe(200);
  });

  it('should login a user', async () => {
    const response = await request(server)
      .post('/login')
      .send({
        username: 'admin', // Use a user that exists in the database
        password: 'Pass123!'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    
    token = response.body.token;
  });

  it('should reject invalid credentials', async () => {
    const response = await request(server)
      .post('/login')
      .send({
        username: 'admin',
        password: 'wrongpassword'
      });
    
    // Adjust status code based on your actual API
    expect(response.status).toBe(400);
  });
});