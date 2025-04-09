'use client';

import { Post } from '@/types';
import Link from 'next/link';
import styles from './PostCard.module.css';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link 
      href={`/posts/${post.id}`} 
      className={styles.postCard}
    >
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postExcerpt}>
        {post.content.length > 150 
          ? `${post.content.substring(0, 150)}...` 
          : post.content}
      </p>
      <div className={styles.postMeta}>
        <span className={styles.postDate}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}