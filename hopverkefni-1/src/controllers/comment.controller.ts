import type { Context } from 'hono';
import prisma from '../utils/prisma.js';
import { sanitizeObject } from '../utils/sanitization.js';
import { commentSchema } from '../utils/validationSchemas.js';

export const addComment = async (c: Context) => {
  try {
    let data = await c.req.json();
    const { postId } = c.req.param();

    data = sanitizeObject(data);
    await commentSchema.validate(data);

    const { content } = data;
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
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getCommentsByPostId = async (c: Context) => {
  try {
    const { postId } = c.req.param();
    const { limit, offset } = c.req.query() as unknown as { limit: number; offset: number };

    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      skip: offset,
      take: limit,
    });

    const total = await prisma.comment.count({
      where: { postId: Number(postId) },
    });

    return c.json({ data: comments, total, limit, offset });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const updateComment = async (c: Context) => {
  try {
    let data = await c.req.json();
    const { commentId } = c.req.param();

    data = sanitizeObject(data);
    await commentSchema.validate(data);

    const { content } = data;
    const user = c.get('user');

    if (!user || !user.id) {
      return c.json({ message: 'Author ID is required' }, 400);
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    if (!existingComment || existingComment.authorId !== user.id) {
      throw new Error('Forbidden');
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: { content },
    });

    return c.json({ message: 'Comment updated successfully', updatedComment });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const deleteComment = async (c: Context) => {
  try {
    const { commentId } = c.req.param();
    const user = c.get('user');

    if (!user || !user.id) {
      return c.json({ message: 'Author ID is required' }, 400);
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    if (!existingComment || existingComment.authorId !== user.id) {
      throw new Error('Forbidden');
    }

    await prisma.comment.delete({
      where: { id: Number(commentId) },
    });

    return c.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};