import React from 'react';
import styles from './page.module.css';
import Tags from '@/components/Tags/Tags';
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