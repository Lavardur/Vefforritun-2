import React from 'react';
import Tags from '@/components/Tags/Tags';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags',
  description: 'Browse posts by tag'
};

interface TagsPageProps {
  searchParams: { page?: string };
}

export default function TagsPage({ searchParams }: TagsPageProps) {
  // Extract page number from URL query parameters, default to 1
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Tags</h1>
        <p className={styles.subtitle}>Browse posts by tag</p>
        <Tags page={page} />
      </div>
    </div>
  );
}