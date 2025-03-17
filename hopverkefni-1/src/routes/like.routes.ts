import { Hono } from 'hono';
import { likePost, unlikePost } from '../controllers/like.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const likeRouter = new Hono();

likeRouter.post('/posts/:postId', authMiddleware, likePost);
likeRouter.delete('/posts/:postId', authMiddleware, unlikePost);

export default likeRouter;