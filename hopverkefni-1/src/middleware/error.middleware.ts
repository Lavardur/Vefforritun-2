import type { Context, Next } from 'hono';
import { Prisma } from '@prisma/client';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof SyntaxError && err.message.includes('Unexpected token')) {
      return c.json({ message: 'Invalid JSON' }, 400);
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return c.json({ message: 'Unique constraint violation' }, 409);
      }
    }

    console.error(err);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
};