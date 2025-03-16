import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const deleteUser = async (c: Context) => {
  const { id } = c.req.param();
  const user = c.get('user');

  if (!user.isAdmin) {
    return c.json({ message: 'Forbidden' }, 403);
  }

  await prisma.user.delete({ where: { id: Number(id) } });
  return c.json({ message: 'User deleted successfully' });
};