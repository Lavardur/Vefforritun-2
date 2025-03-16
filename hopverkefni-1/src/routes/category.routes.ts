import { Hono } from 'hono';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const categoryRouter = new Hono();

categoryRouter.post('/categories', authMiddleware, createCategory);
categoryRouter.get('/categories', getCategories);
categoryRouter.get('/categories/:id', getCategoryById);
categoryRouter.put('/categories/:id', authMiddleware, updateCategory);
categoryRouter.delete('/categories/:id', authMiddleware, deleteCategory);

export default categoryRouter;