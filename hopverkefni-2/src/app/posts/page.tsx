import Posts from '@/components/Posts/Posts';
import styles from './page.module.css';
import { Suspense } from 'react';

export default function PostsPage({ 
  searchParams 
}: { 
  searchParams: { page?: string; } 
}) {
  // Safe type conversion without direct property access
  const pageParam = searchParams ? searchParams.page : undefined;
  const pageNum = pageParam ? parseInt(pageParam, 10) : 1;
  
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <Suspense fallback={<div>Loading posts...</div>}>
          <Posts page={pageNum} />
        </Suspense>
      </div>
    </div>
  );
}