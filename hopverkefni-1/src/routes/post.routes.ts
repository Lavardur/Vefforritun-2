import { Hono } from 'hono';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const postRouter = new Hono();

postRouter.post('/posts', authMiddleware, createPost);
postRouter.get('/posts', getPosts);
postRouter.get('/posts/:id', getPostById);
postRouter.put('/posts/:id', authMiddleware, updatePost);
postRouter.delete('/posts/:id', authMiddleware, deletePost);

export default postRouter;