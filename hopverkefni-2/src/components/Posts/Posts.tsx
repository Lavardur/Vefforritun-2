import { PostsApi } from '@/api';
import styles from './Posts.module.css';
import ClientPaginationWrapper from '../Common/ClientPaginationWrapper';
import PostCard from './PostCard';

interface PostsProps {
  categoryId?: number;
  tagId?: number;
  title?: string;
  page?: number;
}

export default async function Posts({ 
  title = "Latest Posts", 
  categoryId, 
  tagId,
  page = 1 
}: PostsProps) {
  const api = new PostsApi();
  const result = await api.getPosts(10, page);
  
  // Filter results if needed
  let filteredPosts = result?.data || [];
  const totalPages = result?.pagination ? Math.ceil(result.pagination.total / 10) : 1;
  
  if (categoryId) {
    filteredPosts = filteredPosts.filter(post => post.categoryIds?.includes(categoryId));
  } else if (tagId) {
    filteredPosts = filteredPosts.filter(post => post.tagIds?.includes(tagId));
  }
  
  const hasData = filteredPosts.length > 0;
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        {!result && (
          <div className={styles.error}>Failed to load posts</div>
        )}

        {result && !hasData && (
          <div className={styles.empty}>No posts found</div>
        )}

        {hasData && (
          <>
            <div className={styles.postsGrid}>
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {totalPages > 1 && (
              <ClientPaginationWrapper 
                currentPage={page} 
                totalPages={totalPages}
                basePath={categoryId ? `/categories/${categoryId}` : tagId ? `/tags/${tagId}` : '/posts'} 
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
