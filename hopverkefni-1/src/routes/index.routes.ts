import { Hono } from 'hono';
import { register, login } from '../controllers/auth.controller.js';
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';
import commentRouter from './comment.routes.js';
import categoryRouter from './category.routes.js';

const router = new Hono();

// User Registration and Login
router.post('/register', register);
router.post('/login', login);

// Post Routes
router.route('/', postRouter);

// User Routes
router.route('/', userRouter);

// Comment Routes
router.route('/', commentRouter);

// Category Routes
router.route('/', categoryRouter);

// Root Route
router.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default router;