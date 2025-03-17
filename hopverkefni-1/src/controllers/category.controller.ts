import type { Context } from 'hono';
import prisma from '../utils/prisma.js';
import { sanitizeObject } from '../utils/sanitization.js';
import { categorySchema } from '../utils/validationSchemas.js';

export const createCategory = async (c: Context) => {
  try {
    let data = await c.req.json();

    data = sanitizeObject(data);
    await categorySchema.validate(data);

    const { name } = data;
    const category = await prisma.category.create({
      data: { name },
    });
    return c.json({ message: 'Category created successfully', category });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getCategories = async (c: Context) => {
  try {
    const { limit, offset } = c.req.query() as unknown as { limit: number; offset: number };

    const categories = await prisma.category.findMany({
      skip: offset,
      take: limit,
    });

    const total = await prisma.category.count();

    return c.json({ data: categories, total, limit, offset });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getCategoryById = async (c: Context) => {
  const { id } = c.req.param();
  const category = await prisma.category.findUnique({ where: { id: Number(id) } });
  if (!category) {
    return c.json({ message: 'Category not found' }, 404);
  }
  return c.json(category);
};

export const updateCategory = async (c: Context) => {
  try {
    const { id } = c.req.param();
    let data = await c.req.json();

    data = sanitizeObject(data);
    await categorySchema.validate(data);

    const { name } = data;
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return c.json({ message: 'Category updated successfully', category });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const deleteCategory = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.category.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Category deleted successfully' });
};