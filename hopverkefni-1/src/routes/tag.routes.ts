import { Hono } from 'hono';
import { createTag, getTags, getTagById, updateTag, deleteTag } from '../controllers/tag.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const tagRouter = new Hono();

tagRouter.post('/tags', authMiddleware, createTag);
tagRouter.get('/tags', getTags);
tagRouter.get('/tags/:id', getTagById);
tagRouter.put('/tags/:id', authMiddleware, updateTag);
tagRouter.delete('/tags/:id', authMiddleware, deleteTag);

export default tagRouter;