import request from 'supertest';
import { Hono } from 'hono';
import { createServer } from 'http';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../src/controllers/post.controller.js';
import { errorHandler } from '../src/middleware/error.middleware.js';
import { honoAdapter } from '../src/utils/honoAdapter.js';

const app = new Hono();

app.use('*', errorHandler);

app.post('/posts', createPost);
app.get('/posts', getPosts);
app.get('/posts/:id', getPostById);
app.put('/posts/:id', updatePost);
app.delete('/posts/:id', deletePost);

let server: import('http').Server;

beforeAll((done) => {
  server = createServer(honoAdapter(app));
  server.listen(3001, () => {
    console.log('Test server is running on http://localhost:3001');
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('Post Controller', () => {
  it('should create a new post', async () => {
    const response = await request(server)
      .post('/posts')
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        categoryIds: [1],
        tagIds: [1],
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post created successfully');
  });

  it('should get all posts', async () => {
    const response = await request(server).get('/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a post by ID', async () => {
    const response = await request(server).get('/posts/1');
    if (response.status === 404) {
      expect(response.body.message).toBe('Post not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    }
  });

  it('should update a post', async () => {
    const response = await request(server)
      .put('/posts/1')
      .send({
        title: 'Updated Test Post',
        content: 'This is an updated test post',
        categoryIds: [1],
        tagIds: [1],
      });
    if (response.status === 404) {
      expect(response.body.message).toBe('Post not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Post updated successfully');
    }
  });

  it('should delete a post', async () => {
    const response = await request(server).delete('/posts/1');
    if (response.status === 404) {
      expect(response.body.message).toBe('Post not found');
    } else {
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Post deleted successfully');
    }
  });
});