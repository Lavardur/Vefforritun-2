import { Hono } from 'hono';
import { register, login } from '../controllers/auth.controller.js';
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';
import commentRouter from './comment.routes.js';
import categoryRouter from './category.routes.js';
import tagRouter from './tag.routes.js';
import likeRouter from './like.routes.js';
import adminRouter from './admin.routes.js';
import { collectRoutes } from '../utils/collectRoutes.js';

const router = new Hono();

// User Registration and Login
router.post('/register', register);
router.post('/login', login);

// Post Routes
router.route('/posts', postRouter);

// User Routes
router.route('/users', userRouter);

// Comment Routes
router.route('/comments', commentRouter);

// Category Routes
router.route('/categories', categoryRouter);

// Tag Routes
router.route('/tags', tagRouter);

// Like Routes
router.route('/like', likeRouter);

// Admin Routes
router.route('/admin', adminRouter);

// Root Route
router.get('/', (c) => {
  const routes = collectRoutes(router);
  return c.json(routes);
});

export default router;