/* import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

export const categoryRoutes = (prisma: PrismaClient) => {
  const router = new Hono();

  router.get('/', async (c) => {
    try {
      const categories = await prisma.category.findMany();
      return c.json(categories);
    } catch (error) {
      return c.json({ message: 'Internal Server Error' }, 500);
    }
  });

  router.get('/:slug', async (c) => {
    const { slug } = c.req.param();
    try {
      const category = await prisma.category.findUnique({ where: { slug } });
      if (category) {
        return c.json(category);
      } else {
        return c.json({ message: 'Category not found' }, 404);
      }
    } catch (error) {
      return c.json({ message: 'Internal Server Error' }, 500);
    }
  });

  router.post('/', async (c) => {
    const { name, slug } = await c.req.json();
    try {
      const newCategory = await prisma.category.create({ data: { name, slug } });
      return c.json(newCategory, 201);
    } catch (error) {
      return c.json({ message: 'Bad Request' }, 400);
    }
  });

  router.patch('/:slug', async (c) => {
    const { slug } = c.req.param();
    const { name } = await c.req.json();
    try {
      const updatedCategory = await prisma.category.update({
        where: { slug },
        data: { name },
      });
      return c.json(updatedCategory);
    } catch (error) {
      return c.json({ message: 'Bad Request' }, 400);
    }
  });

  router.delete('/:slug', async (c) => {
    const { slug } = c.req.param();
    try {
      await prisma.category.delete({ where: { slug } });
      return c.status(204);
    } catch (error) {
      return c.json({ message: 'Category not found' }, 404);
    }
  });

  return router;
}; */