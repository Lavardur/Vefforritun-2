import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const likePost = async (c: Context) => {
  const { postId } = c.req.param();
  const user = c.get('user');

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId: Number(postId),
        userId: user.id,
      },
    },
  });

  if (existingLike) {
    return c.json({ message: 'Post already liked' }, 400);
  }

  const like = await prisma.like.create({
    data: {
      post: {
        connect: { id: Number(postId) },
      },
      user: {
        connect: { id: user.id },
      },
    },
  });

  return c.json({ message: 'Post liked successfully', like });
};

export const unlikePost = async (c: Context) => {
  const { postId } = c.req.param();
  const user = c.get('user');

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId: Number(postId),
        userId: user.id,
      },
    },
  });

  if (!existingLike) {
    return c.json({ message: 'Like not found' }, 404);
  }

  await prisma.like.delete({
    where: {
      postId_userId: {
        postId: Number(postId),
        userId: user.id,
      },
    },
  });

  return c.json({ message: 'Post unliked successfully' });
};