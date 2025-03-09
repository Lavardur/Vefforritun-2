import { describe, it, expect, vi } from 'vitest';
import { getCategories, getCategory, validateCategory, createCategory, deleteCategory, updateCategory } from '../categories.db.js';
import prisma from '../libs/__mocks__/prisma.js';

vi.mock('../libs/prisma');

describe('Category functions', () => {
  it('should create a category', async () => {
    const newCategory = { title: 'Test Category', slug: 'test-category' };
    prisma.categories.create.mockResolvedValue({ ...newCategory, id: 1 });
    const category = await createCategory({ title: 'Test Category' });
    expect(category).toStrictEqual({ ...newCategory, id: 1 });
  });

  it('should get all categories', async () => {
    const categoriesList = [
      { id: 1, title: 'Test Category', slug: 'test-category' },
      { id: 2, title: 'Another Category', slug: 'another-category' }
    ];
    prisma.categories.findMany.mockResolvedValue(categoriesList);
    const categories = await getCategories();
    expect(categories).toStrictEqual(categoriesList);
  });

  it('should get a category by slug', async () => {
    const categoryData = { id: 1, title: 'Test Category', slug: 'test-category' };
    prisma.categories.findUnique.mockResolvedValue(categoryData);
    const category = await getCategory('test-category');
    expect(category).toStrictEqual(categoryData);
  });

  it('should validate a category', () => {
    const result = validateCategory({ title: 'Valid Category' });
    expect(result.success).toBe(true);
  });

  it('should delete a category', async () => {
    const categoryData = { id: 1, title: 'Test Category', slug: 'test-category' };
    prisma.categories.delete.mockResolvedValue(categoryData);
    const deletedCategory = await deleteCategory('test-category');
    expect(deletedCategory).toStrictEqual(categoryData);
  });

  it('should update a category', async () => {
    const categoryData = { id: 1, title: 'Another Category', slug: 'another-category' };
    const updatedCategoryData = { id: 1, title: 'Updated Category', slug: 'updated-category' };
    prisma.categories.update.mockResolvedValue(updatedCategoryData);
    const updatedCategory = await updateCategory(categoryData.slug, { title: 'Updated Category' });
    expect(updatedCategory).toStrictEqual(updatedCategoryData);
  });
});