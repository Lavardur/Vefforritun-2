import React from 'react';
import { useParams } from 'next/navigation';
import Posts from '@/components/Posts/Posts';
import styles from './page.module.css';

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params?.id ? parseInt(Array.isArray(params.id) ? params.id[0] : params.id) : null;

  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Posts</h1>
        <Posts title={`Category ${categoryId}`} categoryId={categoryId ?? undefined} />
      </div>
    </div>
  );
}