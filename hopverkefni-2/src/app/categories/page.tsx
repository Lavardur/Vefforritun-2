import React from 'react';
import { Metadata } from 'next';
import Categories from '@/components/Categories/Categories';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all categories'
};

export default function CategoriesPage() {
  return <Categories />;
}