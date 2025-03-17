import { Hono } from 'hono';
import { deleteUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = new Hono();

// userRouter.delete('/users/:id', authMiddleware, deleteUser);

export default userRouter;