import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const getAllUsers = async (c: Context) => {
  const users = await prisma.user.findMany();
  return c.json(users);
};

export const updateUser = async (c: Context) => {
  const { id } = c.req.param();
  const { username, isAdmin } = await c.req.json();
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { username, isAdmin },
  });
  return c.json({ message: 'User updated successfully', user });
};

export const deleteUser = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.user.delete({ where: { id: Number(id) } });
  return c.json({ message: 'User deleted successfully' });
};

export const updateAnyPost = async (c: Context) => {
  const { id } = c.req.param();
  const { title, content, categoryIds, tagIds } = await c.req.json();
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      categories: categoryIds ? {
        set: categoryIds.map((id: number) => ({ id })),
      } : undefined,
      tags: tagIds ? {
        set: tagIds.map((id: number) => ({ id })),
      } : undefined,
    },
  });
  return c.json({ message: 'Post updated successfully', post });
};

export const deleteAnyPost = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.post.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Post deleted successfully' });
};

export const getAllComments = async (c: Context) => {
  const comments = await prisma.comment.findMany();
  return c.json(comments);
};

export const deleteAnyComment = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.comment.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Comment deleted successfully' });
};

export const updateAnyCategory = async (c: Context) => {
  const { id } = c.req.param();
  const { name } = await c.req.json();
  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });
  return c.json({ message: 'Category updated successfully', category });
};

export const deleteAnyCategory = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.category.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Category deleted successfully' });
};

export const updateAnyTag = async (c: Context) => {
  const { id } = c.req.param();
  const { name } = await c.req.json();
  const tag = await prisma.tag.update({
    where: { id: Number(id) },
    data: { name },
  });
  return c.json({ message: 'Tag updated successfully', tag });
};

export const deleteAnyTag = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.tag.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Tag deleted successfully' });
};