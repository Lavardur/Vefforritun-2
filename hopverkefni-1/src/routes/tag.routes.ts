import { Hono } from 'hono';
import { createTag, getTags, getTagById, updateTag, deleteTag } from '../controllers/tag.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const tagRouter = new Hono();

tagRouter.post('/', authMiddleware, createTag);
tagRouter.get('/', getTags);
tagRouter.get('/:id', getTagById);
tagRouter.put('/:id', authMiddleware, updateTag);
tagRouter.delete('/:id', authMiddleware, deleteTag);

export default tagRouter;