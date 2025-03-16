import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const createCategory = async (c: Context) => {
  const { name } = await c.req.json();
  const category = await prisma.category.create({
    data: { name },
  });
  return c.json({ message: 'Category created successfully', category });
};

export const getCategories = async (c: Context) => {
  const categories = await prisma.category.findMany();
  return c.json(categories);
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
  const { id } = c.req.param();
  const { name } = await c.req.json();
  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });
  return c.json({ message: 'Category updated successfully', category });
};

export const deleteCategory = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.category.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Category deleted successfully' });
};