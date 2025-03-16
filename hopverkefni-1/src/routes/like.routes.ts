import { Hono } from 'hono';
import { likePost, unlikePost } from '../controllers/like.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const likeRouter = new Hono();

likeRouter.post('/posts/:postId/like', authMiddleware, likePost);
likeRouter.delete('/posts/:postId/like', authMiddleware, unlikePost);

export default likeRouter;