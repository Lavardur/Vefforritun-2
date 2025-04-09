import React from 'react';
import Tags from '@/components/Tags/Tags';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags',
  description: 'Browse posts by tag'
};

export default function TagsPage() {
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Tags</h1>
        <p className={styles.subtitle}>Browse posts by tag</p>
        <Tags />
      </div>
    </div>
  );
}