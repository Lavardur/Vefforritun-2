import { Hono } from 'hono';
import { addComment, getCommentsByPostId, updateComment, deleteComment } from '../controllers/comment.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const commentRouter = new Hono();

commentRouter.post('/posts/:postId', authMiddleware, addComment);
commentRouter.get('/posts/:postId', getCommentsByPostId);
commentRouter.put('/:commentId', authMiddleware, updateComment);
commentRouter.delete('/:commentId', authMiddleware, deleteComment);

export default commentRouter;