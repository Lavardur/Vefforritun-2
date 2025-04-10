import Categories from '@/components/Categories/Categories';
import styles from './page.module.css';
import { Suspense } from 'react';

export default async function CategoriesPage(  
  props: { 
    searchParams: Promise<{ page?: string; }> 
  }
) {
  const searchParams = await props.searchParams;
  // Safe type conversion without direct property access
  const pageParam = searchParams ? searchParams.page : undefined;
  const pageNum = pageParam ? parseInt(pageParam, 10) : 1;
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <Suspense fallback={<div>Loading posts...</div>}>
          <Categories page={pageNum} />
        </Suspense>
      </div>
    </div>
  );
}