import type { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string;

export const authMiddleware = async (c: Context, next: Next) => {
  const jwtSecret = process.env.JWT_ACCESS_SECRET;
  if (!jwtSecret) {
    console.error('JWT_ACCESS_SECRET is not set in environment variables');
    return c.json({ message: 'Server configuration error' }, 500);
  }

  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; isAdmin: boolean };
    c.set('user', decoded);
    await next();
  } catch (err) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
};