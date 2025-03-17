import { Hono } from 'hono';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const categoryRouter = new Hono();

categoryRouter.post('/', authMiddleware, createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id', authMiddleware, updateCategory);
categoryRouter.delete('/:id', authMiddleware, deleteCategory);

export default categoryRouter;