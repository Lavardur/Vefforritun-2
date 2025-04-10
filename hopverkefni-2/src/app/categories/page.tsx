import React from 'react';
import { Metadata } from 'next';
import Categories from '@/components/Categories/Categories';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all categories'
};

interface CategoriesPageProps {
  searchParams: { page?: string };
}

export default function CategoriesPage({ searchParams }: CategoriesPageProps) {
  // Extract page number from URL query parameters, default to 1
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  return <Categories page={page} />;
}