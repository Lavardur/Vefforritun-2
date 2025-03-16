import { Hono } from 'hono';
import { register, login } from '../controllers/auth.controller.js';
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';
import commentRouter from './comment.routes.js';
import categoryRouter from './category.routes.js';
import tagRouter from './tag.routes.js';
import likeRouter from './like.routes.js';

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

// Tag Routes
router.route('/', tagRouter);

// Like Routes
router.route('/', likeRouter);

// Root Route
router.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default router;