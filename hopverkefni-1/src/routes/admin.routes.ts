import { Hono } from 'hono';
import { getAllUsers, updateUser, deleteUser, updateAnyPost, deleteAnyPost, getAllComments, deleteAnyComment, updateAnyCategory, deleteAnyCategory, updateAnyTag, deleteAnyTag } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const adminRouter = new Hono();

adminRouter.use('*', authMiddleware);

adminRouter.get('/users', getAllUsers);
adminRouter.put('/users/:id', updateUser);
adminRouter.delete('/users/:id', deleteUser);

adminRouter.put('/posts/:id', updateAnyPost);
adminRouter.delete('/posts/:id', deleteAnyPost);

adminRouter.get('/comments', getAllComments);
adminRouter.delete('/comments/:id', deleteAnyComment);

adminRouter.put('/categories/:id', updateAnyCategory);
adminRouter.delete('/categories/:id', deleteAnyCategory);

adminRouter.put('/tags/:id', updateAnyTag);
adminRouter.delete('/tags/:id', deleteAnyTag);

export default adminRouter;