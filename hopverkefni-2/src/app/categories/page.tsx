import React from 'react';
import styles from './page.module.css';
import Categories from '@/components/Categories/Categories';
export default function CategoriesPage() {
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Categories</h1>
        <p className={styles.subtitle}>Browse posts by category</p>
        <Categories />
      </div>
    </div>
  );
}