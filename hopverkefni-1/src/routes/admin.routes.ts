import { Hono } from 'hono';
import { getAllUsers, updateUser, deleteUser, updateAnyPost, deleteAnyPost, getAllComments, deleteAnyComment, updateAnyCategory, deleteAnyCategory, updateAnyTag, deleteAnyTag } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const adminRouter = new Hono();

adminRouter.use('*', authMiddleware);

adminRouter.get('/admin/users', getAllUsers);
adminRouter.put('/admin/users/:id', updateUser);
adminRouter.delete('/admin/users/:id', deleteUser);

adminRouter.put('/admin/posts/:id', updateAnyPost);
adminRouter.delete('/admin/posts/:id', deleteAnyPost);

adminRouter.get('/admin/comments', getAllComments);
adminRouter.delete('/admin/comments/:id', deleteAnyComment);

adminRouter.put('/admin/categories/:id', updateAnyCategory);
adminRouter.delete('/admin/categories/:id', deleteAnyCategory);

adminRouter.put('/admin/tags/:id', updateAnyTag);
adminRouter.delete('/admin/tags/:id', deleteAnyTag);

export default adminRouter;