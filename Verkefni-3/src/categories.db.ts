import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import xss from 'xss'; 

const prisma = new PrismaClient();

const CategorySchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(3, 'title must be at least three letters')
    .max(1024, 'title must be at most 1024 letters'),
  slug: z.string(),
});

const CategoryToCreateSchema = z.object({
  title: z
    .string()
    .min(3, 'title must be at least three letters')
    .max(1024, 'title must be at most 1024 letters'),
});

type Category = z.infer<typeof CategorySchema>;
type CategoryToCreate = z.infer<typeof CategoryToCreateSchema>;

export async function getCategories(): Promise<Array<Category>> {
  const categories = await prisma.categories.findMany();
  console.log('categories :>> ', categories);
  return categories;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const category = await prisma.categories.findUnique({
    where: { slug },
  });
  
  return category;
}

export function validateCategory(categoryToValidate: unknown) {
  const result = CategoryToCreateSchema.safeParse(categoryToValidate);

  return result;
}

export async function createCategory(categoryToCreate: CategoryToCreate): Promise<Category> {
  const createdCategory = await prisma.categories.create({
    data: {
      title: xss(categoryToCreate.title), 
      slug: xss(categoryToCreate.title.toLowerCase().replace(' ', '-')), 
    },
  });

  return createdCategory;
}

export async function deleteCategory(slug: string): Promise<Category | null> {
  const deletedCategory = await prisma.categories.delete({
    where: { slug },
  });
  
  return deletedCategory; 
}

export async function updateCategory(slug: string, data: CategoryToCreate): Promise<Category> {
  const updatedCategory = await prisma.categories.update({
    where: { slug },
    data: {
      title: xss(data.title), 
      slug: xss(data.title.toLowerCase().replace(' ', '-')), 
    },
  });

  return updatedCategory;
}