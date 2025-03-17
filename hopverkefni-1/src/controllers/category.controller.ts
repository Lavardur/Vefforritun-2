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
    const query = c.req.query() as { limit?: string; page?: string };
    const limit = query.limit ? parseInt(query.limit, 10) : 10; // Default to 10 items per page
    const page = query.page ? parseInt(query.page, 10) : 1; // Default to first page
    const offset = (page - 1) * limit; // Calculate offset from page number

    const categories = await prisma.category.findMany({
      skip: offset,
      take: limit,
    });

    const total = await prisma.category.count();
    const totalPages = Math.ceil(total / limit);

    return c.json({
      data: categories,
      pagination: {
        total,
        limit,
        page,
        totalPages,
        offset
      }
    });
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