import type { Context } from 'hono';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';
import { sanitizeObject } from '../utils/sanitization.js';
import { userSchema } from '../utils/validationSchemas.js';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string;

if (!JWT_SECRET) {
  console.error('JWT_ACCESS_SECRET environment variable is not set!');
  // You might want to throw an error or set a default for development
}

export const register = async (c: Context) => {
  try {
    let data = await c.req.json();

    data = sanitizeObject(data);
    await userSchema.validate(data);

    const { username, password } = data;

    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        isAdmin: false, // Set isAdmin to false by default
      },
    });
    return c.json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const login = async (c: Context) => {
  try {
    let data = await c.req.json();

    data = sanitizeObject(data);
    await userSchema.validate(data);

    const { username, password } = data;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, {
      expiresIn: '1h',
    });
    return c.json({ message: 'Login successful', token });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};