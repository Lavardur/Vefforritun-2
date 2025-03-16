import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const createTag = async (c: Context) => {
  const { name } = await c.req.json();
  const tag = await prisma.tag.create({
    data: { name },
  });
  return c.json({ message: 'Tag created successfully', tag });
};

export const getTags = async (c: Context) => {
  const tags = await prisma.tag.findMany();
  return c.json(tags);
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
  const { id } = c.req.param();
  const { name } = await c.req.json();
  const tag = await prisma.tag.update({
    where: { id: Number(id) },
    data: { name },
  });
  return c.json({ message: 'Tag updated successfully', tag });
};

export const deleteTag = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.tag.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Tag deleted successfully' });
};