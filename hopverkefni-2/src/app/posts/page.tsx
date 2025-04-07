import React from 'react';
import Posts from '@/components/Posts/Posts';
import styles from './page.module.css';

export default function PostsPage() {
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Posts</h1>
        <Posts />
      </div>
    </div>
  );
}