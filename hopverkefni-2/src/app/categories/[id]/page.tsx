import React from 'react';
import Posts from '@/components/Posts/Posts';
import styles from './page.module.css';
import { CategoriesApi } from '@/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryId = parseInt(params.id);
  
  if (isNaN(categoryId)) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }
  
  const api = new CategoriesApi();
  const category = await api.getCategoryById(categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }
  
  return {
    title: `Category: ${category.name}`,
    description: category.description || `Browse all posts in ${category.name}`
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const categoryId = parseInt(params.id);
  
  if (isNaN(categoryId)) {
    notFound();
  }
  
  const api = new CategoriesApi();
  const category = await api.getCategoryById(categoryId);
  
  if (!category) {
    notFound();
  }
  
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{category.name}</h1>
        {category.description && (
          <p className={styles.description}>{category.description}</p>
        )}
        <Posts 
          title={`Posts in ${category.name}`} 
          categoryId={categoryId} 
        />
      </div>
    </div>
  );
}