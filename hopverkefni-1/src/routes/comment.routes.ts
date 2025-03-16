import { Hono } from 'hono';
import { addComment, getCommentsByPostId, updateComment, deleteComment } from '../controllers/comment.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const commentRouter = new Hono();

commentRouter.post('/posts/:postId/comments', authMiddleware, addComment);
commentRouter.get('/posts/:postId/comments', getCommentsByPostId);
commentRouter.put('/comments/:commentId', authMiddleware, updateComment);
commentRouter.delete('/comments/:commentId', authMiddleware, deleteComment);

export default commentRouter;