import { Hono } from 'hono';
import { register, login } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import postRouter from './post.routes.js';

const router = new Hono();

// User Registration and Login
router.post('/register', register);
router.post('/login', login);

// Protected Route
router.get('/protected', authMiddleware, (c) => {
  const user = c.req.header('user');
  return c.json({ message: 'Protected route', user });
});

// Post Routes
router.route('/', postRouter);

// Root Route
router.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default router;