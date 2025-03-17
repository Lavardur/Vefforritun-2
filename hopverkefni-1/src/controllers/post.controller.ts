import type { Context } from 'hono';
import prisma from '../utils/prisma.js';
import { postSchema } from '../utils/validationSchemas.js';
import { sanitizeObject } from '../utils/sanitization.js';
import type { PostToCreate } from '../utils/types.js';

export const createPost = async (c: Context) => {
  try {
    const data = await c.req.json() as PostToCreate;

    const sanitizedData = sanitizeObject(data);
    await postSchema.validate(sanitizedData);

    const { title, content, categoryIds, tagIds } = sanitizedData;
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
      include: {
        categories: true,
        tags: true,
      },
    });

    const transformedPost = {
      ...post,
      categoryIds: post.categories.map(category => category.id),
      tagIds: post.tags.map(tag => tag.id),
    };

    return c.json({ created: true, post: transformedPost });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getPosts = async (c: Context) => {
  try {
    const { limit, offset } = c.req.query() as unknown as { limit: number; offset: number };
    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
      include: {
        categories: true,
        tags: true,
      },
    });
    const total = await prisma.post.count();
    const transformedPosts = posts.map(post => ({
      ...post,
      categoryIds: post.categories.map(category => category.id),
      tagIds: post.tags.map(tag => tag.id),
    }));
    return c.json({ data: transformedPosts, total, limit, offset });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const getPostById = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        categories: true,
        tags: true,
      },
    });
    if (!post) {
      return c.json({ message: 'Post not found' }, 404);
    }
    const transformedPost = {
      ...post,
      categoryIds: post.categories.map(category => category.id),
      tagIds: post.tags.map(tag => tag.id),
    };
    return c.json(transformedPost);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const updatePost = async (c: Context) => {
  try {
    const data = await c.req.json() as PostToCreate;

    const sanitizedData = sanitizeObject(data);
    await postSchema.validate(sanitizedData);

    const { id } = c.req.param();
    const { title, content, categoryIds, tagIds } = sanitizedData;

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
      include: {
        categories: true,
        tags: true,
      },
    });

    const transformedPost = {
      ...post,
      categoryIds: post.categories.map(category => category.id),
      tagIds: post.tags.map(tag => tag.id),
    };

    return c.json(transformedPost);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};

export const deletePost = async (c: Context) => {
  try {
    const { id } = c.req.param();
    await prisma.post.delete({ where: { id: Number(id) } });
    return c.json({ message: 'Post deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: 'An unknown error occurred' }, 500);
  }
};