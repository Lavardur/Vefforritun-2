'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Post from '@/components/Post/Post';

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.id ? parseInt(Array.isArray(params.id) ? params.id[0] : params.id) : null;
  
  return (
    <div className={styles.postsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Post</h1>
        {postId !== null && <Post postId={postId} />}
      </div>
    </div>
  );
}