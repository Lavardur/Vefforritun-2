'use client';

import { PostsApi } from '@/api';
import { Post, UiState, Paginated } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Posts.module.css';
import Link from 'next/link';

interface PostsProps {
  categoryId?: number;
  tagId?: number;
  title?: string;
}

export default function Posts({ title, categoryId, tagId }: PostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [uiState, setUiState] = useState<UiState>('loading');

  useEffect(() => {
    async function fetchPosts() {
      setUiState('loading');
      const api = new PostsApi();
      
      const result = await api.getPosts();

      if (!result) {
        setUiState('error');
        return;
      }
      
      if (categoryId) {
        result.data = result.data.filter(post => post.categoryIds.includes(categoryId));
      } else if (tagId) {
        result.data = result.data.filter(post => post.tagIds.includes(tagId));
      }

      if (result.data.length === 0) {
        setUiState('empty');
      } else {
        setPosts(result.data);
        setUiState('data');
      }
    }

    fetchPosts();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        {uiState === 'loading' && (
          <div className={styles.loading}>Sæki flokka...</div>
        )}

        {uiState === 'error' && (
          <div className={styles.error}>Villa við að sækja flokka</div>
        )}

        {uiState === 'empty' && (
          <div className={styles.empty}>Engir flokkar fundust</div>
        )}

        {uiState === 'data' && (
          <div className={styles.categoryGrid}>
            {posts.map((post) => (
                <Link 
                href={`/posts/${post.id}`} 
                key={post.id}
                className={styles.categoryCard}
                >
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
