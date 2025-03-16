import type { Context } from 'hono';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string;

export const register = async (c: Context) => {
  const { username, password } = await c.req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      isAdmin: false, // Set isAdmin to false by default
    },
  });
  return c.json({ message: 'User registered successfully', user });
};

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ message: 'Invalid username or password' }, 401);
  }
  const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return c.json({ message: 'Login successful', token });
};