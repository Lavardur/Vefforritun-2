import type { Context } from 'hono';
import prisma from '../utils/prisma.js';
import { sanitizeObject } from '../utils/sanitization.js';
import { updateUserSchema, postSchema, categorySchema, tagSchema } from '../utils/validationSchemas.js';

export const getAllUsers = async (c: Context) => {
  const users = await prisma.user.findMany();
  return c.json(users);
};

export const updateUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    let data = await c.req.json();

    data = sanitizeObject(data);
    await updateUserSchema.validate(data);

    const { username, password, isAdmin } = data;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, password, isAdmin },
    });
    return c.json({ message: 'User updated successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.user.delete({ where: { id: Number(id) } });
  return c.json({ message: 'User deleted successfully' });
};

export const updateAnyPost = async (c: Context) => {
  try {
    const { id } = c.req.param();
    let data = await c.req.json();

    data = sanitizeObject(data);
    await postSchema.validate(data);

    const { title, content, categoryIds, tagIds } = data;
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
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
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

export const deleteAnyCategory = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.category.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Category deleted successfully' });
};

export const updateAnyTag = async (c: Context) => {
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

export const deleteAnyTag = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.tag.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Tag deleted successfully' });
};