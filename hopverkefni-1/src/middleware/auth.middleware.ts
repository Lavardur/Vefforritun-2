import type { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'SECRET123';

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    c.set('user', decoded);
    await next();
  } catch (err) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
};