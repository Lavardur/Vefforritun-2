import type { Context } from 'hono';
import prisma from '../utils/prisma.js';
import { sanitizeObject } from '../utils/sanitization.js';
import { tagSchema } from '../utils/validationSchemas.js';

export const createTag = async (c: Context) => {
  try {
    let data = await c.req.json();

    data = sanitizeObject(data);
    await tagSchema.validate(data);

    const { name } = data;
    const tag = await prisma.tag.create({
      data: { name },
    });
    return c.json({ message: 'Tag created successfully', tag });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getTags = async (c: Context) => {
  try {
    const { limit, offset } = c.req.query() as unknown as { limit: number; offset: number };

    const tags = await prisma.tag.findMany({
      skip: offset,
      take: limit,
    });

    const total = await prisma.tag.count();

    return c.json({ data: tags, total, limit, offset });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getTagById = async (c: Context) => {
  const { id } = c.req.param();
  const tag = await prisma.tag.findUnique({ where: { id: Number(id) } });
  if (!tag) {
    return c.json({ message: 'Tag not found' }, 404);
  }
  return c.json(tag);
};

export const updateTag = async (c: Context) => {
  try {
    const { id } = c.req.param();
    let data = await c.req.json();

    data = sanitizeObject(data);
    await tagSchema.validate(data);

    const { name } = data;
    const tag = await prisma.tag.update({
      where: { id: Number(id) },
      data: { name },
    });
    return c.json({ message: 'Tag updated successfully', tag });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const deleteTag = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.tag.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Tag deleted successfully' });
};