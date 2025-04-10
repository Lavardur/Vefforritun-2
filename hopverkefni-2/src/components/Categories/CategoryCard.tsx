'use client';

import { Category } from '@/types';
import Link from 'next/link';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link 
      href={`/categories/${category.id}`} 
      className={styles.categoryCard}
    >
      <h2 className={styles.categoryTitle}>{category.name}</h2>
    </Link>
  );
}