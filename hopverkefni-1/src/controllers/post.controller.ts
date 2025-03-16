import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const createPost = async (c: Context) => {
  const { title, content, categoryIds, tagIds } = await c.req.json();
  const user = c.get('user');

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
      categories: categoryIds ? {
        connect: categoryIds.map((id: number) => ({ id })),
      } : undefined,
      tags: tagIds ? {
        connect: tagIds.map((id: number) => ({ id })),
      } : undefined,
    },
  });

  return c.json({ message: 'Post created successfully', post });
};

export const getPosts = async (c: Context) => {
  const posts = await prisma.post.findMany();
  return c.json(posts);
};

export const getPostById = async (c: Context) => {
  const { id } = c.req.param();
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) {
    return c.json({ message: 'Post not found' }, 404);
  }
  return c.json(post);
};

export const updatePost = async (c: Context) => {
  const { id } = c.req.param();
  const { title, content, categoryIds, tagIds } = await c.req.json();
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      categories: {
        set: categoryIds.map((id: number) => ({ id })),
      },
      tags: {
        set: tagIds.map((id: number) => ({ id })),
      },
    },
  });
  return c.json({ message: 'Post updated successfully', post });
};

export const deletePost = async (c: Context) => {
  const { id } = c.req.param();
  await prisma.post.delete({ where: { id: Number(id) } });
  return c.json({ message: 'Post deleted successfully' });
};