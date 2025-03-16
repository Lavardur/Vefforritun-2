import type { Context } from 'hono';
import prisma from '../utils/prisma.js';

export const addComment = async (c: Context) => {
  const { content } = await c.req.json();
  const { postId } = c.req.param();
  const user = c.get('user');

  const comment = await prisma.comment.create({
    data: {
      content,
      post: {
        connect: { id: Number(postId) },
      },
      author: {
        connect: { id: user.id },
      },
    },
  });

  return c.json({ message: 'Comment added successfully', comment });
};

export const getCommentsByPostId = async (c: Context) => {
  const { postId } = c.req.param();
  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
  });
  return c.json(comments);
};

export const updateComment = async (c: Context) => {
  const { content } = await c.req.json();
  const { commentId } = c.req.param();
  const user = c.get('user');

  const existingComment = await prisma.comment.findUnique({
    where: { id: Number(commentId) },
  });

  if (!existingComment || existingComment.authorId !== user.id) {
    return c.json({ message: 'Forbidden' }, 403);
  }

  const updatedComment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data: { content },
  });

  return c.json({ message: 'Comment updated successfully', updatedComment });
};

export const deleteComment = async (c: Context) => {
  const { commentId } = c.req.param();
  const user = c.get('user');

  const existingComment = await prisma.comment.findUnique({
    where: { id: Number(commentId) },
  });

  if (!existingComment || existingComment.authorId !== user.id) {
    return c.json({ message: 'Forbidden' }, 403);
  }

  await prisma.comment.delete({
    where: { id: Number(commentId) },
  });

  return c.json({ message: 'Comment deleted successfully' });
};