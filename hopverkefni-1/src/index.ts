// filepath: c:\Users\User\Documents\HÍ\HI-25V\Vefforritun 2\hopverkefni-1\src\index.ts
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import type { Context } from 'hono';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './utils/prisma.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();
const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string;

app.post('/register', async (c) => {
  const { username, password } = await c.req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  return c.json({ message: 'User registered successfully', user });
});

app.post('/login', async (c) => {
  const { username, password } = await c.req.json();
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ message: 'Invalid username or password' }, 401);
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return c.json({ message: 'Login successful', token });
});

app.get('/protected', authMiddleware, (c: Context) => {
  const user = c.get('user') as { id: string; username: string };
  return c.json({ message: 'Protected route', user });
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);