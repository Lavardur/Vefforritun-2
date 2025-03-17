import { Hono } from 'hono';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const postRouter = new Hono();

postRouter.post('/', authMiddleware, createPost);
postRouter.get('/', getPosts);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', authMiddleware, updatePost);
postRouter.delete('/:id', authMiddleware, deletePost);

export default postRouter;